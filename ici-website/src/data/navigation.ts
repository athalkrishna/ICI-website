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
          { label: 'Leadership & Faculty', href: '/faculty', desc: 'Meet our practising coaches' },
          { label: 'Global Presence', href: '/about/global', desc: 'Our international network of coaches' },
          { label: 'Recognition & Accreditation', href: '/about/accreditation', desc: 'Built to international coaching standards' },
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
        heading: 'Our Training',
        links: [
          { label: 'Programmes', href: '/programmes', desc: 'Explore our full range of training' },
          { label: 'Life Coaching', href: '/programmes/certified-life-coach', desc: 'Core skills for personal transformation' },
          { label: 'Executive & Leadership', href: '/programmes/executive-coaching', desc: 'Develop leaders and senior managers' },
          { label: 'Business Coaching', href: '/programmes/business-coach', desc: 'Scale and support entrepreneurs' },
          { label: 'Health & Wellness', href: '/programmes/health-wellness', desc: 'Guide clients to physical wellbeing' },
          { label: 'Team & Organisational', href: '/programmes/team-coaching', desc: 'Drive systemic team performance' },
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
          { label: 'Catalyst (Level 1)', href: '/credentials/catalyst', desc: 'Foundational one-to-one certification' },
          { label: 'Architect (Level 2)', href: '/credentials/architect', desc: 'Advanced methodology and framing' },
          { label: 'Sage (Level 3)', href: '/credentials/sage', desc: 'Mastery in coaching presence' },
          { label: 'Luminary (Level 4)', href: '/credentials/luminary', desc: 'The pinnacle of coaching craft' },
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
          { label: 'Admissions Overview', href: '/admissions', desc: 'How to become an ICI Coach' },
          { label: 'Apply Now', href: '/apply', desc: 'Submit your application' },
          { label: 'Tuition & Pricing', href: '/pricing', desc: 'Programme fees and options' },
          { label: 'Speak to an Advisor', href: '/admissions/contact', desc: 'Book a conversation with our team' },
        ],
      }
    ],
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
