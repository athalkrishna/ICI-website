/** Default copy for credential detail pages — CMS fallbacks and seed source. */

export type CredentialModule = { title: string; body: string };

export type CredentialDetailDefaults = {
  heroLabel: string;
  heroHeading: string;
  heroBody: string;
  whoHeading: string;
  forWho: string[];
  entryRequirementsHeading: string;
  entryRequirementsBody: string;
  formatHeading: string;
  formatIntro: string;
  formatItems: string[];
  learningHeading: string;
  learningPoints: string[];
  syllabusHeading: string;
  syllabusIntro: string;
  modules: CredentialModule[];
  assessmentHeading: string;
  assessmentBody: string;
  graduateHeading: string;
  graduateItems: string[];
  sidebarHeading: string;
  sidebarLevel: string;
  sidebarFormat: string;
  sidebarHours: string;
  sidebarDuration: string;
  sidebarInvestment?: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
};

export const CATALYST_CREDENTIAL: CredentialDetailDefaults = {
  heroLabel: 'Level 1 | Foundation',
  heroHeading: 'Catalyst',
  heroBody:
    "A catalyst is what makes change happen in others without being consumed by it. That is the work of a coach, and it is where your career begins. Over 36 hours of one-to-one work, you stop being someone who gives good advice and become someone who can genuinely coach: present, trusted, and skilled enough to hold another person's growth. You are coached individually throughout, so the learning is shaped around you. You finish ready to take your first clients with confidence rather than hope.",
  whoHeading: 'Who this level is for',
  forWho: [
    'People beginning a coaching career from scratch',
    'Managers, mentors and helpers formalising their skills',
    'Professionals changing direction towards work that means more',
  ],
  entryRequirementsHeading: 'Entry requirements',
  entryRequirementsBody:
    'Open to anyone serious about learning to coach. No prior coaching qualification is required, only commitment and a genuine interest in people.',
  formatHeading: 'Format and hours',
  formatIntro: 'Delivered entirely online and one-to-one. Your 36 hours are structured as:',
  formatItems: [
    '12 hours of one-to-one online coaching and training with a professional coach',
    '24 hours of guided self-work and research, including reflection, reading, practice and assignments',
    'Total: 36 hours',
  ],
  learningHeading: 'What you will be able to do',
  learningPoints: [
    'Hold a coaching session with structure, presence and confidence',
    'Build trust and emotional safety quickly',
    'Listen beneath the words and ask the question that matters',
    'Work with limiting beliefs and self-talk without giving advice',
    'Coach ethically, within clear boundaries',
  ],
  syllabusHeading: 'Syllabus',
  syllabusIntro:
    'Delivered across your one-to-one sessions and guided self-work. Each module pairs live coaching with reflection and practice.',
  modules: [
    {
      title: 'Module 1: Foundations of professional coaching',
      body: 'What coaching is, and what it is not. The difference between coaching, advice, mentoring and therapy. The coaching relationship, scope, and the professional standards you will hold yourself to.',
    },
    {
      title: 'Module 2: Presence and the inner work of the coach',
      body: 'Why a coach can only take a client as far as they have gone themselves. Managing your own reactions, judgements and the urge to fix, so you can stay genuinely present.',
    },
    {
      title: 'Module 3: The core skills',
      body: 'Deep listening across its levels, powerful and clean questioning, reflecting, summarising and the disciplined use of silence. The everyday craft that makes coaching work.',
    },
    {
      title: 'Module 4: The architecture of a session',
      body: 'Contracting and agreeing goals, structuring a session from open to close, and a simple, reliable coaching framework you can use from day one.',
    },
    {
      title: 'Module 5: The psychology and neuroscience of change',
      body: 'In plain language: how habits form, why willpower fails, how beliefs shape behaviour, and the basics of the nervous system, so you understand why your interventions work.',
    },
    {
      title: 'Module 6: From training to practice',
      body: 'Working with limiting beliefs and self-sabotage compassionately, plus the practical first steps of coaching real people: agreements, ethics, confidentiality and getting started.',
    },
  ],
  assessmentHeading: 'Assessment',
  assessmentBody:
    'Assessment is based on your actual coaching. You demonstrate a coaching session and complete reflective assignments. There is no multiple-choice exam, because coaching is a craft, not a quiz.',
  graduateHeading: 'What you graduate with',
  graduateItems: [
    'The ICI Catalyst Coach credential and the ICI-C post-nominal',
    'A working coaching framework you can use immediately',
    'The confidence and competence to take paying clients',
    'Membership of the ICI coaching community',
  ],
  sidebarHeading: 'Details at a glance',
  sidebarLevel: '1 of 4 (Foundation)',
  sidebarFormat: 'online, one-to-one',
  sidebarHours: '36 total (12 coaching, 24 self-work)',
  sidebarDuration: 'up to 3 months',
  ctaPrimaryText: 'Apply for Catalyst',
  ctaPrimaryLink: '/checkout/catalyst',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const ARCHITECT_CREDENTIAL: CredentialDetailDefaults = {
  heroLabel: 'Level 2 | Professional',
  heroHeading: 'Architect',
  heroBody:
    'Competence gets you started. Becoming an architect makes you a professional. An architect does not just react to what appears; they design and build. Over 60 hours of one-to-one work with a senior coach, you learn to work with the harder parts of real practice, emotion, resistance and complexity, and to build a coaching practice that lasts. You leave able to take on clients other coaches refer elsewhere.',
  whoHeading: 'Who this level is for',
  forWho: [
    'Catalyst coaches ready to deepen their practice',
    'Working coaches who want their skill recognised at a higher level',
    'Experienced professionals moving seriously into coaching',
  ],
  entryRequirementsHeading: 'Entry requirements',
  entryRequirementsBody:
    'Hold the ICI Catalyst credential, or demonstrate equivalent training and coaching experience confirmed at interview.',
  formatHeading: 'Format and hours',
  formatIntro: 'Delivered entirely online and one-to-one with a senior coach. Your 60 hours are structured as:',
  formatItems: [
    '20 hours of one-to-one online coaching and supervision with a senior coach',
    '40 hours of guided self-work and research, including supervised practice and reflective assignments',
    'Total: 60 hours',
  ],
  learningHeading: 'What you will be able to do',
  learningPoints: [
    'Work skilfully with emotion, defences and resistance, within scope',
    'Recognise patterns such as projection and self-sabotage and coach around them',
    'Stay grounded and trauma-aware, and know exactly when to refer',
    'Draw on a wider range of models and match your approach to the client',
    'Build, price and sustain a real coaching practice',
  ],
  syllabusHeading: 'Syllabus',
  syllabusIntro:
    'The syllabus deepens your craft and adds the professional and psychological range that distinguishes an advanced coach.',
  modules: [
    {
      title: 'Module 1: Advanced presence and use of self',
      body: 'Coaching from a settled, non-anxious presence. Using your own reactions as information rather than being driven by them. Holding steadier as the material gets heavier.',
    },
    {
      title: 'Module 2: Working with emotion, defence and resistance',
      body: 'How people protect themselves from change. Defence mechanisms, projection and the basics of transference, handled with compassion and within the boundaries of coaching.',
    },
    {
      title: 'Module 3: Trauma-aware coaching and the nervous system',
      body: 'Recognising nervous-system patterns and trauma responses, coaching safely around them, and the clear lines that tell you when a client needs clinical support instead.',
    },
    {
      title: 'Module 4: Frameworks and models in depth',
      body: 'A broader toolkit of coaching models, and the judgement to choose the right approach rather than forcing everyone through one method.',
    },
    {
      title: 'Module 5: Working with patterns and narratives',
      body: 'Beliefs, life stories and the self-sabotage that quietly runs the show. Helping clients see the pattern and write a different one.',
    },
    {
      title: 'Module 6: The business of coaching',
      body: 'Choosing a niche, pricing your work, attracting clients ethically, contracting clearly, and building a practice that supports your life rather than consuming it.',
    },
    {
      title: 'Module 7: Supervision and reflective practice',
      body: 'Being supervised, supervising your own work, and building the reflective habits that keep a professional coach safe and improving for a whole career.',
    },
  ],
  assessmentHeading: 'Assessment',
  assessmentBody:
    'Assessment is based on coaching across a range of clients, supervised practice logs, and a short, practical plan for your professional practice. You demonstrate not just competence but consistency.',
  graduateHeading: 'What you graduate with',
  graduateItems: [
    'The ICI Architect Coach credential and the ICI-A post-nominal',
    'The standing to charge professional fees',
    'A wider, tested toolkit and clearer professional judgement',
    'Ongoing supervision and the ICI community',
  ],
  sidebarHeading: 'Details at a glance',
  sidebarLevel: '2 of 4 (Professional)',
  sidebarFormat: 'online, one-to-one with a senior coach',
  sidebarHours: '60 total (20 coaching, 40 self-work)',
  sidebarDuration: 'up to 4 months',
  ctaPrimaryText: 'Apply for Architect',
  ctaPrimaryLink: '/checkout/architect',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const SAGE_CREDENTIAL: CredentialDetailDefaults = {
  heroLabel: 'Level 3 | Senior Professional',
  heroHeading: 'Sage',
  heroBody:
    'A sage is not someone with all the answers, but someone whose presence helps others find their own. At this level, technique is no longer the point. Depth is. Over 90 hours of one-to-one work with a master coach, you move from doing coaching to being a coach: able to sit with the most complex clients, to work with power and the inner life, and to bring a presence that cannot be faked. This is the level that marks you out among your peers.',
  whoHeading: 'Who this level is for',
  forWho: [
    'Architect coaches seeking genuine mastery',
    'Senior and executive coaches working with demanding clients',
    'Coaches ready to specialise and build real authority',
  ],
  entryRequirementsHeading: 'Entry requirements',
  entryRequirementsBody:
    'Hold the ICI Architect credential and demonstrate a substantial body of coaching practice.',
  formatHeading: 'Format and hours',
  formatIntro: 'Delivered entirely online and one-to-one with a master coach. Your 90 hours are structured as:',
  formatItems: [
    '30 hours of one-to-one online coaching and advanced supervision with a master coach',
    '60 hours of guided self-work and research, including case work and a specialism portfolio',
    'Total: 90 hours',
  ],
  learningHeading: 'What you will be able to do',
  learningPoints: [
    'Coach from presence rather than process',
    'Work with shadow, projection and counter-transference in the room',
    'Coach senior leaders through power, ego and the loneliness of the role',
    'Work within systems and relationships, not just with individuals',
    'Hold complex and ethically difficult cases with maturity',
  ],
  syllabusHeading: 'Syllabus',
  syllabusIntro:
    'The syllabus integrates the deeper psychology, leadership application and contemplative grounding that distinguish a senior coach.',
  modules: [
    {
      title: 'Module 1: Mastery of presence',
      body: 'Coaching from being, not doing. The quality of attention that lets a client say the thing they have never said aloud. Practised, not just discussed.',
    },
    {
      title: 'Module 2: The deeper psychology',
      body: "Shadow, projection, transference and counter-transference as they actually show up in coaching. Working with them ethically and to the client's benefit, while staying firmly within scope.",
    },
    {
      title: 'Module 3: Executive and leadership coaching at depth',
      body: 'Coaching power without being captured by it. Ego, fear, isolation at senior levels, and high-stakes decisions.',
    },
    {
      title: 'Module 4: Systems and relational coaching',
      body: 'Seeing the client inside their web of relationships and systems. Coaching teams, stakeholders and dynamics rather than isolated individuals.',
    },
    {
      title: 'Module 5: Contemplative practice and behavioural science',
      body: 'Bringing reflective and contemplative traditions into dialogue with modern behavioural science, so depth and rigour reinforce each other.',
    },
    {
      title: 'Module 6: Coaching the whole person',
      body: 'Meaning, identity, values and life transitions. Working with the questions clients bring when surface goals turn out to be about something larger.',
    },
    {
      title: 'Module 7: Advanced ethics and complex cases',
      body: 'The grey areas. Dual relationships, confidentiality under pressure, and the judgement to navigate situations no checklist covers.',
    },
    {
      title: 'Module 8: Building authority',
      body: 'Mentoring, thought leadership and contribution. Beginning to give back to the field, which is the bridge to Luminary.',
    },
  ],
  assessmentHeading: 'Assessment',
  assessmentBody:
    'Assessment combines advanced coaching demonstrations, written case studies, and a specialism portfolio that shows depth in a chosen area of practice.',
  graduateHeading: 'What you graduate with',
  graduateItems: [
    'The ICI Sage Coach credential and the ICI-S post-nominal',
    'Recognised seniority and the fees that come with it',
    'A defined specialism and a portfolio that proves it',
    'Eligibility to begin the Luminary pathway',
  ],
  sidebarHeading: 'Details at a glance',
  sidebarLevel: '3 of 4 (Senior)',
  sidebarFormat: 'online, one-to-one with a master coach',
  sidebarHours: '90 total (30 coaching, 60 self-work)',
  sidebarDuration: 'up to 6 months',
  ctaPrimaryText: 'Apply for Sage',
  ctaPrimaryLink: '/checkout/sage',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const LUMINARY_CREDENTIAL: CredentialDetailDefaults = {
  heroLabel: 'Level 4 | Highest Distinction',
  heroHeading: 'Luminary',
  heroBody:
    'A luminary does not only practise the craft; they light the way for others in it. This is the highest recognition ICI offers, and it is rare on purpose. Over 120 hours of one-to-one work with our most senior faculty, you define your own coaching model, contribute something original to the field, and learn to develop other coaches. A Luminary is not just an excellent coach but a steward of the craft. This is the work of a coaching career at its summit.',
  whoHeading: 'Who this level is for',
  forWho: [
    'Sage coaches with a substantial body of work',
    'Master coaches ready to mentor, teach and shape the profession',
    'Senior practitioners seeking the highest standing in the field',
  ],
  entryRequirementsHeading: 'Entry requirements',
  entryRequirementsBody:
    'Hold the ICI Sage credential and demonstrate extensive, sustained coaching experience. Admission is by application and review.',
  formatHeading: 'Format and hours',
  formatIntro:
    'Delivered entirely online and one-to-one with our most senior faculty. Your 120 hours are structured as:',
  formatItems: [
    '40 hours of one-to-one work and mentoring with senior faculty',
    '80 hours of guided self-work, research and an original capstone contribution',
    'Total: 120 hours',
  ],
  learningHeading: 'What you will be able to do',
  learningPoints: [
    'Articulate and teach your own signature coaching model',
    'Coach at the edge: the most complex, high-stakes work',
    'Mentor and supervise other coaches well',
    'Make an original, credible contribution to the field',
    'Carry the ethical responsibility of a Luminary',
  ],
  syllabusHeading: 'Syllabus',
  syllabusIntro:
    'Part mastery, part contribution. The syllabus is a structured journey towards an original body of work conferred as the Luminary distinction.',
  modules: [
    {
      title: 'Module 1: Defining your signature',
      body: 'Drawing your years of practice into a coherent model, philosophy and voice. What you uniquely bring, articulated clearly enough to teach.',
    },
    {
      title: 'Module 2: Coaching at the edge',
      body: 'The most demanding clients and situations. Sustaining mastery, presence and ethics where there are no easy answers.',
    },
    {
      title: 'Module 3: Mentoring and supervising coaches',
      body: 'Developing other coaches with the same care you bring to clients. The distinct skill of supervision and mentoring.',
    },
    {
      title: 'Module 4: Teaching and developing others',
      body: 'Designing and delivering learning for coaches. How to pass on a craft without flattening it into a formula.',
    },
    {
      title: 'Module 5: Research, writing and thought leadership',
      body: 'Contributing original thinking through writing, speaking and teaching. Advancing the field rather than only practising within it.',
    },
    {
      title: 'Module 6: Ethics, legacy and stewardship',
      body: 'What it means to hold the standard for others. The responsibilities a Luminary carries to clients, to coaches and to the profession.',
    },
    {
      title: 'Module 7: Capstone',
      body: 'A substantial original contribution: a model, a body of written work, or a programme, submitted and reviewed for the conferral of the Luminary distinction.',
    },
  ],
  assessmentHeading: 'Assessment',
  assessmentBody:
    'Conferral is by review of a substantial original body of work, a demonstration of mentoring or teaching, and evidence of contribution to the field. The distinction is awarded, not simply completed.',
  graduateHeading: 'What you graduate with',
  graduateItems: [
    'The ICI Luminary distinction and the ICI-L post-nominal',
    'Recognition as a master coach and steward of the craft',
    'A defined, teachable signature model',
    'A standing invitation to teach and mentor within ICI',
  ],
  sidebarHeading: 'Details at a glance',
  sidebarLevel: '4 of 4 (Highest distinction)',
  sidebarFormat: 'online, one-to-one with senior faculty',
  sidebarHours: '120 total (40 live, 80 self-work and capstone)',
  sidebarDuration: 'up to 12 months',
  sidebarInvestment: 'INR 6,95,000, exclusive of GST',
  ctaPrimaryText: 'Apply for Luminary',
  ctaPrimaryLink: '/checkout/luminary',
  ctaSecondaryText: 'Speak to an Advisor',
  ctaSecondaryLink: '/admissions/contact',
};

export const CREDENTIAL_DEFAULTS_BY_SLUG: Record<string, CredentialDetailDefaults> = {
  '/credentials/catalyst': CATALYST_CREDENTIAL,
  '/credentials/architect': ARCHITECT_CREDENTIAL,
  '/credentials/sage': SAGE_CREDENTIAL,
  '/credentials/luminary': LUMINARY_CREDENTIAL,
};
