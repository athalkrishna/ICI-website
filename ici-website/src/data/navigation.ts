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
    href:  '/about',
    children: [
      {
        heading: 'Who We Are',
        links: [
          { label: 'Mission & Vision',         href: '/about/mission',       desc: 'Our purpose and long-term goals' },
          { label: 'History & Heritage',        href: '/about/history',       desc: 'Coaching education since 1998' },
          { label: 'Leadership & Faculty',      href: '/about/leadership',    desc: 'Meet the team shaping ICI' },
          { label: 'Global Presence',           href: '/about/global',        desc: 'Coaches in 60+ countries' },
        ],
      },
      {
        heading: 'Trust & Recognition',
        links: [
          { label: 'Accreditations',            href: '/about/accreditations', desc: 'ICF-aligned, ISO certified' },
          { label: 'Partnerships & Alliances',  href: '/about/partnerships' },
          { label: 'Press & Media',             href: '/about/press' },
          { label: 'Annual Reports',            href: '/about/reports' },
        ],
      },
    ],
  },
  {
    label: 'Programs',
    href:  '/programs',
    children: [
      {
        heading: 'Certification Programs',
        links: [
          { label: 'Certified Life Coach (CLC)',       href: '/programs/life-coach',      desc: 'Foundation · 60 hrs' },
          { label: 'Executive & Leadership Coach',     href: '/programs/executive',       desc: 'Professional · 125 hrs' },
          { label: 'Business Coach Certification',     href: '/programs/business-coach',  desc: 'Professional · 120 hrs' },
          { label: 'Health & Wellness Coach',          href: '/programs/health-wellness', desc: 'Foundation · 80 hrs' },
          { label: 'Team & Organizational Coach',      href: '/programs/team-coach',      desc: 'Advanced · 150 hrs' },
        ],
      },
      {
        heading: 'Credentials & Continuing Ed',
        links: [
          { label: 'IAC — Associate Coach',            href: '/credentials/iac',  desc: 'Entry level credential' },
          { label: 'IPC — Professional Coach',         href: '/credentials/ipc',  desc: 'Intermediate credential' },
          { label: 'IMC — Master Coach',               href: '/credentials/imc',  desc: 'Expert credential' },
          { label: 'Continuing Education (CCE)',        href: '/programs/cce' },
          { label: 'Online & Self-Paced',              href: '/programs/online' },
          { label: 'Corporate Enrollment',             href: '/programs/corporate' },
        ],
      },
    ],
  },
  {
    label: 'Admissions',
    href:  '/admissions',
    children: [
      {
        heading: 'Apply',
        links: [
          { label: 'How to Apply',           href: '/admissions/apply',          desc: 'Step-by-step guide' },
          { label: 'Admission Requirements', href: '/admissions/requirements' },
          { label: 'Application Portal',     href: '/apply',                      desc: 'Start your application' },
        ],
      },
      {
        heading: 'Funding',
        links: [
          { label: 'Tuition & Fees',         href: '/admissions/tuition' },
          { label: 'Scholarships & Aid',     href: '/admissions/scholarships' },
          { label: 'Payment Plans',          href: '/admissions/payment-plans' },
          { label: 'International Students', href: '/admissions/international' },
        ],
      },
    ],
  },
  {
    label: 'Faculty & Research',
    href:  '/faculty',
    children: [
      {
        heading: 'Our Faculty',
        links: [
          { label: 'Meet Our Faculty',       href: '/faculty' },
          { label: 'Research Areas',         href: '/faculty/research' },
          { label: 'Published Journals',     href: '/faculty/publications' },
          { label: 'Coaching Science Lab',   href: '/faculty/lab' },
        ],
      },
      {
        heading: 'Knowledge Hub',
        links: [
          { label: 'Industry Reports',       href: '/resources/reports' },
          { label: 'Guest Thought Leaders',  href: '/faculty/guest-speakers' },
          { label: 'Research Portal',        href: '/resources/research' },
        ],
      },
    ],
  },
  {
    label: 'Community',
    href:  '/community',
    children: [
      {
        heading: 'Connect',
        links: [
          { label: 'Alumni Network',         href: '/community/alumni' },
          { label: 'Student Chapters',       href: '/community/chapters',     desc: 'Global chapter map' },
          { label: 'Mentorship Program',     href: '/community/mentorship' },
        ],
      },
      {
        heading: 'Engage',
        links: [
          { label: 'Peer Coaching Exchange', href: '/community/peer-coaching' },
          { label: 'ICI Ambassador Program', href: '/community/ambassadors' },
          { label: 'Community Forum',        href: '/community/forum' },
        ],
      },
    ],
  },
  {
    label: 'Events',
    href:  '/events',
    children: [
      {
        heading: 'Upcoming',
        links: [
          { label: 'ICI Annual Global Summit', href: '/events/summit',   desc: 'Sep 2026 · Dubai' },
          { label: 'Regional Workshops',       href: '/events/workshops' },
          { label: 'Webinar Series',           href: '/events/webinars' },
          { label: 'International Coaching Week', href: '/events/icw' },
        ],
      },
      {
        heading: 'Calendars',
        links: [
          { label: 'Full Events Calendar',   href: '/events/calendar' },
          { label: 'Course Directory',       href: '/events/courses' },
          { label: 'Business Dev Series',    href: '/events/bds' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    href:  '/resources',
    children: [
      {
        heading: 'Learn',
        links: [
          { label: 'Blog & Insights',        href: '/resources/blog' },
          { label: 'Research Library',       href: '/resources/research' },
          { label: 'Video Masterclasses',    href: '/resources/videos' },
          { label: 'Podcast: ICI Coaching Hour', href: '/resources/podcast' },
        ],
      },
      {
        heading: 'Tools',
        links: [
          { label: 'Coaching Tools & Templates', href: '/resources/tools' },
          { label: 'Case Studies',           href: '/resources/case-studies' },
          { label: 'Press Releases',         href: '/resources/press' },
          { label: 'FAQs',                   href: '/resources/faq' },
        ],
      },
    ],
  },
]
