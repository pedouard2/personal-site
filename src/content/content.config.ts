// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});


export const workExperienceCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/job" }),
    schema: z.object({
      title: z.string(), // Job title
      company: z.string(), // Company name
      location: z.string(), // City, State or Remote
      startDate: z.date(), // When you started
      endDate: z.date().optional(), // When you left (optional for current positions)
      current: z.boolean().default(false), // If this is your current job
      achievements: z.array(z.string()), // Notable accomplishments
      technologies: z.array(z.string()).optional(), // Technologies/tools used
    })
  });


export const educationCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/education" }),
    schema: z.object({
      degree: z.string(), // university degree
      institution: z.string(), // institution
      location: z.string(), // city,state
      graduationDate: z.date(), //date of graduation
      fieldOfStudy: z.string(), // major
      gpa: z.string().optional(), // gpa
      relevantCoursework: z.array(z.string()).optional(), // courses
    })
  });
  


// Export a single `collections` object to register your collection(s)
export const collections = {
    'workExperience': workExperienceCollection,
    'education': educationCollection,
    'blog': blog
  };

