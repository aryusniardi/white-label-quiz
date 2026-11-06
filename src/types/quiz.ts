export interface QuizChoice {
  id: string;
  text: string;
  targetTrait: string;
}

export interface QuizQuestion {
  id: string;
  index: number;
  categoryBadge: string;
  scenarioTitle: string;
  question: string;
  imageSrc: string;
  choices: QuizChoice[];
}

export interface QuizResult {
  id: string;
  name: string;
  archetypeId: string;
  tagline: string;
  badge: string;
  accentColor: string;
  headerBg: string;
  badgeImage?: string;
  traits: string[];
  description: string;
  dimensions: {
    impulse: number;
    discipline: number;
    experience: number;
    social: number;
    practical: number;
    resilience: number;
  };
  stressCopingIndex: string;
  copingItem: string;
  spendingTrigger: string;
  compatiblePartner: string;
  clashingPartner: string;
  actionAdvice: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  brandName: string;
  questions: QuizQuestion[];
  results: Record<string, QuizResult>;
}
