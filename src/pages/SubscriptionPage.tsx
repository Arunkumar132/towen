import React, { useCallback, useEffect, useMemo } from 'react';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useCategoriesStore } from '../stores/categoriesStore';
import { useNavigate } from 'react-router-dom';
import { useUserRoleStore } from '../stores/userRoleStore';
import { useLoginModalStore } from '../stores/loginModalStore';
import { usePlacementBanners } from '../stores/publicBannersStore';
import { getBannerAlt, getBannerImageSrc } from '../utils/bannerUtils';

type SubscriptionCard = {
  id: string;
  title: string;
  description: string | null;
  priceLine: string | null;
  image: string | null;
  accentColor: string;
  gradient: string;
};

const DEFAULT_ACCENT_FROM = '#8B5CF6';
const DEFAULT_ACCENT_TO = '#6366F1';
const DEFAULT_ACCENT_COLOR = DEFAULT_ACCENT_TO;
const DEFAULT_GRADIENT = `linear-gradient(135deg, ${DEFAULT_ACCENT_FROM}, ${DEFAULT_ACCENT_TO})`;

const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

const normalizeHex = (value?: string | null): string | null => {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return HEX_COLOR_REGEX.test(trimmed) ? trimmed : null;
};

const hexToRgba = (color: string | null | undefined, alpha: number): string | null => {
  if (typeof color !== 'string') {
    return null;
  }
  let normalized = color.trim();
  if (!normalized) {
    return null;
  }
  if (normalized.startsWith('#')) {
    normalized = normalized.slice(1);
  }
  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map((char) => char + char)
      .join('');
  }
  if (normalized.length !== 6) {
    return null;
  }
  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
    return null;
  }
  const clampedAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${red}, ${green}, ${blue}, ${clampedAlpha.toFixed(2)})`;
};

const buildGradient = (accentFrom?: string | null, accentTo?: string | null): string => {
  const normalizedFrom = normalizeHex(accentFrom);
  const normalizedTo = normalizeHex(accentTo);

  if (normalizedFrom && normalizedTo) {
    return `linear-gradient(135deg, ${normalizedFrom}, ${normalizedTo})`;
  }

  if (normalizedFrom) {
    const start = hexToRgba(normalizedFrom, 0.12) ?? normalizedFrom;
    const end = hexToRgba(normalizedFrom, 0.45) ?? normalizedFrom;
    return `linear-gradient(135deg, ${start}, ${end})`;
  }

  if (normalizedTo) {
    const start = hexToRgba(normalizedTo, 0.12) ?? normalizedTo;
    const end = hexToRgba(normalizedTo, 0.45) ?? normalizedTo;
    return `linear-gradient(135deg, ${start}, ${end})`;
  }

  return DEFAULT_GRADIENT;
};

const formatPriceLine = (price?: number | null): string | null => {
  if (typeof price === 'number' && Number.isFinite(price) && price > 0) {
    return `₹${price.toLocaleString('en-IN')} / meal`;
  }
  return null;
};

const sanitizeDescription = (value?: string | null): string | null => {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const SubscriptionPage: React.FC = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const loading = useCategoriesStore((state) => state.loading);
  const loadCategories = useCategoriesStore((state) => state.loadCategories);
  const user = useUserRoleStore((state) => state.user);
  const openLoginModal = useLoginModalStore((state) => state.open);
  const navigate = useNavigate();
  const { banners: subscriptionBanners } = usePlacementBanners('subscription');
  const subscriptionHero = subscriptionBanners[0];
  const subscriptionHeroSrc = getBannerImageSrc(subscriptionHero);
  const subscriptionHeroAlt = getBannerAlt(subscriptionHero, 'Subscription hero banner');

  useEffect(() => {
    if (!categories.length) {
      void loadCategories();
    }
  }, [categories.length, loadCategories]);

  const cards = useMemo<SubscriptionCard[]>(() => {
    if (!categories.length) {
      return [];
    }

    return categories
      .filter((category) => category.status === 'Available')
      .map((category) => {
        const accentFrom = normalizeHex(category.accentFrom);
        const accentTo = normalizeHex(category.accentTo);
        const accentColor = accentTo ?? accentFrom ?? DEFAULT_ACCENT_COLOR;

        return {
          id: category.id,
          title: category.name,
          description: sanitizeDescription(category.description),
          priceLine: formatPriceLine(category.price),
          image: category.imageBase64 ?? null,
          accentColor,
          gradient: buildGradient(category.accentFrom, category.accentTo),
        };
      });
  }, [categories]);

  const handleOrderNow = useCallback((categoryId: string) => {
    const targetPath = `/subscription/checkout/${categoryId}`;
    if (user) {
      navigate(targetPath, { state: { fromSubscription: true } });
      return;
    }

    openLoginModal(targetPath);
  }, [navigate, openLoginModal, user]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar active="Subscription" />
      <main className="flex-1 w-full">
        <section className="mt-20 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          {subscriptionHeroSrc ? (
            <div className="rounded overflow-hidden shadow-lg relative bg-black">
              <img
                src={subscriptionHeroSrc}
                alt={subscriptionHeroAlt}
                className="w-full h-64 sm:h-80 md:h-[520px] lg:h-[680px] object-cover"
                onError={(event) => {
                  const target = event.currentTarget as HTMLImageElement;
                  target.style.display = 'none';

                  const container = target.closest('div');
                  if (container) {
                    (container as HTMLElement).style.display = 'none';
                  }
                }}
              />
            </div>
          ) : null}
        </section>

        <section className="max-w-6xl w-full mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Pick a subscription that suits your rhythm</h2>
            <p className="text-sm text-slate-500 sm:text-base">
              Fresh menus every week, curated by chefs and nutritionists. Cancel or pause in a tap.
            </p>
          </div>

          {loading && cards.length === 0 && (
            <p className="mb-8 text-center text-sm font-medium text-slate-400">Loading live categories…</p>
          )}

          {!loading && cards.length === 0 && (
            <p className="mb-8 text-center text-sm font-medium text-slate-400">
              No subscription categories are available yet.
            </p>
          )}

          <div className="grid gap-8 lg:gap-10">
            {cards.map((card) => {
              return (
                <article
                  key={card.id}
                  className="grid gap-6 rounded-3xl bg-gradient-to-r p-6 sm:p-8 lg:p-10 shadow-none sm:grid-cols-[minmax(0,1fr)_minmax(200px,320px)]"
                  style={{ backgroundImage: card.gradient }}
                >
                <div className="flex flex-col gap-5">
                  <div>
                      {card.priceLine && (
                        <span
                          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700"
                        >
                          {card.priceLine}
                        </span>
                      )}
                    <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">{card.title}</h3>
                      {card.description && (
                        <p className="mt-3 text-sm text-slate-600 sm:text-base">
                          {card.description}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-white"
                      onClick={() => handleOrderNow(card.id)}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
                <div className="relative h-52 overflow-hidden rounded-2xl bg-white/70 sm:h-full sm:min-h-[280px]">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 text-xs font-medium uppercase tracking-wide text-slate-400">
                      Image not provided
                    </div>
                  )}
                </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionPage;