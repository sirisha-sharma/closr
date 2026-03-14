export const APP_NAME = 'Closr';
export const APP_DESCRIPTION = 'Psychology-powered proposal and cold outreach generator for B2B freelancers';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const PRICING = {
  starter: {
    name: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    features: [
      '10 proposals per month',
      'DISC psychology analysis',
      'Cold email variants',
      'PDF export',
      'Basic analytics',
    ],
    limit: 10,
  },
  pro: {
    name: 'Pro',
    price: 79,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: [
      'Unlimited proposals',
      'DISC psychology analysis',
      'Cold email variants',
      'PDF export',
      'Advanced analytics',
      'Priority AI processing',
    ],
    limit: -1,
    popular: true,
  },
  agency: {
    name: 'Agency',
    price: 199,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID || '',
    features: [
      'Unlimited proposals',
      'DISC psychology analysis',
      'Cold email variants',
      'PDF export',
      'Team features (5 seats)',
      'Priority support',
      'White-label export',
      'API access',
    ],
    limit: -1,
  },
};

export const DISC_DESCRIPTIONS: Record<string, string> = {
  D: 'Results-driven and decisive. Values efficiency and direct communication.',
  I: 'Enthusiastic and collaborative. Values relationships and recognition.',
  S: 'Stable and supportive. Values reliability and teamwork.',
  C: 'Analytical and systematic. Values accuracy and quality.',
};

export const GENERATION_STEPS = [
  { id: 1, message: 'Analyzing prospect psychology...', duration: 3000 },
  { id: 2, message: 'Building behavioral profile...', duration: 2000 },
  { id: 3, message: 'Generating personalized proposal...', duration: 4000 },
  { id: 4, message: 'Crafting email variants...', duration: 3000 },
  { id: 5, message: 'Applying psychological triggers...', duration: 2000 },
];

export const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/generate', label: 'Generate', icon: 'Sparkles' },
  { href: '/proposals', label: 'Proposals', icon: 'FileText' },
  { href: '/settings', label: 'Settings', icon: 'Settings' },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Brand Strategist',
    company: 'Freelance',
    avatar: 'SC',
    content: 'Closr helped me close a $15k retainer on my first try. The DISC analysis was eerily accurate.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Web Developer',
    company: 'MR Studio',
    avatar: 'MR',
    content: 'I used to spend 3 hours writing proposals. Now it takes 10 minutes and my close rate went from 20% to 60%.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Content Consultant',
    company: 'Freelance',
    avatar: 'PN',
    content: 'The psychology-based emails get replies from people who never respond to cold outreach. It\'s like a cheat code.',
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How accurate is the DISC analysis?',
    answer: 'Our AI achieves approximately 85% accuracy when analyzing detailed bios of 200+ words. The analysis uses linguistic pattern recognition to identify behavioral traits from communication style.',
  },
  {
    question: 'What counts as one generation?',
    answer: 'One generation includes a complete DISC analysis, a full proposal, and 3 cold email variants. This is counted as one unit toward your plan limit.',
  },
  {
    question: 'Can I edit the generated proposals?',
    answer: 'Absolutely. All generated content is fully editable. We recommend personalizing with specific details about your previous work for best results.',
  },
  {
    question: 'What happens if I reach my monthly limit?',
    answer: 'On the Starter plan, generations reset at the start of each billing cycle. On Free, limits are lifetime totals. Upgrade anytime for more generations.',
  },
  {
    question: 'Is my prospect\'s data private?',
    answer: 'Yes. Prospect bios are processed but not stored beyond your proposal. We never use your data to train AI models. All data is encrypted and stored securely.',
  },
  {
    question: 'Can I export proposals as PDF?',
    answer: 'Yes, all paid plans include PDF export. The PDF is professionally formatted with your proposal and email variants ready to send.',
  },
];
