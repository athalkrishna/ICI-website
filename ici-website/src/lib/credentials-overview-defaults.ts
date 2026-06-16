/** Default copy for /credentials overview — CMS fallbacks and seed values. */

export type CredentialsOverviewData = {
  heroEyebrow: string;
  heroHeading: string;
  heroBody: string;
  differencesSectionHeading: string;
  differences: {
    title: string;
    text: string;
  }[];
  findLevelCtaText: string;
  seePricingCtaText: string;
  levelsSectionHeading: string;
  pathways: {
    title: string;
    subline: string;
    href: string;
    desc: string;
    badge: string;
    cta: string;
  }[];
};

export const CREDENTIALS_OVERVIEW: CredentialsOverviewData = {
  heroEyebrow: 'The Credential System',
  heroHeading: 'The ICI Mastery Pathway',
  heroBody:
    'Most coaching certificates are earned by sitting in a group and watching the clock. Ours are earned one-to-one, online, with a coach who works with you directly, hour by hour, until the skill is genuinely yours. The Mastery Pathway has four progressive levels, each a credential you carry for life. Wherever you are now, there is a clear next step and a coach to take it with you.',
  differencesSectionHeading: 'Why this pathway is different',
  differences: [
    { title: 'One-to-one, not one-to-many', text: 'Nothing is glossed over and no one hides at the back of a room.' },
    { title: 'Online, wherever you are', text: 'Train from any country without pausing your life.' },
    { title: 'Coaching hours plus real self-work', text: 'Live coaching paired with substantial guided study.' },
    { title: 'A credential that means something', text: 'Each level is assessed on real coaching, not attendance.' },
  ],
  findLevelCtaText: 'Find your level',
  seePricingCtaText: 'See pricing',
  levelsSectionHeading: 'The four levels',
  pathways: [
    {
      title: 'Catalyst',
      subline: 'Level 1',
      href: '/credentials/catalyst',
      desc: 'Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.',
      badge: 'bg-navy-50 text-navy-700',
      cta: 'Explore Catalyst',
    },
    {
      title: 'Architect',
      subline: 'Level 2',
      href: '/credentials/architect',
      desc: 'Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.',
      badge: 'bg-gold-50 text-gold-600',
      cta: 'Explore Architect',
    },
    {
      title: 'Sage',
      subline: 'Level 3',
      href: '/credentials/sage',
      desc: 'Senior. You coach with depth, range and presence, and hold the most complex clients. 90 hours, one-to-one.',
      badge: 'bg-navy-50 text-navy-700',
      cta: 'Explore Sage',
    },
    {
      title: 'Luminary',
      subline: 'Level 4',
      href: '/credentials/luminary',
      desc: "The institute's highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.",
      badge: 'bg-brand-gold-50 text-brand-gold-600',
      cta: 'Explore Luminary',
    },
  ],
};
