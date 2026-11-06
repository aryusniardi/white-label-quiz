import { QuizConfig } from '@/types/quiz';

export const demoQuizConfig: QuizConfig = {
  id: 'cake-career-v1',
  title: 'What Cake Are You?',
  subtitle: 'Temukan Destined Role & Gaya Kerjamu di Dunia Profesional',
  theme: {
    backgroundStyle: 'pure-black',
    backgroundColor: '#000000',
    cardBackground: '#111113',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    cardRadius: 28,
    textColor: '#F5F5F7',
    subtextColor: '#8E8E93',
    accentColor: '#FFFFFF',
    fontFamily: 'geist',
    enableNoiseOverlay: true,
  },
  brand: {
    brandId: 'sample-brand',
    brandName: 'CareerLab Studio',
    brandTagline: 'Empowering Next-Gen Talent & Brands',
    ctaUrl: 'https://example.com/careers',
    ctaText: 'Explore Opportunities for Your Role →',
  },
  questions: [
    {
      id: 'q1',
      stepNumber: 1,
      question: "Hari pertama masuk ke kantor/proyek baru, apa respon utamamu?",
      scenarioSubtitle: "Level 1: Onboarding Horizon",
      options: [
        { id: 'q1_a', text: "Langsung observasi dan bikin to-do list terstruktur.", targetTrait: 'C' },
        { id: 'q1_b', text: "Ngajak kenalan rekan tim untuk cairkan suasana.", targetTrait: 'S' }
      ]
    },
    {
      id: 'q2',
      stepNumber: 2,
      question: "Ketika menghadapi problem teknis yang rumit dan belum ada dokumentasinya...",
      scenarioSubtitle: "Level 2: The Ambiguity Challenge",
      options: [
        { id: 'q2_a', text: "Bongkar kodenya, baca data mendalam sampai ketemu root-cause.", targetTrait: 'I' },
        { id: 'q2_b', text: "Uji coba langsung secara hands-on dan cari workaround tercepat.", targetTrait: 'R' }
      ]
    },
    {
      id: 'q3',
      stepNumber: 3,
      question: "Dalam sesi brainstorming campaign atau pitching produk...",
      scenarioSubtitle: "Level 3: The Spark",
      options: [
        { id: 'q3_a', text: "Fokus ke visual, rasa, narasi unik yang belum pernah dibuat orang.", targetTrait: 'A' },
        { id: 'q3_b', text: "Fokus meyakinkan klien, selling point, dan potensi revenue-nya.", targetTrait: 'E' }
      ]
    },
    {
      id: 'q4',
      stepNumber: 4,
      question: "Pilih superpower kerja yang paling kamu inginkan di tas kerjamu:",
      scenarioSubtitle: "Level 4: Tool of Choice",
      options: [
        { id: 'q4_a', text: "Radar Sosial: Membaca dinamika tim & kebutuhan orang lain seketika.", targetTrait: 'S' },
        { id: 'q4_b', text: "Vision Orb: Melihat celah pasar dan peluang bisnis baru di depan.", targetTrait: 'E' }
      ]
    },
    {
      id: 'q5',
      stepNumber: 5,
      question: "Ketika deliverables berantakan dan timeline mepet...",
      scenarioSubtitle: "Level 5: Crisis Mode",
      options: [
        { id: 'q5_a', text: "Rombak prioritas, buat SOP emergency, pastikan checklist jalan rapi.", targetTrait: 'C' },
        { id: 'q5_b', text: "Eksplorasi solusi out-of-the-box yang melompati pola konvensional.", targetTrait: 'A' }
      ]
    },
    {
      id: 'q6',
      stepNumber: 6,
      question: "Momen apa yang bikin kamu merasa paling puas setelah seharian kerja?",
      scenarioSubtitle: "Level 6: True Fulfillment",
      options: [
        { id: 'q6_a', text: "Sistem yang kubangun bekerja sempurna dan minim bug.", targetTrait: 'R' },
        { id: 'q6_b', text: "Hipotesis rumit yang kuanalisis akhirnya terbukti akurat.", targetTrait: 'I' }
      ]
    }
  ],
  results: {
    'R': {
      traitCode: 'R',
      name: 'Layer Cake',
      titleBadge: 'Realistic • Pragmatic Craftsman',
      archetype: 'The Reliable Executor',
      tagline: 'Fokus pada hasil konkret, eksekusi solid, dan solusi praktis.',
      description: 'Kamu adalah pondasi yang menjaga kapal tetap berlayar. Menolak berteori tanpa bukti dan selalu siap terjun langsung menyelesaikan sistem.',
      strengths: ['Hands-on Problem Solving', 'High Reliability', 'Real-world Execution'],
      workStyle: 'Pragmatis, to-the-point, fokus aksi daripada rapat bertele-tele.',
      idealRole: 'Engineers, Operations Lead, Product Builders, Hardware/DevOps.',
      besties: 'Tiramisu (I) & Roll Cake (C)',
      watchout: 'Komunikasikan progres secara berkala ke tim agar tidak disalahpahami.',
      avatarIcon: '🍰'
    },
    'I': {
      traitCode: 'I',
      name: 'Tiramisu',
      titleBadge: 'Investigative • Deep Analytical Mind',
      archetype: 'The Strategic Mastermind',
      tagline: 'Mengurai benang kusut data menjadi strategi yang tajam.',
      description: 'Pemikir analitis dengan rasa ingin tahu tinggi. Menolak asumsi tanpa validasi dan mencari prinsip fundamental di balik setiap fenomena.',
      strengths: ['Deep Diagnostics', 'Logical Synthesis', 'Data-driven Intuition'],
      workStyle: 'Fokus tinggi, riset komprehensif, mencintai abstraksi dan data.',
      idealRole: 'Data Scientists, Strategy Leads, Researchers, Systems Architects.',
      besties: 'Layer Cake (R) & Macaron (A)',
      watchout: 'Waspadai over-thinking yang menghambat kecepatan eksekusi awal.',
      avatarIcon: '☕'
    },
    'A': {
      traitCode: 'A',
      name: 'Macaron',
      titleBadge: 'Artistic • Creative Visionary',
      archetype: 'The Aesthetic Pioneer',
      tagline: 'Menciptakan keindahan dan identitas visual yang memikat.',
      description: 'Melihat dunia lewat lensa estetika, narasi, dan diferensiasi emosional. Berani keluar jalur untuk menciptakan gebrakan baru.',
      strengths: ['Visual Storytelling', 'Intuitive Empathy', 'Originality'],
      workStyle: 'Spontan, berani bereksperimen, sensitif terhadap detail visual.',
      idealRole: 'Designers, Art Directors, Creative Strategists, Brand Leads.',
      besties: 'Strawberry Cake (S) & Tiramisu (I)',
      watchout: 'Beri ruang untuk pragmatisme agar visi estetik dapat dieksekusi tepat waktu.',
      avatarIcon: '🎨'
    },
    'S': {
      traitCode: 'S',
      name: 'Strawberry Cake',
      titleBadge: 'Social • Culture Catalyst',
      archetype: 'The People Harmonizer',
      tagline: 'Menghubungkan manusia, membangun sinergi, dan membakar antusiasme.',
      description: 'Sumber energi kehangatan dalam tim. Memiliki kepekaan interpersonal tajam dan mampu membaca dinamika ruang tanpa perlu banyak kata.',
      strengths: ['Active Listening', 'High EQ Collaboration', 'Conflict Resolution'],
      workStyle: 'Inklusif, apresiatif, fokus pada kekompakan dan motivasi tim.',
      idealRole: 'People Ops, Community Managers, Team Facilitators, Account Leads.',
      besties: 'Cupcake (E) & Macaron (A)',
      watchout: 'Jaga energi personal agar tidak kelelahan akibat menyerap beban emosi tim.',
      avatarIcon: '🍓'
    },
    'E': {
      traitCode: 'E',
      name: 'Cupcake',
      titleBadge: 'Enterprising • Growth Driver',
      archetype: 'The High-Impact Catalyst',
      tagline: 'Mengejar peluang besar, memimpin inisiatif, dan mencetak milestone.',
      description: 'Memiliki ambisi alami untuk memimpin dan menggerakkan jarum bisnis. Cepat mengambil keputusan di tengah ketidakpastian.',
      strengths: ['Persuasive Pitching', 'Opportunity Seeking', 'High Risk Tolerance'],
      workStyle: 'Cepat, berorientasi tujuan, tangguh menghadapi penolakan.',
      idealRole: 'Founders, Growth Leads, Sales Executives, Product Owners.',
      besties: 'Roll Cake (C) & Strawberry Cake (S)',
      watchout: 'Dengarkan masukan data dan proses sebelum mengeksekusi pivot mendadak.',
      avatarIcon: '🧁'
    },
    'C': {
      traitCode: 'C',
      name: 'Roll Cake',
      titleBadge: 'Conventional • Quality Anchor',
      archetype: 'The Systems Guardian',
      tagline: 'Menegakkan standar tinggi, konsistensi mutu, dan akurasi tanpa celah.',
      description: 'Benteng pertahanan kualitas. Tertib, sistematis, dan memastikan tidak ada detail penting yang terlewat dalam eksekusi.',
      strengths: ['Flawless Organization', 'Quality Assurance', 'Process Engineering'],
      workStyle: 'Terstruktur, disiplin, berorientasi pada aturan main dan efisiensi.',
      idealRole: 'QA Engineers, Financial Analysts, Operations Architects, Compliance.',
      besties: 'Layer Cake (R) & Cupcake (E)',
      watchout: 'Terbuka terhadap fleksibilitas ketika situasi membutuhkan improvisasi darurat.',
      avatarIcon: '📜'
    }
  }
};
