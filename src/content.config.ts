import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection, reference } from "astro:content";
// Define a `loader` and `schema` for each collection
const categories = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/categories" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      banner: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      photo: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      icon: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      nisfl: z.boolean(),
      status: z.boolean()
    })
});

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    category: reference('categories'),
    description: z.string(),
    price: z.number(),
    status: z.boolean()
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = { categories, services };