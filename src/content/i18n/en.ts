import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";

/**
 * English copy. Must match the exact shape of `pl` (the `Dictionary` type).
 */
export const en: Dictionary = {
  meta: {
    locale: "en" as Locale,
    localeName: "English",
    htmlLang: "en",
    ogLocale: "en_US",
  },
  brand: {
    name: "RoyalSauna",
    tagline: "Your private home spa in the garden",
    phone: "+48 600 359 180",
    phoneHref: "tel:+48600359180",
    email: "biuro@royalsauna.pl",
    emailHref: "mailto:biuro@royalsauna.pl",
    address: "B4wood Sp. z o.o., 87-148 Łysomice, Poland",
  },
  nav: {
    home: "Home",
    models: "Models",
    saunas: "Models",
    quality: "Specification",
    configurator: "Configurator",
    blog: "Blog",
    contact: "Contact",
    specification: "Specification",
    specHeaters: "Heaters",
    specWood: "Wood",
    specFoundation: "Foundation",
    requestOffer: "Get your offer",
    seeSizes: "See the variants",
    menu: "Menu",
    close: "Close",
  },
  common: {
    priceFrom: "From",
    currency: "PLN",
    priceNote: "Final price depends on configuration",
    learnMore: "Learn more",
    seeModel: "View model",
    backToBlog: "Back to blog",
    readingTime: "min read",
    requestOfferFor: "Get an offer for this model",
    forWhom: "Who it's for",
    keyFeatures: "Key features",
    specification: "Specification",
    standardEquipment: "Standard equipment",
    configOptions: "Configuration options",
    skipToContent: "Skip to content",
    interiorEyebrow: "Interior",
    interiorTitle: "Refined in every detail",
    exteriorEyebrow: "Form & design",
    exteriorTitle: "A form that pleases the eye",
    dimensionsEyebrow: "Dimensions",
    dimensionsTitle: "Dimensions & specification",
    dimensionsNote:
      "Allow at least 10 cm of free space on each side of the sauna – for installation and easy service access.",
    technicalDrawing: "Technical drawing",
  },
  home: {
    hero: {
      eyebrow: "Premium garden saunas",
      h1: "RoyalSauna – your private home spa in the garden",
      subtitle:
        "We craft luxury garden saunas from Scandinavian spruce. One refined model in three variants – ready to become the heart of your home wellness ritual.",
      ctaPrimary: "Get your offer",
      ctaSecondary: "See the variants",
      videoCaption: "Placeholder reserved for the RoyalSauna feature film",
      nightToggle: {
        toNight: "See the sauna after dark",
        toDay: "Back to daytime",
      },
    },
    sizes: {
      eyebrow: "The Regenerum line",
      title: "The Regenerum line – Compact, Comfort and Premium",
      description:
        "Our Regenerum line comes in three variants that differ in size and capacity. Choose the one that best fits your garden and the way you unwind.",
    },
    why: {
      eyebrow: "Why RoyalSauna",
      title: "Luxury that begins with quality",
      lead: "For us, luxury isn't an ornament – it's the consequence of quality. We design and craft every sauna to delight in the detail and to serve for decades – an investment you feel from the first touch of the wood.",
      items: [
        {
          title: "Premium Scandinavian spruce",
          description:
            "We choose wood from northern forests – dense, stable and ageing beautifully. The foundation of durability and a true sauna scent.",
        },
        {
          title: "Refined craftsmanship",
          description:
            "Every detail, from fittings to board profiling, is designed for a premium feel that lasts for decades.",
        },
        {
          title: "A complete home spa",
          description:
            "We deliver the sauna with thoughtful standard equipment – ready for your first session, no compromises.",
        },
        {
          title: "Honest price for the quality",
          description:
            "We position RoyalSauna as an investment for years: premium materials and craftsmanship at a price that makes sense.",
        },
      ],
    },
    interior: {
      eyebrow: "Interior",
      title: "Step inside",
      button: "See the interior",
      readMore: "Read more",
      points: {
        heater: {
          title: "Sauna heater",
          description:
            "A powerful heater matched to the cabin volume – the heart of every session.",
        },
        benches: {
          title: "Profiled benches",
          description:
            "Ergonomic premium-wood benches, pleasant to the touch and durable.",
        },
        walls: {
          title: "Solid-wood walls",
          description:
            "Scandinavian spruce – stable, beautifully scented and moisture-resistant.",
        },
        floor: {
          title: "Floor & finish",
          description:
            "Carefully selected materials that withstand high temperatures.",
        },
      },
    },
    included: {
      eyebrow: "What's included",
      title: "Everything you need for your first session",
      description:
        "Every RoyalSauna size ships with a thoughtful standard set. What others charge extra for is part of the experience here.",
      items: [
        "Sauna heater matched to the cabin volume",
        "Profiled premium-wood benches",
        "Headrests and footrests",
        "Bucket and ladle",
        "A full set of sauna stones",
        "Ambient LED lighting",
        "Thermometer and hygrometer",
        "Sauna sand timer",
        "Towels (number depends on the model)",
      ],
      groups: [
        {
          title: "Benches, headrests & LED",
          description:
            "Contoured premium-wood benches, aspen headrests and LED lighting built right into the structure.",
          image: "/images/included-benches.jpg",
          alt: "Contoured bench with LED lighting and a headrest",
          shape: "wide" as const,
        },
        {
          title: "Heater & full stone set",
          description:
            "A powerful sauna heater matched to the cabin volume, complete with a full set of stones – ready for your first session.",
          image: "/images/included-heater.jpg",
          alt: "Sauna heater with a full set of stones",
          shape: "portrait" as const,
        },
        {
          title: "A home-spa atmosphere",
          description:
            "Ambient LED light and the warmth of wood create the mood of a true, private spa.",
          image: "/images/included-lighting.jpg",
          alt: "Regenerum sauna at night with a glowing interior",
          shape: "square" as const,
        },
        {
          title: "Welcome set",
          description:
            "Bucket, ladle, thermometer, hygrometer, hourglass and towels – ready from day one.",
          image: "/images/included-accessories.jpg",
          alt: "Welcome set: bucket, ladle, thermometer, towel",
          shape: "square" as const,
        },
      ],
    },
    process: {
      eyebrow: "Ordering process",
      title: "From conversation to your first session",
      steps: [
        {
          title: "Request an offer",
          description:
            "You fill in a short form. We learn about your garden, expectations and preferred size.",
        },
        {
          title: "Quote preparation",
          description:
            "We match the heater to the sauna volume and your preferences, then prepare a clear quote.",
        },
        {
          title: "Production & preparation",
          description:
            "We build your sauna from Scandinavian spruce and assemble all the equipment.",
        },
        {
          title: "Delivery & installation",
          description:
            "We deliver and prepare the sauna in your garden. Only the first session remains.",
        },
      ],
    },
    wellness: {
      eyebrow: "Wellness ritual",
      title: "Relaxation, health and calm – every day, at home",
      description:
        "RoyalSauna is more than a sauna. It's a space where you slow down, restore your body and build a home ritual away from the rush.",
      pillars: [
        {
          title: "Relaxation",
          description:
            "The warmth of wood and soft light create a space where you truly rest.",
        },
        {
          title: "Health",
          description:
            "Regular sessions support muscle recovery, circulation and better sleep.",
        },
        {
          title: "Home spa",
          description:
            "The comfort of a private spa without leaving home – whenever you feel like it.",
        },
        {
          title: "Garden",
          description:
            "A natural wooden form that blends beautifully into your garden greenery.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Let's begin",
      title: "Let's design your home spa",
      description:
        "Tell us how you unwind and what your garden looks like. We'll prepare an offer matched to your needs – with no obligation.",
    },
  },
  saunas: {
    hero: {
      eyebrow: "The Regenerum line",
      h1: "Garden saunas – the Regenerum line",
      description:
        "Three variants – Compact, Comfort and Premium – differing in size and capacity. All built from premium Scandinavian spruce, with complete standard equipment.",
    },
    oneModel: {
      title: "The Regenerum line – three models",
      description:
        "The Regenerum line comes in three variants. They differ in size and capacity – the material quality, craftsmanship and equipment stay consistently premium.",
    },
    comparison: {
      title: "Model comparison",
      sizeLabel: "Model",
      capacityLabel: "People",
      dimensionsLabel: "Exterior dimensions",
      heaterLabel: "Heater",
      priceLabel: "From",
      ctaLabel: "Details",
    },
    whichSize: {
      title: "Which model to choose?",
      items: [
        {
          title: "Compact",
          description:
            "For couples and smaller gardens. An intimate space for a daily ritual for two.",
        },
        {
          title: "Comfort",
          description:
            "The most popular model. Comfort for the family and room for guests, without excess.",
        },
        {
          title: "Premium",
          description:
            "For those who love to share the ritual. A spacious spa for gatherings and larger groups.",
        },
      ],
    },
    priceFactors: {
      title: "What affects the price?",
      items: [
        {
          title: "Variant and volume",
          description:
            "A larger sauna means more premium wood and a stronger heater matched to the volume.",
        },
        {
          title: "Heater type",
          description:
            "Electric or wood-fired – they differ in installation, power and the session experience.",
        },
        {
          title: "Configuration options",
          description:
            "Glazing, a terrace, lighting and an audio system all influence the final quote.",
        },
        {
          title: "Delivery and installation",
          description:
            "Location and access conditions determine transport and preparation costs.",
        },
      ],
    },
  },
  quality: {
    hero: {
      eyebrow: "Quality & materials",
      h1: "Scandinavian spruce and an obsession with detail",
      description:
        "We believe luxury starts with the material. That's why we build RoyalSauna from wood that ages beautifully and serves for decades.",
    },
    sections: [
      {
        title: "Why Scandinavian spruce",
        body: "Wood from a cool, northern climate grows more slowly, making it denser and more stable. It warps less, handles temperature and humidity changes better, smells wonderful and deepens in colour over time.",
      },
      {
        title: "Selection and processing",
        body: "We select and process each board with attention to grain, smoothness and an even tone. We profile elements so skin contact is always comfortable while the structure breathes and works evenly.",
      },
      {
        title: "Built to last",
        body: "We combine traditional carpentry with the precision of modern production. A solid structure, thoughtful insulation and high-quality fittings make RoyalSauna an investment for decades, not a season.",
      },
      {
        title: "Premium finish",
        body: "We care about the details you feel: smooth edges, hidden fixings, warm lighting and materials safe at high temperatures. What you can't see is as refined as what you can.",
      },
    ],
    cta: {
      title: "Feel the difference in quality",
      description:
        "We'd be glad to tell you more about materials and craftsmanship. Get your offer and we'll match the configuration to your garden.",
    },
  },
  heatersPage: {
    banner: {
      eyebrow: "Specification",
      caption: "Heaters for the Regenerum sauna line",
    },
    hero: {
      eyebrow: "The heart of every sauna",
      h1: "Heaters matched to every model",
      description:
        "For every model in the Regenerum line we choose heaters from Harvia – efficient, quiet, and fitted with WiFi control. Below you'll find which heaters fit your model.",
    },
    mounting: {
      standing: "Standing, floor-mounted",
      hanging: "Wall-mounted",
    },
    color: {
      steel: "Stainless steel",
      black: "Black",
    },
    controlLicense: "with a Control licence",
    volumeUnknown: "no volume listed",
    compareSection: {
      eyebrow: "Comparison",
      title: "Heater comparison",
      description:
        "The key specs of every heater available in the Regenerum line, in one place.",
      columns: {
        model: "Model",
        power: "Power",
        volume: "Sauna volume",
        mounting: "Mounting",
        controller: "Control",
        wifi: "WiFi / app",
        stones: "Stone capacity",
        dimensions: "Dimensions",
        color: "Colour",
      },
    },
    matchSection: {
      eyebrow: "Matched to your model",
      title: "Which heater fits which model",
      description:
        "Every model in the Regenerum line has a matched set of heaters, ready to choose when you configure your offer.",
    },
    detailSection: {
      eyebrow: "Get to know the heaters",
      title: "Heaters in detail",
      description:
        "The full technical specification for every model – power, volume, control and dimensions.",
      specLabels: {
        power: "Power",
        volume: "Recommended volume",
        mounting: "Mounting",
        controller: "Control",
        wifi: "WiFi / app",
        stones: "Stones",
        dimensions: "Dimensions (H × W × D)",
        color: "Colour",
        code: "Product code",
      },
    },
    faq: {
      items: [
        {
          question: "How does WiFi control and the MyHarvia app work?",
          answer:
            "Every heater has a Harvia panel with a WiFi module, so you can control it remotely from your phone with the MyHarvia app – start heating before you even reach the sauna and check the temperature on the go.",
        },
        {
          question: "What's the difference between a standing and a wall-hung heater?",
          answer:
            "A standing heater (Cilindro, Legend) sits on the floor and can be built into the sauna benches. A wall-hung heater (Spirit) is mounted on the wall – it takes up less floor space and has a more modern, compact form.",
        },
        {
          question: "Does every heater need a 400V connection?",
          answer:
            "The 9.0 kW heaters (Cilindro, Spirit) require a 400V 3N~ connection. The Legend can be wired more flexibly – 230V, 230V 3~ or 400V 3N~ – depending on the installation you have available.",
        },
        {
          question: "Do all heaters need a paid Control licence?",
          answer:
            "No. The Cilindro works over MyHarvia WiFi with no extra cost. The Legend and Spirit come with a MyHarvia Core licence included, and full remote control via MyHarvia Control requires purchasing a licence in the app.",
        },
        {
          question: "How often do the sauna stones need replacing?",
          answer:
            "With regular use, it's worth replacing the stones roughly every 1–2 years. Over time they crack and lose their ability to hold heat, which lengthens heat-up time and weakens the quality of the steam.",
        },
      ],
    },
  },
  woodPage: {
    banner: {
      eyebrow: "Specification",
      caption:
        "Wood built to last. The timber and materials used in the Regenerum sauna line.",
    },
    meta: {
      title: "Wood built to last – materials of the Regenerum saunas",
      description:
        "Discover the wood and materials we build the Regenerum garden sauna line from – Scandinavian spruce and details refined for decades.",
    },
    materialsSection: {
      eyebrow: "Materials",
      title: "Three woods, one sauna",
      description:
        "We choose a different wood for every part of the sauna – so the structure lasts, the benches feel good to the touch, and the floor stays comfortable underfoot.",
      madeFrom: "Made from this wood",
    },
    diagramSection: {
      eyebrow: "Construction",
      title: "What a sauna is built from",
      description:
        "We break the sauna down into its parts – each element of the shell is a different wood, matched to its job.",
      hotspots: {
        shell: {
          label: "Sauna shell",
          description:
            "Scandinavian spruce – bent, multi-layer arches that give the sauna its signature rounded shape.",
        },
        walls: {
          label: "Walls",
          description:
            "Scandinavian spruce – solid walls with enhanced resistance to moisture and temperature swings.",
        },
        benches: {
          label: "Benches",
          description:
            "Aspen – smooth and cool to the touch, comfortable even at high sauna temperatures.",
        },
        floor: {
          label: "Floor",
          description:
            "Thermowood – heat-treated flooring timber that won't burn your feet.",
        },
      },
    },
  },
  podlozePage: {
    banner: {
      eyebrow: "Specification",
      caption:
        "A solid base built to last. Groundwork and foundations for the Regenerum sauna line.",
    },
    meta: {
      title: "A solid base – foundations for Regenerum saunas",
      description:
        "Discover how we prepare the ground and foundation for the Regenerum garden sauna line – stable, durable, and matched to your site.",
    },
    notice: {
      title: "The customer prepares the foundation",
      description:
        "We don't handle foundation preparation – it's carried out by the customer, or a local contractor, ahead of the sauna installation date. Below, we explain how to do it correctly.",
    },
    typesSection: {
      eyebrow: "Recommended foundations",
      title: "Three foundations we recommend",
      description:
        "Each one gives the sauna a stable, level base with good drainage. Choose the option that best fits your site and budget.",
      instructionsNote: {
        title: "Detailed instructions in your offer",
        description:
          "The step-by-step guide for preparing your chosen foundation is included in the personalised offer we'll send you after you submit the form.",
      },
    },
    requirementsSection: {
      eyebrow: "Before you start",
      title: "General requirements before installation",
      description:
        "Whichever option you choose, the foundation must meet a few basic conditions so the sauna stands stable and lasts for years.",
      items: [
        {
          title: "Load-bearing, stable ground",
          description:
            "The foundation must sit on compacted, settled ground – not on freshly piled soil or grass, which settle unevenly over time.",
        },
        {
          title: "Margin around the footprint",
          description:
            "Plan the foundation at least 20 cm larger than the sauna's exterior footprint on every side – it makes installation and later wall maintenance easier.",
        },
        {
          title: "Level within tight tolerance",
          description:
            "The maximum deviation across the whole surface is about 5 mm – bigger differences can cause the wooden structure to warp.",
        },
        {
          title: "Access for transport",
          description:
            "Make sure there's clear passage and access to the installation site – the sauna's elements are large and delivered whole or in large modules.",
        },
        {
          title: "Power supply access",
          description:
            "The client is responsible for the electrical connection at the installation site, matched to the heater power listed in the chosen model's specification.",
        },
      ],
    },
    dimensionsSection: {
      eyebrow: "Dimensions",
      title: "Foundation size for every model",
      description:
        "The figures below show the sauna's exterior footprint and the recommended foundation size, with a 20 cm margin on every side.",
      columns: {
        model: "Model",
        exterior: "Sauna size",
        recommended: "Recommended foundation",
      },
    },
    compareSection: {
      eyebrow: "Comparison",
      title: "Comparing the foundations",
      description:
        "Cost, build time, difficulty and drainage – gathered in one place.",
      columns: {
        type: "Foundation",
        cost: "Cost",
        time: "Build time",
        difficulty: "Difficulty",
        drainage: "Drainage",
      },
    },
    faq: {
      items: [
        {
          question: "Can I place the sauna directly on grass or bare ground?",
          answer:
            "We don't recommend it – without a proper foundation the structure settles unevenly over time, the wood absorbs moisture from the ground, and the sauna wears out faster. We always recommend one of the three foundation types described above.",
        },
        {
          question:
            "How long do I need to wait after pouring a concrete slab before installing the sauna?",
          answer:
            "Concrete needs about 3–4 weeks to reach sufficient strength. Installing the sauna on a slab that hasn't cured enough can damage it.",
        },
        {
          question: "What if my plot is uneven or sloped?",
          answer:
            "In that case the ground needs levelling before preparing the foundation – usually with extra excavation and a gravel fill, so the final surface is perfectly level regardless of the plot's shape.",
        },
        {
          question: "Does the foundation need drainage or a sewer connection?",
          answer:
            "A dry sauna doesn't need a sewer connection – it's only important that the foundation has a slight slope (1–2%) to drain rainwater away from the building, which all three foundation types provide.",
        },
      ],
    },
  },
  configurator: {
    hero: {
      eyebrow: "Offer configurator",
      h1: "We'll match the perfect sauna for you",
      description:
        "Answer a few questions and we'll recommend the best model, then prepare your offer. It takes less than two minutes.",
    },
    wizard: {
      back: "Back",
      next: "Next",
      seeResult: "See recommendation",
      questionOf: "Question",
      of: "of",
      questions: {
        people: {
          title: "How many people will use the sauna?",
          description: "We'll match the right cabin variant.",
          options: [
            { value: "2", label: "1–2 people", hint: "Intimate, for couples" },
            { value: "3", label: "3–4 people", hint: "Ideal for a family" },
            { value: "5", label: "5 or more", hint: "Gatherings with friends" },
          ],
        },
        garden: {
          title: "How much space do you have in the garden?",
          description: "This helps us fit the variant to your space.",
          options: [
            { value: "small", label: "Not much", hint: "A compact nook" },
            { value: "medium", label: "Medium", hint: "A standard garden" },
            { value: "large", label: "Plenty", hint: "A spacious plot" },
          ],
        },
        frequency: {
          title: "How often do you plan to use it?",
          description: "It tells us what to focus on in the quote.",
          options: [
            { value: "occasional", label: "Occasionally", hint: "Now and then" },
            { value: "regular", label: "Regularly", hint: "A few times a week" },
            { value: "daily", label: "Daily", hint: "A daily ritual" },
          ],
        },
      },
      result: {
        eyebrow: "Our recommendation",
        title: "Here's your ideal configuration",
        subtitle:
          "Based on your answers we recommend the set below. You can adjust it in the next step.",
        modelLabel: "Recommended model",
        whyLabel: "Why this set?",
        priceFrom: "from",
        adjust: "Change answers",
        cta: "Get an offer for this set",
        reasons: {
          peopleModel: "Variant matched to the number of people",
          smallGarden: "A compact body that fits a smaller garden",
        },
      },
      contact: {
        title: "Where should we send the offer?",
        description:
          "Leave your details – we'll prepare a quote for exactly this configuration.",
      },
    },
  },
  blog: {
    hero: {
      eyebrow: "Blog",
      h1: "Knowledge about sauna, wellness and the home spa",
      description:
        "Practical tips, inspiration and knowledge on how to get the most from your sauna – in line with the premium RoyalSauna ritual.",
    },
    readMore: "Read more",
    relatedTitle: "See also",
    emptyTitle: "Posts are coming soon",
    emptyDescription:
      "We're working on our first articles about saunas, wellness and the home spa. Check back soon.",
  },
  contact: {
    hero: {
      eyebrow: "Contact",
      h1: "Let's talk about your home spa",
      description:
        "We're at your disposal. Write or call – we'll respond and help you choose the right variant and configuration.",
    },
    phoneTitle: "Phone",
    emailTitle: "Email",
    addressTitle: "Address",
    formTitle: "Write to us",
  },
  form: {
    title: "Get your offer",
    description:
      "Fill in the form and we'll prepare a personalised offer matched to your needs.",
    fields: {
      name: "Full name",
      namePlaceholder: "John Smith",
      email: "Email address",
      emailPlaceholder: "john@example.com",
      phone: "Phone (optional)",
      phonePlaceholder: "+48 600 000 000",
      preferredModel: "Preferred model",
      location: "Town or region",
      locationPlaceholder: "e.g. Kraków / Małopolska",
      message: "Message",
      messagePlaceholder: "Tell us about your garden and expectations…",
      consent:
        "I agree to be contacted to prepare an offer and to the processing of my data in line with the privacy policy.",
    },
    models: {
      compact: "Regenerum Compact",
      comfort: "Regenerum Comfort",
      premium: "Regenerum Premium",
      unknown: "Not sure yet",
    },
    submit: "Send inquiry",
    submitting: "Sending…",
    successTitle: "Thank you!",
    successMessage:
      "We've received your inquiry. We'll be in touch soon with a personalised offer.",
    errorMessage:
      "Something went wrong. Please try again or contact us directly.",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    consentRequired: "Consent is required to prepare an offer",
    steps: {
      model: "Variant",
      details: "Details",
      contact: "Contact",
      next: "Next",
      back: "Back",
      stepOf: "Step",
      of: "of",
    },
    stepQuestions: {
      modelTitle: "Which variant are you interested in?",
      modelDescription: "No problem if you're not sure yet – we'll help you choose.",
      detailsTitle: "Tell us about your garden",
      detailsDescription: "This information helps us quote more accurately.",
      contactTitle: "How can we reach you?",
      contactDescription: "We'll prepare an offer and get back to you the way you prefer.",
    },
  },
  faq: {
    title: "Frequently asked questions",
    description: "We've gathered answers to the questions we hear most often.",
  },
  footer: {
    tagline: "Premium garden saunas crafted from Scandinavian spruce.",
    explore: "Site",
    products: "Saunas",
    company: "Information",
    contact: "Contact",
    newsletter: "Newsletter",
    newsletterDescription: "Wellness inspiration and RoyalSauna news. No spam.",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
    newsletterSuccess: "Thanks for subscribing!",
    privacy: "Privacy policy",
    cookies: "Cookie policy",
    rights: "All rights reserved.",
  },
  widgets: {
    chatLabel: "Chat with us",
    chatTitle: "RoyalSauna chat",
    chatPlaceholder:
      "Chat will be available soon. In the meantime, write to us via the contact form.",
    voiceLabel: "Voice assistant",
    voiceTitle: "RoyalSauna voice assistant",
    voicePlaceholder:
      "The voice assistant is in preparation. It will answer your questions soon.",
  },
  legal: {
    privacyTitle: "Privacy policy",
    cookiesTitle: "Cookie policy",
    lastUpdated: "Last updated",
  },
};
