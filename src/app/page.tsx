import { QuizRunner } from '@/components/QuizRunner';
import { demoQuizConfig } from '@/data/demoQuiz';

export default function Home() {
  return <QuizRunner initialConfig={demoQuizConfig} />;
}
