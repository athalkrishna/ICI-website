'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Step = 1 | 2 | 3;

export default function AssessmentForm() {
  const [step, setStep] = useState<Step>(1);
  const [goal, setGoal] = useState<string>('');
  const [experience, setExperience] = useState<string>('');

  const handleNext = () => setStep((s) => (s + 1) as Step);
  const handlePrev = () => setStep((s) => (s - 1) as Step);

  const getRecommendation = () => {
    if (experience === '3+ years' && goal !== 'Personal growth') return {
      level: 'Sage (Level 3)',
      desc: 'Designed for experienced practitioners aiming for mastery and complex coaching environments.',
      href: '/credentials/sage'
    };
    if (experience === '1-3 years' || goal === 'Lead a team') return {
      level: 'Architect (Level 2)',
      desc: 'Perfect for building on foundational skills and working with organisational leaders.',
      href: '/credentials/architect'
    };
    return {
      level: 'Catalyst (Level 1)',
      desc: 'The ideal starting point to master the core competencies of transformational coaching.',
      href: '/credentials/catalyst'
    };
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex gap-2 mb-2">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-brand-gold-500' : 'bg-cream-100'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-brand-gold-500' : 'bg-cream-100'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-brand-gold-500' : 'bg-cream-100'}`} />
        </div>
        <p className="text-xs text-muted font-sans uppercase tracking-widest text-center mt-4">
          {step === 3 ? 'Your Result' : `Step ${step} of 2`}
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-brand-navy-900 mb-6 text-center">What is your primary goal for seeking a coaching credential?</h2>
          <div className="space-y-3">
            {['Start a professional coaching practice', 'Enhance my leadership and management skills', 'Personal development and growth'].map((opt) => (
              <button
                key={opt}
                onClick={() => { setGoal(opt); handleNext(); }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${goal === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-navy-100 hover:border-brand-gold-300 hover:bg-cream-50'}`}
              >
                <span className="font-sans font-medium text-brand-navy-900">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-brand-navy-900 mb-6 text-center">How much formal coaching experience do you have?</h2>
          <div className="space-y-3">
            {['None (Beginner)', '1-3 years (Practising)', '3+ years (Experienced)'].map((opt) => (
              <button
                key={opt}
                onClick={() => { 
                  setExperience(opt); 
                  handleNext(); 
                  
                  // Fire tracking events
                  if (typeof window !== 'undefined') {
                    if ((window as any).gtag) {
                      (window as any).gtag('event', 'form_submit', { form_name: 'assessment_form' });
                    }
                    if ((window as any).fbq) {
                      (window as any).fbq('track', 'Lead', { content_name: 'assessment_form' });
                    }
                  }
                }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${experience === opt ? 'border-brand-gold-500 bg-brand-gold-50/50' : 'border-navy-100 hover:border-brand-gold-300 hover:bg-cream-50'}`}
              >
                <span className="font-sans font-medium text-brand-navy-900">{opt}</span>
              </button>
            ))}
          </div>
          <button onClick={handlePrev} className="flex items-center gap-2 text-muted hover:text-brand-navy-900 font-sans text-sm mt-8 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center space-y-6 py-4">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h2 className="text-3xl font-display font-bold text-brand-navy-900">Your Recommended Pathway</h2>
          
          <div className="bg-brand-navy-50 p-8 rounded-2xl border border-brand-navy-100 my-8">
            <h3 className="text-2xl font-bold font-sans text-brand-navy-900 mb-2">{getRecommendation().level}</h3>
            <p className="text-brand-navy-700 font-body mb-6">{getRecommendation().desc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getRecommendation().href} className="btn-secondary">
                Learn More
              </Link>
              <Link href="/apply" className="btn-primary">
                Apply Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <button onClick={() => setStep(1)} className="text-brand-navy-600 underline font-sans text-sm hover:text-brand-gold-600 transition-colors">
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
}
