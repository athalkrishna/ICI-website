/** Decorative hero background — clipped so blur glow cannot cause horizontal scroll on mobile */
export default function HeroDecor() {
  return (
    <>
      <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
      <div
        className="absolute inset-0 z-0 overflow-hidden opacity-20 mix-blend-screen pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-0 right-0 size-[min(100vw,800px)] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/3" />
      </div>
    </>
  );
}
