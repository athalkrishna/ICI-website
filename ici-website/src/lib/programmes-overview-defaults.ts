/** Default copy for /programmes overview — CMS fallbacks and seed values. */

export type ProgrammesOverviewData = {
  heroEyebrow: string;
  heroHeading: string;
  heroHeadingAccent: string;
  heroBody: string;
  masterySectionHeading: string;
  masterySectionBody: string;
  levels: {
    label: string;
    title: string;
    desc: string;
  }[];
  credentialsLinkText: string;
  credentialsLinkUrl: string;
  specialisationsHeading: string;
  specialisationsHeadingAccent: string;
  specialisationsBody: string;
  specialisations: {
    name: string;
    href: string;
    full?: boolean;
  }[];
  howItWorksHeading: string;
  howSteps: {
    title: string;
    desc: string;
  }[];
  ctaLink1Text: string;
  ctaLink1Url: string;
  ctaLink2Text: string;
  ctaLink2Url: string;
};

export const PROGRAMMES_OVERVIEW: ProgrammesOverviewData = {
  heroEyebrow: 'Programmes',
  heroHeading: 'One pathway,',
  heroHeadingAccent: 'many ways to serve',
  heroBody:
    'Everything we teach is built around the same promise: you will leave able to coach well, not just talk about coaching. The core of ICI is the Mastery Pathway, a four-level certification journey taught one-to-one and online. Within it, you can focus on the kind of coaching that calls you, from life and executive work to business, wellness and teams. Here is how the two fit together.',
  masterySectionHeading: 'The core: the ICI Mastery Pathway',
  masterySectionBody:
    'Your certification is earned through four progressive levels. Each is a complete credential in its own right, and each builds on the one before.',
  levels: [
    { label: 'Level 1', title: 'Catalyst', desc: 'The foundation. Become a competent, confident coach.' },
    { label: 'Level 2', title: 'Architect', desc: 'The professional. Build a thriving practice and work with complexity.' },
    { label: 'Level 3', title: 'Sage', desc: 'The senior coach. Coach with depth, range and presence.' },
    { label: 'Level 4', title: 'Luminary', desc: 'The highest distinction. Master the craft and develop others.' },
  ],
  credentialsLinkText: 'Explore credentials and pricing',
  credentialsLinkUrl: '/credentials',
  specialisationsHeading: 'Specialisations:',
  specialisationsHeadingAccent: 'where you focus',
  specialisationsBody:
    'As you progress, you can shape your training around a specialism. These are not separate courses with separate fees; they are the focus you bring to your pathway, supported by faculty experienced in that area. Your investment follows the Pathway, set out on the Pricing page.',
  specialisations: [
    { name: 'Life Coaching', href: '/programmes/certified-life-coach' },
    { name: 'Executive & Leadership Coaching', href: '/programmes/executive-coaching' },
    { name: 'Business Coaching', href: '/programmes/business-coach' },
    { name: 'Health & Wellness Coaching', href: '/programmes/health-wellness' },
    { name: 'Team & Organisational Coaching', href: '/programmes/team-coaching', full: true },
  ],
  howItWorksHeading: 'How our programmes work',
  howSteps: [
    { title: 'One-to-one.', desc: 'You are coached and developed individually.' },
    { title: 'Online, worldwide.', desc: 'Train from any country, around your schedule.' },
    { title: 'Coaching hours plus real self-work.', desc: 'Live coaching paired with guided study.' },
    { title: 'Assessed on real coaching.', desc: 'Your credential reflects what you can actually do.' },
  ],
  ctaLink1Text: 'Find your level',
  ctaLink1Url: '/credentials',
  ctaLink2Text: 'See pricing',
  ctaLink2Url: '/pricing',
};
