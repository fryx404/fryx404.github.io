import { idToSlug } from "./slug";

export function getPrevNextEntries<
  T extends { id: string; data: { title: string } },
>(posts: T[]) {
  // Pre-calculate lightweight objects to avoid repeated idToSlug calls inside the map loop
  const lightweightPosts = posts.map((post) => ({
    title: post.data.title,
    slug: idToSlug(post.id),
  }));

  return posts.map((post, index) => {
    const slug = lightweightPosts[index].slug;
    const prev = index > 0 ? lightweightPosts[index - 1] : null;
    const next = index < posts.length - 1 ? lightweightPosts[index + 1] : null;

    return {
      params: { slug },
      props: { post, prev, next },
    };
  });
}
