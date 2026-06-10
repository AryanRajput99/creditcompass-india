'use client';

import {
  CreditCard, Home, Calculator, DollarSign, PiggyBank,
  Wallet, TrendingUp, Shield, BarChart3, Banknote,
  Percent, BadgePercent, Receipt, Landmark, Building2
} from 'lucide-react';

const ICONS = [
  { Icon: Home, top: '8%', left: '3%', size: 28, delay: '0s', duration: 'animate-float' },
  { Icon: CreditCard, top: '15%', left: '12%', size: 22, delay: '1s', duration: 'animate-float-slow' },
  { Icon: Calculator, top: '6%', left: '25%', size: 20, delay: '0.5s', duration: 'animate-float-slower' },
  { Icon: DollarSign, top: '22%', left: '35%', size: 18, delay: '2s', duration: 'animate-float' },
  { Icon: Banknote, top: '10%', left: '65%', size: 24, delay: '1.5s', duration: 'animate-float-slow' },
  { Icon: Shield, top: '18%', left: '78%', size: 20, delay: '0.8s', duration: 'animate-float-slower' },
  { Icon: Landmark, top: '5%', left: '88%', size: 22, delay: '2.5s', duration: 'animate-float' },
  { Icon: PiggyBank, top: '35%', left: '5%', size: 24, delay: '1.2s', duration: 'animate-float-slower' },
  { Icon: Wallet, top: '45%', left: '92%', size: 20, delay: '0.3s', duration: 'animate-float-slow' },
  { Icon: TrendingUp, top: '55%', left: '8%', size: 18, delay: '1.8s', duration: 'animate-float' },
  { Icon: BarChart3, top: '60%', left: '88%', size: 22, delay: '2.2s', duration: 'animate-float-slower' },
  { Icon: Receipt, top: '70%', left: '15%', size: 20, delay: '0.7s', duration: 'animate-float-slow' },
  { Icon: BadgePercent, top: '75%', left: '82%', size: 18, delay: '1.4s', duration: 'animate-float' },
  { Icon: Building2, top: '82%', left: '6%', size: 22, delay: '2.8s', duration: 'animate-float-slower' },
  { Icon: Percent, top: '85%', left: '90%', size: 16, delay: '0.9s', duration: 'animate-float-slow' },
  { Icon: CreditCard, top: '30%', left: '90%', size: 18, delay: '3s', duration: 'animate-float' },
  { Icon: Home, top: '50%', left: '2%', size: 20, delay: '1.6s', duration: 'animate-float-slow' },
  { Icon: Calculator, top: '40%', left: '95%', size: 16, delay: '2.1s', duration: 'animate-float-slower' },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {ICONS.map((item, i) => {
        const { Icon, top, left, size, delay, duration } = item;
        return (
          <div
            key={i}
            className={`absolute ${duration}`}
            style={{
              top,
              left,
              animationDelay: delay,
            }}
          >
            <Icon
              style={{ width: size, height: size }}
              className="text-[hsl(var(--color-text))] opacity-[0.06]"
              strokeWidth={1.5}
            />
          </div>
        );
      })}
    </div>
  );
}
