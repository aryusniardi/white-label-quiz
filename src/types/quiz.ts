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
  sceneType: number;
  choices: QuizChoice[];
}

export interface QuizResult {
  id: string;
  name: string;
  roleBadge: string;
  spriteType: 'layer' | 'cupcake' | 'macaron' | 'strawberry' | 'tiramisu' | 'roll';
  cardColor: string;
  headerBg: string;
  hashtags: string[];
  description: string;
  spiderStats: {
    actionOriented: number;
    problemSolving: number;
    innovation: number;
    teamwork: number;
    influence: number;
    attentionToDetail: number;
  };
  workaholismIndex: string;
  luckyCharm: string;
  workBesties: string;
  justCoworkers: string;
  recommendedRoles: string[];
}

export interface ThemeConfig {
  bgColor: string;
  cardBg: string;
  primaryColor: string;
  borderColor: string;
  borderRadius: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  brandName: string;
  theme: ThemeConfig;
  questions: QuizQuestion[];
  results: Record<string, QuizResult>;
}
