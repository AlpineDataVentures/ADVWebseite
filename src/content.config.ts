import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod"

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

// Collection schema for Customer Feedback
const feedbackCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/feedback" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    company: z.string(),
    name: z.string(),
    position: z.string(),
    project: z.string(),
    rating: z.number().min(0).max(5),
    summary: z.string().optional(),
    sections: z.array(
      z.object({
        section: z.string(),
        questions: z.array(
          z.object({
            question: z.string(),
            answers: z.array(z.string()),
          })
        ),
      })
    ).optional()
  })
});

const careerCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/career" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    employment_type: z.enum(["praktikum", "werkstudium", "vollzeit", "teilzeit"]),
    start_date: z.string(),
    location: z.string(),
    remote_possible: z.boolean().default(true),
    hourly_salary_min_eur: z.number().optional(),
    hourly_salary_max_eur: z.number().optional(),
    team_intro: z.string().optional(),
    tasks: z.array(z.string()).default([]),
    required_profile: z.array(z.string()).default([]),
    optional_profile: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    application_email: z.string().optional(),
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
    base: "src/content/homepage",
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
        link: z.string(),
      }),
    ),
  }),
});

const faqSectionCollection = defineCollection({
  loader: glob({
    pattern: "faq.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    items: z.array(
      z.object({
        question: z.string(),
        answer_short: z.string(),
        answer_long: z.string(),
      }),
    ),
  }),
});

const resultsSectionCollection = defineCollection({
  loader: glob({
    pattern: "results.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    items: z.array(
      z.object({
        caption: z.string(),
        text: z.string(),
      }),
    ),
  }),
});

const whyAdvSectionCollection = defineCollection({
  loader: glob({
    pattern: "why-adv.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    enable: z.boolean(),
    left_intro: z.string(),
    left_highlight: z.string(),
    left_outro: z.string(),
    right_title: z.string(),
    items: z.array(
      z.object({
        caption: z.string(),
        text: z.string(),
      }),
    ),
    image: z.string(),
    image_alt: z.string(),
    button: z
      .object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      })
      .optional(),
  }),
});

const servicesSectionCollection = defineCollection({
  loader: glob({
    pattern: "services.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    enable: z.boolean(),
    left_intro: z.string(),
    left_highlight: z.string(),
    left_outro: z.string(),
    left_text: z.string(),
    right_title: z.string(),
    items: z.array(
      z.object({
        caption: z.string(),
        text: z.string(),
      }),
    ),
    image: z.string(),
    image_alt: z.string(),
    button: z
      .object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      })
      .optional(),
  }),
});

const soArbeitenSectionCollection = defineCollection({
  loader: glob({
    pattern: "so-arbeiten.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    enable: z.boolean(),
    left_intro: z.string(),
    left_highlight: z.string(),
    left_outro: z.string(),
    left_text: z.string(),
    right_title: z.string(),
    items: z.array(
      z.object({
        caption: z.string(),
        text: z.string(),
      }),
    ),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    button: z
      .object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      })
      .optional(),
  }),
});

const resultOverviewSectionCollection = defineCollection({
  loader: glob({
    pattern: "result-overview.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    enable: z.boolean(),
    left_intro: z.string(),
    left_highlight: z.string(),
    left_outro: z.string(),
    left_text: z.string(),
    right_title: z.string(),
    listItems: z.array(z.string()).default([]),
    items: z
      .array(
        z.object({
          caption: z.string(),
          text: z.string(),
        }),
      )
      .default([]),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    button: z
      .object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      })
      .optional(),
  }),
});

// Export collections
export const collections = {
  about: aboutCollection,
  authors: authorsCollection,
  blog: blogCollection,
  career: careerCollection,
  casestudies: casestudiesCollection,
  contact: contactCollection,
  dataready: datareadyCollection,
  dictionary: dictionaryCollection,
  feedback: feedbackCollection,
  pages: pagesCollection,
  portfolio: portfolioCollection,
  team: teamCollection,

  // sections
  faqSection: faqSectionCollection,
  resultsSection: resultsSectionCollection,
  resultOverviewSection: resultOverviewSectionCollection,
  soArbeitenSection: soArbeitenSectionCollection,
  servicesSection: servicesSectionCollection,
  testimonialSection: testimonialSectionCollection,
  whyAdvSection: whyAdvSectionCollection,
};
