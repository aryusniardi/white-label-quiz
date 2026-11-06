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
  illustrationKey: string;
  choices: QuizChoice[];
}

export interface TraitResult {
  traitCode: string;
  archetypeName: string;
  tagline: string;
  personaAvatarSvg: string;
  dominantTrait: string;
  secondaryTrait: string;
  stressCopingMechanism: string;
  spendingTrigger: string;
  frugalHacks: string;
  idealBrandVibe: string;
  financialVibeIndex: number;
  bestieArchetype: string;
  clashArchetype: string;
  actionGuidance: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  brandName: string;
  theme: {
    bgPage: string;
    cardBg: string;
    primaryButton: string;
    buttonText: string;
    accentColor: string;
    borderColor: string;
    borderRadius: number;
  };
  questions: QuizQuestion[];
  results: Record<string, TraitResult>;
}
