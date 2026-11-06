export interface QuizChoice {
  id: string;
  text: string;
  targetTrait: string;
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
  name: string;
  titleBadge: string;
  archetype: string;
  tagline: string;
  description: string;
  strengths: string[];
  workStyle: string;
  idealRole: string;
  besties: string;
  watchout: string;
  avatarIcon?: string;
}

export type BackgroundStyle = 'pure-black' | 'dark-forest' | 'warm-editorial' | 'custom-gradient';

export interface ThemeConfig {
  backgroundStyle: BackgroundStyle;
  backgroundColor: string; // e.g. '#000000' or '#0F3B27'
  cardBackground: string; // e.g. '#111113'
  cardBorder: string; // e.g. 'rgba(255, 255, 255, 0.08)'
  cardRadius: number; // e.g. 28
  textColor: string; // e.g. '#F5F5F7'
  subtextColor: string; // e.g. '#8E8E93'
  accentColor: string; // e.g. '#FFFFFF' or brand primary
  fontFamily: 'geist' | 'serif' | 'mono';
  enableNoiseOverlay?: boolean;
}

export interface BrandConfig {
  brandId: string;
  brandName: string;
  brandTagline: string;
  logoUrl?: string;
  ctaUrl?: string;
  ctaText?: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  theme: ThemeConfig;
  brand: BrandConfig;
  questions: QuizQuestion[];
  results: Record<string, TraitResult>;
}
