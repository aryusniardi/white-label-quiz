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

## ☁️ Deployment ke AWS CloudFront + S3 (Zero-Vercel Cost)

Aplikasi telah dikonfigurasi menggunakan mode **Next.js Static Export (`output: 'export'`)** sehingga:
- Menghasilkan static HTML/CSS/JS murni di folder `/out`.
- Dapat di-host langsung di private S3 bucket dan di-distribusikan global via AWS CloudFront CDN.
- Biaya operasional mendekati **$0 (masuk AWS Free Tier)** tanpa subscription Vercel Pro.
- Export gambar kartu persona berjalan 100% di client-side browser menggunakan `html-to-image` (zero serverless image execution fee).

### Langkah Deploy ke AWS:
1. Jalankan template CloudFormation di folder `deploy/cloudformation.yaml` via AWS Console atau CLI untuk membuat S3 Bucket + CloudFront OAC.
2. Deploy artefak menggunakan script:
   ```bash
   ./deploy/deploy-s3.sh <nama-s3-bucket> <distribution-id>
   ```

## 📦 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the quiz runner.
