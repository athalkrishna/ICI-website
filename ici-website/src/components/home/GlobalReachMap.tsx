'use client'
import { useEffect, useRef } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import createGlobe from 'cobe'

export default function GlobalReachMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    let width = 0
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1, // dark mode globe
      diffuse: 1.2,
      scale: 1,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor: [10 / 255, 31 / 255, 68 / 255], // matches navy-900
      markerColor: [201 / 255, 168 / 255, 76 / 255], // matches gold-400
      glowColor: [10 / 255, 31 / 255, 68 / 255], // subtle glow
      markers: [
        // longitude, latitude
        { location: [40.7128, -74.0060], size: 0.08 }, // New York
        { location: [51.5074, -0.1278], size: 0.08 },  // London
        { location: [25.2048, 55.2708], size: 0.08 },  // Dubai
        { location: [1.3521, 103.8198], size: 0.08 },  // Singapore
        { location: [-33.8688, 151.2093], size: 0.08 },// Sydney
        { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
        { location: [-23.5505, -46.6333], size: 0.06 } // Sao Paulo
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.003
        state.width = width * 2
        state.height = width * 2
      }
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="py-32 bg-navy-900 relative overflow-hidden text-white">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-800 to-navy-900 opacity-60" />
      
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left side content */}
        <AnimatedSection>
          <div className="section-label mb-4 text-gold-400">Global Network</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-[1.1]">
            Connecting Coaches Worldwide
          </h2>
          <p className="font-body text-navy-200 text-lg mb-10 max-w-xl leading-relaxed">
            With graduates in over 60 countries, the ICI community is a diverse, dynamic network of professionals advancing the field of coaching. Connect, learn, and grow with the best in the industry.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-12 max-w-md">
            <div className="bg-navy-800/40 backdrop-blur-md border border-navy-700/50 rounded-2xl p-6 shadow-xl transition-transform hover:-translate-y-1">
              <div className="text-4xl font-display font-bold text-gold-400 mb-2">60+</div>
              <div className="text-sm font-sans font-medium text-navy-200 uppercase tracking-widest">Countries</div>
            </div>
            <div className="bg-navy-800/40 backdrop-blur-md border border-navy-700/50 rounded-2xl p-6 shadow-xl transition-transform hover:-translate-y-1">
              <div className="text-4xl font-display font-bold text-gold-400 mb-2">10k+</div>
              <div className="text-sm font-sans font-medium text-navy-200 uppercase tracking-widest">Alumni</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-sans font-bold uppercase tracking-widest text-navy-300">
            <span className="hover:text-gold-400 transition-colors">New York</span>
            <span className="text-gold-500/30">•</span>
            <span className="hover:text-gold-400 transition-colors">London</span>
            <span className="text-gold-500/30">•</span>
            <span className="hover:text-gold-400 transition-colors">Dubai</span>
            <span className="text-gold-500/30">•</span>
            <span className="hover:text-gold-400 transition-colors">Singapore</span>
            <span className="text-gold-500/30">•</span>
            <span className="hover:text-gold-400 transition-colors">Sydney</span>
          </div>
        </AnimatedSection>
        
        {/* Right side Globe */}
        <AnimatedSection className="relative aspect-square w-full max-w-[600px] mx-auto lg:ml-auto">
          {/* A soft glow behind the globe */}
          <div className="absolute inset-0 bg-gold-400/10 blur-[100px] rounded-full" />
          
          <canvas
            ref={canvasRef}
            className="w-full h-full relative z-10 drop-shadow-2xl cursor-grab active:cursor-grabbing"
            style={{ contain: 'layout paint size' }}
          />
        </AnimatedSection>
      </div>
    </section>
  )
}
