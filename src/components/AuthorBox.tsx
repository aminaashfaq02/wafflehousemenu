import { Link } from "@tanstack/react-router";
import { ShieldCheck, Twitter, Linkedin, Mail } from "lucide-react";
import authorImg from "@/assets/contact-chef.jpg";

export interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  credentials: string[];
  education?: string;
  website?: string;
  social: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export const defaultAuthor: AuthorProfile = {
  name: "Marcus Goodwin",
  role: "Editor & Food Journalist",
  bio: "Marcus is a writer, editor, and restaurant menu researcher. He compiles and maintains the verified menu records behind this independent reference and writes the editorial analysis around U.S. diner pricing, calories, and nutrition.",
  avatar: authorImg,
  education: "University of Warwick (BA English & Comparative Literature)",
  website: "https://www.marcusgoodwincreative.com",
  credentials: [
    "Certificate in Content Writing",
    "SEO Fundamentals (Semrush Certified)",
    "AI in Marketing & Content Architecture",
    "8+ Years Culinary & Menu Journalism"
  ],
  social: {
    twitter: "https://twitter.com/marcusgoodwinwriter",
    linkedin: "https://www.linkedin.com/in/marcus-goodwin-writer",
    email: "mailto:marcus@wafflejournal.co",
  },
};

export function AuthorBox({ author = defaultAuthor }: { author?: AuthorProfile }) {
  return (
    <div className="my-10 rounded-2xl border border-border bg-[#FAF9F6] p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Author Photo */}
        <div className="shrink-0">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-amber-400 bg-muted shadow-md sm:h-24 sm:w-24">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                Written By
              </span>
              <h4 className="font-display text-xl font-semibold text-foreground">
                <Link to="/author" className="hover:text-primary transition-colors">
                  {author.name}
                </Link>
              </h4>
              <p className="text-xs font-medium text-ink-soft">{author.role}</p>
            </div>

            <Link
              to="/author"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              View Author Profile →
            </Link>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {author.bio}
          </p>

          {/* Credentials / EEAT Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-border/60">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified EEAT Expert
            </span>
            {author.credentials.map((cred) => (
              <span key={cred} className="text-xs text-ink-soft bg-white border border-border px-2.5 py-1 rounded-md font-medium">
                {cred}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-4 flex items-center gap-3">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name}'s Twitter`}
                className="text-ink-soft hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name}'s LinkedIn`}
                className="text-ink-soft hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {author.social.email && (
              <a
                href={author.social.email}
                aria-label={`Email ${author.name}`}
                className="text-ink-soft hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
