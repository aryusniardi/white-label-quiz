export interface QuizChoice {
  id: string;
  text: string;
  targetTrait: string;
}

export interface QuizQuestion {
  id: string;
  index: number;
  title: string;
  coverImage?: string;
  choices: QuizChoice[];
  submitText?: string;
}

export interface QuizResultProfile {
  trait: string;
  cakeName: string;
  indonesianName: string;
  tagline: string;
  avatarEmoji: string;
  workaholismIndex: string;
  luckyCharm: string;
  tags: string[];
  description: string;
  radarScores: {
    actionOriented: number; // 1-5
    problemSolving: number;
    innovation: number;
    teamwork: number;
    influence: number;
    detail: number;
  };
  workBesties: string;
  justCoworkers: string;
  idealRoles: string[];
  cakeColor: string;
  accentBg: string;
}

export interface ThemeConfig {
  bgColor: string;
  cardColor: string;
  primaryButtonColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  brandName: string;
  theme: ThemeConfig;
  questions: QuizQuestion[];
  results: Record<string, QuizResultProfile>;
}
