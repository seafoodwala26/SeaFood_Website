'use client';

import { useRef, useState, ChangeEvent, DragEvent } from 'react';
import Image from 'next/image';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  fileName?: string;
  onChange: (dataUrl: string, fileName?: string) => void;
  label?: string;
  aspectRatio?: '16/10' | '16/9' | '4/3' | '1/1';
  className?: string;
  id?: string;
}

export function ImageUpload({
  value,
  fileName,
  onChange,
  label = 'Upload Image',
  aspectRatio = '16/10',
  className,
  id,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aspectClass = {
    '16/10': 'aspect-[16/10]',
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }[aspectRatio];

  const handleFile = (file: File | undefined) => {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string, file.name);
    };
    reader.onerror = () => setError('Failed to read file');
    reader.readAsDataURL(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleClear = () => {
    onChange('', '');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn(
      'space-y-2',
      error && '[&>div:nth-child(2)]:border-destructive [&>div:nth-child(2)]:ring-1 [&>div:nth-child(2)]:ring-destructive',
      className,
    )}>
      {label && (
        <label className="text-sm font-medium text-foreground" htmlFor={id}>
          {label}
        </label>
      )}
      {value ? (
        <div className={cn('relative overflow-hidden rounded-lg border border-border bg-muted', aspectClass)}>
          <Image
            src={value}
            alt={fileName ? `${fileName} preview` : 'Uploaded image preview'}
            title={fileName || 'Uploaded image'}
            fill
            sizes="400px"
            className="object-cover"
          />
          {fileName && (
            <p className="absolute bottom-2 left-2 max-w-[calc(100%-5rem)] truncate rounded bg-black/65 px-2 py-1 text-xs text-white" title={fileName}>
              {fileName}
            </p>
          )}
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-destructive"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/80"
          >
            Change
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 transition-colors',
            aspectClass,
            dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
          )}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or WebP</p>
            </div>
          </div>
        </div>
      )}
      {value && fileName && <p className="truncate text-xs text-muted-foreground" title={fileName}>Selected file: {fileName}</p>}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleChange}
        className="sr-only"
        aria-label={label}
      />
    </div>
  );
}
