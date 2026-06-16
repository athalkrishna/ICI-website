/** Default copy for /pricing — CMS fallbacks and seed values. */

export type PricingRowData = {
  level: string;
  credential: string;
  format: string;
  hours: string;
  duration: string;
  basePriceINR: number;
  slug: string;
};

export type PricingOverviewData = {
  heroEyebrow: string;
  heroHeading: string;
  heroBody: string;
  tableSectionHeading: string;
  pricingRows: PricingRowData[];
  includesHeading: string;
  includes: string[];
  enrolmentHeading: string;
  enrolmentSteps: string[];
  paymentOptionsHeading: string;
  paymentOptionsBody: string;
  gstHeading: string;
  gstBody: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaButton1Text: string;
  ctaButton1Link: string;
  ctaButton2Text: string;
  ctaButton2Link: string;
};

export const PRICING_OVERVIEW: PricingOverviewData = {
  heroEyebrow: 'Pricing',
  heroHeading: 'Honest pricing for serious training',
  heroBody:
    'Coaching education is an investment in a career, so we will not hide what it costs. Every level of the Mastery Pathway is delivered one-to-one and online, with real coaching hours from a professional coach and substantial guided self-work. You enrol one level at a time, and each price is complete. What you see is what you pay, plus applicable GST.',
  tableSectionHeading: 'The Mastery Pathway',
  pricingRows: [
    {
      level: 'Level 1: Catalyst',
      credential: '(ICI-C)',
      format: 'Online, one-to-one',
      hours: '36 hours: 12 coaching + 24 self-work.',
      duration: 'Up to 3 months',
      basePriceINR: 215000,
      slug: 'catalyst',
    },
    {
      level: 'Level 2: Architect',
      credential: '(ICI-A)',
      format: 'Online, one-to-one',
      hours: '60 hours: 20 coaching + 40 self-work.',
      duration: 'Up to 4 months',
      basePriceINR: 345000,
      slug: 'architect',
    },
    {
      level: 'Level 3: Sage',
      credential: '(ICI-S)',
      format: 'Online, one-to-one',
      hours: '90 hours: 30 coaching + 60 self-work.',
      duration: 'Up to 6 months',
      basePriceINR: 495000,
      slug: 'sage',
    },
    {
      level: 'Level 4: Luminary',
      credential: '(ICI-L)',
      format: 'Online, one-to-one',
      hours: '120 hours: 40 live + 80 self-work and capstone.',
      duration: 'Up to 12 months',
      basePriceINR: 695000,
      slug: 'luminary',
    },
  ],
  includesHeading: 'What every price includes',
  includes: [
    'One-to-one online coaching with a coach matched to the level',
    'All guided self-work, research materials and assignments',
    'Assessment and the credential on successful completion',
    'The right to use the credential and post-nominal letters',
    'Membership of the ICI coaching community',
  ],
  enrolmentHeading: 'How enrolment works',
  enrolmentSteps: [
    'Choose your level, or speak to an advisor if you are unsure where to start.',
    'Speak briefly with an advisor to confirm the right fit.',
    'Pay securely online, in full or by an agreed instalment plan.',
    'Get matched with your coach and begin, usually within 7 working days.',
  ],
  paymentOptionsHeading: 'Payment options',
  paymentOptionsBody:
    'Pay in full at checkout, or choose an instalment option where available. Card EMI is offered by most major banks at checkout; if you would prefer an institute instalment plan, speak to an advisor and we will agree a schedule before you enrol.',
  gstHeading: 'GST and international clients',
  gstBody:
    'All prices are exclusive of GST. Applicable GST is added at checkout for clients billed in India. International clients see the price they will be charged in their own currency at checkout.',
  faqHeading: 'Frequently asked questions',
  faqs: [
    {
      q: 'Do I have to complete all four levels?',
      a: 'No. Each level is a complete certification in its own right. Many coaches stop at Catalyst or Architect. The higher levels are there when, and if, you want them.',
    },
    {
      q: 'Is it really one-to-one?',
      a: 'Yes. You are coached and developed individually. That is the heart of the ICI model and the reason our coaches are ready for real clients.',
    },
    {
      q: 'What is your refund policy?',
      a: 'All enrolments and payments are final. Due to the intensive, one-to-one nature of our coaching and the limited availability of our faculty, once a payment has been successfully processed, it is strictly non-refundable under any circumstances.',
    },
    {
      q: 'Can I transfer my enrolment to someone else?',
      a: "No. Because each pathway is highly individualised and tailored to the specific coach's development, enrolments and payments are strictly non-transferable to another individual.",
    },
    {
      q: 'What happens if I face an emergency and cannot continue?',
      a: 'While payments remain non-refundable, we understand that unforeseen emergencies arise. You may submit a formal request to pause your current training level. If approved, you can resume your sessions at a later date within the programme\'s suggested duration, subject to faculty availability.',
    },
    {
      q: 'Are there any exceptions to the non-refundable policy?',
      a: 'No. To maintain the integrity of our scheduling and the deep commitment required for one-to-one professional coaching, the non-refundable policy applies universally without exception. We encourage you to consult with an advisor to ensure the pathway is right for you before enrolling.',
    },
  ],
  ctaHeading: 'Ready to begin your journey?',
  ctaButton1Text: 'Choose your level',
  ctaButton1Link: '/credentials',
  ctaButton2Text: 'Not sure where to start? Speak to an advisor',
  ctaButton2Link: '/admissions/contact',
};
