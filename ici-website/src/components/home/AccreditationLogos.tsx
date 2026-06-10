'use client'

export default function AccreditationLogos() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-sans font-semibold text-gray-400 uppercase tracking-widest mb-8">
          The standard we hold ourselves to
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-sans text-navy-600">
          {[
            "Curriculum aligned to international coaching competency standards",
            "Every credential assessed on real coaching, not attendance",
            "Faculty bound by a professional code of ethics",
            "One-to-one delivery at every level",
            "Transparent pricing, stated in full"
          ].map((text, i) => (
            <div key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full flex items-center text-center">
              {text}
            </div>
          ))}
        </div>

        {/* TODO: restore when accreditations are earned
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 text-gray-400 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 16H22M16 10V22" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl text-navy-700 leading-none tracking-tight">ICF</span>
              <span className="font-sans text-[8px] text-gray-500 uppercase tracking-widest leading-none mt-1.5">Accredited</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16L16 12L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl text-navy-700 leading-none tracking-tight">EMCC</span>
              <span className="font-sans text-[8px] text-gray-500 uppercase tracking-widest leading-none mt-1.5">Global Standard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="16,6 26,24 6,24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="16" cy="18" r="2" fill="currentColor"/>
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl text-navy-700 leading-none tracking-tight">AC</span>
              <span className="font-sans text-[8px] text-gray-500 uppercase tracking-widest leading-none mt-1.5">Association</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl text-navy-700 leading-none tracking-tight">CCE</span>
              <span className="font-sans text-[8px] text-gray-500 uppercase tracking-widest leading-none mt-1.5">Approved Provider</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
              <path d="M11 16L15 20L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl text-navy-700 leading-none tracking-tight">ISO</span>
              <span className="font-sans text-[8px] text-gray-500 uppercase tracking-widest leading-none mt-1.5">9001:2015</span>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  )
}
