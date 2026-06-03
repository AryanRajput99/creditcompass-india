import { Metadata } from 'next';
import CardQuiz from '@/components/quiz/CardQuiz';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Which Credit Card is Right for You? — Free Quiz | CreditCompass India',
  description:
    'Answer 4 quick questions and instantly find the best credit card for your spending habits and income. Works for first-timers too. Try our free card finder quiz.',
};

export default function QuizPage() {
  return (
    <div className="bg-[hsl(var(--color-bg))] min-h-screen">
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-20">
        <CardQuiz />
      </main>
      <Footer />
    </div>
  );
}
