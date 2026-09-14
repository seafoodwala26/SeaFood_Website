'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ImagePlus, Loader2, Save, Upload, X } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { galleryApi, type ApiGalleryImage } from '@/lib/api';

function fileLabel(file: File) {
  return file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim();
}

export default function AdminGalleryPage() {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const { data: images = [], isLoading } = useQuery({ queryKey: ['gallery'], queryFn: galleryApi.list });

  const uploadMutation = useMutation({
    mutationFn: () => galleryApi.create(files, names),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      setFiles([]);
      setNames([]);
      setMessage('Gallery images uploaded successfully.');
    },
    onError: (error: Error) => setMessage(error.message),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; isActive?: boolean } }) => galleryApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery'] }),
    onError: (error: Error) => setMessage(error.message),
  });
  const deleteMutation = useMutation({
    mutationFn: galleryApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery'] }),
    onError: (error: Error) => setMessage(error.message),
  });

  const chooseFiles = (selectedFiles: FileList | null) => {
    const selected = selectedFiles ? Array.from(selectedFiles) : [];
    setFiles(selected);
    setNames(selected.map(fileLabel));
    setMessage(null);
  };

  const updateName = (index: number, value: string) => setNames((current) => current.map((name, nameIndex) => nameIndex === index ? value : name));

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Gallery" description="Upload multiple images, give each image a name, and control what appears publicly." />

      <section className="rounded-xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold">Add Gallery Images</h2>
        </div>
        <div className="mt-5 space-y-4">
          <Input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => chooseFiles(event.target.files)} />
          {files.length > 0 && (
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3 sm:flex-row sm:items-center">
                  <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{file.name}</span>
                  <Input value={names[index] || ''} onChange={(event) => updateName(index, event.target.value)} placeholder="Image name" className="sm:max-w-xs" />
                </div>
              ))}
              <Button type="button" onClick={() => uploadMutation.mutate()} disabled={uploadMutation.isPending || names.some((name) => !name.trim())}>
                {uploadMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                Upload {files.length} Image{files.length === 1 ? '' : 's'}
              </Button>
            </div>
          )}
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between">
          <div><h2 className="font-heading text-lg font-semibold">Managed Images</h2><p className="text-sm text-muted-foreground">Inactive images stay in the admin panel but are hidden from the website.</p></div>
          <span className="text-sm text-muted-foreground">{images.length} images</span>
        </div>
        {isLoading ? <p className="py-12 text-center text-sm text-muted-foreground">Loading gallery...</p> : images.length === 0 ? <div className="py-12 text-center text-sm text-muted-foreground">No gallery images yet.</div> : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((item: ApiGalleryImage) => <GalleryItem key={item._id} item={item} onUpdate={(payload) => updateMutation.mutate({ id: item._id, payload })} onDelete={() => window.confirm(`Delete ${item.name}?`) && deleteMutation.mutate(item._id)} disabled={updateMutation.isPending || deleteMutation.isPending} />)}
          </div>
        )}
      </section>
    </div>
  );
}

function GalleryItem({ item, onUpdate, onDelete, disabled }: { item: ApiGalleryImage; onUpdate: (payload: { name?: string; isActive?: boolean }) => void; onDelete: () => void; disabled: boolean }) {
  const [name, setName] = useState(item.name);
  const changed = name.trim() !== item.name;

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="relative aspect-[4/3] bg-muted">
        <Image src={item.image.url} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
        <button type="button" aria-label="Remove image" onClick={onDelete} disabled={disabled} className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white transition hover:bg-destructive disabled:opacity-50"><X className="h-4 w-4" /></button>
      </div>
      <div className="space-y-3 p-4">
        <Input value={name} onChange={(event) => setName(event.target.value)} aria-label="Gallery image name" />
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><Switch checked={item.isActive} onCheckedChange={(isActive) => onUpdate({ isActive })} disabled={disabled} />{item.isActive ? 'Active' : 'Inactive'}</label>
          <Button size="sm" variant="outline" onClick={() => onUpdate({ name: name.trim() })} disabled={disabled || !changed || !name.trim()}><Save className="mr-1.5 h-3.5 w-3.5" />Save Name</Button>
        </div>
        <p className="truncate text-xs text-muted-foreground">Original: {item.image.originalName || 'Uploaded image'}</p>
      </div>
    </article>
  );
}
