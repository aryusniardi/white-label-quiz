import { QuizConfig } from '@/types/quiz';

export const demoQuizConfig: QuizConfig = {
  id: 'cake-career-v1',
  title: 'What Cake Are You?',
  subtitle: 'Temukan Destined Role & Gaya Kerjamu di Dunia Profesional',
  brand: {
    brandId: 'sample-brand',
    brandName: 'CareerLab Studio',
    brandTagline: 'Empowering Next-Gen Talent & Brands',
    themeColor: '#059669', // Emerald-600
    ctaUrl: 'https://example.com/careers',
    ctaText: 'Explore Opportunities for Your Role →',
    leadCaptureEnabled: true,
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
      name: 'Layer Cake (The Builder)',
      titleBadge: 'Realistic • Pragmatic Craftsman',
      archetype: 'The Reliable Executor',
      tagline: 'Fokus pada hasil konkret, eksekusi solid, dan solusi praktis.',
      description: 'Kamu adalah pondasi yang menjaga kapal tetap berlayar. Kamu tidak suka berteori tanpa bukti dan selalu siap terjun langsung menyelesaikan masalah mekanis maupun sistem.',
      strengths: ['Hands-on Problem Solving', 'High Reliability', 'Real-world Execution'],
      workStyle: 'Pragmatis, to-the-point, fokus aksi daripada rapat bertele-tele.',
      idealRole: 'Engineers, Operations Lead, Product Builders, Hardware/DevOps.',
      besties: 'Tiramisu (I) & Roll Cake (C)',
      watchout: 'Jangan lupa luangkan waktu untuk mengomunikasikan proses ke tim.',
      colorTheme: {
        primary: '#b45309', // Amber-700
        secondary: '#fef3c7',
        accent: '#f59e0b',
        bgBadge: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    },
    'I': {
      traitCode: 'I',
      name: 'Tiramisu (The Thinker)',
      titleBadge: 'Investigative • Deep Analytical Mind',
      archetype: 'The Strategic Mastermind',
      tagline: 'Mengurai benang kusut data menjadi strategi yang tajam.',
      description: 'Kamu adalah pemikir analitis dengan rasa ingin tahu tinggi. Kamu menolak asumsi tanpa validasi dan selalu mencari prinsip fundamental di balik setiap fenomena.',
      strengths: ['Deep Diagnostics', 'Logical Synthesis', 'Data-driven Intuition'],
      workStyle: 'Fokus tinggi, riset komprehensif, mencintai abstraksi dan data.',
      idealRole: 'Data Scientists, Strategy Leads, Researchers, Systems Architects.',
      besties: 'Layer Cake (R) & Macaron (A)',
      watchout: 'Waspadai over-thinking yang menghambat kecepatan eksekusi.',
      colorTheme: {
        primary: '#4338ca', // Indigo-700
        secondary: '#e0e7ff',
        accent: '#6366f1',
        bgBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    },
    'A': {
      traitCode: 'A',
      name: 'Macaron (The Creator)',
      titleBadge: 'Artistic • Creative Visionary',
      archetype: 'The Aesthetic Pioneer',
      tagline: 'Menciptakan karya yang berkarakter dan menggetarkan audiens.',
      description: 'Kamu membawa jiwa dan estetika ke dalam dunia kerja. Pendekatanmu selalu out-of-the-box, berani menabrak standar biasa untuk melahirkan produk yang memorable.',
      strengths: ['Creative Originality', 'High Empathy & Taste', 'Storytelling Mastery'],
      workStyle: 'Eksploratif, ekspresif, peka terhadap harmoni visual dan narasi.',
      idealRole: 'Designers, Brand Directors, Creative Writers, Creative Technologists.',
      besties: 'Strawberry Cake (S) & Tiramisu (I)',
      watchout: 'Pastikan ide cemerlangmu tetap sinkron dengan batasan timeline dan budget.',
      colorTheme: {
        primary: '#db2777', // Pink-600
        secondary: '#fce7f3',
        accent: '#ec4899',
        bgBadge: 'bg-pink-100 text-pink-900 border-pink-300'
      }
    },
    'S': {
      traitCode: 'S',
      name: 'Strawberry Cake (The Connector)',
      titleBadge: 'Social • Culture & People Catalyst',
      archetype: 'The Harmonizer',
      tagline: 'Perekat tim yang menyulap ruang kerja menjadi komunitas suportif.',
      description: 'Kekuatan utamamu ada pada empati dan kecerdasan emosional. Kamu peka terhadap apa yang dirasakan rekan kerja dan selalu tahu cara menyatukan visi bersama.',
      strengths: ['Interpersonal Harmony', 'Active Listening', 'Conflict Resolution'],
      workStyle: 'Kolaboratif, transparan, selalu memprioritaskan well-being tim.',
      idealRole: 'Community Lead, People Operations, Account Execs, Customer Experience.',
      besties: 'Macaron (A) & Cupcake (E)',
      watchout: 'Belajarlah berkata tidak pada permintaan yang mengorbankan kapasitasmu.',
      colorTheme: {
        primary: '#e11d48', // Rose-600
        secondary: '#ffe4e6',
        accent: '#f43f5e',
        bgBadge: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    },
    'E': {
      traitCode: 'E',
      name: 'Cupcake (The Leader)',
      titleBadge: 'Enterprising • Growth Driver',
      archetype: 'The Catalyst',
      tagline: 'Menggerakkan inisiatif, mengambil risiko terukur, mengejar kemenangan.',
      description: 'Kamu adalah pribadi berdaya dorong tinggi dengan insting bisnis tajam. Kamu memimpin dari depan dan paling bersemangat saat menghadapi target ambisius.',
      strengths: ['Decisive Action', 'Pitching & Persuasion', 'Strategic Initiative'],
      workStyle: 'Energetik, berorientasi hasil, berani mengambil keputusan sulit.',
      idealRole: 'Founders, Growth Marketers, Product Managers, Business Development.',
      besties: 'Strawberry Cake (S) & Roll Cake (C)',
      watchout: 'Pastikan tim tidak burnout saat mengejar momentum akselerasi.',
      colorTheme: {
        primary: '#ea580c', // Orange-600
        secondary: '#ffedd5',
        accent: '#f97316',
        bgBadge: 'bg-orange-100 text-orange-900 border-orange-300'
      }
    },
    'C': {
      traitCode: 'C',
      name: 'Roll Cake (The Organizer)',
      titleBadge: 'Conventional • Systems & Precision Pillar',
      archetype: 'The Quality Anchor',
      tagline: 'Kerapian, ketepatan data, dan standard operating procedure tanpa kompromi.',
      description: 'Kamu menjaga dunia tetap berjalan dengan akurasi dan integritas tinggi. Di tengah kekacauan, kamulah orang pertama yang menghadirkan keteraturan dan struktur.',
      strengths: ['Flawless Structure', 'Attention to Detail', 'Operational Rigor'],
      workStyle: 'Metodis, terencana rapi, menjaga konsistensi tanpa celah.',
      idealRole: 'Finance Leads, Compliance, Operations Specialists, Project Managers.',
      besties: 'Layer Cake (R) & Cupcake (E)',
      watchout: 'Tetap terbuka pada improvisasi fleksibel ketika rencana berubah mendadak.',
      colorTheme: {
        primary: '#0d9488', // Teal-600
        secondary: '#ccfbf1',
        accent: '#14b8a6',
        bgBadge: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    }
  }
};
