/** Default copy for /admissions — CMS fallbacks and seed values. */

export type AdmissionsOverviewData = {
  heroEyebrow: string;
  heroHeading: string;
  heroBody: string;
  howToApplyHeading: string;
  applySteps: string[];
  entryRequirementsHeading: string;
  entryRequirementsBody: string;
  assessmentHeading: string;
  assessmentBody: string;
  assessmentLinkText: string;
  assessmentLinkUrl: string;
  tuitionHeading: string;
  tuitionBody: string;
  tuitionLinkText: string;
  tuitionLinkUrl: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaButton1Text: string;
  ctaButton1Link: string;
  ctaButton2Text: string;
  ctaButton2Link: string;
};

export const ADMISSIONS_OVERVIEW: AdmissionsOverviewData = {
  heroEyebrow: 'Admissions',
  heroHeading: 'Joining ICI',
  heroBody:
    'Applying to ICI is meant to be human, not bureaucratic. There is no entrance exam and no long wait. We want to understand where you are, what you want to build, and which level will get you there, then help you take the next step with confidence. Here is exactly how it works.',
  howToApplyHeading: 'How to apply',
  applySteps: [
    'Choose your level, or speak to an advisor if you are unsure.',
    'Submit a short application. It takes a few minutes and costs nothing.',
    'Speak with an advisor to confirm the right fit and answer your questions.',
    'Confirm your place and complete enrolment, in full or by instalments.',
    'Get matched with your coach and begin.',
  ],
  entryRequirementsHeading: 'Entry requirements',
  entryRequirementsBody:
    'Catalyst is open to anyone serious about learning to coach, with no prior qualification required. Higher levels require the level below or equivalent experience, which we confirm with you.',
  assessmentHeading: 'Free assessment: which level is right for me?',
  assessmentBody:
    'Not sure whether to start at Catalyst or higher? Our short, free assessment asks about your experience and goals and points you to the right starting place. No email wall, no pressure.',
  assessmentLinkText: 'Not sure where to start? Speak to an advisor',
  assessmentLinkUrl: '/admissions/contact',
  tuitionHeading: 'Tuition and pricing',
  tuitionBody:
    'Every price is complete and set out plainly on our Pricing page, with instalment options available.',
  tuitionLinkText: 'See pricing',
  tuitionLinkUrl: '/pricing',
  faqHeading: 'Frequently asked questions',
  faqs: [
    {
      q: 'Is the training live or self-paced?',
      a: 'Live and one-to-one. You are coached individually in real time, with guided self-work between sessions. This is how coaching skill is actually built.',
    },
    {
      q: 'How long does it take?',
      a: 'It depends on the level, from around three months for Catalyst to up to a year for Luminary. You will have a clear schedule before you enrol.',
    },
    {
      q: 'Can my organisation train a team?',
      a: 'Yes. Speak to us about organisational and team training.',
    },
    {
      q: 'What are the entry requirements?',
      a: 'Our foundation level, Catalyst, is open to anyone committed to learning to coach. The advanced levels (Architect, Sage, Luminary) require prior certification or equivalent experience, which we will discuss during your admissions conversation.',
    },
    {
      q: 'Is there an interview process?',
      a: 'Yes. Before your enrolment is finalised, you will have a brief, informal conversation with an advisor. This is simply to ensure the pathway is the right fit for your goals and to answer any questions you have.',
    },
    {
      q: 'When can I start my training?',
      a: 'Because our coaching is strictly one-to-one, we do not run fixed cohorts or intake dates. You can apply at any time, and you will typically begin your sessions within 7 working days of your enrolment being confirmed.',
    },
  ],
  ctaButton1Text: 'Start your application',
  ctaButton1Link: '/apply',
  ctaButton2Text: 'Speak to an Advisor',
  ctaButton2Link: '/admissions/contact',
};
