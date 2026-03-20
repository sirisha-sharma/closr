import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import type { ProposalContent, EmailVariants, DISCProfile } from '@/lib/types';
import { DISC_DISPLAY } from '@/lib/constants';
import { getDISCColor } from '@/lib/utils';

// Admin client to bypass RLS for public proposal pages
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const supabase = getAdminClient();
  const { data } = await supabase.from('proposals').select('prospect_name').eq('id', id).single();
  const name = data?.prospect_name ? `Proposal for ${data.prospect_name}` : 'Proposal';
  return { title: `${name} — Closr`, robots: { index: false } };
}

export default async function PublicProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getAdminClient();

  const { data: proposal, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !proposal) notFound();

  const content = proposal.proposal_content as ProposalContent | null;
  const disc = proposal.disc_profile as DISCProfile | null;
  const emails = proposal.email_variants as EmailVariants | null;

  if (!content) notFound();

  const discDisplay = disc ? (DISC_DISPLAY[disc.disc_type] ?? { label: disc.disc_label }) : null;
  const discColor = disc ? getDISCColor(disc.disc_type) : '#F97316';

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Top bar */}
      <div className="border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {disc && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-md"
                style={{ background: `${discColor}15`, color: discColor }}
              >
                {discDisplay?.label}
              </span>
            )}
            {proposal.prospect_name && (
              <span className="text-sm text-[#71717A]">for {proposal.prospect_name}</span>
            )}
          </div>
          <span className="text-xs text-[#3F3F46]">
            {new Date(proposal.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Headline */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#FAFAFA] mb-4 leading-tight tracking-[-0.02em]">
            {content.headline}
          </h1>
          {content.hook && (
            <p className="text-[#A1A1AA] text-lg leading-[1.6] max-w-[65ch]">
              {content.hook}
            </p>
          )}
        </div>

        {/* Objection preempt */}
        {content.objection_preempt && (
          <div className="mb-8 bg-[#F97316]/5 border border-[#F97316]/20 rounded-xl p-5">
            <p className="text-xs font-semibold text-[#F97316] uppercase tracking-wider mb-2">Before we dive in</p>
            <p className="text-sm text-[#A1A1AA] leading-[1.6]">{content.objection_preempt}</p>
          </div>
        )}

        {/* Problem */}
        {content.problem_section && (
          <Section title={content.problem_section.title}>
            <p className="text-[#A1A1AA] leading-[1.6] whitespace-pre-line">{content.problem_section.content}</p>
          </Section>
        )}

        {/* Solution */}
        {content.solution_section && (
          <Section title={content.solution_section.title}>
            <p className="text-[#A1A1AA] leading-[1.6] whitespace-pre-line">{content.solution_section.content}</p>
          </Section>
        )}

        {/* Pricing options */}
        {content.controlled_options && content.controlled_options.length > 0 && (
          <Section title="Investment Options">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.controlled_options.map((option, i) => (
                <div
                  key={option.name}
                  className={`rounded-xl p-4 border flex flex-col gap-2 ${
                    i === 1
                      ? 'border-[#F97316]/40 bg-[#F97316]/5'
                      : 'border-[#27272A] bg-[#111113]'
                  }`}
                >
                  {i === 1 && (
                    <span className="text-xs font-semibold text-[#F97316] uppercase tracking-wider">Recommended</span>
                  )}
                  <p className="text-sm font-semibold text-[#FAFAFA]">{option.name}</p>
                  <p className="text-2xl font-bold text-[#FAFAFA]">${option.price}</p>
                  <p className="text-xs text-[#71717A] leading-relaxed">{option.psych_anchor}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Scope (legacy) */}
        {content.scope_section && (
          <Section title={content.scope_section.title}>
            <ul className="flex flex-col gap-2">
              {content.scope_section.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                  <span className="text-[#22C55E] mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* CTA */}
        {content.cta && (
          <div className="mt-10 p-6 bg-[#111113] border border-[#27272A] rounded-xl">
            <p className="text-[#FAFAFA] text-lg font-semibold leading-relaxed mb-2">{content.cta}</p>
            {content.ps_line && (
              <p className="text-sm text-[#71717A] italic">{content.ps_line}</p>
            )}
          </div>
        )}

        {/* Email variants */}
        {emails && emails.emails && emails.emails.length > 0 && (
          <div className="mt-14">
            <h2 className="font-serif text-2xl text-[#FAFAFA] mb-6 tracking-[-0.02em]">Cold Email Variants</h2>
            <div className="flex flex-col gap-5">
              {emails.emails.map((email) => (
                <div key={email.variant_name} className="bg-[#111113] border border-[#27272A] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#F97316] uppercase tracking-wider">{email.variant_name}</span>
                    {(email.lever_used || email.psychology_note) && (
                      <span className="text-xs text-[#3F3F46]">{email.lever_used || email.psychology_note}</span>
                    )}
                  </div>
                  <p className="text-xs text-[#71717A] mb-1">Subject</p>
                  <p className="text-sm font-medium text-[#FAFAFA] mb-3">{email.subject_line}</p>
                  <p className="text-sm text-[#A1A1AA] leading-[1.6] whitespace-pre-line">{email.body}</p>
                </div>
              ))}
            </div>

            {emails.follow_up && (
              <div className="mt-5 bg-[#18181B] border border-[#27272A] rounded-xl p-5">
                <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-3 block">Follow-up</span>
                <p className="text-xs text-[#71717A] mb-1">Subject</p>
                <p className="text-sm font-medium text-[#FAFAFA] mb-3">{emails.follow_up.subject_line}</p>
                <p className="text-sm text-[#A1A1AA] leading-[1.6] whitespace-pre-line">{emails.follow_up.body}</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272A] mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <span className="text-xs text-[#3F3F46]">Powered by Closr</span>
          <a href="/" className="text-xs text-[#3F3F46] hover:text-[#71717A] transition-colors">
            closr.app
          </a>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-[#FAFAFA] mb-4 pb-2 border-b border-[#27272A]">{title}</h2>
      {children}
    </div>
  );
}
