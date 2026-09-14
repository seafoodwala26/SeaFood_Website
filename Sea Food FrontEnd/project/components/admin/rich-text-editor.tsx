'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Unlink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, active, label, children }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'h-8 w-8 text-muted-foreground hover:text-foreground',
        active && 'bg-muted text-foreground'
      )}
    >
      {children}
    </Button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />;
}

const blockTags = new Set(['H1', 'H2', 'H3', 'P', 'UL', 'OL', 'BLOCKQUOTE', 'PRE']);

function normalizeEditorBlocks(editor: HTMLDivElement) {
  const headings = Array.from(editor.querySelectorAll('h1, h2, h3'));

  headings.forEach((heading) => {
    const childNodes = Array.from(heading.childNodes);
    const firstNestedBlockIndex = childNodes.findIndex(
      (node) => node.nodeType === Node.ELEMENT_NODE && blockTags.has((node as Element).tagName)
    );

    if (firstNestedBlockIndex === -1) return;

    const followingNodes = childNodes.slice(firstNestedBlockIndex);
    const headingNodes = childNodes.slice(0, firstNestedBlockIndex);
    while (headingNodes.at(-1)?.nodeType === Node.ELEMENT_NODE && (headingNodes.at(-1) as Element).tagName === 'BR') {
      headingNodes.pop();
    }
    heading.replaceChildren(...headingNodes);
    let nextNode: ChildNode = heading;

    followingNodes.forEach((node) => {
      nextNode.after(node);
      nextNode = node;
    });
  });
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Start writing your content...',
  className,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  // Keep the editable DOM in sync when an existing article is loaded asynchronously.
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
      normalizeEditorBlocks(editorRef.current);
    }
  }, [value]);

  const exec = useCallback((command: string, val?: string) => {
    const normalizedValue = val?.replace(/[<>]/g, '');
    document.execCommand(command, false, normalizedValue);
    if (editorRef.current) normalizeEditorBlocks(editorRef.current);
    editorRef.current?.focus();
    updateActiveFormats();
    triggerChange();
  }, []);

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough');
    if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
    if (document.queryCommandState('insertOrderedList')) formats.add('ol');
    if (document.queryCommandState('justifyCenter')) formats.add('justifyCenter');
    if (document.queryCommandState('justifyRight')) formats.add('justifyRight');
    const block = document.queryCommandValue('formatBlock').toLowerCase();
    if (block.includes('h1')) formats.add('h1');
    if (block.includes('h2')) formats.add('h2');
    if (block.includes('h3')) formats.add('h3');
    if (block.includes('blockquote')) formats.add('blockquote');
    setActiveFormats(formats);
  }, []);

  const triggerChange = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = () => {
    if (editorRef.current) normalizeEditorBlocks(editorRef.current);
    triggerChange();
    updateActiveFormats();
  };

  const handleLink = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';
    if (linkUrl) {
      if (selectedText) {
        exec('createLink', linkUrl);
      } else {
        const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkUrl}</a>`;
        exec('insertHTML', linkHtml);
      }
    }
    setLinkUrl('');
    setLinkDialogOpen(false);
  };

  const handleImage = () => {
    if (imageUrl) {
      const alt = imageAlt || 'Image';
      const imgHtml = `<img src="${imageUrl}" alt="${alt}" style="max-width:100%;border-radius:0.5rem;margin:1rem 0;" />`;
      exec('insertHTML', imgHtml);
    }
    setImageUrl('');
    setImageAlt('');
    setImageDialogOpen(false);
  };

  const isActive = (key: string) => activeFormats.has(key);

  return (
    <div className={cn('overflow-hidden rounded-lg border border-border bg-card', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 p-2">
        <ToolbarButton onClick={() => exec('undo')} label="Undo">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('redo')} label="Redo">
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => exec('formatBlock', 'h1')} label="Heading 1" active={isActive('h1')}>
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'h2')} label="Heading 2" active={isActive('h2')}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'h3')} label="Heading 3" active={isActive('h3')}>
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', 'p')} label="Paragraph">
          <span className="text-xs font-semibold">P</span>
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => exec('bold')} label="Bold" active={isActive('bold')}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('italic')} label="Italic" active={isActive('italic')}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('underline')} label="Underline" active={isActive('underline')}>
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('strikeThrough')} label="Strikethrough" active={isActive('strikeThrough')}>
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => exec('insertUnorderedList')} label="Bullet List" active={isActive('ul')}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('insertOrderedList')} label="Numbered List" active={isActive('ol')}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', '<blockquote>')} label="Quote" active={isActive('blockquote')}>
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('formatBlock', '<pre>')} label="Code Block">
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => exec('justifyLeft')} label="Align Left" active={false}>
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyCenter')} label="Align Center" active={isActive('justifyCenter')}>
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyRight')} label="Align Right" active={isActive('justifyRight')}>
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => setLinkDialogOpen(true)} label="Insert Link">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec('unlink')} label="Remove Link">
          <Unlink className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => setImageDialogOpen(true)} label="Insert Image">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        data-placeholder={placeholder}
        className="prose-editor min-h-[300px] w-full px-4 py-3 text-sm leading-relaxed text-foreground outline-none focus:outline-none"
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text content editor"
      />

      {/* Link dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Select text in the editor to link it, or a link will be inserted at the cursor.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleLink} disabled={!linkUrl}>Insert Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Image URL</label>
              <Input
                type="url"
                placeholder="https://images.pexels.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Alt text</label>
              <Input
                placeholder="Describe the image"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleImage} disabled={!imageUrl}>Insert Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .prose-editor:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
        .prose-editor :where(h1) {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 1rem 0 0.5rem;
          font-family: var(--font-manrope);
        }
        .prose-editor :where(h2) {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0.875rem 0 0.5rem;
          font-family: var(--font-manrope);
        }
        .prose-editor :where(h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem;
          font-family: var(--font-manrope);
        }
        .prose-editor :where(p) {
          margin: 0.5rem 0;
        }
        .prose-editor :where(ul) {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .prose-editor :where(ol) {
          list-style: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .prose-editor :where(blockquote) {
          border-left: 3px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 0.75rem 0;
          color: hsl(var(--muted-foreground));
          font-style: italic;
        }
        .prose-editor :where(pre) {
          background: hsl(var(--muted));
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          margin: 0.75rem 0;
          font-family: monospace;
          font-size: 0.875rem;
          overflow-x: auto;
        }
        .prose-editor :where(a) {
          color: hsl(var(--primary));
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-editor :where(img) {
          max-width: 100%;
        }
        .prose-editor:focus:empty:before {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
