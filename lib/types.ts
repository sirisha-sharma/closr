export type Plan = 'free' | 'starter' | 'pro' | 'agency';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: Plan;
  paddle_customer_id: string | null;
  paddle_subscription_id: string | null;
  generations_used: number;
  generations_reset_at: string;
  created_at: string;
  updated_at: string;
}

export type ProposalStatus = 'draft' | 'sent' | 'won' | 'lost';

export type DISCType = 'D' | 'I' | 'S' | 'C';
export type DISCLabel = 'Dominant' | 'Influential' | 'Steady' | 'Conscientious';

export interface DISCProfile {
  disc_type: DISCType;
  disc_label: DISCLabel;
  confidence: number;
  summary: string;
  communication_style: {
    prefers: string[];
    avoids: string[];
    decision_driver: string;
    email_tone: string;
  };
  pain_triggers: string[];
  power_words: string[];
  avoid_words: string[];
  opening_strategy: string;
}

export interface ProposalSection {
  title: string;
  content: string;
}

export interface ProposalContent {
  headline: string;
  hook: string;
  problem_section: ProposalSection;
  solution_section: ProposalSection;
  scope_section: { title: string; items: string[] };
  timeline: string;
  investment: { note: string; range: string };
  cta: string;
  ps_line: string;
}

export interface EmailVariant {
  variant_name: string;
  strategy: string;
  subject_line: string;
  preview_text: string;
  body: string;
  psychology_note: string;
}

export interface EmailVariants {
  emails: EmailVariant[];
  follow_up: {
    subject_line: string;
    body: string;
    psychology_note: string;
  };
}

export interface Proposal {
  id: string;
  user_id: string;
  prospect_name: string | null;
  prospect_bio: string;
  disc_profile: DISCProfile | null;
  service_description: string | null;
  proposal_content: ProposalContent | null;
  email_variants: EmailVariants | null;
  status: ProposalStatus;
  created_at: string;
  updated_at: string;
}

export interface PlanLimits {
  generations: number | 'unlimited';
  monthly_reset: boolean;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: { generations: 3, monthly_reset: false },
  starter: { generations: 10, monthly_reset: true },
  pro: { generations: 'unlimited', monthly_reset: false },
  agency: { generations: 'unlimited', monthly_reset: false },
};

export interface UsageStats {
  used: number;
  limit: number | 'unlimited';
  plan: Plan;
  reset_at: string;
}
