import { BlogEditorForm } from '@/components/admin/blog-editor-form';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogEditorForm mode="edit" blogId={slug} />;
}
