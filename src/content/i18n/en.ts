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
    specWelcomePackage: "Welcome package",
    requestOffer: "Get your offer",
    seeSizes: "See the variants",
    menu: "Menu",
    close: "Close",
  },
  common: {
    priceFrom: "From",
    currency: "PLN",
    priceNote: "Final price depends on the choice of heater",
    learnMore: "Learn more",
    seeModel: "View model",
    backToBlog: "Back to blog",
    readingTime: "min read",
    requestOfferFor: "Get an offer for this model",
    forWhom: "Who it's for",
    keyFeatures: "Key features",
    specification: "Specification",
    standardEquipment: "Standard equipment",
    seeWelcomePackage: "See the welcome package",
    configOptions: "Configuration options",
    skipToContent: "Skip to content",
    interiorEyebrow: "Interior",
    interiorTitle: "Refined in every detail",
    exteriorEyebrow: "Form & equipment",
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
        "Sauna heater with Wi-Fi controller",
        "Contoured premium-wood benches",
        "Aspen headrests – cool and pleasant to the touch",
        "Bucket and ladle",
        "A full set of sauna stones",
        "Ambient LED lighting",
        "Thermometer and hygrometer",
        "Sauna sand timer",
        "Premium towels with the RoyalSauna logo",
      ],
      groups: [
        {
          title: "Benches, aspen headrests & LED",
          description:
            "Contoured benches and ergonomic aspen headrests – wood that stays gentle on the skin even at high heat. Plus ambient LED lighting built into the structure.",
          image: "/images/included-benches.jpg",
          alt: "Contoured bench with LED lighting and a headrest",
          shape: "wide" as const,
        },
        {
          title: "Heater, stones & Wi-Fi",
          description:
            "A heater matched to the cabin volume, a full stone set and a Wi-Fi controller – start the sauna from your phone before you get home.",
          image: "/images/included-heater.jpg",
          alt: "Sauna heater with a full set of stones",
          shape: "portrait" as const,
        },
        {
          title: "A home-spa atmosphere",
          description:
            "Ambient LED light and the warmth of ThermoWood create the mood of a true, private spa.",
          image: "/images/included-lighting.jpg",
          alt: "Regenerum sauna at night with a glowing interior",
          shape: "square" as const,
        },
        {
          title: "Welcome package",
          description:
            "Bucket, ladle, thermometer, hygrometer, sand timer and premium towels with an embroidered RoyalSauna logo – 2 to 6 towels, depending on the model.",
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
            "For 2 people. An intimate space for a daily ritual – ideal for smaller gardens.",
        },
        {
          title: "Comfort",
          description:
            "For 4 people. The most popular model – comfort for the family and room for guests.",
        },
        {
          title: "Premium",
          description:
            "For 6 people. A spacious spa for gatherings and larger groups.",
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
          title: "Heater model",
          description:
            "Harvia Cilindro, Legend or Spirit – they differ in installation, power and the session experience.",
        },
        {
          title: "Configuration options",
          description:
            "Glazing, a terrace, lighting and an audio system all influence the final quote.",
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
        "Discover the wood we build Regenerum saunas from – ThermoWood (thermally modified spruce) for the shell and floor, and aspen for benches and headrests.",
    },
    materialsSection: {
      eyebrow: "Materials",
      title: "Two woods, one sauna",
      description:
        "We build the shell and floor from ThermoWood – thermally modified spruce of exceptional durability. Benches and headrests are aspen – pleasant against the skin even at high temperatures.",
      madeFrom: "Made from this wood",
    },
    thermoWoodSection: {
      eyebrow: "ThermoWood",
      title: "ThermoWood – thermally modified spruce made for premium saunas",
      lead:
        "In RoyalSauna Regenerum saunas we use the highest-quality ThermoWood – spruce refined through advanced thermal modification. It combines the natural beauty of spruce with exceptional durability. Treatment uses only high temperature (180–230°C) and steam – with no chemicals whatsoever. The result is a material with far better performance, ideally suited to the demanding conditions inside a sauna.",
      beautyTitle: "Natural beauty and outstanding durability",
      beautyBody:
        "The ThermoWood process significantly increases resistance to moisture, temperature swings and the elements. With reduced absorbency the material stays stable for years, resists warping and is far less prone to cracking or twisting. High heat also removes resin, so the surface stays attractive and comfortable in use.",
      whyTitle: "Why ThermoWood?",
      benefits: [
        {
          title: "100% natural",
          description:
            "No chemical impregnants or additives – only wood treated with heat and steam.",
        },
        {
          title: "Exceptionally durable",
          description:
            "Resistant to moisture, fungi, mould and changing weather conditions.",
        },
        {
          title: "Dimensionally stable",
          description:
            "Up to 90% less prone to twisting and deformation than traditional timber.",
        },
        {
          title: "Better insulation",
          description:
            "Up to 25% better thermal insulation – greater energy efficiency and heat that lasts longer.",
        },
        {
          title: "Insect resistant",
          description:
            "Low moisture content effectively limits the risk of pests.",
        },
        {
          title: "Beautiful, even colour",
          description:
            "Thermal treatment gives the wood a deep, refined tone and improves the durability of protective finishes.",
        },
        {
          title: "Ecological",
          description:
            "Sourced from renewable forests and fully environmentally friendly.",
        },
        {
          title: "Safer",
          description:
            "The altered structure increases fire resistance compared with traditional timber.",
        },
      ],
      closingTitle: "A material built to last",
      closingBody:
        "Choosing ThermoWood means investing in timber made for long-term use. It is valued in premium construction for durability, elegant looks and resistance to demanding conditions. In RoyalSauna Regenerum saunas it preserves not only exceptional aesthetics, but above all comfort, safety and reliability through years of everyday use.",
    },
    diagramSection: {
      eyebrow: "Construction",
      title: "What a sauna is built from",
      description:
        "We break the sauna down into its parts – each element is timber matched to its role.",
      hotspots: {
        shell: {
          label: "Sauna shell",
          description:
            "ThermoWood (thermally modified spruce) – bent, multi-layer arches that give the sauna its signature rounded shape.",
        },
        walls: {
          label: "Walls",
          description:
            "ThermoWood (thermally modified spruce) – solid walls with enhanced resistance to moisture and temperature swings.",
        },
        benches: {
          label: "Benches",
          description:
            "Aspen – smooth and cool to the touch, comfortable even at high sauna temperatures.",
        },
        floor: {
          label: "Floor",
          description:
            "ThermoWood (thermally modified spruce) – flooring timber that won't burn your feet.",
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
  welcomePackagePage: {
    banner: {
      eyebrow: "Specification",
      caption: "Welcome package",
    },
    meta: {
      title: "Welcome package – accessories included with RoyalSauna",
      description:
        "Discover the welcome package included with every Regenerum sauna – accessories for your first session.",
    },
    showcase: {
      eyebrow: "Included as standard",
      title: "Everything you need for your first session",
      description:
        "Every Regenerum sauna arrives ready for the ritual. We chose the details that shape a true spa atmosphere – from the warmth of the heater to the softness of the towel. Nothing left to buy. Just step in, breathe, and feel that this is already your home ritual.",
      items: {
        towels: {
          title: "Towels",
          paragraphs: [
            "Every RoyalSauna Regenerum sauna is delivered with an exclusive set of towels that forms an integral part of the welcome package. Made from 100% fine cotton, they offer exceptional softness, excellent absorbency and lasting comfort even during longer sauna sessions.",
            "Each towel is finished with an elegant embroidered RoyalSauna logo, underlining its premium character and attention to every detail. The generous bath size is comfortable both during the session and afterwards.",
          ],
          listLabel: "Your set includes:",
          list: [
            "Regenerum Compact – 2 premium towels",
            "Regenerum Comfort – 4 premium towels",
            "Regenerum Premium – 6 premium towels",
          ],
          closing:
            "This is not an ordinary add-on – it is what lets you enjoy the sauna to the highest standard from day one, with nothing left to buy. At RoyalSauna we believe true luxury lives in the details, which is why every piece of the welcome package is chosen to deliver maximum comfort and an exceptional experience in every session.",
        },
        bucketLadle: {
          title: "Bucket & ladle",
          paragraphs: [
            "An essential part of a true sauna ritual is pouring water over the hot stones to raise humidity and fill the cabin with a pleasant wave of steam. That is why every RoyalSauna Regenerum sauna comes with an elegant set of a wooden bucket and a matching ladle.",
            "Crafted from high-quality natural wood, they combine a classic look with careful finishing. The ergonomic ladle makes it easy to dose water onto the heater stones, while the generous bucket holds enough for the whole session.",
            "These are not only practical accessories – they also underline the authentic character of the sauna and its atmosphere of calm. With a coherent design language they sit beautifully in the cabin, creating an elegant space where every detail is refined for the highest comfort of use.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
        headrests: {
          title: "Headrests",
          paragraphs: [
            "True sauna comfort is shaped by carefully refined details. That is why every RoyalSauna Regenerum sauna includes two ergonomic headrests made from natural aspen wood, designed to support the head and neck comfortably while you rest.",
            "Aspen is especially valued in sauna interiors for its soft, smooth grain and low thermal conductivity. It does not heat up as intensely as many other woods and stays pleasant against the skin even in high temperatures. Its light, subtle colour also complements the elegant cabin, underlining a natural and harmonious look.",
            "The carefully contoured shape follows the natural position of the head and neck, helping muscles relax and letting you settle into a comfortable posture. The finely sanded surface feels exceptional to the touch and makes every moment of rest even more enjoyable.",
            "As standard, every RoyalSauna model includes two aspen headrests, so recovery feels equally pleasant whether you are alone or sharing the session. It is the combination of natural material, ergonomic form and timeless aesthetics that lets you fully sink into the ritual of unwinding.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
        thermoHygro: {
          title: "Thermometer & hygrometer",
          paragraphs: [
            "The right temperature and humidity are the foundation of an effective, comfortable sauna session. That is why every RoyalSauna Regenerum sauna is equipped with an elegant thermometer and hygrometer set crafted from natural aspen wood.",
            "The thermometer lets you monitor the temperature inside the cabin in real time, while the hygrometer shows the humidity level. Together they make it easy to create ideal conditions for relaxation and to tune the climate to your preferences.",
            "Natural aspen performs excellently in the demanding sauna environment, and the classic design means the set sits harmoniously in the wooden interior. Functionality, durability and timeless aesthetics – a combination that underlines the premium character of every RoyalSauna.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
        timer: {
          title: "Sand timer",
          paragraphs: [
            "Precise timing is one of the key elements of comfortable and safe sauna use. That is why every RoyalSauna Regenerum sauna includes an elegant sand timer made from natural aspen wood, which performs excellently in high heat and humidity.",
            "The timer conveniently measures 5, 10 and 15 minutes, helping you match session length to your preferences and experience. A clear scale lets you keep track of time without electronic devices, preserving the natural, relaxing character of sauna bathing.",
            "Carefully made with attention to every detail, it harmonises with the cabin interior and underlines its elegant, premium character. A practical piece of equipment that not only makes sauna use easier, but also completes the space aesthetically.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
        heaterStones: {
          title: "Heater & stones",
          paragraphs: [
            "At the heart of every RoyalSauna Regenerum sauna is a modern premium electric heater, supplied with a full set of dedicated sauna stones that store and release heat evenly for optimal conditions in every session. High performance means the heater reaches the set temperature quickly, so you can start relaxing shortly after switching on.",
            "The heater’s contemporary design complements the elegant cabin interior and gives it a distinctive, luxurious character. Timeless aesthetics, top-tier craftsmanship and reliable technology – a combination that guarantees comfort of use for years to come.",
            "The set also includes a smart controller with a Wi-Fi module, making operation simple and convenient. You can choose one of three heating modes to match the heater’s work to your preferences and the kind of session you have planned. On the clear display you can always check the current temperature and the estimated time left until the sauna is fully heated.",
            "With Wi-Fi connectivity you can control the sauna from your smartphone – start heating before you get home, change settings or check the heater status from anywhere. Maximum convenience, so your sauna is ready exactly when you need it.",
          ],
          listLabel: "",
          list: [],
          closing: "",
        },
      },
    },
    includedValue: {
      eyebrow: "Included",
      title: "What you don't need to buy separately",
      description:
        "What others often treat as a paid extra is, at RoyalSauna, a natural part of the experience – from day one.",
      items: [
        {
          title: "Electric heater with a full stone set",
          description: "Matched to your model, with sauna stones included as standard.",
        },
        {
          title: "Wi-Fi controller",
          description: "Start the sauna from your phone before you get home.",
        },
        {
          title: "Premium towels with the RoyalSauna logo",
          description: "2, 4 or 6 towels – depending on the model you choose.",
        },
        {
          title: "Bucket and ladle",
          description: "Ready for pouring water on the stones from the first session.",
        },
        {
          title: "Two aspen headrests",
          description: "Ergonomic support for head and neck, included as standard.",
        },
        {
          title: "Thermometer, hygrometer and sand timer",
          description: "Full control of climate and time – without gadgets in the cabin.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "Are the stones and Wi-Fi controller included in the price?",
          answer:
            "Yes. Every Regenerum sauna is delivered with a heater, a full set of sauna stones and a smart controller with a Wi-Fi module. You don't buy them separately – they are part of the welcome package and standard equipment.",
        },
        {
          question: "How many towels will I receive with my sauna?",
          answer:
            "The number of towels depends on the model: Regenerum Compact – 2, Comfort – 4, Premium – 6. All are made from 100% cotton and finished with an embroidered RoyalSauna logo.",
        },
        {
          question: "Can I buy extra towels or accessories?",
          answer:
            "Yes. If you'd like to expand the set – for example with extra towels for guests – get in touch when placing your order or later. We'll gladly match pieces that fit your sauna.",
        },
        {
          question: "How should I care for the wooden accessories?",
          answer:
            "After a session, simply dry the bucket, ladle, headrests, sand timer and thermometer/hygrometer set, and keep them in a dry, airy place inside or near the sauna. Avoid prolonged soaking and harsh detergents – natural aspen responds best to gentle care.",
        },
      ],
    },
  },
  qrPages: {
    offer: {
      metaTitle: "Get an offer – RoyalSauna",
      metaDescription:
        "You scanned the QR code on our display. Fill in a short form and we'll prepare a personalised Regenerum sauna quote.",
      eyebrow: "RoyalSauna display",
      title: "Get an offer",
      description:
        "Thanks for stopping by our sauna. Leave your details – we'll get back with a quote and answers to your questions.",
      formTitle: "Offer form",
      packageLink: "See what's in the welcome package",
    },
    welcomePackage: {
      metaTitle: "Welcome package – RoyalSauna",
      metaDescription:
        "Discover the welcome package included with every Regenerum sauna – towels, heater with Wi-Fi, headrests and more.",
      eyebrow: "Included as standard",
      title: "Welcome package",
      description:
        "Every Regenerum sauna arrives ready for the first session. Here's what you get in the price – nothing left to buy.",
      offerCta: "Get an offer",
      items: {
        towels:
          "Premium towels with an embroidered logo – 2, 4 or 6 depending on the model.",
        bucketLadle:
          "Wooden bucket and ladle – ready for pouring water on the stones.",
        headrests:
          "Two ergonomic aspen headrests – pleasant to the touch, they don't burn.",
        thermoHygro:
          "Aspen thermometer and hygrometer – climate control at the heart of the sauna.",
        timer: "5 / 10 / 15 min sand timer – a natural way to time your session.",
        heaterStones:
          "Heater with a full stone set and Wi-Fi controller – start the sauna from your phone.",
      },
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
            { value: "2", label: "2 people", hint: "Compact – intimate, for two people" },
            { value: "4", label: "4 people", hint: "Comfort – ideal for a family" },
            { value: "6", label: "6 people", hint: "Premium – gatherings with friends" },
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
