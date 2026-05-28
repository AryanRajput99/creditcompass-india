'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, MessageSquare, ShieldAlert, CheckCircle2, Send, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // Simulate API call for form submission
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[hsl(var(--color-bg-secondary))] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Header */}
          <div className="surface-card p-8 mb-10 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[hsl(var(--color-text))] tracking-tighter mb-4">
              Contact CreditCompass India
            </h1>
            <p className="text-[hsl(var(--color-text-secondary))] text-base leading-relaxed">
              Have questions about a credit card, partnership inquiries, or need help? We are here to help you navigate your choices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact details sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="surface-card p-6 space-y-6">
                <h2 className="text-lg font-bold text-[hsl(var(--color-text))] tracking-tight border-b border-[hsl(var(--color-border))] pb-3">
                  Direct Channels
                </h2>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[hsl(var(--color-primary))] flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))]">
                        General Support
                      </h3>
                      <a href="mailto:hello@creditcompass.in" className="text-sm font-semibold text-[hsl(var(--color-primary))] hover:underline block mt-0.5">
                        hello@creditcompass.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))]">
                        Partnerships
                      </h3>
                      <a href="mailto:partners@creditcompass.in" className="text-sm font-semibold text-purple-600 hover:underline block mt-0.5">
                        partners@creditcompass.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))]">
                        Affiliate & Legal
                      </h3>
                      <a href="mailto:privacy@creditcompass.in" className="text-sm font-semibold text-amber-700 hover:underline block mt-0.5">
                        privacy@creditcompass.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick links */}
              <div className="surface-card p-6">
                <h2 className="text-lg font-bold text-[hsl(var(--color-text))] tracking-tight border-b border-[hsl(var(--color-border))] pb-3 mb-4">
                  Quick Shortcuts
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link href="/compare" className="group flex items-center justify-between text-sm text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] font-medium">
                      <span>Compare Cards Side-by-Side</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/quiz" className="group flex items-center justify-between text-sm text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] font-medium">
                      <span>Take the Credit Card Quiz</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="group flex items-center justify-between text-sm text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-primary))] font-medium">
                      <span>Read Credit Guides & Blogs</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="surface-card p-6 sm:p-8">
                {isSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100 shadow-sm animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[hsl(var(--color-text))] tracking-tight">
                      Message Sent!
                    </h2>
                    <p className="text-[hsl(var(--color-text-secondary))] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting CreditCompass India. We have received your message and will review it. Our support team typically responds within 24 to 48 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-base btn-secondary px-6 py-2.5 text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-bold text-[hsl(var(--color-text))] tracking-tight border-b border-[hsl(var(--color-border))] pb-3 mb-6">
                      Send a Message
                    </h2>

                    {error && (
                      <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-sm font-medium flex items-center gap-3">
                        <span className="text-lg">⚠️</span>
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-secondary))] mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[hsl(var(--color-bg))] border border-[hsl(var(--color-border))] rounded-xl text-sm text-[hsl(var(--color-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))] focus:border-transparent transition-all"
                          placeholder="e.g. Rohan Sharma"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-secondary))] mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[hsl(var(--color-bg))] border border-[hsl(var(--color-border))] rounded-xl text-sm text-[hsl(var(--color-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))] focus:border-transparent transition-all"
                          placeholder="e.g. rohan@gmail.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-secondary))] mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[hsl(var(--color-bg))] border border-[hsl(var(--color-border))] rounded-xl text-sm text-[hsl(var(--color-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))] focus:border-transparent transition-all cursor-pointer"
                      >
                        <option value="general">General Support / Question</option>
                        <option value="card-correction">Report Card Feature Correction</option>
                        <option value="partnership">Business / Partnership Inquiry</option>
                        <option value="advertising">Sponsorship or Advertising</option>
                        <option value="legal">Data Request or Legal</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-secondary))] mb-2">
                        How can we help you? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[hsl(var(--color-bg))] border border-[hsl(var(--color-border))] rounded-xl text-sm text-[hsl(var(--color-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))] focus:border-transparent transition-all resize-none"
                        placeholder="Write your details or questions here..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-base btn-apply px-8 py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
