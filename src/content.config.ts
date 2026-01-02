// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

const career = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/career" }),
  schema: ({ image }) =>
    z.object({
      type: z.enum(["Work", "Education"]).default("Work"),
      title: z.string(),
      company: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
    }),
});
const albumReviews = defineCollection({
  // Make sure this matches your folder name exactly
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/album-reviews" }),

  schema: ({ image }) =>
    z.object({
      // I kept 'title' required so the list page doesn't look broken.
      // Everything else is now optional.
      title: z.string(),

      artist: z.string().optional(),

      // .optional() prevents crash if image file is missing
      cover: image().optional(),

      rating: z.number().optional(),

      date: z.coerce.date().optional(),

      // The playlist is now fully optional.
      // If you omit it in markdown, it returns 'undefined' instead of crashing.
      playlist: z
        .array(
          z.object({
            title: z.string(),
            src: z.string(),
          }),
        )
        .optional(),
    }),
});
export const collections = {
  career: career,
  reviews: albumReviews,
};
