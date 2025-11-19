import React from 'react';
// Removed unused imports after footer extraction
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import { usePlacementBanners } from '../stores/publicBannersStore';
import { getBannerAlt, getBannerImageSrc } from '../utils/bannerUtils';
import CategoryCardGrid from '../components/CategoryCardGrid';
import {
  CalendarClock,
  ChefHat,
  ClipboardCheck,
  HeartPulse,
  Package,
  SlidersHorizontal,
  Timer,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Differentiator = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentBg: string;
  accentText: string;
  glow: string;
};


const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Pre-Order, Zero Waste',
    description: 'We prepare only what is pre-booked, keeping every plate fresh and eliminating kitchen waste.',
    icon: ClipboardCheck,
    accentBg: 'bg-purple-100/80',
    accentText: 'text-purple-700',
    glow: 'from-purple-400/25 via-purple-300/15 to-transparent',
  },
  {
    title: 'Homemade Craftsmanship',
    description: 'Family-style recipes cooked with slow techniques that honour homely flavours.',
    icon: ChefHat,
    accentBg: 'bg-amber-100/80',
    accentText: 'text-amber-600',
    glow: 'from-amber-300/25 via-amber-200/15 to-transparent',
  },
  {
    title: 'Plans Made Yours',
    description: 'Pick cuisines, portions, and nutrition goals that match exactly how you want to eat.',
    icon: SlidersHorizontal,
    accentBg: 'bg-emerald-100/80',
    accentText: 'text-emerald-600',
    glow: 'from-emerald-300/25 via-emerald-200/15 to-transparent',
  },
  {
    title: 'Curated Add-ons & Sides',
    description: 'Top up with breakfast bowls, desserts, or extras that keep the excitement in every box.',
    icon: UtensilsCrossed,
    accentBg: 'bg-rose-100/80',
    accentText: 'text-rose-600',
    glow: 'from-rose-300/25 via-rose-200/15 to-transparent',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Pause, skip, or shift delivery days in seconds when your calendar changes.',
    icon: CalendarClock,
    accentBg: 'bg-sky-100/80',
    accentText: 'text-sky-600',
    glow: 'from-sky-300/25 via-sky-200/15 to-transparent',
  },
  {
    title: 'Dependable Delivery',
    description: '98% on-time arrivals powered by mapped routes and warm insulated carriers.',
    icon: Timer,
    accentBg: 'bg-indigo-100/80',
    accentText: 'text-indigo-600',
    glow: 'from-indigo-300/25 via-indigo-200/15 to-transparent',
  },
  {
    title: 'Premium Packing',
    description: 'Leak-proof, recyclable packs that lock in aroma, heat, and hygiene for every course.',
    icon: Package,
    accentBg: 'bg-fuchsia-100/80',
    accentText: 'text-fuchsia-600',
    glow: 'from-fuchsia-300/25 via-fuchsia-200/15 to-transparent',
  },
  {
    title: 'Daily & Fitness Fuel',
    description: 'Wholesome classics and macro-counted fitness bowls — the spectrum you need to stay consistent.',
    icon: HeartPulse,
    accentBg: 'bg-teal-100/80',
    accentText: 'text-teal-600',
    glow: 'from-teal-300/25 via-teal-200/15 to-transparent',
  },
];

const revealOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12,
};

const AboutPage: React.FC = () => {
  const { banners: aboutBanners } = usePlacementBanners('about');
  const heroBanner = aboutBanners[0];
  const heroImageSrc = getBannerImageSrc(heroBanner);
  const heroImageAlt = getBannerAlt(heroBanner, 'About Toven banner');

  React.useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const target = entry.target as HTMLElement;
          if (target.dataset.animateOnce !== 'false') {
            observer.unobserve(entry.target);
          }
        }
      });
    }, revealOptions);

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar active="about" />

      {/* HERO / INTRO */}
  <section className="relative bg-gradient-to-br from-[#6a0dad] via-purple-700 to-purple-900 text-white overflow-hidden flex items-center justify-center mt-[4rem] min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] animate-gradient-shift">
        {heroImageSrc && (
          <figure className="absolute inset-0 animate-fade-in">
            <img
              src={heroImageSrc}
              alt={heroImageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(event) => {
                (event.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#6a0dad]/85 via-purple-800/75 to-purple-900/60" />
          </figure>
        )}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 w-full text-center" data-animate>
          {/* <div className="flex justify-center gap-3 mb-8" data-animate data-animate-once="false">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-amber-200 animate-orbit-slow animate-glow-pulse text-xl" aria-hidden="true">✦</span>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-purple-200 animate-orbit-reverse animate-glow-pulse text-xl" style={{ animationDelay: '0.5s' }} aria-hidden="true">✺</span>
          </div> */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-zoom-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            About <span className="text-amber-400 animate-text-glow">Toven</span>
          </h1>
          <p className="text-base sm:text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            Toven is India's first pre-order, only food ecosystem built to make everyday eating <span className="font-semibold text-amber-300">delicious</span>, <span className="font-semibold text-emerald-300">flexible</span> and <span className="font-semibold text-rose-300">wholesome</span>. We blend homemade quality with convenient scheduling, personalized plans, and reliable delivery so every meal fits your lifestyle.
          </p>
        </div>
      </section>

      {/* WHY WE STARTED */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex justify-center mb-6 animate-rotate-in" data-animate>
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100/60 text-purple-700 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] animate-glow-pulse shadow-lg">Our Origin Story</span>
          </div>
          <h2 className="text-center font-semibold text-2xl sm:text-3xl mb-8 animate-zoom-in" data-animate style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>Why We Started?</h2>
          <p className="text-center text-gray-600 leading-relaxed max-w-3xl mx-auto animate-slide-in-left" data-animate style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
            We created TOVEN to solve the everyday struggle of finding meals that are <span className="font-semibold text-purple-700">fresh</span>, <span className="font-semibold text-emerald-700">healthy</span>, and <span className="font-semibold text-rose-700">truly satisfying</span>. Mess food often feels repetitive, restaurant food leans unhealthy, and most cloud kitchens miss the personal touch. We started TOVEN to bring back the comfort of wholesome, homely meals cooked with care, delivered on time, and designed to fit modern lifestyles.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3" data-animate>
            {[ 'Built for routines', 'Home-chef powered', 'Delivered with care' ].map((label, idx) => (
              <div
                key={label}
                className="rounded-2xl border border-purple-100 bg-purple-50/60 px-6 py-5 text-center text-sm text-purple-700 shadow-sm transition-all duration-500 hover-zoom hover:shadow-lg animate-glow-pulse"
                data-animate
                style={{ transitionDelay: `${0.2 + idx * 0.1}s` }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="relative py-24 bg-white -mt-10 overflow-hidden">
        <div className="absolute inset-x-0 top-16 -z-10 mx-auto h-[520px] w-[520px] rounded-full bg-purple-100/35 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr,1fr] items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm ring-1 ring-purple-200/60" data-animate>
                <Sparkles className="h-4 w-4" />
                What makes us different
              </span>
              <h2 className="mt-6 text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight" data-animate style={{ animationDelay: '0.1s' }}>
                A food partner that plans, cooks, and delivers like family.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600" data-animate style={{ animationDelay: '0.2s' }}>
                We go beyond a cloud kitchen. Every subscription is planned in advance, crafted by chefs who understand home-style comfort, and delivered with the precision of a logistics team obsessed with timing.
              </p>
              <div className="mt-10 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-purple-200/60 bg-white/75 p-4 shadow-sm transition-all duration-500 hover:shadow-2xl hover-zoom group" data-animate style={{ transitionDelay: '0.3s' }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100/80 text-purple-700 font-semibold transition-all duration-300 animate-counter group-hover:scale-110" style={{ animationDelay: '2s' }}>8+</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Reasons you&apos;ll stay</p>
                    <p className="text-xs leading-relaxed text-slate-500">From pre-planning to mindful packaging, every step is designed with you in mind.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-white/75 p-4 shadow-sm transition-all duration-500 hover:shadow-2xl hover-zoom group" data-animate style={{ transitionDelay: '0.4s' }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100/80 text-amber-600 font-semibold transition-all duration-300 animate-counter group-hover:scale-110" style={{ animationDelay: '2.3s' }}>98%</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">On-time delivery score</p>
                    <p className="text-xs leading-relaxed text-slate-500">Precision routing keeps your meals hot, safe, and right on schedule.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid gap-6 sm:grid-cols-2">
                {DIFFERENTIATORS.map((feature, index) => {
                  const Icon = feature.icon;
                  const offsetClass = index % 2 === 1 ? 'lg:-translate-y-6' : '';
                  const transitionDelay = `${0.1 + index * 0.12}s`;
                  const pulseDelay = `${2 + index * 0.3}s`;
                  const cardStyle: React.CSSProperties & Record<'--pulse-delay', string> = {
                    transitionDelay,
                    '--pulse-delay': pulseDelay,
                  };
                  return (
                    <div
                      key={feature.title}
                      className={`group relative rounded-3xl border border-white/70 bg-white/90 p-6 sm:p-7 shadow-sm backdrop-blur transition-all duration-500 hover-zoom hover:shadow-2xl ${offsetClass}`}
                      style={cardStyle}
                      data-animate
                    >
                      <div className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.glow} opacity-10 group-hover:opacity-25 transition-opacity duration-500 animate-glow-fade`} aria-hidden="true" />
                      <div className="relative flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.accentBg} ${feature.accentText} ring-2 ring-white/70 shadow-sm transition-transform duration-300 group-hover:scale-125 animate-icon-float`}
                            style={{ animationDelay: pulseDelay }}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="text-xs font-semibold text-slate-400 group-hover:text-purple-600 transition-colors">0{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 leading-snug group-hover:text-purple-700 transition-colors">{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER - PRODUCT CARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10" data-animate>
          <h2 className="text-center font-semibold text-2xl sm:text-3xl mb-4 animate-zoom-in" data-animate style={{ animationDelay: '0.05s', animationFillMode: 'both' }}>What We Offer</h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-600 to-amber-500 rounded-full mb-10 animate-glow-pulse" data-animate style={{ animationDelay: '0.1s', animationFillMode: 'both' }} />
          <div className="relative animate-slide-in-left" data-animate style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-purple-100/70" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl">
              <CategoryCardGrid />
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10">
          <div className="bg-gradient-to-br from-[#f8fafc] to-purple-50/30 rounded-3xl p-10 text-center transition-all duration-700 hover:shadow-2xl hover-zoom animate-vision-glow hover-lift" data-animate style={{ transitionDelay: '0.1s' }}>
            <div className="flex justify-center mb-4 animate-rotate-in">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100/80 text-purple-600 animate-bounce">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#422060] mb-4 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-sm animate-text-reveal" style={{ animationDelay: '0.3s' }}>To be the most trusted and beloved provider of homemade meals, creating a healthy and happy food culture in every community we serve.</p>
          </div>
          <div className="bg-gradient-to-br from-[#f8fafc] to-amber-50/30 rounded-3xl p-10 text-center transition-all duration-700 hover:shadow-2xl hover-zoom animate-mission-glow hover-lift" data-animate style={{ transitionDelay: '0.2s' }}>
            <div className="flex justify-center mb-4 animate-rotate-in" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-600 animate-bounce" style={{ animationDelay: '0.2s' }}>
                <ChefHat className="h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#422060] mb-4 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>Our Mission</h3>
            <p className="text-gray-600 leading-relaxed text-sm animate-text-reveal" style={{ animationDelay: '0.3s' }}>To empower home chefs and make healthy, delicious, and convenient homemade food accessible to everyone through a sustainable pre-order platform.</p>
          </div>
        </div>
      </section>

      {/* FOOTER (copied from landing for consistency) */}
      <Footer />
      
      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        
        @keyframes card-lift {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        @keyframes glow-fade {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.35;
          }
        }
        
        @keyframes icon-bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        
        @keyframes stat-pulse {
          0%, 100% {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }
          50% {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
        }
        
        @keyframes number-pop {
          0%, 90%, 100% {
            transform: scale(1);
          }
          95% {
            transform: scale(1.2);
          }
        }
        
        @keyframes vision-glow {
          0%, 100% {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 10px 25px -5px rgba(106, 13, 173, 0.15);
          }
        }
        
        @keyframes mission-glow {
          0%, 100% {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.15);
          }
        }
        
        .animate-card-lift {
          animation: card-lift 4s ease-in-out infinite;
          animation-delay: var(--pulse-delay, 2s);
        }
        
        .animate-glow-fade {
          animation: glow-fade 4s ease-in-out infinite;
        }
        
        .animate-icon-bounce {
          animation: icon-bounce 3s ease-in-out infinite;
        }
        
        .animate-stat-pulse {
          animation: stat-pulse 3s ease-in-out infinite 2s;
        }
        
        .animate-number-pop {
          animation: number-pop 3s ease-in-out infinite;
        }
        
        .animate-vision-glow {
          animation: vision-glow 4s ease-in-out infinite 2s;
        }
        
        .animate-mission-glow {
          animation: mission-glow 4s ease-in-out infinite 2.5s;
        }

        .animate-team-pulse {
          animation: team-pulse 6s ease-in-out infinite;
        }

        .animate-orbit-slow {
          animation: orbit 9s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 11s linear infinite;
        }

        [data-animate] {
          --translate-y: 32px;
          --reveal-scale: 0.98;
          --hover-scale: 1;
          opacity: 0;
          transform: translateY(var(--translate-y)) scale(var(--reveal-scale)) scale(var(--hover-scale));
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        [data-animate].is-visible {
          opacity: 1;
          --translate-y: 0px;
          --reveal-scale: 1;
        }

        .hover-zoom {
          --hover-scale: 1;
          --hover-scale-target: 1.05;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          will-change: transform;
        }

        .hover-zoom:hover {
          --hover-scale: var(--hover-scale-target);
        }

        .hover-zoom:not([data-animate]) {
          transform: scale(var(--hover-scale));
        }

        @keyframes team-pulse {
          0%, 100% {
            box-shadow: 0 25px 50px -12px rgba(88, 28, 135, 0.25);
            transform: scale(1);
          }
          40% {
            box-shadow: 0 35px 65px -20px rgba(168, 85, 247, 0.4);
            transform: scale(1.03);
          }
          70% {
            box-shadow: 0 20px 40px -16px rgba(59, 130, 246, 0.25);
            transform: scale(0.995);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(10px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(10px) rotate(-360deg);
          }
        }

        @keyframes orbit-reverse {
          0% {
            transform: rotate(0deg) translateX(-10px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(-10px) rotate(360deg);
          }
        }

        /* ===== ENHANCED ANIMATIONS ===== */

        /* Hero Section - Letter reveal effect */
        @keyframes letter-slide {
          from {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        .animate-letter-slide {
          animation: letter-slide 0.6s ease-out forwards;
        }

        /* Floating animation for team members */
        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-float {
          animation: float-subtle 4s ease-in-out infinite;
        }

        /* Staggered entrance from left */
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Staggered entrance from right */
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Rotate entrance */
        @keyframes rotate-in {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        .animate-rotate-in {
          animation: rotate-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Glow pulse on elements */
        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 0px rgba(168, 85, 247, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6));
          }
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        /* Shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        /* Enhanced feature card entrance */
        @keyframes card-entrance {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-card-entrance {
          animation: card-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Icon float animation */
        @keyframes icon-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-8px) translateX(2px);
          }
          66% {
            transform: translateY(-4px) translateX(-2px);
          }
        }

        .animate-icon-float {
          animation: icon-float 3s ease-in-out infinite;
        }

        /* Text highlight animation */
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 0px rgba(251, 146, 60, 0);
          }
          50% {
            text-shadow: 0 0 10px rgba(251, 146, 60, 0.8);
          }
        }

        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }

        /* Parallax-like zoom entrance */
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-zoom-in {
          animation: zoom-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Counter animation for numbers */
        @keyframes counter-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-counter {
          animation: counter-pulse 2s ease-in-out infinite;
        }

        /* Rotating background orb */
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        /* Hover lift effect */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hover-lift:hover {
          --hover-scale: 1.05;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        /* Text reveal animation */
        @keyframes text-reveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-text-reveal {
          animation: text-reveal 0.6s ease-out forwards;
        }

        /* Blob animation */
        @keyframes blob-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-blob-bounce {
          animation: blob-bounce 6s ease-in-out infinite;
        }

        /* Enhanced team glow */
        @keyframes team-glow-enhanced {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3), 0 25px 50px -12px rgba(88, 28, 135, 0.25);
          }
          50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 0 35px 65px -20px rgba(168, 85, 247, 0.4);
          }
        }

        .animate-team-glow {
          animation: team-glow-enhanced 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
