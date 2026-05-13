import { Metadata } from 'next';
import CardQuiz from '@/components/quiz/CardQuiz';

export const metadata: Metadata = {
  title: 'Which Credit Card is Right for You? — Free Quiz | CreditCompass India',
  description:
    'Answer 4 quick questions and instantly find the best credit card for your spending habits and income. Works for first-timers too. Try our free card finder quiz.',
};

export default function QuizPage() {
  return <CardQuiz />;
}
