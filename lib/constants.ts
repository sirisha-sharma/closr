export const APP_NAME = 'Closr';
export const APP_DESCRIPTION = 'Prospect-matched proposals and cold emails for B2B freelancers who close deals';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const PRICING = {
  starter: {
    name: 'Starter',
    price: 29,
    priceId: process.env.PADDLE_STARTER_PRICE_ID || '',
    features: [
      '10 proposals per month',
      'Prospect analysis — communication style & decision drivers',
      '3 email variants per proposal',
      'PDF export',
      'Email support',
    ],
    limit: 10,
  },
  pro: {
    name: 'Pro',
    price: 79,
    priceId: process.env.PADDLE_PRO_PRICE_ID || '',
    features: [
      'Unlimited proposals',
      'Deep prospect intelligence — understands how they think, decide, and buy',
      '3 email variants + follow-up generator',
      'Auto-adapts your writing style to match your prospect',
      'PDF export',
      'Priority processing',
    ],
    limit: -1,
    popular: true,
  },
  agency: {
    name: 'Agency',
    price: 199,
    priceId: process.env.PADDLE_AGENCY_PRICE_ID || '',
    features: [
      'Everything in Pro',
      '5 team seats',
      'White-label PDFs',
      'API access',
      'Team analytics dashboard',
      'Dedicated support',
    ],
    limit: -1,
  },
};

export const DISC_DISPLAY: Record<string, { label: string; description: string }> = {
  D: { label: 'Direct & Results-Driven', description: 'Decisive, fast-moving, and focused on outcomes. Values efficiency and direct communication.' },
  I: { label: 'Enthusiastic & People-Focused', description: 'Energetic, collaborative, and motivated by relationships and recognition.' },
  S: { label: 'Steady & Relationship-First', description: 'Reliable, patient, and driven by trust. Prefers consistency and team harmony.' },
  C: { label: 'Analytical & Detail-Oriented', description: 'Systematic, precise, and quality-focused. Needs data and logic to make decisions.' },
};

export const DISC_DESCRIPTIONS: Record<string, string> = {
  D: 'Direct & Results-Driven',
  I: 'Enthusiastic & People-Focused',
  S: 'Steady & Relationship-First',
  C: 'Analytical & Detail-Oriented',
};

export const GENERATION_STEPS = [
  { id: 1, message: 'Reading your prospect...', duration: 3000 },
  { id: 2, message: 'Building their communication profile...', duration: 2000 },
  { id: 3, message: 'Writing your proposal...', duration: 4000 },
  { id: 4, message: 'Crafting 3 email variants...', duration: 3000 },
  { id: 5, message: 'Finishing up...', duration: 2000 },
];

export const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/generate', label: 'Generate', icon: 'FileEdit' },
  { href: '/proposals', label: 'Proposals', icon: 'FileText' },
  { href: '/settings', label: 'Settings', icon: 'Settings' },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Brand Strategist',
    company: 'Freelance',
    avatar: 'SC',
    content: 'Closed a $15k retainer on my first try. The prospect profile was eerily accurate — it felt like I\'d done months of research in 60 seconds.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Web Developer',
    company: 'MR Studio',
    avatar: 'MR',
    content: 'I used to spend 3 hours writing proposals. Now it takes 10 minutes and my close rate went from 20% to 60%. Should\'ve found this sooner.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Content Consultant',
    company: 'Freelance',
    avatar: 'PN',
    content: 'The emails get replies from people who never respond to cold outreach. It\'s like the proposal already knows exactly what they care about.',
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How is this different from ChatGPT?',
    answer: 'ChatGPT writes the same generic proposal for every prospect. Closr analyzes how your specific prospect communicates and thinks, then adapts every sentence — from the opening line to the CTA — to match their decision-making style. It\'s the difference between a form letter and a letter that feels like you read their mind.',
  },
  {
    question: 'How accurate is the prospect analysis?',
    answer: 'When given 200+ words of text (a LinkedIn bio, email, or about page), the analysis is accurate roughly 85% of the time. The more text you provide, the sharper the profile. You can always tweak the output if something feels off.',
  },
  {
    question: 'What counts as one generation?',
    answer: 'One generation covers everything: a full prospect profile, a complete proposal, and 3 email variants. Editing or re-exporting an existing proposal does not count against your limit.',
  },
  {
    question: 'Can I edit the generated proposals?',
    answer: 'Absolutely. All generated content is editable. We recommend personalizing with specific details about your previous work — the foundation is there, you just make it yours.',
  },
  {
    question: 'Is my prospect\'s data private?',
    answer: 'Yes. Prospect text you paste is processed to generate your proposal and stored privately in your account. We never use your data to train AI models, and you can delete everything at any time.',
  },
  {
    question: 'Can I share proposals with clients?',
    answer: 'Yes. Every proposal gets a shareable web link you can send directly to your prospect — no PDF attachment needed. You can also download a PDF for email or print.',
  },
];
