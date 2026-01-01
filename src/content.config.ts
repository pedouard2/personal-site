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
    }),
});
const albumReviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/reviews" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      artist: z.string(),
      cover: image().optional(),
      rating: z.number().min(0).max(10),
      date: z.coerce.date(),
    }),
});
export const collections = {
  career: career,
  reviews: albumReviews,
};
