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
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
  }),
});

// contact collection
export const contactCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    description: z.string(),
    draft: z.boolean(),
    image: z.string().optional(),
  }),
});


export const datareadyCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    description: z.string(),
    button1: z.object({
      label: z.string(),
      link: z.string()
    }),
    added_value: z.object({
      title: z.string(),
      bulletpoints: z.array(
        z.object({
          title: z.string(),
          description: z.string()
        })
      )
    }),
    image: z.string(),
    instructions: z.object({
      title: z.string(),
      bullets: z.array(z.string()),
      result: z.string()
    }),
    button2: z.object({
      label: z.string(),
      link: z.string()
    })
  })
});

export const dictionaryCollection = defineCollection({
  schema: z.object({
    items: z.array(
      z.object({
        item: z.string().optional(), // Abkürzungen sind optional,
        abbreviation: z.string().optional(), // Abkürzungen sind optional
        description: z.string().optional(), // Beschreibungen sind optional
      })
    ),
  }),
});

export const homepageCollection = defineCollection({
  schema: z.object({
    banner: z.object({
      title1: z.string(),
      title2: z.string(),
      title3: z.string(),
      content: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()).optional(), // Bulletpoints sind optional
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      })
    ),
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

export const sectionsCollection = defineCollection({
  schema: z.union([
    // Schema für Call-to-Action
    z.object({
      type: z.literal("call-to-action"),
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
    // Schema für Service Cards
    z.object({
      type: z.literal("service_cards"),
      title: z.string(),
      description: z.string(),
      services: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: z.string(),
          link: z.string(),
        })
      ),
    }),
    // Schema für Testimonials
    z.object({
      type: z.literal("testimonial"),
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      testimonials: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: z.string(),
          content: z.string(),
        })
      ),
    }),
  ]),
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
  contact: contactCollection,
  dataready: datareadyCollection,
  dictionary: dictionaryCollection,
  homepage: homepageCollection,
  pages: pagesCollection,
  portfolio: portfolioCollection,
  sections: sectionsCollection,
  team: teamCollection,
};
