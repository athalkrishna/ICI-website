import Section from '@/components/layout/Section'
import { HOME_STANDARDS_ITEMS } from '@/lib/home-standards-defaults'

function PlusIcon() {
  return (
    <svg
      className="w-7 h-7 shrink-0"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
      <path d="M10 16H22M16 10V22" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export default function AccreditationLogos() {
  return (
    <Section spacing="standard" className="bg-white border-y border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-[11px] font-sans font-semibold text-navy-400 uppercase tracking-[0.2em] mb-10">
          The standard we hold ourselves to
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-8 lg:hidden">
          {HOME_STANDARDS_ITEMS.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-3 text-navy-400 mx-auto w-full max-w-[220px] sm:max-w-none sm:mx-0"
            >
              <PlusIcon />
              <div className="flex min-w-0 flex-col justify-center gap-1.5">
                <span className="font-display font-bold text-[15px] leading-none text-brand-navy-700 tracking-tight">
                  {item.name}
                </span>
                <span className="font-sans text-[10px] leading-none text-brand-navy-600 uppercase tracking-[0.1em]">
                  {item.subtitle}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <ul className="hidden lg:flex lg:items-center lg:justify-between lg:gap-5 xl:gap-8">
          {HOME_STANDARDS_ITEMS.map((item) => (
            <li key={item.name} className="flex shrink-0 items-center gap-3 text-navy-400">
              <PlusIcon />
              <div className="flex flex-col justify-center gap-1.5">
                <span className="font-display font-bold text-[15px] leading-none text-brand-navy-700 tracking-tight whitespace-nowrap">
                  {item.name}
                </span>
                <span className="font-sans text-[10px] leading-none text-brand-navy-600 uppercase tracking-[0.08em] whitespace-nowrap">
                  {item.subtitle}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
