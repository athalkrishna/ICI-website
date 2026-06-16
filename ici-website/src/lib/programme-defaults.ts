/** Default copy for programme specialisation pages — used as CMS fallbacks and seed values. */

export type ProgrammeSpecialisationData = {
  heroTag: string;
  heroHeading: string;
  heroBody: string;
  heroWatermark: string;
  learnHeading: string;
  learnItems: [string, string, string, string];
  whoHeading: string;
  whoItems: [string, string, string];
  glanceHeading: string;
  glanceItems: [
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string },
  ];
  pathwayHeading: string;
  pathwayBody: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
};

export const CERTIFIED_LIFE_COACH: ProgrammeSpecialisationData = {
  heroTag: 'Specialisation | Life Coaching',
  heroHeading: 'Life Coaching',
  heroBody:
    'Life coaching done well is not advice with enthusiasm. It is the skilled, patient work of helping a person see themselves clearly and move towards the life they actually want. As a life coaching focus within the Mastery Pathway, this is where most coaches begin, learning the craft that everything else builds on.',
  heroWatermark: 'L',
  learnHeading: 'What you will learn to do',
  learnItems: [
    'Build trust and emotional safety quickly',
    'Listen beneath the words and ask the question that matters',
    'Work with limiting beliefs and self-sabotage with compassion',
    'Set goals that hold and support change that lasts',
  ],
  whoHeading: 'Who this suits',
  whoItems: [
    'People starting a coaching career',
    'Helpers, mentors and managers formalising their skills',
    'Professionals moving towards more meaningful work',
  ],
  glanceHeading: 'At a glance',
  glanceItems: [
    { label: 'Role', value: 'Focus area within the Mastery Pathway' },
    { label: 'Format', value: 'Online, one-to-one' },
    { label: 'Entry', value: 'Best at Catalyst (Level 1)' },
    { label: 'Cost', value: 'Follows the Pathway, see Pricing' },
  ],
  pathwayHeading: 'How it fits the Mastery Pathway',
  pathwayBody:
    'You can begin a life coaching focus at the Catalyst level and carry it through the Pathway. Your credential and investment follow the level you are working towards, not the specialism.',
  ctaPrimaryText: 'Apply for Catalyst',
  ctaPrimaryLink: '/checkout/catalyst',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const EXECUTIVE_COACHING: ProgrammeSpecialisationData = {
  heroTag: 'Specialisation | Executive & Leadership',
  heroHeading: 'Executive & Leadership Coaching',
  heroBody:
    'Coaching a senior leader is a different discipline. The stakes are higher, the defences are subtler, and the room can feel lonely at the top. As an executive and leadership focus within the Pathway, this prepares you to coach leaders through pressure, difficult decisions and growth, grounded in how leaders actually think and behave.',
  heroWatermark: 'E',
  learnHeading: 'What you will learn to do',
  learnItems: [
    'Coach for judgement, not just behaviour change',
    'Work with power, ego, fear and isolation at senior levels',
    'Coach through high-stakes decisions and organisational pressure',
    'Measure impact in terms an organisation respects',
  ],
  whoHeading: 'Who this suits',
  whoItems: [
    'Coaches ready for senior and executive clients',
    'Experienced leaders and HR professionals moving into coaching',
    'Consultants adding credible coaching to their offer',
  ],
  glanceHeading: 'At a glance',
  glanceItems: [
    { label: 'Role', value: 'Focus area within the Mastery Pathway' },
    { label: 'Format', value: 'Online, one-to-one' },
    { label: 'Entry', value: 'Suggested from Architect (Level 2)' },
    { label: 'Cost', value: 'Follows the Pathway, see Pricing' },
  ],
  pathwayHeading: 'How it fits the Mastery Pathway',
  pathwayBody:
    'An executive focus suits coaches at the Architect level and above, where you work with greater complexity. Your credential and investment follow the level.',
  ctaPrimaryText: 'Apply for Architect',
  ctaPrimaryLink: '/checkout/architect',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const BUSINESS_COACH: ProgrammeSpecialisationData = {
  heroTag: 'Specialisation | Business Coaching',
  heroHeading: 'Business Coaching',
  heroBody:
    'Founders rarely fail for lack of effort. They struggle because the business outgrows the way they lead it, and no one taught them to step back. Business coaching is the craft of helping owners work on the business and on themselves at once. As a focus within the Pathway, it equips you to coach for growth without losing sight of the human carrying it all.',
  heroWatermark: 'B',
  learnHeading: 'What you will learn to do',
  learnItems: [
    'Coach the owner and the business as one system',
    'Help clients move from doing to leading',
    'Work with growth, money, risk and the fear beneath them',
    'Build accountability that drives results without breaking people',
  ],
  whoHeading: 'Who this suits',
  whoItems: [
    'Coaches drawn to founders and business owners',
    'Consultants and advisers adding coaching',
    'Experienced operators moving into a coaching role',
  ],
  glanceHeading: 'At a glance',
  glanceItems: [
    { label: 'Role', value: 'Focus area within the Mastery Pathway' },
    { label: 'Format', value: 'Online, one-to-one' },
    { label: 'Entry', value: 'Suggested from Architect (Level 2)' },
    { label: 'Cost', value: 'Follows the Pathway, see Pricing' },
  ],
  pathwayHeading: 'How it fits the Mastery Pathway',
  pathwayBody:
    'A business focus suits the Architect level and above. Your credential and investment follow the level you pursue.',
  ctaPrimaryText: 'Apply for Architect',
  ctaPrimaryLink: '/checkout/architect',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const HEALTH_WELLNESS: ProgrammeSpecialisationData = {
  heroTag: 'Specialisation | Health & Wellness',
  heroHeading: 'Health & Wellness Coaching',
  heroBody:
    'Most people already know what they should do for their health. What they lack is not information but the ability to change, and to keep changing when motivation fades. Health and wellness coaching is the skill of supporting that change so it lasts. As a focus within the Pathway, it pairs behavioural science with the coaching craft.',
  heroWatermark: 'H',
  learnHeading: 'What you will learn to do',
  learnItems: [
    'Apply the behavioural science of lasting habit change',
    'Coach around stress, sleep, movement and the nervous system',
    'Work with shame, relapse and the all-or-nothing trap',
    'Hold scope and know when to refer to clinical care',
  ],
  whoHeading: 'Who this suits',
  whoItems: [
    'Coaches specialising in health, fitness and wellbeing',
    'Health and fitness professionals adding coaching',
    'Helpers supporting change in body and mind',
  ],
  glanceHeading: 'At a glance',
  glanceItems: [
    { label: 'Role', value: 'Focus area within the Mastery Pathway' },
    { label: 'Format', value: 'Online, one-to-one' },
    { label: 'Entry', value: 'Best at Catalyst (Level 1)' },
    { label: 'Cost', value: 'Follows the Pathway, see Pricing' },
  ],
  pathwayHeading: 'How it fits the Mastery Pathway',
  pathwayBody:
    'A wellness focus can begin at Catalyst and deepen through the Pathway. Your credential and investment follow the level.',
  ctaPrimaryText: 'Apply for Catalyst',
  ctaPrimaryLink: '/checkout/catalyst',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const TEAM_COACHING: ProgrammeSpecialisationData = {
  heroTag: 'Specialisation | Team & Organisational',
  heroHeading: 'Team & Organisational Coaching',
  heroBody:
    'Coaching one leader changes one leader. Building a coaching culture changes how a whole organisation works. As a focus within the Pathway, this prepares internal coaches, people leaders and managers to coach in the flow of work, so honest feedback and real accountability become normal rather than annual.',
  heroWatermark: 'T',
  learnHeading: 'What you will learn to do',
  learnItems: [
    'Coach teams as living systems, not collections of individuals',
    'Embed coaching habits into everyday management',
    'Improve feedback, accountability and psychological safety',
    'Measure the impact of a coaching culture',
  ],
  whoHeading: 'Who this suits',
  whoItems: [
    'Internal coaches and coaching champions',
    'HR, learning and people leaders',
    'Managers who want to lead through coaching',
  ],
  glanceHeading: 'At a glance',
  glanceItems: [
    { label: 'Role', value: 'Focus area within the Mastery Pathway' },
    { label: 'Format', value: 'Online, one-to-one or in-house' },
    { label: 'Entry', value: 'Suggested from Architect (Level 2)' },
    { label: 'Cost', value: 'Follows the Pathway; organisations can request a proposal' },
  ],
  pathwayHeading: 'How it fits the Mastery Pathway',
  pathwayBody:
    'A team focus suits the Architect level and above, and is often pursued by organisations training several people. Your credential and investment follow the level.',
  ctaPrimaryText: 'Request an Organisational Proposal',
  ctaPrimaryLink: '/admissions/contact',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const PROGRAMME_DEFAULTS_BY_SLUG: Record<string, ProgrammeSpecialisationData> = {
  '/programmes/certified-life-coach': CERTIFIED_LIFE_COACH,
  '/programmes/executive-coaching': EXECUTIVE_COACHING,
  '/programmes/business-coach': BUSINESS_COACH,
  '/programmes/health-wellness': HEALTH_WELLNESS,
  '/programmes/team-coaching': TEAM_COACHING,
};
