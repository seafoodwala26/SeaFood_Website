'use client';

import { useEffect, useMemo, useRef, useState, FormEvent, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Save, Loader2, ArrowLeft, Plus, Trash2, Link2, X } from 'lucide-react';
import { AdminFormField } from '@/components/admin/admin-form-field';
import { RichTextEditor } from '@/components/admin/rich-text-editor';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import type { FAQItem } from '@/lib/types';
import { ApiRequestError, blogApi, categoryApi, type ApiBlog, type BlogDraftPayload, type BlogPayload } from '@/lib/api';

interface BlogEditorFormProps {
  mode: 'create' | 'edit';
  blogId?: string;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categorySlug: string;
  image: string;
  imageName: string;
  metaTitle: string;
  metaDescription: string;
  faqs: FAQItem[];
  tags: string[];
  featured: boolean;
  isActive: boolean;
  isDraft?: boolean;
  readingTime: number;
}

interface StoredBlogDraft {
  form: FormState;
  draftId: string | null;
  savedAt: string;
}

const LOCAL_DRAFT_STORAGE_KEY = 'admin-blog-create-recovery';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function emptyForm(): FormState {
  return {
    title: '', slug: '', excerpt: '', content: '', categorySlug: '', image: '', imageName: '',
    metaTitle: '', metaDescription: '', faqs: [], tags: [], featured: false, isActive: true, readingTime: 5,
  };
}

function apiBlogToForm(post: ApiBlog): FormState {
  return {
    title: post.blogTitle,
    slug: post.isDraft ? post.draftUrl || '' : post.url,
    excerpt: post.excerpt,
    content: post.content,
    categorySlug: post.category,
    image: post.blogImg?.url || '',
    imageName: post.blogImg?.originalName || '',
    metaTitle: post.seoTitle || '',
    metaDescription: post.seoMeta || '',
    faqs: post.faq || [],
    tags: post.tags || [],
    featured: post.isFeatured,
    isActive: post.isDraft ? true : post.isActive !== false,
    isDraft: post.isDraft,
    readingTime: 5,
  };
}

function toDraftPayload(form: FormState): BlogDraftPayload {
  return {
    blogTitle: form.title,
    url: form.slug,
    category: form.categorySlug,
    excerpt: form.excerpt,
    content: form.content,
    isFeatured: form.featured,
    seoTitle: form.metaTitle,
    seoMeta: form.metaDescription,
    faq: form.faqs,
    tags: form.tags,
    image: form.image,
    imageName: form.imageName,
  };
}

function hasDraftContent(form: FormState): boolean {
  return Boolean(
    form.title.trim() || form.slug.trim() || form.excerpt.trim() || form.content.trim() || form.categorySlug.trim() ||
    form.image || form.metaTitle.trim() || form.metaDescription.trim() || form.faqs.length || form.tags.length
  );
}

function isStoredBlogDraft(value: unknown): value is StoredBlogDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as Partial<StoredBlogDraft>;
  const form = draft.form;
  if (!form || typeof form !== 'object') return false;
  return (
    typeof form.title === 'string' &&
    typeof form.slug === 'string' &&
    typeof form.excerpt === 'string' &&
    typeof form.content === 'string' &&
    typeof form.categorySlug === 'string' &&
    typeof form.image === 'string' &&
    typeof form.imageName === 'string' &&
    typeof form.metaTitle === 'string' &&
    typeof form.metaDescription === 'string' &&
    Array.isArray(form.faqs) &&
    Array.isArray(form.tags) &&
    typeof form.featured === 'boolean' &&
    typeof form.isActive === 'boolean' &&
    typeof form.readingTime === 'number' &&
    (draft.draftId === null || typeof draft.draftId === 'string') &&
    typeof draft.savedAt === 'string'
  );
}

export function BlogEditorForm({ mode, blogId }: BlogEditorFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: existingBlog, isLoading: isLoadingBlog, error: loadError } = useQuery({
    queryKey: ['blogs', blogId],
    queryFn: () => blogApi.get(blogId!),
    enabled: mode === 'edit' && Boolean(blogId),
  });
  const { data: existingCategories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories', 'blog-editor'],
    queryFn: categoryApi.list,
    staleTime: 2 * 60_000,
  });
  const { data: existingBlogs = [], isLoading: isLoadingBlogs } = useQuery({
    queryKey: ['blogs', 'category-options'],
    queryFn: blogApi.list,
    staleTime: 2 * 60_000,
  });
  const [form, setForm] = useState<FormState>({
    ...emptyForm(),
  });
  const [draftId, setDraftId] = useState<string | null>(null);
  const [formReady, setFormReady] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [localRecoveryError, setLocalRecoveryError] = useState<string | null>(null);
  const [restoredLocalDraft, setRestoredLocalDraft] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const lastSavedSnapshot = useRef('');
  const failedSnapshot = useRef('');
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const publishing = useRef(false);

  useEffect(() => {
    if (mode !== 'create') return;

    try {
      const savedDraft = window.localStorage.getItem(LOCAL_DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed: unknown = JSON.parse(savedDraft);
        if (isStoredBlogDraft(parsed)) {
          setForm(parsed.form);
          setDraftId(parsed.draftId);
          setSlugTouched(Boolean(parsed.form.slug));
          setRestoredLocalDraft(true);
        } else {
          window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY);
        }
      }
    } catch {
      setLocalRecoveryError('This browser could not read the saved local draft. Your server draft, if saved, is still available in the blog list.');
    } finally {
      setFormReady(true);
    }
  }, [mode]);

  useEffect(() => {
    if (existingBlog) {
      const loadedForm = apiBlogToForm(existingBlog);
      setForm(loadedForm);
      setDraftId(existingBlog.isDraft ? existingBlog._id : null);
      setSlugTouched(
        !existingBlog.isDraft ||
        Boolean(existingBlog.draftUrl && existingBlog.draftUrl !== slugify(existingBlog.blogTitle))
      );
      lastSavedSnapshot.current = JSON.stringify(toDraftPayload(loadedForm));
      setFormReady(true);
    }
  }, [existingBlog]);

  useEffect(() => {
    if (mode !== 'create' || !formReady) return;

    try {
      if (!hasDraftContent(form)) {
        window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY);
        setLocalRecoveryError(null);
        return;
      }

      const storedDraft: StoredBlogDraft = {
        form,
        draftId,
        savedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(LOCAL_DRAFT_STORAGE_KEY, JSON.stringify(storedDraft));
      setLocalRecoveryError(null);
    } catch {
      setLocalRecoveryError('This browser could not save a local recovery copy (browser storage may be full). The server draft autosave will continue.');
    }
  }, [draftId, form, formReady, mode]);

  const saveMutation = useMutation({
    mutationFn: (payload: BlogPayload) => mode === 'create' && !draftId
      ? blogApi.create(payload)
      : blogApi.update({ id: mode === 'create' ? draftId! : blogId!, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs', blogId] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (mode === 'create') {
        try {
          window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY);
        } catch {
          setLocalRecoveryError('The blog was published, but its local recovery copy could not be cleared from this browser.');
        }
        router.replace('/admin/blog');
      }
    },
    onError: (error: Error) => {
      publishing.current = false;
      if (error instanceof ApiRequestError && Object.keys(error.fieldErrors).length > 0) {
        setErrors((current) => ({ ...current, ...error.fieldErrors }));
        setSubmitError(null);
      } else {
        setSubmitError(error.message);
      }
    },
  });

  const draftMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string | null; payload: BlogDraftPayload; snapshot: string }) =>
      id ? blogApi.updateDraft({ id, payload }) : blogApi.createDraft(payload),
    onSuccess: (blog, variables) => {
      setDraftId(blog._id);
      const savedImageUrl = blog.blogImg?.url;
      const savedImageName = blog.blogImg?.originalName;
      lastSavedSnapshot.current = JSON.stringify({
        ...variables.payload,
        image: savedImageUrl || variables.payload.image,
        imageName: savedImageName || variables.payload.imageName,
      });
      failedSnapshot.current = '';
      if (variables.payload.image?.startsWith('data:image/') && savedImageUrl) {
        setForm((current) => current.image === variables.payload.image
          ? { ...current, image: savedImageUrl, imageName: savedImageName || current.imageName }
          : current);
      }
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error: Error, variables) => {
      failedSnapshot.current = variables.snapshot;
      if (error instanceof ApiRequestError && Object.keys(error.fieldErrors).length > 0) {
        setErrors((current) => ({ ...current, ...error.fieldErrors }));
      }
    },
  });

  const draftPayload = useMemo(() => toDraftPayload(form), [form]);
  const draftSnapshot = JSON.stringify(draftPayload);

  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    if (
      !formReady ||
      publishing.current ||
      (mode === 'edit' && !existingBlog?.isDraft) ||
      (!draftId && !hasDraftContent(form)) ||
      draftMutation.isPending ||
      draftSnapshot === lastSavedSnapshot.current ||
      draftSnapshot === failedSnapshot.current
    ) return;

    autosaveTimer.current = setTimeout(() => {
      draftMutation.mutate({ id: draftId, payload: draftPayload, snapshot: draftSnapshot });
    }, 900);

    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [draftId, draftMutation.isPending, draftPayload, draftSnapshot, existingBlog?.isDraft, form, formReady, mode]);

  useEffect(() => () => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
  }, []);

  const handleTitleChange = (value: string) => {
    setErrors((current) => {
      const next = { ...current };
      delete next.title;
      delete next.slug;
      return next;
    });
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    clearFieldError('slug');
    setSlugTouched(true);
    setForm((f) => ({ ...f, slug: slugify(value) }));
  };

  const clearFieldError = (field: string) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const addFaq = () => {
    setForm((f) => ({
      ...f,
      faqs: [...f.faqs, { question: '', answer: '' }],
    }));
  };

  const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
    clearFieldError(`faqs.${index}.${field}`);
    setForm((f) => ({
      ...f,
      faqs: f.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }));
  };

  const removeFaq = (index: number) => {
    setForm((f) => ({
      ...f,
      faqs: f.faqs.filter((_, i) => i !== index),
    }));
  };

  const [tagInput, setTagInput] = useState('');

  const addTag = (tag: string) => {
    const cleaned = tag.trim().toLowerCase().replace(/[^\w-]/g, '');
    if (!cleaned) return;
    clearFieldError('tags');
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(cleaned) ? f.tags : [...f.tags, cleaned],
    }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    clearFieldError('tags');
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === 'Backspace' && !tagInput && form.tags.length > 0) {
      removeTag(form.tags[form.tags.length - 1]);
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.slug.trim()) e.slug = 'URL slug is required';
    if (!form.excerpt.trim()) e.excerpt = 'Excerpt is required';
    if (form.excerpt.length > 320) e.excerpt = 'Excerpt must be 320 characters or fewer.';
    if (!form.content.trim() || form.content.trim().length < 50) e.content = 'Content must be at least 50 characters';
    if (!form.categorySlug) e.categorySlug = 'Select a category';
    if (!form.image.trim()) e.image = 'Featured image is required';
    if (!form.metaTitle.trim()) e.metaTitle = 'Meta title is required';
    if (!form.metaDescription.trim()) e.metaDescription = 'Meta description is required';
    if (form.metaTitle.length > 70) e.metaTitle = 'Meta title must be 70 characters or fewer';
    if (form.metaDescription.length > 160) e.metaDescription = 'Meta description must be 160 characters or fewer';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    publishing.current = true;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    setSubmitError(null);
    saveMutation.mutate({
      blogTitle: form.title.trim(), url: form.slug.trim(), category: form.categorySlug,
      excerpt: form.excerpt.trim(), content: form.content, isFeatured: form.featured,
      isActive: form.isActive, isDraft: false,
      seoTitle: form.metaTitle.trim(), seoMeta: form.metaDescription.trim(), faq: form.faqs,
      tags: form.tags,
      image: form.image, imageName: form.imageName,
    });x
  };

  const handleCancel = () => {
    if (mode === 'create') {
      try {
        window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY);
        setLocalRecoveryError(null);
      } catch {
        setLocalRecoveryError('This browser could not clear the local recovery copy. Please check browser storage permissions and try again.');
        return;
      }
    }

    router.push('/admin/blog');
  };

  const saving = saveMutation.isPending || draftMutation.isPending;
  const isDraft = mode === 'create' ? Boolean(draftId) : existingBlog?.isDraft === true;
  const categoryOptions = [
    ...existingCategories
      .filter((category) => category.isActive)
      .map((category) => ({ value: category.catName, label: category.catName })),
    ...existingBlogs.map((blog) => ({ value: blog.category, label: blog.category })),
  ]
    .filter((option, index, options) => options.findIndex((item) => item.value === option.value) === index);
  const filteredCategories = categoryOptions.filter((category) =>
    category.label.toLowerCase().includes(categorySearch.toLowerCase())
  );

  if (mode === 'edit' && isLoadingBlog) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Loading article...</div>;
  }

  if (mode === 'edit' && loadError) {
    return <div className="py-16 text-center text-sm text-destructive">{loadError instanceof Error ? loadError.message : 'Unable to load this article.'}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon">
            <Link href="/admin/blog"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              {mode === 'create' ? 'New Article' : 'Edit Article'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'create' ? 'Write and publish a new blog post' : `Editing "${existingBlog?.blogTitle || ''}"`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(mode === 'create' || isDraft) && (
            <span className="text-sm text-muted-foreground" aria-live="polite">
              {draftMutation.isPending
                ? 'Saving draft...'
                : draftId && draftSnapshot === lastSavedSnapshot.current
                  ? 'Draft saved'
                  : 'Changes auto-save as draft'}
            </span>
          )}
          {mode === 'create' && !localRecoveryError && hasDraftContent(form) && (
            <span className="text-xs text-muted-foreground" aria-live="polite">Local recovery saved</span>
          )}
          {saved && <span className="text-sm font-medium text-brand-accent">Saved successfully!</span>}
          <Button type="button" variant="outline" onClick={handleCancel} disabled={saving}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {mode === 'create' || isDraft ? 'Publish' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {submitError && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{submitError}</p>}
      {localRecoveryError && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{localRecoveryError}</p>}
      {restoredLocalDraft && <p role="status" className="rounded-lg border border-brand-accent/30 bg-brand-accent/10 px-4 py-3 text-sm text-foreground">Your unfinished blog was restored from this browser.</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Title */}
          <AdminFormField label="Article Title" htmlFor="title" required error={errors.title}>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter an engaging title..."
              className={errors.title ? 'border-destructive focus-visible:ring-destructive text-lg font-heading' : 'text-lg font-heading'}
            />
          </AdminFormField>

          {/* URL Slug */}
          <AdminFormField label="URL Slug" htmlFor="slug" required error={errors.slug} hint="The URL path for this article (auto-generated from title, editable)">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                <Link2 className="h-3.5 w-3.5" />
                <span>/blog/</span>
              </div>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="url-slug-here"
                className={errors.slug ? 'flex-1 border-destructive focus-visible:ring-destructive' : 'flex-1'}
              />
            </div>
          </AdminFormField>

          {/* Excerpt */}
          <AdminFormField label="Excerpt" htmlFor="excerpt" required error={errors.excerpt} hint="Short summary shown on blog cards and search results. Maximum 320 characters.">
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => {
                clearFieldError('excerpt');
                setForm((f) => ({ ...f, excerpt: e.target.value }));
              }}
              placeholder="One or two sentence summary..."
              rows={2}
              maxLength={320}
              className={errors.excerpt ? 'border-destructive focus-visible:ring-destructive' : undefined}
            />
            <p className="mt-1 text-xs text-muted-foreground">{form.excerpt.length}/320 characters</p>
          </AdminFormField>

          {/* Content / Rich Text Editor */}
          <AdminFormField label="Content" htmlFor="content" required error={errors.content} hint="Use the toolbar to format text, add headings, links, images, and lists">
            <RichTextEditor
              value={form.content}
              onChange={(html) => {
                clearFieldError('content');
                setForm((f) => ({ ...f, content: html }));
              }}
              placeholder="Start writing your article..."
              className={errors.content ? 'border-destructive ring-1 ring-destructive' : undefined}
            />
          </AdminFormField>

          {/* FAQ Section */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">FAQ Section</h2>
                <p className="mt-1 text-xs text-muted-foreground">Add frequently asked questions with answers for SEO</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Add FAQ
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {form.faqs.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No FAQs added yet. Click "Add FAQ" to create one.</p>
              )}
              {form.faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border bg-muted/20 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">FAQ {i + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeFaq(i)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="mt-3 space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFaq(i, 'question', e.target.value)}
                        placeholder="Enter the question..."
                        className={`mt-1 ${errors[`faqs.${i}.question`] ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      />
                      {errors[`faqs.${i}.question`] && <p className="mt-1 text-xs text-destructive" role="alert">{errors[`faqs.${i}.question`]}</p>}
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Answer</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                        placeholder="Enter the answer..."
                        rows={2}
                        className={`mt-1 ${errors[`faqs.${i}.answer`] ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      />
                      {errors[`faqs.${i}.answer`] && <p className="mt-1 text-xs text-destructive" role="alert">{errors[`faqs.${i}.answer`]}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Publish settings */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Publish</h2>
            <div className="mt-4 space-y-4">
              <AdminFormField
                label="Category"
                htmlFor="category"
                required
                error={errors.categorySlug}
                hint="Select an existing category or type a new one."
              >
                <div className="relative">
                  <Input
                    id="category"
                    value={form.categorySlug}
                    onFocus={() => {
                      setCategorySearch(form.categorySlug);
                      setCategoryOpen(true);
                    }}
                    onBlur={(event) => {
                      const nextTarget = event.relatedTarget;
                      const categoryMenu = event.currentTarget.parentElement;
                      if (!(nextTarget instanceof HTMLElement && categoryMenu?.contains(nextTarget))) {
                        window.setTimeout(() => setCategoryOpen(false), 150);
                      }
                    }}
                    onChange={(event) => {
                      clearFieldError('categorySlug');
                      setForm((f) => ({ ...f, categorySlug: event.target.value }));
                      setCategorySearch(event.target.value);
                      setCategoryOpen(true);
                    }}
                    placeholder={isLoadingCategories || isLoadingBlogs ? 'Loading categories...' : 'Select or type a category'}
                    autoComplete="off"
                    className={errors.categorySlug
                      ? 'h-12 border-destructive bg-background pr-10 focus-visible:ring-destructive'
                      : 'h-12 border-border bg-background pr-10'}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {isLoadingCategories ? <Loader2 className="h-4 w-4 animate-spin" /> : '▾'}
                  </span>
                  {categoryOpen && !isLoadingCategories && !isLoadingBlogs && (
                    <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-premium">
                      <div className="border-b border-border p-2">
                        <Input
                          value={categorySearch}
                          onChange={(event) => setCategorySearch(event.target.value)}
                          placeholder="Search categories..."
                          autoFocus
                          className="h-9 bg-background text-sm"
                        />
                      </div>
                      {filteredCategories.map((category) => (
                        <button
                          key={category.value}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            setForm((f) => ({ ...f, categorySlug: category.value }));
                            setCategorySearch(category.value);
                            setCategoryOpen(false);
                          }}
                          className="flex w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {category.label}
                        </button>
                      ))}
                      {categorySearch.trim() && !categoryOptions.some(
                        (category) => category.value.toLowerCase() === categorySearch.trim().toLowerCase()
                      ) && (
                        <button
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            setForm((f) => ({ ...f, categorySlug: categorySearch.trim() }));
                            setCategoryOpen(false);
                          }}
                          className="mt-1 flex w-full rounded-lg border-t border-border px-3 py-2.5 pt-3 text-left text-sm font-medium text-brand-primary hover:bg-brand-primary/10"
                        >
                          Use new category: {categorySearch.trim()}
                        </button>
                      )}
                      {!filteredCategories.length && !form.categorySlug.trim() && (
                        <p className="px-3 py-2 text-sm text-muted-foreground">No categories available.</p>
                      )}
                    </div>
                  )}
                </div>
              </AdminFormField>

              <AdminFormField label="Reading Time (minutes)" htmlFor="readingTime">
                <Input
                  id="readingTime"
                  type="number"
                  min={1}
                  value={form.readingTime}
                  onChange={(e) => setForm((f) => ({ ...f, readingTime: parseInt(e.target.value) || 1 }))}
                />
              </AdminFormField>

              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                <div>
                  <Label htmlFor="featured" className="text-sm font-medium cursor-pointer">Featured Article</Label>
                  <p className="text-xs text-muted-foreground">Show on homepage</p>
                </div>
                <Switch id="featured" checked={form.featured} onCheckedChange={(v) => setForm((f) => ({ ...f, featured: v }))} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                <div>
                  <Label htmlFor="active" className="cursor-pointer text-sm font-medium">Active Article</Label>
                  <p className="text-xs text-muted-foreground">Show on the public website</p>
                </div>
                <Switch id="active" checked={form.isActive} onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))} />
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Featured Image</h2>
            <div className="mt-4">
              <ImageUpload
                value={form.image}
                fileName={form.imageName}
                onChange={(dataUrl, imageName) => {
                  clearFieldError('image');
                  setForm((f) => ({ ...f, image: dataUrl, imageName: imageName || '' }));
                }}
                label=""
                aspectRatio="16/10"
                id="featured-image"
                className={errors.image ? 'rounded-lg ring-1 ring-destructive' : undefined}
              />
              {errors.image && <p className="mt-1 text-xs font-medium text-destructive">{errors.image}</p>}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">SEO Settings</h2>
            <div className="mt-4 space-y-4">
              <AdminFormField label="Meta Title" htmlFor="metaTitle" required error={errors.metaTitle} hint="Title for search engines (50-60 characters recommended)">
                <Input
                  id="metaTitle"
                  value={form.metaTitle}
                  onChange={(e) => {
                    clearFieldError('metaTitle');
                    setForm((f) => ({ ...f, metaTitle: e.target.value }));
                  }}
                  placeholder="SEO title for search engines..."
                  maxLength={70}
                  className={errors.metaTitle ? 'border-destructive focus-visible:ring-destructive' : undefined}
                />
                <p className="mt-1 text-xs text-muted-foreground">{form.metaTitle.length}/70 characters</p>
              </AdminFormField>

              <AdminFormField label="Meta Description" htmlFor="metaDescription" required error={errors.metaDescription} hint="Keep this description within 160 characters. Shorten it if it is too long.">
                <Textarea
                  id="metaDescription"
                  value={form.metaDescription}
                  onChange={(e) => {
                    clearFieldError('metaDescription');
                    setForm((f) => ({ ...f, metaDescription: e.target.value }));
                  }}
                  placeholder="SEO description for search engines..."
                  rows={3}
                  maxLength={160}
                  className={errors.metaDescription ? 'border-destructive focus-visible:ring-destructive' : undefined}
                />
                <p className="mt-1 text-xs text-muted-foreground">{form.metaDescription.length}/160 characters</p>
              </AdminFormField>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Tags</h2>
            <p className="mt-1 text-xs text-muted-foreground">Press Enter or comma to add a tag. Click X to remove.</p>
            <div className={`mt-3 flex flex-wrap items-center gap-2 rounded-lg border bg-background p-2 ${errors.tags ? 'border-destructive ring-1 ring-destructive' : 'border-border'}`}>
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-0.5 text-primary/60 hover:text-destructive"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => tagInput && addTag(tagInput)}
                placeholder={form.tags.length === 0 ? 'Type a tag and press Enter...' : 'Add more...'}
                className="min-w-[120px] flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {errors.tags && <p className="mt-1 text-xs text-destructive" role="alert">{errors.tags}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
