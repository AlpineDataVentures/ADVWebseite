import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// schema of the about section
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    description: z.string(),
    image: z.string(),
    draft: z.boolean().optional(),
    collaboration: z.object({
      title: z.string(),
      content: z.string(),
    }),
    corevalues: z.array(
      z.object({
        title: z.string(),
        icon: z.string(),
        description: z.string(),
      })
    ),
    vision_method: z.object({
      title_1: z.string(),
      content_1: z.string(),
      title_2: z.string(),
      content_2: z.string()
    })
  }),
});

// Author collection schema
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/casestudies" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    description: z.string(),
    draft: z.boolean(),
    image: z.string().optional(),
  }),
});


export const datareadyCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/dataready" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/dictionary" }),
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

// Collection schema for ADV CaseStudies
const feedbackCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/feedbacks" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
  }),
});

export const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/portfolio" }),
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

// Call to Action collection schema
const ctaSectionCollection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

// Call to Action collection schema
const cardSectionCollection = defineCollection({
  loader: glob({
    pattern: "service_cards.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
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
});

const teamCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/team" }),
  schema:
    z.object({
      title: z.string(),
      meta_title: z.string(),
      description: z.string(),
      image: z.string(),
      callToAction: z.object({
        enable: z.boolean(),
        title: z.string(),
        image: z.string(),
        description: z.string(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      })
    }),
});

// Testimonials Section collection schema
const testimonialSectionCollection = defineCollection({
  loader: glob({
    pattern: "testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    testimonials: z.array(
      z.object({
        name: z.string(),
        avatar: z.string(),
        designation: z.string(),
        content: z.string(),
      }),
    ),
  }),
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
  feedbacks: feedbackCollection,
  homepage: homepageCollection,
  pages: pagesCollection,
  portfolio: portfolioCollection,
  team: teamCollection,

  // sections
  cardSection: cardSectionCollection,
  ctaSection: ctaSectionCollection,
  testimonialSection: testimonialSectionCollection,
};
