import { QuizRunner } from '@/components/QuizRunner';
import { consumerQuizConfig } from '@/data/demoQuiz';

export default function Home() {
  return <QuizRunner config={consumerQuizConfig} />;
}

