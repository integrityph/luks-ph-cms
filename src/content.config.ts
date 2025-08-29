import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection, reference } from "astro:content";
// Define a `loader` and `schema` for each collection
const services = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    })
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/categories" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    treatment: reference("services"),
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
    services: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.string(),
        status: z.boolean(),
      })
    ),
    nisfl: z.boolean(),
    status: z.boolean(),
    featured: z.boolean(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { services, categories };
