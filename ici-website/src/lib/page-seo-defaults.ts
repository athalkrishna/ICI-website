/** Default SEO copy seeded into CMS and used as fallbacks when fields are empty. */
export type PageSeoDefault = {
  title: string;
  description?: string;
  /** Primary phrase this page should rank for. */
  focusKeyword?: string;
  /** Additional SEO keywords (comma-separated in CMS). */
  seoKeywords?: string[];
  /** @deprecated Prefer focusKeyword + seoKeywords */
  keywords?: string;
  /** When true, title is used as-is (no layout template suffix). */
  absolute?: boolean;
};

/**
 * Client-approved keyword map — use ONLY these terms per page.
 * Updated from ICI master keyword sheet (homepage, credentials, programmes, pricing, levels, blog).
 */
export const PAGE_KEYWORD_TARGETS: Record<string, { focus: string; additional: string[] }> = {
  '/credentials': {
    focus: 'professional coaching certification',
    additional: ['online coaching certification', 'international coaching certification'],
  },
  '/pricing': {
    focus: 'coaching certification cost',
    additional: ['coaching certification fees', 'coach certification program'],
  },
  '/programmes': {
    focus: 'coach training program',
    additional: ['coaching certification courses'],
  },
  '/programmes/certified-life-coach': {
    focus: 'transformational coaching certification',
    additional: ['life coaching course', 'become a certified life coach'],
  },
  '/programmes/executive-coaching': {
    focus: 'executive coach training',
    additional: ['executive coaching certification', 'leadership coaching certification'],
  },
  '/programmes/business-coach': {
    focus: 'business coach certification',
    additional: ['business coaching course'],
  },
  '/programmes/health-wellness': {
    focus: 'health and wellness coach training',
    additional: ['wellness coach certification', 'wellness coaching course'],
  },
  '/programmes/team-coaching': {
    focus: 'leadership coach training',
    additional: ['corporate coach training'],
  },
  '/about': {
    focus: 'global coaching institute',
    additional: ['coach education institute'],
  },
  '/credentials/catalyst': {
    focus: 'coaching certification for beginners',
    additional: ['foundation coaching certification'],
  },
  '/credentials/architect': {
    focus: 'advanced coaching certification',
    additional: [],
  },
  '/credentials/sage': {
    focus: 'master coaching certification',
    additional: [],
  },
  '/credentials/luminary': {
    focus: 'master coach certification',
    additional: [],
  },
};

function withKeywordTargets(slug: string, base: PageSeoDefault): PageSeoDefault {
  const targets = PAGE_KEYWORD_TARGETS[slug];
  if (!targets) return base;
  return {
    ...base,
    focusKeyword: targets.focus,
    seoKeywords: targets.additional,
  };
}

/** Flat list of focus + additional keywords for a mapped page slug. */
export function approvedKeywordsForPage(slug: string): string[] | undefined {
  const targets = PAGE_KEYWORD_TARGETS[slug];
  if (!targets) return undefined;
  return [targets.focus, ...targets.additional];
}

export const PAGE_SEO_DEFAULTS: Record<string, PageSeoDefault> = {
  '/': {
    title: 'International Coaching Institute | Become a Certified Coach',
    description:
      'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
    absolute: true,
  },
  '/for-ai': {
    title: 'International Coaching Institute | Global Coaching Certification & Training',
    description:
      'International Coaching Institute — a global coach education institute offering coach certification programs and one-to-one training in life, executive, business and wellness coaching.',
    focusKeyword: 'international coaching institute',
    seoKeywords: ['global coaching institute', 'coach education institute'],
    absolute: true,
  },
  '/programmes': withKeywordTargets('/programmes', {
    title: 'Coach Certification Programs & Specialisations',
    description:
      'Explore ICI coach certification programs: the four-level Mastery Pathway plus specialisations in life, executive, business, wellness and team coaching. One-to-one and online.',
  }),
  '/credentials': withKeywordTargets('/credentials', {
    title: 'Online Coaching Certification Mastery Pathway',
    description:
      'Earn your international coaching certification with ICI. Four progressive levels — Catalyst, Architect, Sage and Luminary — taught one-to-one and online.',
  }),
  '/pricing': withKeywordTargets('/pricing', {
    title: 'Pricing',
    description:
      'Transparent pricing for ICI online coach certification: four one-to-one Mastery Pathway levels from Catalyst to Luminary. See costs and enrol level by level.',
    absolute: true,
  }),
  '/admissions': {
    title: 'Admissions',
    description:
      'How to join ICI: choose your level, apply free, speak with an advisor and begin one-to-one coaching training online.',
    absolute: true,
  },
  '/admissions/contact': {
    title: 'Speak to an Advisor Admissions',
    description:
      'Talk to an ICI advisor about programmes, levels, timing or cost. No script and no pressure, just a straight conversation to help you decide.',
  },
  '/admissions/assessment': {
    title: 'Admissions Assessment',
    description:
      'Answer a few quick questions to discover which coaching credential level aligns with your experience and goals.',
    absolute: true,
  },
  '/apply': {
    title: 'Apply to the International Coaching Institute',
    description:
      'Start your ICI application. Short, free and no obligation. Tell us about your goals and we will guide you to the right coaching credential level.',
    absolute: true,
  },
  '/contact': {
    title: 'Contact ICI | Speak to a Coaching Advisor',
    description:
      'Contact the International Coaching Institute. Ask about programmes, credentials, pricing or organisational training. We respond within 1–2 business days.',
    absolute: true,
  },
  '/faculty': {
    title: 'Faculty & Research',
    description:
      'Meet the ICI faculty: practising coaches who teach what they do. Explore our thinking on coaching, leadership and behavioural change.',
  },
  '/about': withKeywordTargets('/about', {
    title: 'About ICI',
    description:
      'ICI is a global coaching institute and coach education institute. We train and certify coaches one-to-one and online worldwide, blending coaching craft with psychology and neuroscience.',
  }),
  '/about/history': {
    title: 'History & Heritage',
    description:
      'The heritage behind ICI: coaching craft, behavioural science and one-to-one teaching traditions that shape how we train coaches today.',
  },
  '/about/leadership-faculty': {
    title: 'Leadership & Faculty',
    description: 'Our faculty are practicing coaches who deliver live, online, one-to-one programmes.',
  },
  '/about/press': {
    title: 'Press & Media',
    description:
      'Media enquiries, commentary and press resources from the International Coaching Institute on coaching, leadership and human change.',
  },
  '/about/partnerships': {
    title: 'Partnerships & Alliances',
    description:
      'Partner with ICI: organisational training, institutional programmes, referral alliances and community collaborations.',
  },
  '/about/annual-reports': {
    title: 'Annual Reports',
    description:
      'ICI annual reports on coaches trained, assessment standards, community activity and institutional transparency.',
  },
  '/about/global': {
    title: 'Global Presence',
    description:
      'Delivered entirely online, ICI trains coaches across many countries and time zones. Our campus is the community, not a building.',
  },
  '/about/accreditation': {
    title: 'Recognition & Accreditation',
    description:
      'How ICI holds its coaching standard, the bodies we work with and the recognition behind our credentials, stated plainly.',
  },
  '/about/mission': {
    title: 'Our Mission',
    description:
      'ICI mission, vision and values: raising the standard of coaching through skill, self-awareness and rigorous one-to-one training.',
    absolute: true,
  },
  '/community': {
    title: 'The ICI Coaching Community',
    description:
      'Coaching can be solitary work. The ICI community connects coaches worldwide for supervision, referrals and real support, long after they qualify.',
  },
  '/future-students': {
    title: 'Future Students',
    description:
      'Thinking about becoming a coach? Everything a prospective ICI student needs: the Mastery Pathway, specialisations, pricing and a free assessment to find your level.',
  },
  '/current-students': {
    title: 'Current Students',
    description:
      'Your ICI student hub: cohort schedule, session links, materials, supervision and support. Everything you need while you train, in one place.',
  },
  '/organisations': {
    title: 'Coaching for Organisations',
    description:
      'Build a coaching culture with ICI. Train managers and internal coaches one-to-one, develop leaders, and make feedback and accountability part of how people work.',
  },
  '/alumni': {
    title: 'ICI Alumni',
    description:
      'ICI alumni stay connected for supervision, referrals, continued learning and friendship. Qualifying is the beginning of your relationship with the institute.',
  },
  '/faculty-staff': {
    title: 'Faculty & Staff',
    description:
      'Resources and tools for ICI faculty and staff: schedules, supervision, internal systems and support. Everything the team needs, in one place.',
  },
  '/resources': {
    title: 'Coaching Resources, Insights & Prospectus',
    description:
      'Free coaching resources from ICI: articles on leadership, psychology and change, plus the prospectus. Practical thinking for coaches and the people they serve.',
  },
  '/resources/brochure': {
    title: 'Download the ICI Prospectus',
    description:
      'Download the International Coaching Institute prospectus: the Mastery Pathway, specialisations, pricing and admissions, in one clear PDF.',
  },
  '/prospectus': {
    title: 'Prospectus',
    description:
      'Request the ICI prospectus: programmes, credentials, pricing and admissions in one comprehensive guide to coaching certification.',
  },
  '/events': {
    title: 'Coaching Events, Summits & Masterclasses',
    description:
      'Join ICI events: masterclasses, summits and live sessions for coaches and leaders. Learn, connect and grow with the wider coaching community.',
  },
  '/find-a-coach': {
    title: 'Find a Certified ICI Coach',
    description:
      'Looking for a coach you can trust? Find an ICI-certified coach by specialism, level and language. Every coach here earned their credential through real practice.',
  },
  '/blog': {
    title: 'Coaching Insights & Articles Blog',
    description:
      'Read the latest thinking from ICI on coaching, leadership, psychology and human change. Practical insights for coaches and the people they lead.',
  },
  '/terms': {
    title: 'Terms of Service',
    description:
      'The terms that govern your use of the ICI website and our programmes, including enrolment, payment, intellectual property and liability.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'How the International Coaching Institute collects, uses and protects your personal data, and the rights you have over it.',
  },
  '/complaints': {
    title: 'Complaints Policy',
    description: 'How to file a complaint with the International Coaching Institute and our process for resolving it.',
  },
  '/credentials/catalyst': withKeywordTargets('/credentials/catalyst', {
    title: 'Coaching Certification for Beginners | ICI Catalyst (Level 1)',
    description:
      'Foundation coaching certification with ICI Catalyst. A one-to-one, online beginner credential: 36 hours of coaching with a professional coach plus guided self-work.',
  }),
  '/credentials/architect': withKeywordTargets('/credentials/architect', {
    title: 'ICI Architect Coach (Level 2) | Professional Certification',
    description:
      'Build a thriving, ethical coaching practice. The ICI Architect Coach certification is 60 hours, one-to-one and online: 20 hours coaching plus 40 hours self-work.',
  }),
  '/credentials/sage': withKeywordTargets('/credentials/sage', {
    title: 'ICI Sage Coach (Level 3) | Senior Coach Certification',
    description:
      'Coach with depth, range and presence. The ICI Sage Coach certification is 90 hours, one-to-one and online: 30 hours with a master coach plus 60 hours self-work.',
  }),
  '/credentials/luminary': withKeywordTargets('/credentials/luminary', {
    title: 'ICI Luminary (Level 4) | The Highest Coaching Distinction',
    description:
      'The ICI Luminary is our highest distinction. 120 hours, one-to-one, for master coaches who shape the field, mentor others and make an original contribution to coaching.',
  }),
  '/programmes/certified-life-coach': withKeywordTargets('/programmes/certified-life-coach', {
    title: 'Life Coaching Course | Online Life Coach Training',
    description:
      'ICI life coaching course and online life coach training within the Mastery Pathway. Learn to guide clients through real change, one-to-one and online.',
  }),
  '/programmes/executive-coaching': withKeywordTargets('/programmes/executive-coaching', {
    title: 'Executive Coach Training & Leadership Coaching Certification',
    description:
      'Executive coach training and leadership coaching certification with ICI. Coach senior leaders one-to-one and online within the four-level Mastery Pathway.',
  }),
  '/programmes/business-coach': withKeywordTargets('/programmes/business-coach', {
    title: 'Business Coaching Course Certification',
    description:
      'Business coaching course with ICI. Help founders and owners build companies that work — one-to-one, online, within the Mastery Pathway.',
  }),
  '/programmes/health-wellness': withKeywordTargets('/programmes/health-wellness', {
    title: 'Wellness Coach Certification | Health & Wellness Training',
    description:
      'Wellness coach certification and health and wellness coach training with ICI. Guide sustainable change, one-to-one and online.',
  }),
  '/programmes/team-coaching': withKeywordTargets('/programmes/team-coaching', {
    title: 'Team & Organisational Coaching',
    description:
      'Build a coaching culture with ICI. A team and organisational focus within the Mastery Pathway, delivered one-to-one and online.',
  }),
};

/** Build comma-separated keywords string for CMS seeding. */
export function pageSeoKeywordsInput(defaults: PageSeoDefault): string {
  if (defaults.seoKeywords?.length) return defaults.seoKeywords.join(', ');
  return defaults.keywords ?? '';
}

/** Merge focus + additional keywords from CMS + defaults (ignores legacy meta_keywords). */
export function buildPageKeywordList(content: {
  focus_keyword?: string;
  seo_keywords?: string;
}, defaults?: PageSeoDefault): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  const add = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(trimmed);
    }
  };

  const fromCsv = (raw: string) => raw.split(',').forEach((k) => add(k));

  if (content.focus_keyword) add(content.focus_keyword);
  if (content.seo_keywords) fromCsv(content.seo_keywords);

  if (defaults?.focusKeyword) add(defaults.focusKeyword);
  defaults?.seoKeywords?.forEach(add);
  if (defaults?.keywords) fromCsv(defaults.keywords);

  return result;
}
