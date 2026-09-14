"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Award,
  Fish,
  Shell,
  Anchor,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/data/hero-slides";
import { usePublicHeroSliders } from "@/lib/hooks/use-hero-sliders";
import type { HeroSlide } from "@/lib/data/hero-slides";
import { cn, imageNameWithoutExtension } from "@/lib/utils";

const SLIDE_DURATION = 7000;
const seafoodIcons = [Fish, Shell, Anchor, Fish];
const iconByKey = { fish: Fish, shell: Shell, anchor: Anchor };

function getHeroImageUrl(url: string, width: number) {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_fill/`);
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const { data: apiSlides } = usePublicHeroSliders();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slides: HeroSlide[] = apiSlides?.length
    ? apiSlides.map((slide) => ({
        id: slide._id,
        image: getHeroImageUrl(slide.image?.url || heroSlides[0].image, 1920),
          imageName: imageNameWithoutExtension(slide.image?.originalName),
        alt: slide.alt,
        badge: slide.badge,
        title: slide.title,
        highlight: slide.highlight,
        description: slide.description,
        primaryCta: slide.primaryCta,
        secondaryCta: slide.secondaryCta,
        stats: slide.stats
      }))
    : heroSlides;
  const total = slides.length;

  const goTo = useCallback(
    (i: number) => {
      setCurrent(((i % total) + total) % total);
      setProgress(0);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const step = 50;
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + (step / SLIDE_DURATION) * 100;
        if (next >= 100) {
          goNext();
          return 0;
        }
        return next;
      });
    }, step);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, current, goNext]);

  const slide = slides[current] || slides[0];
  const SlideIcon = apiSlides?.[current]?.iconKey
    ? iconByKey[apiSlides[current].iconKey as keyof typeof iconByKey] ||
      seafoodIcons[current % seafoodIcons.length]
    : seafoodIcons[current % seafoodIcons.length];

  return (
    <section
      className="relative overflow-hidden bg-brand-navy"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-bleed background slides */}
      <div className="relative min-h-[620px] sm:min-h-[92vh] md:min-h-[88vh]">
        {slides.map((s, i) => {
          const isActive = i === current;
          return (
            <div
              key={s.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <Image
                src={s.image}
                alt={s.imageName || s.alt}
                title={s.imageName || s.alt}
                fill
                sizes="100vw"
                className={cn("object-cover", isActive && "animate-ken-burns")}
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Ocean gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/75 to-brand-navy/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/40" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,transparent_0%,hsl(220_100%_10%/0.6)_70%)]" />
            </div>
          );
        })}

        {/* Decorative floating elements */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="absolute left-[8%] top-[18%] h-32 w-32 rounded-full bg-brand-primary/10 blur-3xl animate-float-slow" />
          <div
            className="absolute right-[12%] top-[35%] h-48 w-48 rounded-full bg-brand-accent/10 blur-3xl animate-float-slow"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-[30%] left-[40%] h-24 w-24 rounded-full bg-brand-primary-light/10 blur-2xl animate-float-slow"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Main content */}
        <div className="container-wide relative z-30 flex min-h-[620px] flex-col justify-start pb-20 pt-20 sm:min-h-[92vh] sm:justify-center sm:pb-36 sm:pt-28 md:min-h-[88vh] md:pb-40 md:pt-32">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {slides.map((s, i) => {
                const isActive = i === current;
                const Icon = seafoodIcons[i % seafoodIcons.length];
                return (
                  <div
                    key={s.id}
                    className={cn(
                      "transition-all duration-700",
                      isActive
                        ? "relative opacity-100 translate-y-0"
                        : "absolute inset-0 opacity-0 translate-y-6 pointer-events-none"
                    )}
                  >
                    {/* Seafood badge */}
                    <div className="motion-reveal inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-accent/20">
                        <Icon className="h-5 w-5 text-brand-accent-light" />
                      </span>
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-accent-light">
                          Premium Seafood
                        </span>
                        <span className="text-sm font-medium text-white/90">
                          {s.badge}
                        </span>
                      </div>
                    </div>

                    <h1 className="motion-reveal mt-7 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl text-shadow-hero" style={{ animationDelay: '100ms' }}>
                      {s.title}
                      <span className="mt-2 block bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-primary bg-clip-text text-transparent">
                        {s.highlight}
                      </span>
                    </h1>

                    <p className="motion-reveal mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg" style={{ animationDelay: '180ms' }}>
                      {s.description}
                    </p>

                    <div className="motion-reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '260ms' }}>
                      <Button
                        asChild
                        size="lg"
                        className="group bg-gradient-to-r from-brand-accent to-brand-accent-deep text-white border-0 shadow-lg shadow-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/40 transition-all hover:-translate-y-0.5"
                      >
                        <Link href={s.primaryCta.href}>
                          {s.primaryCta.label}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-white/25 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white hover:border-white/40"
                      >
                        <Link
                          href={s.secondaryCta.href}
                          className="flex items-center gap-2"
                        >
                          {s.secondaryCta.label}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <div className="motion-reveal mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-5" style={{ animationDelay: '340ms' }}>
                      {s.stats.map((stat, si) => (
                        <div
                          key={si}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3"
                        >
                          <div className="font-heading text-xl font-bold text-white sm:text-2xl">
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/60">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right — featured seafood card */}
            <div className="hidden lg:col-span-5 lg:block">
              <div className="motion-reveal relative ml-auto max-w-sm" style={{ animationDelay: '220ms' }}>
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/20">
                      <SlideIcon className="h-6 w-6 text-brand-accent-light" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50">
                        Now Featuring
                      </p>
                      <p className="font-heading text-lg font-bold text-white">
                        {slide.badge}
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={getHeroImageUrl(slide.image, 800)}
                      alt={slide.imageName || slide.alt}
                      title={slide.imageName || slide.alt}
                      fill
                      sizes="400px"
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-heading text-sm font-semibold text-white">
                        {slide.title}
                      </p>
                      <p className="text-xs text-white/70">{slide.highlight}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                    <span>HACCP Certified</span>
                    <span>Cold Chain Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide controls + thumbnails */}
        <div className="pointer-events-none absolute inset-0 z-40">
          {total > 1 && (
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-4 sm:px-6 lg:px-8">
              <button
                onClick={goPrev}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-brand-navy/45 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-brand-navy/75 sm:h-12 sm:w-12"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={goNext}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-brand-navy/45 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-brand-navy/75 sm:h-12 sm:w-12"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          )}

          <div className="pointer-events-auto absolute inset-x-0 bottom-0 ">
            <svg
              viewBox="0 0 1440 60"
              className="block h-[42px] w-full sm:h-[52px]"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hero-wave-fill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(203 92% 96%)" />
                  <stop offset="52%" stopColor="hsl(210 40% 98%)" />
                  <stop offset="100%" stopColor="hsl(17 89% 96%)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#hero-wave-fill)"
                d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,60 L0,60 Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
