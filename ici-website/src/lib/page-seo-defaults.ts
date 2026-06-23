/** Default SEO copy seeded into CMS and used as fallbacks when fields are empty. */
export type PageSeoDefault = {
  title: string;
  description?: string;
  /** Primary phrase this page should rank for. */
  focusKeyword?: string;
  /** Up to 10 additional SEO keywords (comma-separated in CMS). */
  seoKeywords?: string[];
  /** @deprecated Prefer focusKeyword + seoKeywords */
  keywords?: string;
  /** When true, title is used as-is (no layout template suffix). */
  absolute?: boolean;
};

export const SITE_DEFAULT_KEYWORDS = [
  'coaching certification',
  'online coaching course',
  'life coach training',
  'executive coaching certification',
  'International Coaching Institute',
  'ICI coaching',
];

/** Transactional keyword targets mapped to landing pages (for seeding & audits). */
export const PAGE_KEYWORD_TARGETS: Record<string, { focus: string; additional: string[] }> = {
  '/credentials': {
    focus: 'online coaching certification',
    additional: [
      'professional coaching certification',
      'international coaching certification',
      'coach certification program',
    ],
  },
  '/programmes': {
    focus: 'coach certification program',
    additional: [
      'online coaching certification',
      'professional coaching certification',
      'international coaching certification',
    ],
  },
  '/credentials/catalyst': {
    focus: 'transformational coaching certification',
    additional: ['become a certified life coach', 'life coaching course'],
  },
  '/programmes/certified-life-coach': {
    focus: 'online life coach training',
    additional: [
      'life coaching course',
      'become a certified life coach',
      'transformational coaching certification',
    ],
  },
  '/programmes/executive-coaching': {
    focus: 'executive coach training',
    additional: [
      'leadership coach training',
      'executive coaching certification',
      'leadership coaching certification',
    ],
  },
  '/programmes/business-coach': {
    focus: 'business coaching course',
    additional: ['coach certification program', 'professional coaching certification'],
  },
  '/programmes/health-wellness': {
    focus: 'wellness coach certification',
    additional: ['health and wellness coach training', 'coach certification program'],
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

export const PAGE_SEO_DEFAULTS: Record<string, PageSeoDefault> = {
  '/': {
    title: 'International Coaching Institute | Become a Certified Coach',
    description:
      'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
    focusKeyword: 'coaching certification',
    seoKeywords: [
      'online coaching course',
      'life coach training',
      'executive coaching certification',
      'International Coaching Institute',
    ],
    absolute: true,
  },
  '/for-ai': {
    title: 'International Coaching Institute | Global Coaching Certification & Training',
    description:
      'International Coaching Institute — a global coach education institute offering online coaching certification, professional coach certification programs, and one-to-one training in life, executive, business and wellness coaching.',
    focusKeyword: 'international coaching certification',
    seoKeywords: [
      'online coaching certification',
      'professional coaching certification',
      'coach certification program',
    ],
    absolute: true,
  },
  '/programmes': withKeywordTargets('/programmes', {
    title: 'Coach Certification Programs & Specialisations | ICI',
    description:
      'Explore ICI coach certification programs: the four-level Mastery Pathway plus specialisations in life, executive, business, wellness and team coaching. One-to-one and online.',
  }),
  '/credentials': withKeywordTargets('/credentials', {
    title: 'Online Coaching Certification | ICI Mastery Pathway',
    description:
      'Earn your online coaching certification with ICI. Four progressive levels — Catalyst, Architect, Sage and Luminary — professional coaching certification taught one-to-one and online.',
  }),
  '/pricing': {
    title: 'Pricing | ICI Coaching Certifications',
    description:
      'Clear, transparent pricing for the ICI Mastery Pathway. Four one-to-one, online certifications, from Catalyst to Luminary. Enrol level by level.',
    absolute: true,
  },
  '/admissions': {
    title: 'Admissions | International Coaching Institute',
    description:
      'How to join ICI: choose your level, apply free, speak with an advisor and begin one-to-one coaching training online.',
    absolute: true,
  },
  '/admissions/contact': {
    title: 'Speak to an Advisor | ICI Admissions',
    description:
      'Talk to an ICI advisor about programmes, levels, timing or cost. No script and no pressure, just a straight conversation to help you decide.',
  },
  '/admissions/assessment': {
    title: 'Admissions Assessment | International Coaching Institute',
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
    title: 'Faculty & Research | International Coaching Institute',
    description:
      'Meet the ICI faculty: practising coaches who teach what they do. Explore our thinking on coaching, leadership and behavioural change.',
  },
  '/about': {
    title: 'Global Coaching Institute | About International Coaching Institute',
    description:
      'ICI is a global coaching institute and coach education institute. We train and certify coaches one-to-one and online worldwide, blending coaching craft with psychology and neuroscience.',
  },
  '/about/history': {
    title: 'History & Heritage | International Coaching Institute',
    description:
      'The heritage behind ICI: coaching craft, behavioural science and one-to-one teaching traditions that shape how we train coaches today.',
  },
  '/about/leadership-faculty': {
    title: 'Leadership & Faculty | International Coaching Institute',
    description: 'Our faculty are practicing coaches who deliver live, online, one-to-one programmes.',
  },
  '/about/press': {
    title: 'Press & Media | International Coaching Institute',
    description:
      'Media enquiries, commentary and press resources from the International Coaching Institute on coaching, leadership and human change.',
  },
  '/about/partnerships': {
    title: 'Partnerships & Alliances | International Coaching Institute',
    description:
      'Partner with ICI: organisational training, institutional programmes, referral alliances and community collaborations.',
  },
  '/about/annual-reports': {
    title: 'Annual Reports | International Coaching Institute',
    description:
      'ICI annual reports on coaches trained, assessment standards, community activity and institutional transparency.',
  },
  '/about/global': {
    title: 'Global Presence | International Coaching Institute',
    description:
      'Delivered entirely online, ICI trains coaches across many countries and time zones. Our campus is the community, not a building.',
  },
  '/about/accreditation': {
    title: 'Recognition & Accreditation | International Coaching Institute',
    description:
      'How ICI holds its coaching standard, the bodies we work with and the recognition behind our credentials, stated plainly.',
  },
  '/about/mission': {
    title: 'Our Mission | International Coaching Institute',
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
    title: 'Future Students | International Coaching Institute',
    description:
      'Thinking about becoming a coach? Everything a prospective ICI student needs: the Mastery Pathway, specialisations, pricing and a free assessment to find your level.',
  },
  '/current-students': {
    title: 'Current Students | International Coaching Institute',
    description:
      'Your ICI student hub: cohort schedule, session links, materials, supervision and support. Everything you need while you train, in one place.',
  },
  '/organisations': {
    title: 'Coaching for Organisations | ICI',
    description:
      'Build a coaching culture with ICI. Train managers and internal coaches one-to-one, develop leaders, and make feedback and accountability part of how people work.',
  },
  '/alumni': {
    title: 'ICI Alumni | International Coaching Institute',
    description:
      'ICI alumni stay connected for supervision, referrals, continued learning and friendship. Qualifying is the beginning of your relationship with the institute.',
  },
  '/faculty-staff': {
    title: 'Faculty & Staff | International Coaching Institute',
    description:
      'Resources and tools for ICI faculty and staff: schedules, supervision, internal systems and support. Everything the team needs, in one place.',
  },
  '/resources': {
    title: 'Coaching Resources, Insights & Prospectus | ICI',
    description:
      'Free coaching resources from ICI: articles on leadership, psychology and change, plus the prospectus. Practical thinking for coaches and the people they serve.',
  },
  '/resources/brochure': {
    title: 'Download the ICI Prospectus',
    description:
      'Download the International Coaching Institute prospectus: the Mastery Pathway, specialisations, pricing and admissions, in one clear PDF.',
  },
  '/prospectus': {
    title: 'Prospectus | International Coaching Institute',
    description:
      'Request the ICI prospectus: programmes, credentials, pricing and admissions in one comprehensive guide to coaching certification.',
  },
  '/events': {
    title: 'Coaching Events, Summits & Masterclasses | ICI',
    description:
      'Join ICI events: masterclasses, summits and live sessions for coaches and leaders. Learn, connect and grow with the wider coaching community.',
  },
  '/find-a-coach': {
    title: 'Find a Certified ICI Coach',
    description:
      'Looking for a coach you can trust? Find an ICI-certified coach by specialism, level and language. Every coach here earned their credential through real practice.',
  },
  '/blog': {
    title: 'Coaching Insights & Articles | ICI Blog',
    description:
      'Read the latest thinking from ICI on coaching, leadership, psychology and human change. Practical insights for coaches and the people they lead.',
  },
  '/terms': {
    title: 'Terms of Service | International Coaching Institute',
    description:
      'The terms that govern your use of the ICI website and our programmes, including enrolment, payment, intellectual property and liability.',
  },
  '/privacy': {
    title: 'Privacy Policy | International Coaching Institute',
    description:
      'How the International Coaching Institute collects, uses and protects your personal data, and the rights you have over it.',
  },
  '/complaints': {
    title: 'Complaints Policy | International Coaching Institute',
    description: 'How to file a complaint with the International Coaching Institute and our process for resolving it.',
  },
  '/credentials/catalyst': withKeywordTargets('/credentials/catalyst', {
    title: 'Transformational Coaching Certification | ICI Catalyst (Level 1)',
    description:
      'Transformational coaching certification with ICI Catalyst. A one-to-one, online foundation credential: 36 hours of coaching with a professional coach plus guided self-work.',
  }),
  '/credentials/architect': {
    title: 'ICI Architect Coach (Level 2) | Professional Certification',
    description:
      'Build a thriving, ethical coaching practice. The ICI Architect Coach certification is 60 hours, one-to-one and online: 20 hours coaching plus 40 hours self-work.',
  },
  '/credentials/sage': {
    title: 'ICI Sage Coach (Level 3) | Senior Coach Certification',
    description:
      'Coach with depth, range and presence. The ICI Sage Coach certification is 90 hours, one-to-one and online: 30 hours with a master coach plus 60 hours self-work.',
  },
  '/credentials/luminary': {
    title: 'ICI Luminary (Level 4) | The Highest Coaching Distinction',
    description:
      'The ICI Luminary is our highest distinction. 120 hours, one-to-one, for master coaches who shape the field, mentor others and make an original contribution to coaching.',
  },
  '/programmes/certified-life-coach': withKeywordTargets('/programmes/certified-life-coach', {
    title: 'Life Coaching Course | Online Life Coach Training | ICI',
    description:
      'ICI life coaching course and online life coach training within the Mastery Pathway. Learn to guide clients through real change, one-to-one and online.',
  }),
  '/programmes/executive-coaching': withKeywordTargets('/programmes/executive-coaching', {
    title: 'Executive Coach Training & Leadership Coaching Certification | ICI',
    description:
      'Executive coach training and leadership coaching certification with ICI. Coach senior leaders one-to-one and online within the four-level Mastery Pathway.',
  }),
  '/programmes/business-coach': withKeywordTargets('/programmes/business-coach', {
    title: 'Business Coaching Course | ICI Certification',
    description:
      'Business coaching course with ICI. Help founders and owners build companies that work — one-to-one, online, within the Mastery Pathway.',
  }),
  '/programmes/health-wellness': withKeywordTargets('/programmes/health-wellness', {
    title: 'Wellness Coach Certification | Health & Wellness Training | ICI',
    description:
      'Wellness coach certification and health and wellness coach training with ICI. Guide sustainable change, one-to-one and online.',
  }),
  '/programmes/team-coaching': {
    title: 'Team & Organisational Coaching | ICI',
    description:
      'Build a coaching culture with ICI. A team and organisational focus within the Mastery Pathway, delivered one-to-one and online.',
  },
};

/** Build comma-separated keywords string for CMS seeding. */
export function pageSeoKeywordsInput(defaults: PageSeoDefault): string {
  if (defaults.seoKeywords?.length) return defaults.seoKeywords.join(', ');
  return defaults.keywords ?? '';
}

/** Merge focus + additional keywords for metadata output. */
export function buildPageKeywordList(content: {
  focus_keyword?: string;
  seo_keywords?: string;
  meta_keywords?: string;
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
  if (content.meta_keywords) fromCsv(content.meta_keywords);

  if (defaults?.focusKeyword) add(defaults.focusKeyword);
  defaults?.seoKeywords?.forEach(add);
  if (defaults?.keywords) fromCsv(defaults.keywords);

  return result;
}
