# White-Label Interactive Quiz Engine (Inspired by Cake.me "What Cake R U?")

White-label interactive psychometric quiz platform engineered for brands, agencies, and talent platforms to drive viral engagement, organic social shares (Instagram Stories format), and high-converting B2B lead generation.

## 🚀 Key Features

1. **Config-Driven White-Labeling (`QuizConfig`):**
   - Per-brand theming (Colors, Logo, Tagline, Custom CTAs).
   - Zero hardcoded logic — completely modular questionnaire and scoring trees.
2. **Holland RIASEC Code Engine:**
   - Evaluates 6 key archetypes: Realistic (R), Investigative (I), Artistic (A), Social (S), Enterprising (E), Conventional (C).
   - Auto-advance slide mechanics with low friction (2 binary choices per slide).
3. **B2B Lead Generation Gate:**
   - Seamless lead capture form before revealing persona cards.
   - Boosts conversion rates compared to static lead capture forms.
4. **Shareable Vertical Persona Card:**
   - 9:16 vertical card layout optimized for mobile screens & Instagram Story shares.
   - Includes Workplace Superpowers, Work Besties, Ideal Roles, and Actionable Watchouts.

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS (Dark Bento Theme)
- **Delight & Animations:** Lucide Icons, Canvas Confetti
- **Language:** TypeScript

## ☁️ Deployment ke Cloudflare Pages (100% Free & Unlimited Bandwidth)

Aplikasi telah dikonfigurasi menggunakan mode **Next.js Static Export (`output: 'export'`)** yang cocok sempurna untuk **Cloudflare Pages**:
- **0 Biaya Server:** Cloudflare Pages gratis selamanya dengan **unlimited bandwidth** dan **unlimited requests** untuk static assets.
- **Global Edge Network:** Kecepatan akses ultra-cepat di 300+ kota di seluruh dunia (termasuk edge Jakarta).
- **Custom Domain & SSL Gratis:** Brand bisa memasang subdomain mereka sendiri (misal: `quiz.namabrand.com`) dengan SSL otomatis dari Cloudflare.
- **Client-Side HD Export:** Export kartu Instagram Story berjalan di browser user (`html-to-image`), tanpa beban server.

### Cara Deploy ke Cloudflare Pages:

#### Opsi 1: Otomatis via Git (Direkomendasikan untuk Production)
1. Hubungkan repo ini ke akun Cloudflare di dashboard **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
2. Masukkan konfigurasi build:
   - **Framework preset:** `Next.js (Static Export)`
   - **Build command:** `pnpm build`
   - **Build output directory:** `out`
3. Klik **Save and Deploy**. Cloudflare akan auto-deploy setiap kali ada git commit!

#### Opsi 2: Deploy Instan via CLI (Wrangler)
Jalankan script deploy:
```bash
# Login satu kali (bila belum login)
npx wrangler login

# Eksekusi build & deploy langsung ke Cloudflare Pages
./deploy/deploy-cloudflare.sh [nama-project]
```

## 📦 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the quiz runner.
