import { Linkedin } from "lucide-react";

export function AuthorBio() {
  return (
    <section className="bg-white border-t border-border py-12">
      <div className="container-editorial max-w-3xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-surface border border-border shadow-sm">
          <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden bg-muted">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" 
              alt="Aaron Hutcherson, Culinary Reviewer & Food Journalist" 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="font-display text-xl font-semibold text-foreground">Aaron Hutcherson</h3>
            <p className="text-primary font-medium text-sm mt-1">Culinary Reviewer & Diner Food Journalist</p>
            <p className="text-ink-soft text-sm leading-relaxed mt-3">
              With over 12 years of experience in food journalism, recipe development, and dining culture, Aaron specializes in verifying menu prices, allergen guides, and nutritional accuracy. He meticulously cross-checks every Waffle House recipe and calorie report for our readers.
            </p>
            <div className="mt-4 flex justify-center sm:justify-start">
              <a 
                href="https://www.linkedin.com/in/aaronhutcherson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a66c2] hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

