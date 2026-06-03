'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "What is the best credit card in India?",
    answer: "The 'best' credit card depends on your spending habits. For everyday cashback, cards like the HDFC Millennia or SBI Cashback are excellent. For travel and lounge access, the Axis Atlas or HDFC Infinia stand out. We recommend using our comparison tool to find the card that aligns with your specific needs."
  },
  {
    question: "How do I apply for a credit card online?",
    answer: "Applying online is simple. First, compare cards on our platform to find your match. Click 'Apply Now' to be redirected to the official bank website. Fill in your personal and employment details, verify your identity via Video KYC or physical documents, and wait for the bank's approval. The physical card is usually dispatched within 7-10 working days."
  },
  {
    question: "What are lifetime free credit cards?",
    answer: "Lifetime free (LTF) credit cards are cards that do not charge any joining fee or annual renewal fee, ever. They are great for beginners building their credit score or those who want an emergency card without worrying about maintenance costs. Popular examples include the IDFC First Classic and Amazon Pay ICICI Card."
  },
  {
    question: "Can I use my credit card for UPI payments?",
    answer: "Yes, you can! The Reserve Bank of India (RBI) now allows RuPay credit cards to be linked to UPI apps like BHIM, PhonePe, and Google Pay. This means you can scan any merchant QR code and pay using your credit card, earning reward points even on small neighborhood purchases."
  }
];

export default function HomeSEOContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="bg-[hsl(var(--color-bg))] py-24 border-t border-[hsl(var(--color-border))]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 prose prose-slate max-w-none">
          <h2 className="text-3xl font-extrabold text-[hsl(var(--color-text))] mb-6 tracking-tight">Your Ultimate Guide to the Best Credit Cards in India</h2>
          
          <div className="text-[hsl(var(--color-text-secondary))] space-y-6 leading-relaxed">
            <p>
              Navigating the financial landscape to find the <strong>best credit cards in India</strong> can be a daunting task. With dozens of banks offering hundreds of variations—from lifetime free credit cards to premium travel cards—understanding the intricate fee structures, reward point systems, and hidden charges is crucial. At CreditCompass India, we simplify this process by providing a transparent, data-driven platform to <strong>compare credit cards online</strong>.
            </p>

            <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mt-8 mb-4">Why You Need to Compare Credit Cards Online</h3>
            <p>
              Every individual has a unique spending pattern. You might spend heavily on online shopping, while someone else might frequently travel for business. When you apply for a credit card without comparing, you risk missing out on valuable benefits like airport lounge access, accelerated reward points, and milestone benefits. Our platform analyzes these variables, allowing you to filter by categories such as <strong>cashback credit cards</strong>, rewards, fuel, and travel.
            </p>

            <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mt-8 mb-4">Understanding Lifetime Free vs. Premium Cards</h3>
            <p>
              A major decision when choosing a card is deciding between a <strong>lifetime free credit card</strong> and a fee-bearing premium card. Lifetime free cards are excellent entry-level options. They carry zero joining or annual fees, making them risk-free tools to build your CIBIL score. However, if you are a high spender, premium cards—despite their annual fees—often provide returns that far exceed their costs through complimentary flights, hotel memberships, and higher reward multiplier rates.
            </p>

            <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mt-8 mb-4">The Rise of RuPay and UPI Integration</h3>
            <p>
              The Indian credit ecosystem has been revolutionized by the integration of credit cards with the Unified Payments Interface (UPI). By opting for a RuPay credit card, you can link your credit line directly to apps like Google Pay or PhonePe. This functionality allows you to earn rewards on everyday micro-transactions at local merchants, a feature previously restricted to traditional point-of-sale machines.
            </p>

            <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mt-8 mb-4">How to Apply for a Credit Card Successfully</h3>
            <p>
              To ensure a smooth approval process when you <strong>apply for a credit card</strong>, maintain a healthy credit score (typically 750+), clear existing dues on time, and avoid applying for multiple cards simultaneously. Banks look at your credit utilization ratio and income stability. Use our platform to check eligibility criteria before initiating an application, ensuring you apply only for cards that match your financial profile.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-extrabold text-[hsl(var(--color-text))] mb-8 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="surface-card border border-[hsl(var(--color-border))] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-[hsl(var(--color-bg-secondary))] hover:bg-[hsl(var(--color-bg-secondary))/80]"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-bold text-[hsl(var(--color-text))]">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[hsl(var(--color-text-secondary))]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[hsl(var(--color-text-secondary))]" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 py-5 border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg))]">
                    <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
