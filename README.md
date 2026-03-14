# Closr

Psychology-powered proposal and cold outreach generator for B2B freelancers.

## Overview

Closr analyzes a prospect's LinkedIn bio using DISC behavioral psychology, then generates a personalized proposal and 3 cold email variants tailored to their communication style.

## Tech Stack

- **Next.js 14+** (App Router)
- **Tailwind CSS v4**
- **Supabase** (Auth + Postgres)
- **OpenAI GPT-4o-mini**
- **Paddle** (Checkout + Customer Portal)
- **@react-pdf/renderer** (PDF export)
- **Framer Motion** (animations)
- **TypeScript**

---

## Local Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd closr
npm install
cp .env.example .env.local
```

### 2. Supabase Database

Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor):

```sql
-- Profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'agency')),
  paddle_customer_id TEXT,
  paddle_subscription_id TEXT,
  generations_used INTEGER NOT NULL DEFAULT 0,
  generations_reset_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Proposals table
CREATE TABLE public.proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  prospect_name TEXT,
  prospect_bio TEXT NOT NULL,
  disc_profile JSONB,
  service_description TEXT,
  proposal_content TEXT,
  email_variants JSONB,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'won', 'lost')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own proposals" ON public.proposals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own proposals" ON public.proposals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own proposals" ON public.proposals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own proposals" ON public.proposals FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_proposals_user_id ON public.proposals(user_id);
CREATE INDEX idx_proposals_created_at ON public.proposals(created_at DESC);
```

### 3. Supabase Auth Configuration

In your Supabase dashboard:
1. Go to **Authentication → URL Configuration**
2. Set **Site URL** to `http://localhost:3000`
3. Add `http://localhost:3000/auth/callback` to **Redirect URLs**
4. Enable **Email** provider (magic link) in Authentication → Providers

### 4. Paddle Setup

1. Sign up at [paddle.com](https://paddle.com) and create a Sandbox account for development
2. In Paddle dashboard, create three subscription products:
   - **Starter** — $29/month
   - **Pro** — $79/month
   - **Agency** — $199/month
3. Copy each product's **Price ID** (starts with `pri_`) to `.env.local`
4. Get your **API Key** from Paddle → Developer → Authentication
5. Set up a webhook endpoint:
   - URL: `https://your-domain.com/api/webhook` (use ngrok for local dev)
   - Events to subscribe: `transaction.completed`, `subscription.updated`, `subscription.canceled`, `subscription.payment_failed`
   - Copy the **Webhook Secret** to `.env.local`

### 5. Fill in environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

OPENAI_API_KEY=sk-...

PADDLE_API_KEY=test_...
PADDLE_WEBHOOK_SECRET=pdl_ntfset_...
PADDLE_STARTER_PRICE_ID=pri_...
PADDLE_PRO_PRICE_ID=pri_...
PADDLE_AGENCY_PRICE_ID=pri_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "initial commit"
git remote add origin https://github.com/your-username/closr.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your `closr` repository
3. Vercel auto-detects Next.js — leave build settings as default
4. Click **Environment Variables** and add every variable from your `.env.local`
   - Change `NEXT_PUBLIC_APP_URL` to your Vercel production URL (e.g. `https://closr.vercel.app`)
5. Click **Deploy**

### 3. Post-deploy configuration

- **Supabase**: Add your Vercel URL to Supabase → Authentication → Redirect URLs:
  `https://closr.vercel.app/auth/callback`
- **Paddle**: Update your webhook URL to `https://closr.vercel.app/api/webhook`

---

## Features

- **DISC Psychology Analysis** — Detects Dominant, Influential, Steady, or Conscientious personality types
- **Personalized Proposals** — Complete 8-section proposal tailored to the prospect's profile
- **3 Cold Email Variants** — Direct, Story, and Question approaches with psychology notes
- **PDF Export** — Professional PDF download
- **Proposal History** — Save, track, and manage all proposals
- **Status Tracking** — Draft → Sent → Won / Lost
- **Usage Metering** — Tracked against plan limits
- **Paddle Billing** — Subscription management with customer portal

## Plan Limits

| Plan    | Price   | Generations        |
|---------|---------|--------------------|
| Free    | $0      | 3 total (lifetime) |
| Starter | $29/mo  | 10 per month       |
| Pro     | $79/mo  | Unlimited          |
| Agency  | $199/mo | Unlimited          |

## Project Structure

```
closr/
├── src/app/              # Next.js App Router pages
│   ├── (auth)/           # Login + auth callback
│   ├── (dashboard)/      # Protected dashboard pages
│   └── api/              # API routes
├── components/
│   ├── ui/               # Reusable UI components
│   ├── landing/          # Landing page sections
│   ├── dashboard/        # Dashboard components
│   ├── generate/         # Generation flow components
│   └── shared/           # Navbar, Footer, Logo
└── lib/
    ├── supabase/          # Supabase client + server + middleware
    ├── paddle/            # Paddle client + config
    ├── openai/            # OpenAI client + prompts + types
    ├── constants.ts
    ├── types.ts
    └── utils.ts
```
