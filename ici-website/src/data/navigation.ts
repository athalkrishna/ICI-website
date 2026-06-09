export interface NavLink {
  label: string
  href:  string
  desc?: string
}

export interface NavGroup {
  heading: string
  links:   NavLink[]
}

export interface NavItem {
  label:    string
  href:     string
  children?: NavGroup[]
}

export const navItems: NavItem[] = [
  {
    label: 'About ICI',
    href:  '/about/mission',
    children: [
      {
        heading: 'Institute',
        links: [
          { label: 'Mission, Vision & Values', href: '/about/mission', desc: 'Our core philosophy and approach' },
          { label: 'History & Heritage', href: '/about/history', desc: 'The origins and traditions we draw upon' },
          { label: 'Leadership & Faculty', href: '/about/leadership-faculty', desc: 'Meet the people behind the institute' },
          { label: 'Global Presence', href: '/about/global', desc: 'Our international network of coaches' },
          { label: 'Recognition & Accreditation', href: '/about/accreditation', desc: 'Our rigorous standards and credentials' },
          { label: 'Partnerships & Alliances', href: '/about/partnerships', desc: 'Collaborations with aligned organisations' },
          { label: 'Press & Media', href: '/about/press', desc: 'Information for journalists and editors' },
          { label: 'Annual Reports', href: '/about/annual-reports', desc: 'Our yearly transparency and progress' },
        ],
      }
    ],
  },
  {
    label: 'Programmes',
    href:  '/programmes',
    children: [
      {
        heading: '',
        links: [
          { label: 'Programmes', href: '/programmes' },
          { label: 'Life Coaching', href: '/programmes/certified-life-coach' },
          { label: 'Executive & Leadership', href: '/programmes/executive-coaching' },
          { label: 'Business Coaching', href: '/programmes/business-coach' },
          { label: 'Health & Wellness', href: '/programmes/health-wellness' },
          { label: 'Team & Organisational', href: '/programmes/team-coaching' },
        ],
      }
    ],
  },
  {
    label: 'Credentials',
    href:  '/credentials',
    children: [
      {
        heading: 'The Levels',
        links: [
          { label: 'Catalyst (Level 1)', href: '/credentials/catalyst' },
          { label: 'Architect (Level 2)', href: '/credentials/architect' },
          { label: 'Sage (Level 3)', href: '/credentials/sage' },
          { label: 'Luminary (Level 4)', href: '/credentials/luminary' },
        ],
      }
    ],
  },
  {
    label: 'Pricing',
    href:  '/pricing',
  },
  {
    label: 'Admissions',
    href:  '/admissions',
    children: [
      {
        heading: 'Join ICI',
        links: [
          { label: 'How to Apply', href: '/admissions' },
          { label: 'Free Assessment', href: '/admissions' },
          { label: 'Tuition & Pricing', href: '/pricing' },
          { label: 'FAQs', href: '/admissions' },
          { label: 'Speak to an Advisor', href: '/admissions/contact' },
        ],
      }
    ],
  },
  {
    label: 'Faculty & Research',
    href:  '/faculty',
    children: [
      {
        heading: 'People & Thinking',
        links: [
          { label: 'Our Faculty', href: '/faculty' },
          { label: 'Insights & Research', href: '/resources' },
        ],
      }
    ],
  },
  {
    label: 'Community',
    href:  '/community',
    children: [
      {
        heading: 'Network',
        links: [
          { label: 'Overview', href: '/community' },
          { label: 'Alumni', href: '/alumni' },
          { label: 'Membership', href: '/community' },
        ],
      }
    ],
  },
  {
    label: 'Events',
    href:  '/events',
  },
  {
    label: 'Resources',
    href:  '/resources',
    children: [
      {
        heading: 'Materials',
        links: [
          { label: 'Insights', href: '/resources' },
          { label: 'Prospectus', href: '/resources/brochure' },
          { label: 'Guides', href: '/resources' },
        ],
      }
    ],
  },
]
