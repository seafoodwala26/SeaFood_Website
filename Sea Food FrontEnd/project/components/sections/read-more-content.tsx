'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type ReadMoreBlock = {
  type: 'paragraph' | 'heading';
  text: string;
};

export function ReadMoreContent({ blocks }: { blocks: ReadMoreBlock[] }) {
  const [expanded, setExpanded] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const totalCharacters = blocks.reduce(
    (total, block, index) => total + block.text.length + (index < blocks.length - 1 ? 1 : 0),
    0,
  );
  const isTyping = expanded && visibleCharacters < totalCharacters;

  useEffect(() => {
    if (!isTyping) return;

    const timeoutId = window.setTimeout(() => {
      setVisibleCharacters((visible) => Math.min(visible + 4, totalCharacters));
    }, 20);

    return () => window.clearTimeout(timeoutId);
  }, [isTyping, totalCharacters, visibleCharacters]);

  let characterOffset = 0;
  const visibleBlocks = blocks.map((block, index) => {
    const text = block.text.slice(
      0,
      Math.max(0, Math.min(block.text.length, visibleCharacters - characterOffset)),
    );
    characterOffset += block.text.length + 1;

    if (!text) return null;

    return block.type === 'heading' ? (
      <h3 key={index} className="pt-2 font-heading text-xl font-bold text-foreground">
        {text}
      </h3>
    ) : (
      <p key={index}>{text}</p>
    );
  });

  return (
    <>
      {expanded && (
        <div id="about-intro-extra" className="mt-4 space-y-4" aria-live="off">
          {visibleBlocks}
        </div>
      )}
      {!isTyping && (
        <button
          type="button"
          aria-controls="about-intro-extra"
          aria-expanded={expanded}
          onClick={() => {
            setExpanded((isExpanded) => !isExpanded);
            setVisibleCharacters(0);
          }}
          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          {expanded ? 'Read less' : 'Read more'}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      )}
    </>
  );
}
