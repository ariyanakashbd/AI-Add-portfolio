import React, { useRef } from 'react';
import { portfolioData, Review } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Star, ChevronLeft, ChevronRight, Quote, Info } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

export const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const { reviews } = portfolioData;
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="reviews"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Custom Swiper Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
              <span>{t.reviews.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              {t.reviews.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.reviews.subtitle}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              id="reviews-prev-btn"
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={t.reviews.previous}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="reviews-next-btn"
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={t.reviews.next}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative pb-10">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 6500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="py-2"
          >
            {reviews.map((item: Review) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="h-full p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 flex flex-col justify-between space-y-6 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors shadow-xs">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white"
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-neutral-300 dark:text-neutral-700" />
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                    "{item.review}"
                  </p>

                  {/* Reviewer Details */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono font-bold text-xs flex items-center justify-center">
                      {item.avatarText}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                        {item.clientName}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {item.role}, {item.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Transparent Notice regarding Sample Review Data */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/50 text-xs font-mono text-neutral-500 dark:text-neutral-400 text-center">
          <Info className="w-4 h-4 text-neutral-400 shrink-0" />
          <span>Structured client review architecture. Can be dynamically connected to live testimonial APIs or database.</span>
        </div>
      </div>
    </section>
  );
};
