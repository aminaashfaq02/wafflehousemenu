import { blogPosts, type BlogPost } from "@/data/blogPosts";

const LOCAL_STORAGE_KEY = "wh_custom_blog_posts";

export function getAllBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") return blogPosts;
  try {
    const customJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!customJson) return blogPosts;
    const customPosts: BlogPost[] = JSON.parse(customJson);
    // Combine custom posts (first) with default static blogPosts (avoiding duplicate slugs)
    const staticSlugs = new Set(customPosts.map((p) => p.slug));
    const uniqueStatic = blogPosts.filter((b) => !staticSlugs.has(b.slug));
    return [...customPosts, ...uniqueStatic];
  } catch (err) {
    console.error("Error reading custom blog posts:", err);
    return blogPosts;
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const all = getAllBlogPosts();
  return all.find((p) => p.slug === slug);
}

export function saveBlogPost(post: BlogPost): void {
  if (typeof window === "undefined") return;
  try {
    const allCustom = getAllBlogPosts().filter((p) => !blogPosts.some((b) => b.slug === p.slug && !localStorage.getItem(LOCAL_STORAGE_KEY)?.includes(p.slug)));
    const updated = [post, ...allCustom.filter((p) => p.slug !== post.slug)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving blog post:", err);
  }
}

export function deleteCustomPost(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const allCustom = getAllBlogPosts().filter((p) => !blogPosts.some((b) => b.slug === p.slug));
    const filtered = allCustom.filter((p) => p.slug !== slug);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("Error deleting blog post:", err);
  }
}
