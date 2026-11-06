export interface QuizChoice {
  id: string;
  text: string;
  targetTrait: string; // e.g. 'R', 'I', 'A', 'S', 'E', 'C'
}

export interface QuizQuestion {
  id: string;
  stepNumber: number;
  question: string;
  scenarioSubtitle?: string;
  options: QuizChoice[];
}

export interface TraitResult {
  traitCode: string;
  name: string; // e.g. "Tiramisu - The Analytical Architect"
  titleBadge: string; // e.g. "Investigative & Critical Thinker"
  archetype: string; // e.g. "Problem Solver"
  tagline: string;
  description: string;
  strengths: string[];
  workStyle: string;
  idealRole: string;
  besties: string; // Compatible traits
  watchout: string;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    bgBadge: string;
  };
}

export interface BrandConfig {
  brandId: string;
  brandName: string;
  brandTagline: string;
  logoUrl?: string;
  themeColor: string; // Hex color for CTA and highlights
  ctaUrl: string;
  ctaText: string;
  leadCaptureEnabled: boolean;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  brand: BrandConfig;
  questions: QuizQuestion[];
  results: Record<string, TraitResult>;
}
