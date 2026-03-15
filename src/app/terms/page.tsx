import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Closr',
  description: 'Terms of Service for Closr, the AI-powered proposal and cold email generation platform.',
};

const LAST_UPDATED = 'March 15, 2026';
const CONTACT_EMAIL = 'legal@closr.io';
const COMPANY = 'Closr';
const WEBSITE = 'closr-sand.vercel.app';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-medium text-[#F97316] mb-3 uppercase tracking-wider">Legal</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#FAFAFA] mb-4">Terms of Service</h1>
            <p className="text-[#71717A] text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-[#A1A1AA] leading-relaxed">

            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using {COMPANY} (&quot;the Service&quot;) at {WEBSITE}, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service. These Terms constitute a legally binding agreement between you and {COMPANY}.
              </p>
              <p>
                We reserve the right to update these Terms at any time. We will notify users of material changes by posting the updated Terms on the Service with a revised &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the updated Terms.
              </p>
            </Section>

            <Section title="2. Description of Service">
              <p>
                {COMPANY} is a software-as-a-service platform that uses artificial intelligence to help B2B freelancers and agencies generate personalized business proposals and cold outreach emails based on DISC behavioral profiling. The Service is provided &quot;as is&quot; and is subject to change without notice.
              </p>
            </Section>

            <Section title="3. Account Responsibilities">
              <p>To use the Service, you must create an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete registration information.</li>
                <li>Maintain the security of your password and accept responsibility for all activity under your account.</li>
                <li>Notify us immediately of any unauthorized use of your account at {CONTACT_EMAIL}.</li>
                <li>Not share your account credentials with any third party.</li>
              </ul>
              <p>
                You are responsible for all content generated through your account. {COMPANY} reserves the right to suspend or terminate accounts that violate these Terms.
              </p>
            </Section>

            <Section title="4. Acceptable Use">
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Generate content that is false, defamatory, misleading, fraudulent, or deceptive.</li>
                <li>Violate any applicable local, national, or international law or regulation.</li>
                <li>Send unsolicited commercial communications (spam) in violation of applicable law.</li>
                <li>Infringe upon the intellectual property rights of any third party.</li>
                <li>Attempt to gain unauthorized access to the Service or its related systems.</li>
                <li>Use automated means to access the Service in a manner that exceeds reasonable usage or that could harm the Service.</li>
                <li>Resell or sublicense access to the Service without prior written consent.</li>
              </ul>
              <p>
                We reserve the right to investigate and take appropriate action against violations of this section, including removing content, suspending accounts, and reporting to law enforcement.
              </p>
            </Section>

            <Section title="5. Payment and Billing">
              <p>
                Paid plans are billed on a recurring monthly basis through our payment processor, Paddle. By subscribing to a paid plan, you authorize Paddle to charge your chosen payment method on a recurring basis.
              </p>
              <ul>
                <li><strong className="text-[#FAFAFA]">Billing cycle:</strong> Subscriptions renew automatically on the same date each month.</li>
                <li><strong className="text-[#FAFAFA]">Cancellation:</strong> You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period; you will retain access to paid features until then.</li>
                <li><strong className="text-[#FAFAFA]">Refunds:</strong> We offer a 14-day money-back guarantee on all paid plans. Requests must be submitted within 14 days of the original purchase to {CONTACT_EMAIL}.</li>
                <li><strong className="text-[#FAFAFA]">Price changes:</strong> We reserve the right to change subscription prices at any time. We will provide at least 30 days&apos; notice before any price changes affect your subscription.</li>
                <li><strong className="text-[#FAFAFA]">Taxes:</strong> Prices are exclusive of any applicable taxes. You are responsible for paying all taxes associated with your use of the Service.</li>
              </ul>
            </Section>

            <Section title="6. Free Plan">
              <p>
                {COMPANY} offers a free tier that includes a limited number of proposal generations. Free-tier usage limits are subject to change. {COMPANY} reserves the right to modify, suspend, or discontinue the free tier at any time with reasonable notice.
              </p>
            </Section>

            <Section title="7. Intellectual Property">
              <p>
                <strong className="text-[#FAFAFA]">Our IP:</strong> The Service, including its software, design, and content (excluding user-generated content), is the exclusive property of {COMPANY} and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works from the Service without our express written permission.
              </p>
              <p>
                <strong className="text-[#FAFAFA]">Your content:</strong> You retain ownership of all text and data you input into the Service (&quot;Input&quot;) and all proposals and emails generated using that Input (&quot;Output&quot;). By using the Service, you grant {COMPANY} a limited, non-exclusive, royalty-free license to process your Input solely to provide and improve the Service.
              </p>
              <p>
                <strong className="text-[#FAFAFA]">AI-generated content:</strong> Output generated by the Service is provided for your business use. You are solely responsible for reviewing Output before use and for ensuring it complies with applicable laws and does not infringe any third-party rights.
              </p>
            </Section>

            <Section title="8. Third-Party Services">
              <p>
                The Service integrates with third-party services including OpenAI (AI processing), Supabase (data storage and authentication), and Paddle (payment processing). Your use of these services is subject to their respective terms and privacy policies. {COMPANY} is not responsible for the actions, content, or policies of any third-party service.
              </p>
            </Section>

            <Section title="9. Disclaimer of Warranties">
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. {COMPANY.toUpperCase()} DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY AI-GENERATED CONTENT.
              </p>
            </Section>

            <Section title="10. Limitation of Liability">
              <p>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {COMPANY.toUpperCase()} AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF (A) THE AMOUNTS PAID BY YOU TO {COMPANY.toUpperCase()} IN THE TWELVE (12) MONTHS PRIOR TO THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).
              </p>
            </Section>

            <Section title="11. Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless {COMPANY} and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any applicable law or third-party rights; or (d) any content you submit through the Service.
              </p>
            </Section>

            <Section title="12. Termination">
              <p>
                <strong className="text-[#FAFAFA]">By you:</strong> You may stop using the Service and delete your account at any time from your account settings.
              </p>
              <p>
                <strong className="text-[#FAFAFA]">By us:</strong> We may suspend or terminate your access to the Service immediately, without prior notice or liability, if you breach these Terms, engage in fraudulent or illegal activity, or if we discontinue the Service. Upon termination, your right to use the Service ceases immediately.
              </p>
              <p>
                Sections 7, 9, 10, 11, 12, 13, and 14 shall survive termination.
              </p>
            </Section>

            <Section title="13. Governing Law and Disputes">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which {COMPANY} operates, without regard to its conflict of law provisions. Any dispute arising from these Terms or your use of the Service shall first be attempted to be resolved informally by contacting us at {CONTACT_EMAIL}. If informal resolution fails, disputes shall be resolved through binding arbitration or in the courts of competent jurisdiction.
              </p>
            </Section>

            <Section title="14. General">
              <ul>
                <li><strong className="text-[#FAFAFA]">Entire agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and {COMPANY} regarding the Service.</li>
                <li><strong className="text-[#FAFAFA]">Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force.</li>
                <li><strong className="text-[#FAFAFA]">Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</li>
                <li><strong className="text-[#FAFAFA]">Assignment:</strong> You may not assign your rights or obligations under these Terms without our prior written consent.</li>
              </ul>
            </Section>

            <Section title="15. Contact">
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <p>
                <strong className="text-[#FAFAFA]">{COMPANY}</strong><br />
                Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#F97316] hover:underline">{CONTACT_EMAIL}</a><br />
                Website: <a href={`https://${WEBSITE}`} className="text-[#F97316] hover:underline">{WEBSITE}</a>
              </p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-[#FAFAFA] mb-4 pb-2 border-b border-[#27272A]">{title}</h2>
      <div className="space-y-3 text-[#A1A1AA] text-sm leading-7">
        {children}
      </div>
    </section>
  );
}
