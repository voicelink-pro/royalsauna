import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";
import { routeMap } from "@/lib/site";

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
    address: "RoyalSauna Polska, 87-148 Łysomice, Poland",
    instagramUrl: "https://www.instagram.com/royalsauna.pl/",
    facebookUrl: "https://www.facebook.com/profile.php?id=61594425992076",
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
        "We craft luxury garden saunas from thermally modified ThermoWood spruce. One refined model in three variants – ready to become the heart of your home wellness ritual.",
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
          title: "ThermoWood spruce",
          description:
            "The shell is thermally modified Scandinavian spruce – the same northern timber, heat-treated for moisture resistance, density and stability. The foundation of a true sauna.",
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
          title: "Profiled aspen benches",
          description:
            "Ergonomic premium aspen-wood benches, pleasant to the touch and durable.",
        },
        walls: {
          title: "Solid-wood walls",
          description:
            "Solid walls of thermally modified ThermoWood spruce – stable, moisture-resistant and made for the sauna climate.",
        },
        floor: {
          title: "Floor & finish",
          description:
            "The floor is the same thermally modified ThermoWood spruce – pleasant underfoot and built for heat and humidity.",
        },
      },
    },
    included: {
      eyebrow: "What's included",
      title: "Everything you need for your first session",
      description:
        "Every RoyalSauna size ships with a thoughtful standard set. What others charge extra for is part of the experience here.",
      items: [
        "Contoured premium aspen-wood benches",
        "Sauna heater with Wi-Fi controller",
        "A full set of sauna stones",
        "Ambient LED lighting",
        "Aspen headrests (2 pcs.) – cool and pleasant to the touch",
        "Sauna sand timer",
        "Thermometer",
        "Hygrometer",
        "Bucket and ladle",
        "Premium towels with the RoyalSauna logo",
      ],
      groups: [
        {
          title: "Benches, aspen headrests (2 pcs.) & LED",
          description:
            "Contoured premium aspen-wood benches and ergonomic aspen headrests (2 pcs.) – wood that stays gentle on the skin even at high heat. Plus ambient LED lighting built into the structure.",
          image: "/images/included-benches.jpg",
          alt: "Contoured benches with LED lighting and aspen headrests (2 pcs.)",
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
            "We build your sauna from thermally modified ThermoWood spruce and assemble all the equipment.",
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
        "Three variants – Compact, Comfort and Premium – differing in size and capacity. All built from thermally modified ThermoWood spruce, with complete standard equipment – including ambient LED.",
    },
    oneModel: {
      title: "The Regenerum line – three models",
      description:
        "The Regenerum line comes in three variants. They differ in size and capacity – the thermally modified ThermoWood spruce, craftsmanship and standard equipment, including LED lighting, stay the same. Compact comfortably seats 2, Comfort 4, and Premium up to 6.",
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
          image: "/images/which-one-compact.png",
          imageAlt: "RoyalSauna Regenerum Compact",
          imageScale: 0.66,
        },
        {
          title: "Comfort",
          description:
            "For 4 people. The most popular model – comfort for the family and room for guests.",
          image: "/images/which-one-comfort.png",
          imageAlt: "RoyalSauna Regenerum Comfort",
          imageScale: 0.84,
        },
        {
          title: "Premium",
          description:
            "For 6 people. A spacious spa for gatherings and larger groups.",
          image: "/images/which-one-premium.png",
          imageAlt: "RoyalSauna Regenerum Premium",
          imageScale: 1,
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
            "Facade finish, a covered porch or terrace are priced individually. LED lighting is always included as standard.",
        },
      ],
    },
  },
  quality: {
    hero: {
      eyebrow: "Quality & materials",
      h1: "ThermoWood spruce and an obsession with detail",
      description:
        "We believe luxury starts with the material. That's why we build the shell and floor from thermally modified Scandinavian spruce – timber made to last for decades.",
    },
    sections: [
      {
        title: "Why thermally modified Scandinavian spruce",
        body: "Wood from a cool, northern climate grows more slowly, making it denser and more stable. We then give it the ThermoWood heat treatment – steam only, no chemicals – so it handles moisture, temperature and time even better.",
      },
      {
        title: "Selection and processing",
        body: "We select and process each board with attention to grain, smoothness and an even tone. Thermal modification removes resin and stabilises the timber, and we profile the elements so the structure breathes and works evenly.",
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
        "Every model in the Regenerum line has a matched set of heaters. We confirm the specific heater when we prepare your offer.",
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
          link: {
            label: "Get an offer",
            href: routeMap.contact.en,
          },
        },
        {
          question: "What's the difference between a standing and a wall-hung heater?",
          answer:
            "A standing heater (Cilindro, Legend) stands on the floor, usually next to the benches. A wall-hung heater (Spirit) is mounted on the wall – it takes up less floor space and has a more modern, compact form.",
          link: {
            label: "Compare models",
            href: routeMap.saunas.en,
          },
        },
        {
          question: "Does every heater need a 400V connection?",
          answer:
            "The 9.0 kW heaters (Cilindro, Spirit) require a 400V 3N~ connection. The Legend can be wired more flexibly – 230V, 230V 3~ or 400V 3N~ – depending on the installation you have available.",
          link: {
            label: "Contact us",
            href: routeMap.contact.en,
          },
        },
        {
          question: "Do all heaters need a paid Control licence?",
          answer:
            "No. The Cilindro works over MyHarvia WiFi with no extra cost. Full remote control via MyHarvia Control on the Legend and Spirit requires purchasing a licence in the app.",
          link: {
            label: "Configure your offer",
            href: routeMap.configurator.en,
          },
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
        "Discover the wood we build Regenerum saunas from – ThermoWood (thermally modified spruce) for the shell and floor, and aspen for the benches and aspen headrests (2 pcs.).",
    },
    materialsSection: {
      eyebrow: "Materials",
      title: "Two woods, one sauna",
      description:
        "We build the shell and floor from ThermoWood – thermally modified spruce of exceptional durability. Benches are premium aspen wood, with aspen headrests (2 pcs.) – pleasant against the skin even at high temperatures.",
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
            "Premium aspen wood – smooth and cool to the touch, comfortable even at high sauna temperatures. Aspen headrests (2 pcs.) included as standard.",
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
            "Plan the foundation at least 10 cm larger than the sauna's exterior footprint on every side – it makes installation and later wall maintenance easier.",
        },
        {
          title: "Level within tight tolerance",
          description:
            "The maximum deviation across the whole surface is about 10 mm – bigger differences can cause the wooden structure to warp.",
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
        "The figures below show the sauna's exterior footprint and the recommended foundation size, with a 10 cm margin on every side.",
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
        "A concrete slab, blocks and paving – the three bases we recommend under Regenerum saunas.",
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
          link: {
            label: "Compare models",
            href: routeMap.saunas.en,
          },
        },
        {
          question:
            "How long do I need to wait after pouring a concrete slab before installing the sauna?",
          answer:
            "Concrete needs about 3–4 weeks to reach sufficient strength. Installing the sauna on a slab that hasn't cured enough can damage it.",
          link: {
            label: "Get an offer",
            href: routeMap.contact.en,
          },
        },
        {
          question: "What if my plot is uneven or sloped?",
          answer:
            "In that case the ground needs levelling before preparing the foundation – usually with extra excavation and a gravel fill, so the final surface is perfectly level regardless of the plot's shape.",
          link: {
            label: "Contact us",
            href: routeMap.contact.en,
          },
        },
        {
          question: "Does the foundation need drainage or a sewer connection?",
          answer:
            "A dry sauna doesn't need a sewer connection – it's only important that the foundation has a slight slope (1–2%) to drain rainwater away from the building, which all three foundation types provide.",
          link: {
            label: "Discover ThermoWood",
            href: routeMap.wood.en,
          },
        },
        {
          question: "What foundation size do I need for each model?",
          answer:
            "The base should be about 10 cm larger on each side than the sauna. Compact: 2.3 × 1.34 m, Comfort: 2.6 × 2.4 m, Premium: 3.2 × 2.6 m. We send exact guidelines before delivery.",
          link: {
            label: "Compare models",
            href: routeMap.saunas.en,
          },
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
        "Every Regenerum sauna arrives ready for the ritual. We chose the details that shape a true spa atmosphere – from the aspen headrests (2 pcs.) to the softness of the towel. Nothing left to buy. Just step in, breathe, and feel that this is already your home ritual.",
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
          title: "Aspen headrests (2 pcs.)",
          paragraphs: [
            "True sauna comfort is shaped by carefully refined details. That is why every RoyalSauna Regenerum sauna includes ergonomic aspen headrests (2 pcs.) made from natural wood, designed to support the head and neck comfortably while you rest.",
            "Aspen is especially valued in sauna interiors for its soft, smooth grain and low thermal conductivity. It does not heat up as intensely as many other woods and stays pleasant against the skin even in high temperatures. Its light, subtle colour also complements the elegant cabin, underlining a natural and harmonious look.",
            "The carefully contoured shape follows the natural position of the head and neck, helping muscles relax and letting you settle into a comfortable posture. The finely sanded surface feels exceptional to the touch and makes every moment of rest even more enjoyable.",
            "As standard, every RoyalSauna model includes aspen headrests (2 pcs.), so recovery feels equally pleasant whether you are alone or sharing the session. It is the combination of natural material, ergonomic form and timeless aesthetics that lets you fully sink into the ritual of unwinding.",
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
      },
    },
    includedValue: {
      eyebrow: "Included",
      title: "What you don't need to buy separately",
      description:
        "What others often treat as a paid extra is, at RoyalSauna, a natural part of the experience – from day one.",
      items: [
        {
          title: "Aspen headrests (2 pcs.)",
          description: "Ergonomic support for head and neck, included as standard.",
        },
        {
          title: "Thermometer, hygrometer and sand timer",
          description: "Full control of climate and time – without gadgets in the cabin.",
        },
        {
          title: "Bucket and ladle",
          description: "Ready for pouring water on the stones from the first session.",
        },
        {
          title: "Premium towels with the RoyalSauna logo",
          description: "2, 4 or 6 towels – depending on the model you choose.",
        },
      ],
    },
    faq: {
      items: [
        {
          question: "How many towels will I receive with my sauna?",
          answer:
            "The number of towels depends on the model: Regenerum Compact – 2, Comfort – 4, Premium – 6. All are made from 100% cotton and finished with an embroidered RoyalSauna logo.",
          link: {
            label: "Compare models",
            href: routeMap.saunas.en,
          },
        },
        {
          question: "Can I buy extra towels or accessories?",
          answer:
            "Yes. If you'd like to expand the set – for example with extra towels for guests – get in touch when placing your order or later. We'll gladly match pieces that fit your sauna.",
          link: {
            label: "Contact us",
            href: routeMap.contact.en,
          },
        },
        {
          question: "How should I care for the wooden accessories?",
          answer:
            "After a session, simply dry the bucket, ladle, aspen headrests (2 pcs.), sand timer and thermometer/hygrometer set, and keep them in a dry, airy place inside or near the sauna. Avoid prolonged soaking and harsh detergents – natural aspen responds best to gentle care.",
          link: {
            label: "Discover aspen wood",
            href: routeMap.wood.en,
          },
        },
        {
          question: "Are the heater and stones part of the welcome package?",
          answer:
            "No. The Harvia heater and stones come with the sauna – we match them to the volume of your chosen model. The welcome package is the session kit: towels, aspen headrests (2 pcs.), bucket, ladle, thermometer, hygrometer and sand timer.",
          link: {
            label: "See the heaters",
            href: routeMap.heaters.en,
          },
        },
        {
          question: "Is the welcome package included in every sauna's price?",
          answer:
            "Yes. Every Regenerum sauna – Compact, Comfort and Premium – arrives with a complete welcome package. Only the number of towels changes: 2, 4 or 6.",
          link: {
            label: "Get an offer",
            href: routeMap.contact.en,
          },
        },
      ],
    },
  },
  qrPages: {
    offer: {
      metaTitle: "Get the full offer – RoyalSauna",
      metaDescription:
        "You scanned the QR code on our display. Fill in a short form and we'll prepare a personalised Regenerum sauna quote.",
      eyebrow: "RoyalSauna display",
      title: "Get the full offer",
      description:
        "Thank you for your interest. Leave your details and you'll receive a document with the full offer in your inbox.",
      formTitle: "Offer form",
      packageLink: "See what's in the welcome package",
    },
    welcomePackage: {
      metaTitle: "Welcome package – RoyalSauna",
      metaDescription:
        "Discover the welcome package included with every Regenerum sauna – towels, aspen headrests (2 pcs.), bucket and more.",
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
          "Aspen headrests (2 pcs.) – ergonomic, pleasant to the touch, they don't burn.",
        thermoHygro:
          "Aspen thermometer and hygrometer – climate control at the heart of the sauna.",
        timer: "5 / 10 / 15 min sand timer – a natural way to time your session.",
      },
    },
  },
  configurator: {
    hero: {
      eyebrow: "Configurator",
      h1: "Design your place of recovery",
      description:
        "A few simple questions and we'll show you which model fits your space and your needs – with the heater, equipment and a list of what to prepare.",
    },
    wizard: {
      back: "Back",
      next: "Next",
      skip: "Skip",
      seeResult: "See my project",
      backToProject: "Back to project",
      stepOf: "Step",
      of: "of",
      optional: "Optional",
      peopleGenitive: { "1-2": "1–2 people", "3-4": "3–4 people", "5-6": "5–6 people" },
      seatsFew: "seats",
      seatsMany: "seats",
      steps: {
        usage: {
          title: "How will you use the sauna most often?",
          description: "This gives us context – we'll match the model in the next steps.",
          options: [
            { value: "couple", label: "As a couple", hint: "A shared ritual just for the two of you", image: "/images/step1-duo.png" },
            { value: "family", label: "With family", hint: "Evenings and weekends with loved ones", image: "/images/step1-family.png" },
            { value: "friends", label: "With friends", hint: "Sessions in a larger group", image: "/images/step1-friends.png" },
            { value: "solo", label: "Mostly on my own", hint: "A quiet moment for yourself", image: "/images/step1-alone.png" },
          ],
        },
        people: {
          title: "How many people should sit comfortably at once?",
          description: "Think of a regular session, not the biggest get-together of the year.",
          options: [
            { value: "1-2", label: "1–2 people", hint: "Intimate", image: "/images/step2-1.png" },
            { value: "3-4", label: "3–4 people", hint: "Family-sized", image: "/images/step2-2.png" },
            { value: "5-6", label: "5–6 people", hint: "A bigger group", image: "/images/step2-3.png" },
          ],
        },
        comfort: {
          title: "What matters more to you during a session?",
          description: "We'll choose among the models that meet your conditions.",
          options: [
            { value: "smallest", label: "The smallest possible sauna", hint: "Takes up as little of the garden as possible", image: "/images/step3-1.png" },
            { value: "space", label: "More room for seated bathers", hint: "More space on the benches, even when full", image: "/images/step3-2.png" },
            { value: "lounge", label: "More room to rest on the bench", hint: "A larger cabin – we'll confirm bench dimensions with you", image: "/images/step3-3.png" },
          ],
        },
        space: {
          title: "How much space can you set aside for the sauna?",
          description:
            "Enter the width and depth of the spot. The plan will instantly show which models fit.",
          width: "Width",
          depth: "Depth",
          unit: "m",
          placeholder: "e.g. 3.0",
          unknown: "I don't know the dimensions yet",
          unknownHint:
            "No problem – we'll show how much space each model needs and check the spot together.",
          invalid: "Enter a value between 0.5 and 30 m",
          planTitle: "Your space to scale",
          planTitleUnknown: "How much space each model needs",
          yourArea: "Your space",
          fits: "fits",
          rotated: "fits sideways",
          tooSmall: "doesn't fit",
          foundationNote:
            "Outlines show the recommended foundation (sauna + 10 cm on each side). Final installation requires an on-site check.",
          photoNote:
            "Have a photo of the spot? Reply to the project e-mail with it – it helps during the consultation.",
        },
        preparation: {
          title: "What is already in place at the installation site?",
          description:
            "“I don't know” won't block the result – we'll just flag what needs checking.",
          foundation: {
            label: "Foundation",
            options: [
              { value: "ready", label: "Ready" },
              { value: "todo", label: "Needs preparing" },
              { value: "unknown", label: "I don't know" },
            ],
          },
          power: {
            label: "Power",
            options: [
              { value: "ready", label: "Connection prepared" },
              { value: "check", label: "Needs checking" },
              { value: "unknown", label: "I don't know" },
            ],
          },
        },
        climate: {
          title: "What kind of sauna climate do you enjoy?",
          description:
            "Based on this we'll suggest a heater and explain why. The final choice is confirmed before the offer.",
          options: [
            { value: "soft", label: "Gentle heat and frequent water on the stones", hint: "Soft, pleasant steam" },
            { value: "strong", label: "A stronger feeling of heat", hint: "An intense session" },
            { value: "design", label: "The heater's look matters most", hint: "The heater as part of the interior" },
            { value: "advise", label: "Advise me", hint: "We'll suggest a versatile choice" },
          ],
        },
        timing: {
          title: "When would you like to start using it?",
          description: "This helps us prepare the conversation – it doesn't change the model.",
          options: [
            { value: "asap", label: "As soon as possible" },
            { value: "months", label: "Within a few months" },
            { value: "planning", label: "Just planning for now" },
          ],
        },
      },
      conflict: {
        eyebrow: "We need your decision",
        title: "A model for {people} doesn't fit the given space",
        body: "{needed} needs a {neededSize} foundation, and your space is {space}. Choose which condition you'd like to change.",
        noneFitsTitle: "None of the models fit the given space",
        noneFitsBody:
          "The smallest model, {smallest}, needs a {smallestSize} foundation, and your space is {space}. Check another location or talk to us.",
        acceptFallback: "I'll take {model} for {capacity} people",
        acceptFallbackHint: "Fits the given space",
        changeSpace: "I'll check another location for {needed}",
        changeSpaceHint: "Needs at least {size}",
        changePeople: "I'll change the number of people",
        changePeopleHint: "Back to the number of people",
        consult: "Let's talk about a solution",
        consultHint: "We'll help find a spot or a variant",
      },
      result: {
        eyebrow: "Your project",
        statusReady: "Looks like a fit",
        statusToConfirm: "To be confirmed",
        manualBadge: "Your choice",
        because: "We chose it because {usage}, and {spaceClause}.",
        manualBecause:
          "This is the model you picked – based on your answers our recommendation is {recommended}.",
        usagePhrase: {
          couple: "you usually bathe as a couple",
          family: "you bathe with your family",
          friends: "you bathe with friends",
          solo: "you mostly bathe on your own",
        },
        peoplePhrase: {
          "1-2": "you usually bathe as 1–2 people",
          "3-4": "you usually bathe as 3–4 people",
          "5-6": "you usually bathe as 5–6 people",
        },
        spaceClause: {
          fits: "the spot you gave allows a foundation for this model",
          rotated: "the spot you gave allows a foundation with the sauna placed sideways",
          unknown: "we'll check the dimensions of the spot together before installation",
        },
        saunaSize: "Sauna size",
        foundationSize: "recommended foundation",
        toCheck: "To check before installation",
        views: {
          exterior: "Exterior",
          interior: "Interior",
          drawing: "Dimension drawing",
        },
        whyTitle: "Why this model?",
        reasons: {
          capacity: "{model} has {capacity} {seats} – comfortable for {people} during a regular session.",
          capacityShort:
            "{model} has {capacity} {seats} – fewer than needed for {people}. You chose it deliberately.",
          fits: "The recommended {foundation} foundation fits your {space} space.",
          rotated: "The recommended {foundation} foundation fits your {space} space with the sauna placed sideways.",
          unknown: "You need at least {foundation} of space – we'll check it together before installation.",
          smallest: "It's the smallest model that meets your conditions – it takes up the least garden space.",
          upgradedSpace: "You want more room – instead of the smallest fitting model we suggest a larger cabin.",
          upgradedLounge:
            "A larger cabin gives more room on the benches – we'll confirm exact bench dimensions with you.",
          upgradeBlocked:
            "A larger model won't fit the given space, so we're staying with {model}.",
          alreadyLargest: "{model} is our largest model – the most space in the Regenerum line.",
          manual: "You picked {model} yourself – the other conditions are still met.",
        },
        heaterTitle: "Your heater choice",
        heaterDescription:
          "We only show heaters available for {model}. The technical choice and power supply are confirmed before the offer.",
        heaterSuggested: "Suggested",
        heaterSelected: "Selected",
        heaterChoose: "Choose this heater",
        heaterExperience: "Feel",
        heaterLook: "Look",
        heaterSupply: "Power supply",
        heaterWhy: {
          soft: "We suggest it because you enjoy gentle heat and frequent water on the stones.",
          strong: "We suggest it because you're after a stronger feeling of heat.",
          design: "We suggest it because the heater's look matters to you.",
          advise: "To start, we suggest a versatile choice – we'll compare all heaters with you.",
        },
        heaters: {
          cilindro: {
            experience:
              "Soft, pleasant steam and 90 kg of stones – handles frequent water well.",
            look: "A steel column standing by the benches – modern, technical look.",
            supply: "400V 3N~",
          },
          legend: {
            experience:
              "The most stones (100 kg) and 10.8 kW. Pour water on top for stronger steam, on the sides for softer.",
            look: "A black column with a rustic character – a bold interior accent.",
            supply: "230V, 230V 3~ or 400V 3N~",
          },
          spirit: {
            experience: "Fast heat-up thanks to vent channels, 60 kg of stones.",
            look: "Wall-mounted, rounded and modern – keeps the floor free.",
            supply: "400V 3N~",
          },
        },
        includedTitle: "What's included as standard",
        includedExtra: "Transport and professional installation",
        prepareTitle: "What to prepare on your side",
        prepare: {
          space: "Measure the spot – you need at least {size}.",
          foundationReady: "Foundation ready – make sure it's at least {size}, level and load-bearing.",
          foundationTodo: "Prepare a level, load-bearing foundation of at least {size} – a concrete slab, blocks or pavers.",
          foundationUnknown: "We'll check together whether your current base is suitable – at least {size} is needed.",
          powerReady: "Connection ready – we'll confirm it matches the chosen heater ({supply}).",
          powerCheck: "An electrician should check the connection for the chosen heater ({supply}).",
          powerUnknown:
            "The electrical connection is provided by the client – the chosen heater needs: {supply}. We'll help you check.",
          access: "Access to the installation site for delivery and the installation crew.",
          foundationLink: "See foundation types",
        },
        checks: {
          space: "site dimensions",
          foundation: "foundation",
          power: "electrical connection",
          access: "delivery access",
        },
        and: "and",
        priceTitle: "Price",
        priceFrom: "Price from",
        priceGross: "gross",
        priceNote:
          "Exact offer after confirming the heater and installation conditions. The price includes standard equipment, transport and installation.",
        alternativesTitle: "See what changes with a different model",
        alternativeSeats: "Seats",
        alternativeSize: "Sauna",
        alternativeFoundation: "Foundation",
        alternativePrice: "Price from",
        alternativeSelect: "Choose {model}",
        alternativeRecommended: "Back to recommendation",
        alternativeNoSeats: "Not enough seats for {people}",
        alternativeNoSpace: "Doesn't fit your space",
        ctaProject: "Send me my project",
        ctaInstallation: "Let's talk about installation",
        adjust: "Change answers",
      },
      summary: {
        title: "Your configuration",
        edit: "Change",
        model: "Model",
        heater: "Heater",
        usage: "How you'll use it",
        people: "Number of people",
        comfort: "Comfort",
        space: "Space",
        spaceUnknown: "Dimensions unknown",
        foundation: "Foundation",
        power: "Power",
        climate: "Session climate",
        timing: "Timing",
        status: "Status",
        checks: "To check",
        intent: "Contact reason",
        recommended: "Configurator recommendation",
        conflict: "Conflicting conditions – the group size does not fit the given space",
        intentProject: "Send project",
        intentInstallation: "Installation call",
        empty: "—",
      },
      contact: {
        projectTitle: "Where should we send your project?",
        projectDescription:
          "We'll send a summary of your configuration with the offer, and our advisor will see all your answers.",
        installationTitle: "Let's talk about installation",
        installationDescription:
          "We'll call to discuss the spot, the foundation and the power connection – with your project in front of us.",
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
      phone: "Phone",
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
      modelDescription: "Choose the model you'd like a quote for.",
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
    tagline: "Premium garden saunas crafted from thermally modified ThermoWood spruce.",
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
    follow: "Follow us",
    instagram: "Instagram",
    facebook: "Facebook",
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
