import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod"

// schema of the values section
const valuesCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/values" }),
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
    eyebrow: z.string().optional(),
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

const productsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/products" }),
  schema: z.object({
    title: z.string().min(1),
    eyebrow: z.string().default("Produkt"),
    meta_title: z.string().optional(),
    description: z.string().min(1),
    highlight_text: z.string().optional(),
    image: z.string().min(1),
    intro_cta_label: z.string().default("Jetzt im Produkt-Katalog konfigurieren"),
    customer_value_title: z.string().default("Was Sie davon haben"),
    benefits: z.array(
      z.object({
        title: z.string(),
        text: z.string(),
      }),
    ).min(1),
    contact: z.object({
      author_id: z.string().min(1),
      expertise: z.string().min(1),
      question_cta_label: z.string().default("Frage stellen"),
      meeting_cta_label: z.string().default("Gespräch vereinbaren"),
      meeting_cta_link: z.string().default(
        "https://calendly.com/andreas-klostermann-alpinedata/ersttermin",
      ),
    }),
    collaboration_title: z.string().default("Unsere Zusammenarbeit"),
    collaboration_steps: z.array(
      z.object({
        title: z.string(),
        text: z.string(),
      }),
    ).min(1),
    delivery: z.object({
      technologies: z.array(z.string()).default([]),
      deliverables: z.array(z.string()).default([]),
      operations: z.array(z.string()).default([]),
    }).default({
      technologies: [],
      deliverables: [],
      operations: [],
    }),
    related_products: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    final_cta_title: z
      .string()
      .default("Ihr individuelles Projekt mit Preis und Zeitplan in 3 Minuten"),
    final_cta_text: z
      .string()
      .default(
        "Beantworten Sie ein paar kurze Fragen, wir zeigen Ihnen direkt, was das Projekt kosten würde und wie lange es dauert",
      ),
    final_cta_button_label: z
      .string()
      .default("Zum Shop"),
    final_cta_image: z.string().default("/images/goat.jpg"),
    draft: z.boolean().default(false),
  }),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/team" }),
  schema:
    z.object({
      title: z.string(),
      meta_title: z.string(),
      description: z.string(),
      eyebrow: z.string(),
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

const controllingLoader = (filename: string) =>
  glob({ pattern: `${filename}.md`, base: "src/content/controlling" });

const controllingNavigationCollection = defineCollection({
  loader: controllingLoader("navigation"),
  schema: z.object({
    links: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
});

const controllingHeroCollection = defineCollection({
  loader: controllingLoader("hero"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
});

const controllingTimelineCollection = defineCollection({
  loader: controllingLoader("timeline"),
  schema: z.object({
    title: z.string(),
    badge: z.string(),
    ariaLabel: z.string(),
    days: z.array(z.string()),
    before: z.object({
      title: z.string(),
      segments: z.array(
        z.object({
          label: z.string(),
          span: z.number(),
          kind: z.enum(["hand", "done", "free"]),
        }),
      ),
    }),
    after: z.object({
      title: z.string(),
      segments: z.array(
        z.object({
          label: z.string(),
          span: z.number(),
          kind: z.enum(["hand", "done", "free"]),
        }),
      ),
    }),
    note: z.string(),
  }),
});

const controllingPainPointsCollection = defineCollection({
  loader: controllingLoader("pain-points"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    items: z.array(
      z.object({ code: z.string(), title: z.string(), text: z.string() }),
    ),
  }),
});

const controllingCalculatorCollection = defineCollection({
  loader: controllingLoader("calculator"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
  }),
});

const controllingDemoCollection = defineCollection({
  loader: controllingLoader("demo"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    after: z.string(),
    afterCta: z.string(),
  }),
});

const controllingQuickStartCollection = defineCollection({
  loader: controllingLoader("quick-start"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    steps: z.array(
      z.object({
        when: z.string(),
        title: z.string(),
        text: z.string(),
      }),
    ),
    note: z.string(),
    offer: z.object({
      price: z.string(),
      priceNote: z.string(),
      receiveTitle: z.string(),
      receive: z.array(z.string()),
      needTitle: z.string(),
      need: z.array(z.string()),
      cta: z.string(),
      person: z.object({
        name: z.string(),
        image: z.string(),
        text: z.string(),
      }),
    }),
    fixedPrice: z.object({
      label: z.string(),
      title: z.string(),
      text: z.string(),
    }),
  }),
});

const controllingPricingCollection = defineCollection({
  loader: controllingLoader("pricing"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    tiers: z.array(
      z.object({
        step: z.string(),
        duration: z.string(),
        title: z.string(),
        sub: z.string(),
        prefix: z.string().optional(),
        price: z.string(),
        priceNote: z.string(),
        items: z.array(z.string()),
        cta: z.string(),
        href: z.string(),
        highlight: z.boolean().optional(),
        badge: z.string().optional(),
      }),
    ),
    run: z.object({
      title: z.string(),
      text: z.string(),
      price: z.string(),
      cta: z.string(),
    }),
    guarantees: z.array(
      z.object({ title: z.string(), text: z.string() }),
    ),
  }),
});

const controllingCaseExampleCollection = defineCollection({
  loader: controllingLoader("case-example"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    story: z.array(z.object({ title: z.string(), text: z.string() })),
    kpis: z.array(z.object({ value: z.string(), label: z.string() })),
    logosTitle: z.string(),
    logoSlots: z.array(z.string()),
  }),
});

const controllingReportingCheckCollection = defineCollection({
  loader: controllingLoader("reporting-check"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    steps: z.array(z.string()),
    questions: z.array(
      z.object({
        q: z.string(),
        options: z.array(z.object({ label: z.string(), points: z.number() })),
      }),
    ),
    maxScore: z.number(),
    results: z.array(
      z.object({
        min: z.number(),
        level: z.number(),
        title: z.string(),
        text: z.string(),
        recommendation: z.string(),
        why: z.string(),
      }),
    ),
    labels: z.record(z.string(), z.string()),
  }),
});

const controllingWhitepaperCollection = defineCollection({
  loader: controllingLoader("whitepaper"),
  schema: z.object({
    coverLabel: z.string(),
    coverTitle: z.string(),
    coverFoot: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    bullets: z.array(z.string()),
    form: z.object({
      label: z.string(),
      placeholder: z.string(),
      submit: z.string(),
      privacy: z.string(),
      privacyLink: z.string(),
      firstnamePlaceholder: z.string(),
      lastnamePlaceholder: z.string(),
      companyPlaceholder: z.string(),
      consent: z.string(),
      error: z.string(),
    }),
  }),
});

const controllingFaqCollection = defineCollection({
  loader: controllingLoader("faq"),
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

const controllingFinalCtaCollection = defineCollection({
  loader: controllingLoader("final-cta"),
  schema: z.object({
    title: z.string(),
    text: z.string(),
    primary: z.string(),
    secondary: z.string(),
  }),
});

const controllingContactCollection = defineCollection({
  loader: controllingLoader("contact"),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lead: z.string(),
    booking: z.object({
      title: z.string(),
      cta: z.string(),
      points: z.array(z.string()),
      people: z.array(
        z.object({
          name: z.string(),
          role: z.string(),
          image: z.string(),
        }),
      ),
    }),
    form: z.object({
      title: z.string(),
      typeLegend: z.string(),
      types: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
          submit: z.string(),
        }),
      ),
      name: z.string(),
      company: z.string(),
      email: z.string(),
      phone: z.string(),
      phoneHint: z.string(),
      when: z.string(),
      whenOptions: z.array(z.string()),
      message: z.string(),
      optional: z.string(),
      messagePlaceholder: z.string(),
      privacy: z.string(),
      privacyLink: z.string(),
      successTitle: z.string(),
      success: z.string(),
      error: z.string(),
      sending: z.string(),
    }),
  }),
});

// About ADV collection
const aboutAdvCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about-adv" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  values: valuesCollection,
  "about-adv": aboutAdvCollection,
  authors: authorsCollection,
  blog: blogCollection,
  career: careerCollection,
  casestudies: casestudiesCollection,
  dataready: datareadyCollection,
  dictionary: dictionaryCollection,
  feedback: feedbackCollection,
  pages: pagesCollection,
  products: productsCollection,
  team: teamCollection,

  // sections
  faqSection: faqSectionCollection,
  resultsSection: resultsSectionCollection,
  resultOverviewSection: resultOverviewSectionCollection,
  soArbeitenSection: soArbeitenSectionCollection,
  servicesSection: servicesSectionCollection,
  testimonialSection: testimonialSectionCollection,
  whyAdvSection: whyAdvSectionCollection,

  // Controlling landing page sections
  controllingNavigation: controllingNavigationCollection,
  controllingHero: controllingHeroCollection,
  controllingTimeline: controllingTimelineCollection,
  controllingPainPoints: controllingPainPointsCollection,
  controllingCalculator: controllingCalculatorCollection,
  controllingDemo: controllingDemoCollection,
  controllingQuickStart: controllingQuickStartCollection,
  controllingPricing: controllingPricingCollection,
  controllingCaseExample: controllingCaseExampleCollection,
  controllingReportingCheck: controllingReportingCheckCollection,
  controllingWhitepaper: controllingWhitepaperCollection,
  controllingFaq: controllingFaqCollection,
  controllingFinalCta: controllingFinalCtaCollection,
  controllingContact: controllingContactCollection,
};
