import React from 'react';
import Topbar from '../components/Topbar';
// Removed unused imports after footer extraction
import Footer from '../components/Footer';
import { usePlacementBanners } from '../stores/publicBannersStore';
import { getBannerAlt, getBannerImageSrc } from '../utils/bannerUtils';

const offerings = [
  {
    title: 'Full Buffet Service',
    desc: 'Perfect for weddings and large corporate events.',
    img: '/image1.webp'
  },
  {
    title: 'Snack Platters',
    desc: 'Ideal for meetings and casual get-togethers.',
    img: '/image2.webp'
  },
  {
    title: 'Corporate Lunch Boxes',
    desc: 'Individual, hygienic, and delicious meals for your team.',
    img: '/image3.webp'
  },
  {
    title: 'Desserts & Add-ons',
    desc: 'Custom cakes, sweets, and more for your event.',
    img: '/image4.webp'
  },
];

const PartyOrdersPage: React.FC = () => {
  const { banners: partyBanners } = usePlacementBanners('party-orders');
  const heroBanner = partyBanners[0];
  const heroBannerSrc = getBannerImageSrc(heroBanner);
  const heroBannerAlt = getBannerAlt(heroBanner, 'Party orders hero banner');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar active="Party Orders" />
      <main className="mt-20 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        {/* Hero image card */}
        {heroBannerSrc && (
          <div className="rounded shadow-lg overflow-hidden mb-12 sm:mb-16 relative bg-black rounded-[2rem]">
            <img
              src={heroBannerSrc}
              alt={heroBannerAlt}
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
        )}
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-900 mb-10">Explore Our Offerings</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map(o => (
            <div key={o.title} className="flex flex-col bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={o.img} alt={o.title} className="w-full h-full object-fill" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 leading-snug">{o.title}</h3>
                <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed mb-2">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PartyOrdersPage;