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
    label: 'Admissions',
    href:  '/admissions',
    children: [
      {
        heading: 'Join ICI',
        links: [
          { label: 'Admissions Overview', href: '/admissions', desc: 'How to become an ICI Coach' },
          { label: 'Apply Now', href: '/apply', desc: 'Submit your application' },
          { label: 'Tuition & Pricing', href: '/pricing', desc: 'Programme fees and options' },
        ],
      }
    ],
  },
  {
    label: 'Community',
    href: '/community',
    children: [
      {
        heading: 'Network & People',
        links: [
          { label: 'The Community', href: '/community', desc: 'Connect with coaches worldwide' },
          { label: 'Faculty & Research', href: '/faculty', desc: 'Meet our practising coaches' },
          { label: 'Find a Coach', href: '/find-a-coach', desc: 'Search our certified directory' },
          { label: 'Events', href: '/events', desc: 'Summits and masterclasses' },
        ]
      }
    ]
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      {
        heading: 'Thinking & Materials',
        links: [
          { label: 'Resources Library', href: '/resources', desc: 'Guides, tools and articles' },
          { label: 'The Blog', href: '/blog', desc: 'Latest insights from the field' },
          { label: 'Prospectus', href: '/resources/brochure', desc: 'Download the full guide' },
        ]
      }
    ]
  },
  {
    label: 'Contact',
    href: '/contact'
  }
]
