import {
  landingConfigSchema,
  type LandingConfig,
  type LandingConfigInput,
} from "../schemas/config";

const input: LandingConfigInput = {
  site: {
    brand: { name: "Kanaku" },
    locale: "en",
    labels: {
      skipToContent: "Skip to content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      primaryNav: "Primary",
      footerNav: "Footer",
      homeLink: "{brand} home",
      toggleTheme: "Toggle light and dark theme",
      emptyPage: "This page has no content yet.",
      faqNoAnswer: "Answer coming soon.",
      errorTitle: "Something went wrong",
      errorMessage: "An unexpected error occurred. Please try again.",
      retry: "Try again",
    },
    seo: {
      title: "Kanaku — Spend smart. Grow faster.",
      description:
        "Kanaku gives you a real-time view of every rupee — track expenses, control budgets and make confident money decisions.",
    },
  },
  theme: { modes: ["light", "dark"], defaultMode: "system" },
  flags: {},
  notFound: {
    heading: "This page is still balancing its books",
    description:
      "Our number-crunchers are working overtime on it. Hang tight — it'll be worth every rupee.",
    progress: { label: "Crunching numbers…", value: 65 },
    secondaryCta: { label: "Take me home", href: "/" },
  },
  sections: [
    {
      id: "top",
      type: "navbar",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
      secondaryCta: { label: "Log in", href: "/login", variant: "outline-inverse" },
      primaryCta: { label: "Get started free", href: "/signup" },
      themeToggle: true,
    },
    {
      id: "hero",
      type: "hero",
      badge: "Expense tracking for modern professionals",
      headline: [{ text: "Spend smart." }, { text: "Grow faster.", accent: true }],
      description:
        "Kanaku gives you a real-time view of every rupee — track expenses, control budgets and make confident money decisions.",
      primaryCta: { label: "Get started free", href: "/signup", icon: "arrow-right" },
      secondaryCta: {
        label: "See how it works",
        href: "#how-it-works",
        variant: "outline-inverse",
      },
      note: "Free to start · No card required · Works on any device",
      visual: {
        kind: "overview-card",
        label: "November overview",
        value: "₹46,580",
        caption: "saved of ₹85,000 earned",
        bars: [
          { value: 84 },
          { value: 105 },
          { value: 73 },
          { value: 123 },
          { value: 98 },
          { value: 140, highlight: true },
        ],
        floating: { label: "Food budget", value: "₹1,550 left", progress: 85 },
      },
    },
    {
      id: "features",
      type: "features",
      eyebrow: "Features",
      title: "Everything you need to manage spending.",
      items: [
        {
          icon: "plus",
          title: "Record in seconds",
          description: "Add a spend in two taps with smart categories and quick-add favourites.",
        },
        {
          icon: "wallet",
          title: "Smart budgets",
          description: "Set limits per category and get a gentle nudge before you cross them.",
        },
        {
          icon: "chart",
          title: "Actionable reports",
          description: "See trends, top categories and month-on-month changes at a glance.",
        },
        {
          icon: "repeat",
          title: "Recurring payments",
          description: "Rent, subscriptions and salary are logged for you on schedule.",
        },
        {
          icon: "receipt",
          title: "Receipt vault",
          description: "Snap a bill and keep it safely attached to the transaction.",
        },
        {
          icon: "bell",
          title: "Real-time alerts",
          description: "Bill reminders and budget warnings arrive right when they matter.",
        },
      ],
    },
    {
      id: "how-it-works",
      type: "steps",
      title: "Up and running in three steps",
      items: [
        {
          title: "Create your account",
          description: "Sign up free with email or Google in under a minute.",
        },
        {
          title: "Set your budget",
          description: "Tell Kanaku your monthly income and limits for each category.",
        },
        {
          title: "Track and thrive",
          description: "Log spends as they happen and watch your savings rise.",
        },
      ],
    },
    {
      id: "pricing",
      type: "pricing",
      title: "Simple, transparent pricing",
      plans: [
        {
          name: "Starter",
          price: { text: "Free" },
          features: ["Unlimited transactions", "Up to 5 budgets", "Monthly reports"],
          cta: { label: "Start free", href: "/signup", variant: "outline-primary" },
        },
        {
          name: "Pro",
          // Default placeholder amount until the admin sets the real price.
          price: { text: "₹199", suffix: "/ month" },
          badge: "Most popular",
          highlighted: true,
          features: [
            "Everything in Starter",
            "Unlimited budgets & recurring",
            "Receipt vault & PDF exports",
            "Smart alerts",
          ],
          cta: { label: "Upgrade to Pro", href: "/signup", variant: "accent" },
        },
      ],
    },
    {
      id: "faq",
      type: "faq",
      title: "Frequently asked questions",
      // TODO(content): answers were not provided in the design; add them via config/API.
      items: [
        { question: "Is Kanaku free to use?" },
        { question: "Does Kanaku connect to my bank?" },
        { question: "Can I use it on my phone?" },
        { question: "Can I export my data?" },
      ],
    },
    {
      id: "get-started",
      type: "cta",
      title: "Take control of your finances today.",
      description: "Join Kanaku today and set up your account in under two minutes.",
      cta: { label: "Create my free account", href: "/signup", variant: "dark" },
    },
    {
      id: "footer",
      type: "footer",
      tagline: "Spend smart. Grow faster.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ],
        },
      ],
      copyright: "© 2026 Kanaku. All rights reserved.",
    },
  ],
};

/** Content supplied in the design files. Validated at load so a bad edit fails fast. */
export const defaultLandingConfig: LandingConfig = landingConfigSchema.parse(input);
