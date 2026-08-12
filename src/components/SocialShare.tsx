import { useState } from "react";
import { Facebook, Twitter, Link2, Check, Share2 } from "lucide-react";

interface SocialShareProps {
  title: string;
  url?: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? (url || window.location.href) : (url || "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 border-y border-border/80 my-8">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-soft mr-2">
        <Share2 className="h-3.5 w-3.5 text-primary" aria-hidden /> Share this article:
      </span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-black hover:bg-black hover:text-white"
      >
        <Twitter className="h-3.5 w-3.5" />
        <span>Twitter / X</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
      >
        <Facebook className="h-3.5 w-3.5" />
        <span>Facebook</span>
      </a>

      {/* Pinterest */}
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Pinterest"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-[#E60023] hover:bg-[#E60023] hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 5 3 9.3 7.4 11.1-.1-.9-.2-2.4 0-3.4.2-.9 1.5-5.8 1.5-5.8s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.7.8 1.7 1.8 0 1.1-.7 2.8-1 4.3-.3 1.3.6 2.4 2 2.4 2.3 0 4.1-2.5 4.1-6 0-3.1-2.3-5.3-5.5-5.3-3.7 0-5.9 2.8-5.9 5.7 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.5.2-1.6-.8-2.6-3.1-2.6-5 0-4 2.9-7.7 8.4-7.7 4.4 0 7.9 3.2 7.9 7.4 0 4.4-2.8 7.9-6.6 7.9-1.3 0-2.5-.7-2.9-1.5l-.8 3c-.3 1.1-1 2.4-1.5 3.3 1.2.4 2.4.5 3.6.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
        </svg>
        <span>Pinterest</span>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-600 font-semibold">Link Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
