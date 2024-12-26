import { defineCollection, z } from "astro:content";

// schema of the about section
const aboutCollection = defineCollection({
  schema: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('index'),
      title: z.string(),
      meta_title: z.string(),
      description: z.string(),
      image: z.string().optional(),
      draft: z.boolean().optional(),
    }),
    z.object({
      type: z.literal('collaboration'),
      title: z.string(),
      content: z.string(),
    }),
    z.object({
      type: z.literal('corevalues'),
      corevalues: z.array(
        z.object({
          title: z.string(),
          icon: z.string(),
          description: z.string(),
        })
      ),
    }),
    z.object({
      type: z.literal('vision_method'),
      title_1: z.string(),
      content_1: z.string(),
      title_2: z.string(),
      content_2: z.string(),
    }),
  ]),
});

// Author collection schema
const authorsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    blog_name: z.string(),
    role: z.string(),
    meta_title: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    bullet_points: z.array(z.string()).default([]),
    social: z
      .array(
        z
          .object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});


// Post collection schema
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().default(new Date()),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
  }),
});

// Collection schema for ADV CaseStudies
const casestudiesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
  }),
});


// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Collection of ADV Portfolio
const portfolioCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    title_image: z.string().optional(),
    meta_title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    overview: z.array(z.string()),
    subsections: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        tasks: z.array(
          z.object({
            title: z.string(),
            icon: z.string(),
            description: z.string(),
          })
        ),
      })
    ).optional(),
    customer_value: z.object({
      title: z.string(),
      image: z.string().optional(),
      description: z.string().optional(),
      values: z.array(z.string()),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
  }),
});

const teamCollection = defineCollection({
  schema: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('index'),
      title: z.string(),
      meta_title: z.string(),
      description: z.string(),
      image: z.string().optional(),
    }),
    z.object({
      type: z.literal('call-to-action'),
      enable: z.boolean(),
      title: z.string(),
      image: z.string(),
      description: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
  ]),
});


// Export collections
export const collections = {
  about: aboutCollection,
  authors: authorsCollection,
  blog: blogCollection,
  casestudies: casestudiesCollection,
  pages: pagesCollection,
  portfolio: portfolioCollection,
  team: teamCollection,
};
