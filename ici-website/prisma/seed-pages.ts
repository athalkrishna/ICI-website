import { ContentFieldType, PageStatus } from '@prisma/client';
import {
  CERTIFIED_LIFE_COACH,
  EXECUTIVE_COACHING,
  BUSINESS_COACH,
  HEALTH_WELLNESS,
  TEAM_COACHING,
} from '../src/lib/programme-defaults';
import {
  CATALYST_CREDENTIAL,
  ARCHITECT_CREDENTIAL,
  SAGE_CREDENTIAL,
  LUMINARY_CREDENTIAL,
  type CredentialDetailDefaults,
} from '../src/lib/credential-defaults';
import { PRIVACY_CONTENT_HTML, TERMS_CONTENT_HTML } from '../src/lib/legal-defaults';
import { PAGE_SEO_DEFAULTS, pageSeoKeywordsInput } from '../src/lib/page-seo-defaults';

export type SeedField = {
  key: string;
  label: string;
  helperText?: string;
  type: ContentFieldType;
  value: string;
  order: number;
  section: string;
};

export type SeedPage = {
  slug: string;
  title: string;
  description?: string;
  isSystem: boolean;
  status: PageStatus;
  fields: SeedField[];
};

const P = PageStatus.PUBLISHED;
const T = ContentFieldType;

function f(
  key: string,
  label: string,
  type: ContentFieldType,
  value: string,
  section: string,
  order: number,
  helperText?: string,
): SeedField {
  return { key, label, helperText, type, value, order, section };
}

const SEO_SECTION = 'SEO';

function slugToPublicPath(slug: string): string {
  if (slug === '/') return '/';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

function seoFields(slug: string, adminTitle: string, pageDescription: string): SeedField[] {
  if (slug === 'global') return [];

  const defaults = PAGE_SEO_DEFAULTS[slug];
  const metaTitle =
    defaults?.title ?? `${adminTitle.replace(/^(Programme|Credentials):\s*/, '')} | ICI`;
  const metaDescription = defaults?.description ?? pageDescription;
  const focusKeyword = defaults?.focusKeyword ?? '';
  const seoKeywords = defaults ? pageSeoKeywordsInput(defaults) : '';

  return [
    f(
      'meta_title',
      'Meta Title',
      T.TEXT,
      metaTitle,
      SEO_SECTION,
      -30,
      'Browser tab and search result title. Google typically shows ~60 characters; longer text is allowed.',
    ),
    f(
      'meta_description',
      'Meta Description',
      T.TEXTAREA,
      metaDescription,
      SEO_SECTION,
      -29,
      'Search result description. Google typically shows ~160 characters; longer text is allowed.',
    ),
    f(
      'focus_keyword',
      'Focus Keyword',
      T.TEXT,
      focusKeyword,
      SEO_SECTION,
      -28,
      'Primary phrase this page should rank for (e.g. online coaching certification).',
    ),
    f(
      'seo_keywords',
      'Additional SEO Keywords',
      T.TEXTAREA,
      seoKeywords,
      SEO_SECTION,
      -27,
      'Up to 10 comma-separated keywords supporting this page (e.g. professional coaching certification, coach certification program).',
    ),
    f(
      'page_url',
      'Page URL (Slug)',
      T.URL,
      slugToPublicPath(slug),
      SEO_SECTION,
      -26,
      'Public URL path for this page, e.g. /about or /programmes/certified-life-coach',
    ),
  ];
}

function page(
  slug: string,
  title: string,
  description: string,
  fields: SeedField[],
): SeedPage {
  return {
    slug,
    title,
    description,
    isSystem: true,
    status: P,
    fields: [...seoFields(slug, title, description), ...fields],
  };
}

function codeField(order: number): SeedField {
  return f(
    'custom_code',
    'Custom Code / Embed',
    T.CODE,
    '',
    'Custom Code',
    order,
    'DEVELOPER ONLY - Paste HTML, JS, or third-party embed codes here. Do not edit if you are not a developer.',
  );
}

function simpleHeroPage(
  slug: string,
  title: string,
  description: string,
  heroHeading: string,
  heroBody: string,
  extraFields: SeedField[] = [],
): SeedPage {
  return page(slug, title, description, [
    f('hero_heading', 'Page Heading', T.TEXT, heroHeading, 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, heroBody, 'Hero', 2),
    ...extraFields,
    codeField(999),
  ]);
}

function pathwayLevel(
  n: 1 | 2 | 3 | 4,
  data: {
    code: string;
    name: string;
    tag: string;
    hours: string;
    body: string;
    bullets: [string, string, string];
    btnText: string;
    btnLink: string;
  },
  baseOrder: number,
): SeedField[] {
  const p = `level_${n}_`;
  return [
    f(`${p}code`, `Level ${n} Code`, T.TEXT, data.code, 'Mastery Pathway', baseOrder),
    f(`${p}name`, `Level ${n} Name`, T.TEXT, data.name, 'Mastery Pathway', baseOrder + 1),
    f(`${p}tag`, `Level ${n} Tag`, T.TEXT, data.tag, 'Mastery Pathway', baseOrder + 2),
    f(`${p}hours`, `Level ${n} Hours`, T.TEXT, data.hours, 'Mastery Pathway', baseOrder + 3),
    f(`${p}body`, `Level ${n} Description`, T.RICHTEXT, data.body, 'Mastery Pathway', baseOrder + 4),
    f(`${p}bullet_1`, `Level ${n} Bullet 1`, T.TEXT, data.bullets[0], 'Mastery Pathway', baseOrder + 5),
    f(`${p}bullet_2`, `Level ${n} Bullet 2`, T.TEXT, data.bullets[1], 'Mastery Pathway', baseOrder + 6),
    f(`${p}bullet_3`, `Level ${n} Bullet 3`, T.TEXT, data.bullets[2], 'Mastery Pathway', baseOrder + 7),
    f(`${p}button_text`, `Level ${n} Button Text`, T.TEXT, data.btnText, 'Mastery Pathway', baseOrder + 8),
    f(`${p}button_link`, `Level ${n} Button Link`, T.URL, data.btnLink, 'Mastery Pathway', baseOrder + 9),
  ];
}

export type CredentialPageData = {
  heroLabel: string;
  heroHeading: string;
  heroBody: string;
  programmeHours: string;
  programmeLevel: string;
  overviewHeading: string;
  overviewBody: string;
  learningPoints: [string, string, string, string, string];
  assessmentHeading: string;
  assessmentBody: string;
  ctaHeading: string;
  ctaButtonText: string;
  ctaButtonLink: string;
};

export type CredentialDetailExtra = {
  forWho?: string[];
  entryRequirementsBody?: string;
  formatIntro?: string;
  formatItems?: string[];
  syllabusIntro?: string;
  modules?: { title: string; body: string }[];
  graduateItems?: string[];
  sidebarLevel?: string;
  sidebarFormat?: string;
  sidebarDuration?: string;
  sidebarInvestment?: string;
  advisorLinkText?: string;
  advisorLinkUrl?: string;
};

export function credentialPage(
  slug: string,
  title: string,
  data: CredentialPageData,
  extra?: CredentialDetailExtra,
): SeedPage {
  const fields: SeedField[] = [
    f('hero_label', 'Hero Label', T.TEXT, data.heroLabel, 'Hero', 1, 'Small label above heading e.g. Level 1'),
    f('hero_heading', 'Page Heading', T.TEXT, data.heroHeading, 'Hero', 2),
    f('hero_body', 'Page Introduction', T.TEXT, data.heroBody, 'Hero', 3),
    f('programme_level', 'Programme Level Tag', T.TEXT, data.programmeLevel, 'Hero', 4, 'e.g. Foundation'),
    f('overview_heading', 'Who For Heading', T.TEXT, data.overviewHeading, 'Who This Level Is For', 10),
    ...(extra?.forWho ?? []).map((item, i) =>
      f(`for_who_${i + 1}`, `Who Item ${i + 1}`, T.TEXT, item, 'Who This Level Is For', 11 + i),
    ),
    f('entry_requirements_heading', 'Entry Requirements Heading', T.TEXT, 'Entry requirements', 'Entry Requirements', 20),
    f('entry_requirements_body', 'Entry Requirements Text', T.TEXT, extra?.entryRequirementsBody ?? '', 'Entry Requirements', 21),
    f('format_heading', 'Format Section Heading', T.TEXT, 'Format and hours', 'Format & Hours', 30),
    f('format_intro', 'Format Introduction', T.TEXTAREA, extra?.formatIntro ?? '', 'Format & Hours', 31),
    f('format_item_1', 'Format Item 1', T.TEXT, extra?.formatItems?.[0] ?? '', 'Format & Hours', 32),
    f('format_item_2', 'Format Item 2', T.TEXT, extra?.formatItems?.[1] ?? '', 'Format & Hours', 33),
    f('format_item_3', 'Format Item 3', T.TEXT, extra?.formatItems?.[2] ?? '', 'Format & Hours', 34),
    f('learning_heading', 'What You Learn Heading', T.TEXT, 'What you will be able to do', 'What You Will Learn', 40),
    f('learning_point_1', 'Learning Point 1', T.TEXT, data.learningPoints[0], 'What You Will Learn', 41),
    f('learning_point_2', 'Learning Point 2', T.TEXT, data.learningPoints[1], 'What You Will Learn', 42),
    f('learning_point_3', 'Learning Point 3', T.TEXT, data.learningPoints[2], 'What You Will Learn', 43),
    f('learning_point_4', 'Learning Point 4', T.TEXT, data.learningPoints[3], 'What You Will Learn', 44),
    f('learning_point_5', 'Learning Point 5', T.TEXT, data.learningPoints[4], 'What You Will Learn', 45),
    f('syllabus_heading', 'Syllabus Heading', T.TEXT, 'Syllabus', 'Syllabus', 50),
    f('syllabus_intro', 'Syllabus Introduction', T.TEXTAREA, extra?.syllabusIntro ?? '', 'Syllabus', 51),
    ...(extra?.modules ?? []).flatMap((mod, i) => {
      const n = i + 1;
      return [
        f(`module_${n}_title`, `Module ${n} Title`, T.TEXT, mod.title, 'Syllabus', 52 + n * 2),
        f(`module_${n}_body`, `Module ${n} Description`, T.TEXTAREA, mod.body, 'Syllabus', 53 + n * 2),
      ];
    }),
    f('assessment_heading', 'Assessment Heading', T.TEXT, data.assessmentHeading, 'Assessment', 100),
    f('assessment_body', 'Assessment Description', T.TEXT, data.assessmentBody, 'Assessment', 101),
    f('graduate_heading', 'Graduate Section Heading', T.TEXT, 'What you graduate with', 'What You Graduate With', 110),
    f('graduate_1', 'Graduate Item 1', T.TEXT, extra?.graduateItems?.[0] ?? '', 'What You Graduate With', 111),
    f('graduate_2', 'Graduate Item 2', T.TEXT, extra?.graduateItems?.[1] ?? '', 'What You Graduate With', 112),
    f('graduate_3', 'Graduate Item 3', T.TEXT, extra?.graduateItems?.[2] ?? '', 'What You Graduate With', 113),
    f('graduate_4', 'Graduate Item 4', T.TEXT, extra?.graduateItems?.[3] ?? '', 'What You Graduate With', 114),
    f('graduate_5', 'Graduate Item 5', T.TEXT, extra?.graduateItems?.[4] ?? '', 'What You Graduate With', 115),
    f('sidebar_heading', 'Sidebar Heading', T.TEXT, 'Details at a glance', 'Sidebar (At a Glance)', 120),
    f('sidebar_level', 'Sidebar Level', T.TEXT, extra?.sidebarLevel ?? '', 'Sidebar (At a Glance)', 121),
    f('sidebar_format', 'Sidebar Format', T.TEXT, extra?.sidebarFormat ?? 'online, one-to-one', 'Sidebar (At a Glance)', 122),
    f('programme_hours', 'Sidebar Hours', T.TEXT, data.programmeHours, 'Sidebar (At a Glance)', 123, 'e.g. 36 total (12 coaching, 24 self-work)'),
    f('sidebar_duration', 'Sidebar Duration', T.TEXT, extra?.sidebarDuration ?? '', 'Sidebar (At a Glance)', 124),
    ...(extra?.sidebarInvestment
      ? [f('sidebar_investment', 'Sidebar Investment', T.TEXT, extra.sidebarInvestment, 'Sidebar (At a Glance)', 125)]
      : []),
    f('cta_button_text', 'Primary Button Text', T.TEXT, data.ctaButtonText, 'Sidebar CTA Buttons', 130),
    f('cta_button_link', 'Primary Button Link', T.URL, data.ctaButtonLink, 'Sidebar CTA Buttons', 131),
    f('advisor_link_text', 'Advisor Button Text', T.TEXT, extra?.advisorLinkText ?? 'Speak to an Advisor', 'Sidebar CTA Buttons', 132),
    f('advisor_link_url', 'Advisor Button Link', T.URL, extra?.advisorLinkUrl ?? '/admissions/contact', 'Sidebar CTA Buttons', 133),
    codeField(999),
  ];
  return page(slug, title, `${title} credential detail page`, fields);
}

export type ProgrammePageData = import('../src/lib/programme-defaults').ProgrammeSpecialisationData;

export function programmePage(
  slug: string,
  title: string,
  data: ProgrammePageData,
): SeedPage {
  const fields: SeedField[] = [
    f('hero_tag', 'Hero Tag', T.TEXT, data.heroTag, 'Hero', 1),
    f('hero_heading', 'Hero Title', T.TEXT, data.heroHeading, 'Hero', 2),
    f('hero_body', 'Hero Introduction', T.TEXT, data.heroBody, 'Hero', 3),
    f('hero_watermark', 'Hero Watermark Letter', T.TEXT, data.heroWatermark, 'Hero', 4),
    f('hero_image', 'Hero Background Image', T.IMAGE, '', 'Hero', 5),
    f('learn_heading', 'Learn Section Heading', T.TEXT, data.learnHeading, 'What You Learn', 10),
    f('learn_1', 'Learn Item 1', T.TEXT, data.learnItems[0], 'What You Learn', 11),
    f('learn_2', 'Learn Item 2', T.TEXT, data.learnItems[1], 'What You Learn', 12),
    f('learn_3', 'Learn Item 3', T.TEXT, data.learnItems[2], 'What You Learn', 13),
    f('learn_4', 'Learn Item 4', T.TEXT, data.learnItems[3], 'What You Learn', 14),
    f('who_heading', 'Who This Suits Heading', T.TEXT, data.whoHeading, 'Who This Suits', 20),
    f('who_1', 'Who Item 1', T.TEXT, data.whoItems[0], 'Who This Suits', 21),
    f('who_2', 'Who Item 2', T.TEXT, data.whoItems[1], 'Who This Suits', 22),
    f('who_3', 'Who Item 3', T.TEXT, data.whoItems[2], 'Who This Suits', 23),
    f('glance_heading', 'At a Glance Heading', T.TEXT, data.glanceHeading, 'At a Glance', 30),
    ...data.glanceItems.flatMap((item, i) => [
      f(`glance_${i + 1}_label`, `Glance ${i + 1} Label`, T.TEXT, item.label, 'At a Glance', 31 + i * 2),
      f(`glance_${i + 1}_value`, `Glance ${i + 1} Value`, T.TEXT, item.value, 'At a Glance', 32 + i * 2),
    ]),
    f('pathway_heading', 'Pathway Section Heading', T.TEXT, data.pathwayHeading, 'Pathway CTA', 40),
    f('pathway_body', 'Pathway Section Body', T.TEXT, data.pathwayBody, 'Pathway CTA', 41),
    f('cta_primary_text', 'Primary Button Text', T.TEXT, data.ctaPrimaryText, 'Pathway CTA', 42),
    f('cta_primary_link', 'Primary Button Link', T.URL, data.ctaPrimaryLink, 'Pathway CTA', 43),
    f('cta_secondary_text', 'Secondary Button Text', T.TEXT, data.ctaSecondaryText, 'Pathway CTA', 44),
    f('cta_secondary_link', 'Secondary Button Link', T.URL, data.ctaSecondaryLink, 'Pathway CTA', 45),
    codeField(999),
  ];
  return page(slug, title, `${title} programme detail page`, fields);
}

const HOME_PAGE: SeedPage = page('/', 'Home', 'ICI homepage', [
  f('announcement_1_text', 'Banner 1 Text', T.TEXT, 'Enrolment is open now. Begin any month, one-to-one.', 'Announcement Bar', 1, 'First message rotating in the announcement bar'),
  f('announcement_1_link', 'Banner 1 Link', T.URL, '/apply', 'Announcement Bar', 2, 'Where the user goes when they click banner 1'),
  f('announcement_2_text', 'Banner 2 Text', T.TEXT, 'Now enrolling worldwide: one-to-one, online coaching certification.', 'Announcement Bar', 3),
  f('announcement_2_link', 'Banner 2 Link', T.URL, '/credentials', 'Announcement Bar', 4),
  f('announcement_3_text', 'Banner 3 Text', T.TEXT, 'The ICI Mastery Pathway, from Catalyst to Luminary. Explore the credentials.', 'Announcement Bar', 5),
  f('announcement_3_link', 'Banner 3 Link', T.URL, '/credentials', 'Announcement Bar', 6),
  f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'One-to-one, online coaching certification', 'Hero', 10, 'Small text above the main heading'),
  f('hero_heading', 'Hero Heading', T.TEXT, 'Where great coaches are made.', 'Hero', 11, 'The large bold heading'),
  f('hero_body', 'Hero Body Text', T.RICHTEXT, '<p>The International Coaching Institute trains and certifies coaches who want to do work that genuinely changes lives. Every programme is delivered one-to-one and online, blending rigorous coaching practice with leadership, psychology, neuroscience and human behaviour. Whether you are starting out or deepening an established practice, you will leave able to hold a room, read a person, and create lasting change. Become the coach people trust.</p>', 'Hero', 12),
  f('hero_image', 'Hero Background Image', T.IMAGE, '', 'Hero', 13, 'Background image of the hero section'),
  f('stat_1_number', 'Stat 1 Number', T.NUMBER, '25000', 'Hero Stats', 14, 'Currently: 25,000+ coaches trained'),
  f('stat_1_suffix', 'Stat 1 Suffix', T.TEXT, '+', 'Hero Stats', 15),
  f('stat_1_label', 'Stat 1 Label', T.TEXT, 'Coaches trained', 'Hero Stats', 16),
  f('stat_2_number', 'Stat 2 Number', T.NUMBER, '60', 'Hero Stats', 17),
  f('stat_2_suffix', 'Stat 2 Suffix', T.TEXT, '+', 'Hero Stats', 18),
  f('stat_2_label', 'Stat 2 Label', T.TEXT, 'Countries reached', 'Hero Stats', 19),
  f('stat_3_number', 'Stat 3 Number', T.NUMBER, '4', 'Hero Stats', 20),
  f('stat_3_suffix', 'Stat 3 Suffix', T.TEXT, '', 'Hero Stats', 21, 'Leave blank if no suffix'),
  f('stat_3_label', 'Stat 3 Label', T.TEXT, 'Credential levels', 'Hero Stats', 22),
  f('stat_4_number', 'Stat 4 Number', T.NUMBER, '5', 'Hero Stats', 23),
  f('stat_4_suffix', 'Stat 4 Suffix', T.TEXT, '', 'Hero Stats', 24),
  f('stat_4_label', 'Stat 4 Label', T.TEXT, 'Campuses', 'Hero Stats', 25),
  f('hero_primary_button_text', 'Primary Button Text', T.TEXT, 'Explore the Mastery Pathway', 'Hero', 26),
  f('hero_primary_button_link', 'Primary Button Link', T.URL, '/credentials', 'Hero', 27),
  f('hero_secondary_button_text', 'Secondary Button Text', T.TEXT, 'Download Prospectus', 'Hero', 28),
  f('hero_secondary_button_link', 'Secondary Button Link', T.URL, '/resources/brochure', 'Hero', 29),
  f('hero_form_heading', 'Form Heading', T.TEXT, 'Start your coaching journey', 'Hero Form', 30),
  f('hero_form_subheading', 'Form Subheading', T.TEXT, 'Free enquiry, no commitment. Tell us where you are and we will point you to the right level.', 'Hero Form', 31),
  f('hero_form_button_text', 'Form Button Text', T.TEXT, 'Get Started', 'Hero Form', 32),
  f('trust_point_1', 'Trust Point 1', T.TEXT, 'One-to-one, never group classes', 'Hero Form', 33),
  f('trust_point_2', 'Trust Point 2', T.TEXT, 'Online, delivered worldwide', 'Hero Form', 34),
  f('trust_point_3', 'Trust Point 3', T.TEXT, 'Assessed on real coaching', 'Hero Form', 35),
  f('accreditation_1_name', 'Accreditation 1 Name', T.TEXT, 'CRAFT', 'Accreditation', 40),
  f('accreditation_1_subtitle', 'Accreditation 1 Subtitle', T.TEXT, 'ONE-TO-ONE MASTERY', 'Accreditation', 41),
  f('accreditation_2_name', 'Accreditation 2 Name', T.TEXT, 'EVIDENCE', 'Accreditation', 42),
  f('accreditation_2_subtitle', 'Accreditation 2 Subtitle', T.TEXT, 'NEUROSCIENCE-BACKED', 'Accreditation', 43),
  f('accreditation_3_name', 'Accreditation 3 Name', T.TEXT, 'STANDARDS', 'Accreditation', 44),
  f('accreditation_3_subtitle', 'Accreditation 3 Subtitle', T.TEXT, 'REAL COACHING ASSESSED', 'Accreditation', 45),
  f('accreditation_4_name', 'Accreditation 4 Name', T.TEXT, 'INTEGRITY', 'Accreditation', 46),
  f('accreditation_4_subtitle', 'Accreditation 4 Subtitle', T.TEXT, 'A PROFESSIONAL CODE', 'Accreditation', 47),
  f('accreditation_5_name', 'Accreditation 5 Name', T.TEXT, 'ACCESS', 'Accreditation', 48),
  f('accreditation_5_subtitle', 'Accreditation 5 Subtitle', T.TEXT, 'DELIVERED WORLDWIDE', 'Accreditation', 49),
  f('paths_section_heading', 'Section Heading', T.TEXT, 'Coaching for Everyone', 'Coaching for Everyone', 50),
  f('path_1_label', 'Path 1 Label', T.TEXT, 'Path 01', 'Coaching for Everyone', 51),
  f('path_1_heading', 'Path 1 Heading', T.TEXT, 'Aspiring coaches', 'Coaching for Everyone', 52),
  f('path_1_body', 'Path 1 Description', T.TEXTAREA, 'Begin a new career on solid ground. Foundational certification and real one-to-one coaching, so you graduate ready to take your first paying clients.', 'Coaching for Everyone', 53),
  f('path_1_image', 'Path 1 Image', T.IMAGE, '', 'Coaching for Everyone', 54),
  f('path_2_label', 'Path 2 Label', T.TEXT, 'Path 02', 'Coaching for Everyone', 55),
  f('path_2_heading', 'Path 2 Heading', T.TEXT, 'Experienced practitioners', 'Coaching for Everyone', 56),
  f('path_2_body', 'Path 2 Description', T.TEXTAREA, 'Deepen a practice that already works. Advanced credentialing and supervision that sharpen your judgement and raise your standing.', 'Coaching for Everyone', 57),
  f('path_2_image', 'Path 2 Image', T.IMAGE, '', 'Coaching for Everyone', 58),
  f('path_3_label', 'Path 3 Label', T.TEXT, 'Path 03', 'Coaching for Everyone', 59),
  f('path_3_heading', 'Path 3 Heading', T.TEXT, 'Organisations and leaders', 'Coaching for Everyone', 60),
  f('path_3_body', 'Path 3 Description', T.TEXTAREA, 'Build a coaching culture from the inside, so feedback, accountability and growth become part of how your people work.', 'Coaching for Everyone', 61),
  f('path_3_image', 'Path 3 Image', T.IMAGE, '', 'Coaching for Everyone', 62),
  f('pathway_section_label', 'Section Label', T.TEXT, 'The ICI Mastery Pathway', 'Mastery Pathway', 70),
  f('pathway_section_heading', 'Section Heading', T.TEXT, 'Your path to mastery', 'Mastery Pathway', 91),
  f('pathway_section_subheading', 'Section Subheading', T.TEXTAREA, 'Four progressive levels, each a credential you carry for life, taught one-to-one and online.', 'Mastery Pathway', 92),
  ...pathwayLevel(1, {
    code: 'L1', name: 'Catalyst', tag: 'Foundation', hours: '36 Hours',
    body: '<p>Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.</p>',
    bullets: ['12 hours one-to-one coaching', '24 hours guided self-work', 'Final assessment & credential'],
    btnText: 'Explore Catalyst', btnLink: '/credentials/catalyst',
  }, 100),
  ...pathwayLevel(2, {
    code: 'L2', name: 'Architect', tag: 'Professional', hours: '60 Hours',
    body: '<p>Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.</p>',
    bullets: ['20 hours one-to-one coaching', '40 hours guided self-work', 'Final assessment & credential'],
    btnText: 'Explore Architect', btnLink: '/credentials/architect',
  }, 110),
  ...pathwayLevel(3, {
    code: 'L3', name: 'Sage', tag: 'Senior', hours: '90 Hours',
    body: '<p>Senior. You coach with depth, range and presence, and work with the most complex clients. 90 hours, one-to-one.</p>',
    bullets: ['30 hours one-to-one coaching', '60 hours guided self-work', 'Final assessment & credential'],
    btnText: 'Explore Sage', btnLink: '/credentials/sage',
  }, 120),
  ...pathwayLevel(4, {
    code: 'L4', name: 'Luminary', tag: 'Master', hours: '120 Hours',
    body: '<p>The institute\'s highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.</p>',
    bullets: ['40 hours one-to-one coaching', '80 hours self-work and capstone', 'Final assessment & credential'],
    btnText: 'Explore Luminary', btnLink: '/credentials/luminary',
  }, 130),
  f('difference_label', 'Section Label', T.TEXT, 'Why ICI', 'ICI Difference', 140),
  f('difference_heading', 'Section Heading', T.TEXT, 'The ICI Difference', 'ICI Difference', 141),
  f('difference_image', 'Section Image', T.IMAGE, '', 'ICI Difference', 142),
  f('difference_body_intro', 'Intro Text', T.TEXTAREA, 'Our evidence-based curriculum, world-class faculty, and supportive community provide an unmatched environment for developing coaching mastery.', 'ICI Difference', 143),
  f('difference_point_1_heading', 'Point 1 Heading', T.TEXT, 'Evidence-based curriculum', 'ICI Difference', 144),
  f('difference_point_1_body', 'Point 1 Description', T.TEXTAREA, 'Our training draws on coaching psychology, neuroscience and behavioural science, taught in plain language and tied to what happens in a real session. You learn why an intervention works, not just the script.', 'ICI Difference', 145),
  f('difference_point_2_heading', 'Point 2 Heading', T.TEXT, 'One-to-one, never one-to-many', 'ICI Difference', 146),
  f('difference_point_2_body', 'Point 2 Description', T.TEXTAREA, 'You are coached and developed individually, so nothing is glossed over and no one hides at the back of a room. It is the heart of how we work.', 'ICI Difference', 147),
  f('difference_point_3_heading', 'Point 3 Heading', T.TEXT, 'Faculty who still practise', 'ICI Difference', 148),
  f('difference_point_3_body', 'Point 3 Description', T.TEXTAREA, 'You learn from experienced coaches who work with senior leaders across major organisations, so the teaching reflects real client work rather than theory at a distance.', 'ICI Difference', 149),
  f('programmes_section_label', 'Section Label', T.TEXT, 'Academics', 'Featured Programmes', 150),
  f('programmes_section_heading', 'Section Heading', T.TEXT, 'Featured Programmes', 'Featured Programmes', 151),
  f('programme_1_tag', 'Programme 1 Tag', T.TEXT, 'Levels 1-2', 'Featured Programmes', 152),
  f('programme_1_title', 'Programme 1 Title', T.TEXT, 'Certified Life Coach', 'Featured Programmes', 153),
  f('programme_1_description', 'Programme 1 Description', T.TEXTAREA, 'Master the foundational competencies of transformational life coaching.', 'Featured Programmes', 154),
  f('programme_1_image', 'Programme 1 Image', T.IMAGE, '', 'Featured Programmes', 155),
  f('programme_1_link', 'Programme 1 Link', T.URL, '/programmes/certified-life-coach', 'Featured Programmes', 156),
  f('programme_2_tag', 'Programme 2 Tag', T.TEXT, 'Levels 3-4', 'Featured Programmes', 157),
  f('programme_2_title', 'Programme 2 Title', T.TEXT, 'Executive Coaching', 'Featured Programmes', 158),
  f('programme_2_description', 'Programme 2 Description', T.TEXTAREA, 'Drive organisational success through advanced leadership methodologies.', 'Featured Programmes', 159),
  f('programme_2_image', 'Programme 2 Image', T.IMAGE, '', 'Featured Programmes', 160),
  f('programme_2_link', 'Programme 2 Link', T.URL, '/programmes/executive-coaching', 'Featured Programmes', 161),
  f('programme_3_tag', 'Programme 3 Tag', T.TEXT, 'Open entry', 'Featured Programmes', 162),
  f('programme_3_title', 'Programme 3 Title', T.TEXT, 'Health & Wellness', 'Featured Programmes', 163),
  f('programme_3_description', 'Programme 3 Description', T.TEXTAREA, 'Empower clients to achieve sustainable physical and mental well-being.', 'Featured Programmes', 164),
  f('programme_3_image', 'Programme 3 Image', T.IMAGE, '', 'Featured Programmes', 165),
  f('programme_3_link', 'Programme 3 Link', T.URL, '/programmes/health-wellness', 'Featured Programmes', 166),
  f('global_section_label', 'Section Label', T.TEXT, 'Global Network', 'Global Network', 170),
  f('global_section_heading', 'Section Heading', T.TEXT, 'Connecting Coaches Worldwide', 'Global Network', 171),
  f('global_section_body', 'Section Description', T.TEXTAREA, 'Because the whole pathway is online, our coaches come from many countries and one community. Connect, learn and grow alongside people who take the craft as seriously as you do.', 'Global Network', 172),
  f('global_cities', 'Cities Text', T.TEXT, 'New York · London · Dubai · Singapore · Mumbai', 'Global Network', 173),
  f('global_bg_image', 'Background Image', T.IMAGE, '', 'Global Network', 174),
  f('news_section_label', 'Section Label', T.TEXT, 'From the Blog', 'Latest Blog', 180),
  f('news_section_heading', 'Section Heading', T.TEXT, 'Latest Insights', 'Latest Blog', 181),
  f('blog_view_all_text', 'View All Link Text', T.TEXT, 'View all articles', 'Latest Blog', 182),
  f('cta_heading', 'CTA Heading', T.TEXT, 'Ready to do work that changes lives?', 'Bottom CTA', 190),
  f('cta_body', 'CTA Description', T.TEXTAREA, 'Take the first step towards a coaching career that means something. Enrolment for the next cohort is open now.', 'Bottom CTA', 191),
  f('cta_primary_button_text', 'Primary Button Text', T.TEXT, 'Start your application', 'Bottom CTA', 192),
  f('cta_primary_button_link', 'Primary Button Link', T.URL, '/apply', 'Bottom CTA', 193),
  f('cta_secondary_button_text', 'Secondary Button Text', T.TEXT, 'Speak to an advisor', 'Bottom CTA', 194),
  f('cta_secondary_button_link', 'Secondary Button Link', T.URL, '/admissions/contact', 'Bottom CTA', 195),
  codeField(999),
]);

const GLOBAL_PAGE: SeedPage = page('global', 'Global — Header & Footer', 'Site-wide header, footer, SEO and scripts', [
  f('site_email', 'Site Email', T.EMAIL, 'info@internationalcoachinginstitute.org', 'Header', 1, 'Email shown in header'),
  f('site_phone', 'Site Phone', T.PHONE, '+91 98199 84575', 'Header', 2),
  f('linkedin_url', 'LinkedIn URL', T.URL, 'https://www.linkedin.com/company/internationalcoachinginstitute', 'Header', 3),
  f('apply_button_text', 'Apply Button Text', T.TEXT, 'Apply Now', 'Header', 4),
  f('apply_button_link', 'Apply Button Link', T.URL, '/apply', 'Header', 5),
  f('login_text', 'Login Link Text', T.TEXT, 'Log In', 'Header', 6),
  f('login_link', 'Login Link URL', T.URL, '/login', 'Header', 7),
  f('footer_tagline', 'Footer Tagline', T.TEXTAREA, 'The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.', 'Footer', 10),
  f('footer_copyright', 'Copyright Text', T.TEXT, 'Copyright © 2026 International Coaching Institute. All rights reserved.', 'Footer', 11),
  f('footer_col_1_heading', 'Footer Column 1 Heading', T.TEXT, 'Information For', 'Footer', 12),
  f('footer_col_2_heading', 'Footer Column 2 Heading', T.TEXT, 'Programmes & Credentials', 'Footer', 13),
  f('footer_col_3_heading', 'Footer Column 3 Heading', T.TEXT, 'About', 'Footer', 14),
  f('footer_col_4_heading', 'Footer Column 4 Heading', T.TEXT, 'Legal', 'Footer', 15),
  f('default_meta_title', 'Default Meta Title', T.TEXT, 'International Coaching Institute | Become a Certified Coach', 'SEO Defaults', 19, 'Fallback when a page has no meta title set'),
  f('default_meta_description', 'Default Meta Description', T.TEXTAREA, 'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.', 'SEO Defaults', 20, 'Max 160 characters'),
  f('default_og_image', 'Default Social Share Image', T.IMAGE, '/logo-transparent.webp', 'SEO Defaults', 21),
  f('head_code', 'Global Head Code', T.CODE, '', 'Custom Code (Site-wide)', 30, 'DEVELOPER ONLY - Injected into head on every page'),
  f('body_code', 'Global Body Code', T.CODE, '', 'Custom Code (Site-wide)', 31, 'DEVELOPER ONLY - Injected at bottom of body'),
]);

const PROGRAMMES_PAGE: SeedPage = page('/programmes', 'Programmes', 'ICI programmes overview', [
  f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Programmes', 'Hero', 1),
  f('hero_heading', 'Page Heading Line 1', T.TEXT, 'One pathway,', 'Hero', 2),
  f('hero_heading_accent', 'Page Heading Accent', T.TEXT, 'many ways to serve', 'Hero', 3),
  f('hero_body', 'Page Introduction', T.TEXTAREA, 'Everything we teach is built around the same promise: you will leave able to coach well, not just talk about coaching. The core of ICI is the Mastery Pathway, a four-level certification journey taught one-to-one and online. Within it, you can focus on the kind of coaching that calls you, from life and executive work to business, wellness and teams. Here is how the two fit together.', 'Hero', 4),
  f('mastery_section_heading', 'Mastery Section Heading', T.TEXT, 'The core: the ICI Mastery Pathway', 'Mastery Pathway', 10),
  f('mastery_section_body', 'Mastery Section Body', T.TEXTAREA, 'Your certification is earned through four progressive levels. Each is a complete credential in its own right, and each builds on the one before.\n\nCatalyst (Level 1): the foundation. Become a competent, confident coach.\nArchitect (Level 2): the professional. Build a thriving practice and work with complexity.\nSage (Level 3): the senior coach. Coach with depth, range and presence.\nLuminary (Level 4): the highest distinction. Master the craft and develop others.', 'Mastery Pathway', 11),
  f('level_1_label', 'Level 1 Label', T.TEXT, 'Level 1', 'Mastery Pathway', 12),
  f('level_1_name', 'Level 1 Name', T.TEXT, 'Catalyst', 'Mastery Pathway', 13),
  f('level_1_description', 'Level 1 Description', T.TEXTAREA, 'The foundation. Become a competent, confident coach.', 'Mastery Pathway', 14),
  f('level_2_label', 'Level 2 Label', T.TEXT, 'Level 2', 'Mastery Pathway', 15),
  f('level_2_name', 'Level 2 Name', T.TEXT, 'Architect', 'Mastery Pathway', 16),
  f('level_2_description', 'Level 2 Description', T.TEXTAREA, 'The professional. Build a thriving practice and work with complexity.', 'Mastery Pathway', 17),
  f('level_3_label', 'Level 3 Label', T.TEXT, 'Level 3', 'Mastery Pathway', 18),
  f('level_3_name', 'Level 3 Name', T.TEXT, 'Sage', 'Mastery Pathway', 19),
  f('level_3_description', 'Level 3 Description', T.TEXTAREA, 'The senior coach. Coach with depth, range and presence.', 'Mastery Pathway', 20),
  f('level_4_label', 'Level 4 Label', T.TEXT, 'Level 4', 'Mastery Pathway', 21),
  f('level_4_name', 'Level 4 Name', T.TEXT, 'Luminary', 'Mastery Pathway', 22),
  f('level_4_description', 'Level 4 Description', T.TEXTAREA, 'The highest distinction. Master the craft and develop others.', 'Mastery Pathway', 23),
  f('credentials_link_text', 'Credentials Link Text', T.TEXT, 'Explore credentials and pricing', 'Mastery Pathway', 24),
  f('credentials_link_url', 'Credentials Link URL', T.URL, '/credentials', 'Mastery Pathway', 25),
  f('specialisations_heading', 'Specialisations Heading', T.TEXT, 'Specialisations:', 'Specialisations', 30),
  f('specialisations_heading_accent', 'Specialisations Heading Accent', T.TEXT, 'where you focus', 'Specialisations', 31),
  f('specialisations_body', 'Specialisations Body', T.TEXTAREA, 'As you progress, you can shape your training around a specialism. These are not separate courses with separate fees; they are the focus you bring to your pathway, supported by faculty experienced in that area. Your investment follows the Pathway, set out on the Pricing page.', 'Specialisations', 32),
  f('specialisation_1_name', 'Specialisation 1 Name', T.TEXT, 'Life Coaching', 'Specialisations', 33),
  f('specialisation_1_link', 'Specialisation 1 Link', T.URL, '/programmes/certified-life-coach', 'Specialisations', 34),
  f('specialisation_2_name', 'Specialisation 2 Name', T.TEXT, 'Executive & Leadership Coaching', 'Specialisations', 35),
  f('specialisation_2_link', 'Specialisation 2 Link', T.URL, '/programmes/executive-coaching', 'Specialisations', 36),
  f('specialisation_3_name', 'Specialisation 3 Name', T.TEXT, 'Business Coaching', 'Specialisations', 37),
  f('specialisation_3_link', 'Specialisation 3 Link', T.URL, '/programmes/business-coach', 'Specialisations', 38),
  f('specialisation_4_name', 'Specialisation 4 Name', T.TEXT, 'Health & Wellness Coaching', 'Specialisations', 39),
  f('specialisation_4_link', 'Specialisation 4 Link', T.URL, '/programmes/health-wellness', 'Specialisations', 40),
  f('specialisation_5_name', 'Specialisation 5 Name', T.TEXT, 'Team & Organisational Coaching', 'Specialisations', 41),
  f('specialisation_5_link', 'Specialisation 5 Link', T.URL, '/programmes/team-coaching', 'Specialisations', 42),
  f('how_it_works_heading', 'How It Works Heading', T.TEXT, 'How our programmes work', 'How It Works', 40),
  f('how_step_1_number', 'Step 1 Number', T.TEXT, '01', 'How It Works', 41),
  f('how_step_1_heading', 'Step 1 Heading', T.TEXT, 'One-to-one.', 'How It Works', 42),
  f('how_step_1_body', 'Step 1 Description', T.TEXTAREA, 'You are coached and developed individually.', 'How It Works', 43),
  f('how_step_2_number', 'Step 2 Number', T.TEXT, '02', 'How It Works', 44),
  f('how_step_2_heading', 'Step 2 Heading', T.TEXT, 'Online, worldwide.', 'How It Works', 45),
  f('how_step_2_body', 'Step 2 Description', T.TEXTAREA, 'Train from any country, around your schedule.', 'How It Works', 46),
  f('how_step_3_number', 'Step 3 Number', T.TEXT, '03', 'How It Works', 47),
  f('how_step_3_heading', 'Step 3 Heading', T.TEXT, 'Coaching hours plus real self-work.', 'How It Works', 48),
  f('how_step_3_body', 'Step 3 Description', T.TEXTAREA, 'Live coaching paired with guided study.', 'How It Works', 49),
  f('how_step_4_number', 'Step 4 Number', T.TEXT, '04', 'How It Works', 50),
  f('how_step_4_heading', 'Step 4 Heading', T.TEXT, 'Assessed on real coaching.', 'How It Works', 51),
  f('how_step_4_body', 'Step 4 Description', T.TEXTAREA, 'Your credential reflects what you can actually do.', 'How It Works', 52),
  f('cta_link_1_text', 'CTA Link 1 Text', T.TEXT, 'Find your level', 'CTA', 60),
  f('cta_link_1_url', 'CTA Link 1 URL', T.URL, '/credentials', 'CTA', 61),
  f('cta_link_2_text', 'CTA Link 2 Text', T.TEXT, 'See pricing', 'CTA', 62),
  f('cta_link_2_url', 'CTA Link 2 URL', T.URL, '/pricing', 'CTA', 63),
  codeField(999),
]);

const CREDENTIALS_PAGE: SeedPage = page('/credentials', 'Credentials', 'ICI Mastery Pathway overview', [
  f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'The Credential System', 'Hero', 1),
  f('hero_heading', 'Page Heading', T.TEXT, 'The ICI Mastery Pathway', 'Hero', 2),
  f('hero_body', 'Page Introduction', T.TEXTAREA, 'Most coaching certificates are earned by sitting in a group and watching the clock. Ours are earned one-to-one, online, with a coach who works with you directly, hour by hour, until the skill is genuinely yours. The Mastery Pathway has four progressive levels, each a credential you carry for life. Wherever you are now, there is a clear next step and a coach to take it with you.', 'Hero', 3),
  f('differences_section_heading', 'Differences Section Heading', T.TEXT, 'Why this pathway is different', 'Differences', 10),
  f('difference_1_heading', 'Difference 1 Heading', T.TEXT, 'One-to-one, not one-to-many', 'Differences', 11),
  f('difference_1_body', 'Difference 1 Body', T.TEXTAREA, 'Nothing is glossed over and no one hides at the back of a room.', 'Differences', 12),
  f('difference_2_heading', 'Difference 2 Heading', T.TEXT, 'Online, wherever you are', 'Differences', 13),
  f('difference_2_body', 'Difference 2 Body', T.TEXTAREA, 'Train from any country without pausing your life.', 'Differences', 14),
  f('difference_3_heading', 'Difference 3 Heading', T.TEXT, 'Coaching hours plus real self-work', 'Differences', 15),
  f('difference_3_body', 'Difference 3 Body', T.TEXTAREA, 'Live coaching paired with substantial guided study.', 'Differences', 16),
  f('difference_4_heading', 'Difference 4 Heading', T.TEXT, 'A credential that means something', 'Differences', 17),
  f('difference_4_body', 'Difference 4 Body', T.TEXTAREA, 'Each level is assessed on real coaching, not attendance.', 'Differences', 18),
  f('find_level_cta_text', 'Find Level CTA Text', T.TEXT, 'Find your level', 'Differences', 19),
  f('see_pricing_cta_text', 'See Pricing CTA Text', T.TEXT, 'See pricing', 'Differences', 20),
  f('levels_section_heading', 'Levels Section Heading', T.TEXT, 'The four levels', 'Levels', 30),
  f('catalyst_heading', 'Catalyst Heading', T.TEXT, 'Catalyst', 'Levels', 31),
  f('catalyst_subline', 'Catalyst Subline', T.TEXT, 'Level 1', 'Levels', 32),
  f('catalyst_body', 'Catalyst Description', T.TEXTAREA, 'Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.', 'Levels', 33),
  f('catalyst_cta_text', 'Catalyst CTA Text', T.TEXT, 'Explore Catalyst', 'Levels', 34),
  f('catalyst_link', 'Catalyst Page Link', T.URL, '/credentials/catalyst', 'Levels', 35),
  f('architect_heading', 'Architect Heading', T.TEXT, 'Architect', 'Levels', 36),
  f('architect_subline', 'Architect Subline', T.TEXT, 'Level 2', 'Levels', 37),
  f('architect_body', 'Architect Description', T.TEXTAREA, 'Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.', 'Levels', 38),
  f('architect_cta_text', 'Architect CTA Text', T.TEXT, 'Explore Architect', 'Levels', 39),
  f('architect_link', 'Architect Page Link', T.URL, '/credentials/architect', 'Levels', 40),
  f('sage_heading', 'Sage Heading', T.TEXT, 'Sage', 'Levels', 41),
  f('sage_subline', 'Sage Subline', T.TEXT, 'Level 3', 'Levels', 42),
  f('sage_body', 'Sage Description', T.TEXTAREA, 'Senior. You coach with depth, range and presence, and hold the most complex clients. 90 hours, one-to-one.', 'Levels', 43),
  f('sage_cta_text', 'Sage CTA Text', T.TEXT, 'Explore Sage', 'Levels', 44),
  f('sage_link', 'Sage Page Link', T.URL, '/credentials/sage', 'Levels', 45),
  f('luminary_heading', 'Luminary Heading', T.TEXT, 'Luminary', 'Levels', 46),
  f('luminary_subline', 'Luminary Subline', T.TEXT, 'Level 4', 'Levels', 47),
  f('luminary_body', 'Luminary Description', T.TEXTAREA, 'The institute\'s highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.', 'Levels', 48),
  f('luminary_cta_text', 'Luminary CTA Text', T.TEXT, 'Explore Luminary', 'Levels', 49),
  f('luminary_link', 'Luminary Page Link', T.URL, '/credentials/luminary', 'Levels', 50),
  codeField(999),
]);

const PRICING_PAGE: SeedPage = page('/pricing', 'Pricing', 'ICI pricing and enrolment', [
  f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Pricing', 'Hero', 1),
  f('hero_heading', 'Page Heading', T.TEXT, 'Honest pricing for serious training', 'Hero', 2),
  f('hero_body', 'Page Introduction', T.TEXTAREA, 'Coaching education is an investment in a career, so we will not hide what it costs. Every level of the Mastery Pathway is delivered one-to-one and online, with real coaching hours from a professional coach and substantial guided self-work. You enrol one level at a time, and each price is complete. What you see is what you pay, plus applicable GST.', 'Hero', 3),
  f('table_section_heading', 'Pricing Table Heading', T.TEXT, 'The Mastery Pathway', 'Pricing Table', 10),
  f('price_row_1_level', 'Row 1 Level', T.TEXT, 'Level 1: Catalyst', 'Pricing Table', 11),
  f('price_row_1_credential', 'Row 1 Credential', T.TEXT, '(ICI-C)', 'Pricing Table', 12),
  f('price_row_1_format', 'Row 1 Format', T.TEXT, 'Online, one-to-one', 'Pricing Table', 13),
  f('price_row_1_hours', 'Row 1 Hours', T.TEXT, '36 hours: 12 coaching + 24 self-work.', 'Pricing Table', 14),
  f('price_row_1_duration', 'Row 1 Duration', T.TEXT, 'Up to 3 months', 'Pricing Table', 15),
  f('price_row_1_price_inr', 'Row 1 Price (INR)', T.NUMBER, '215000', 'Pricing Table', 16),
  f('price_row_2_level', 'Row 2 Level', T.TEXT, 'Level 2: Architect', 'Pricing Table', 17),
  f('price_row_2_credential', 'Row 2 Credential', T.TEXT, '(ICI-A)', 'Pricing Table', 18),
  f('price_row_2_format', 'Row 2 Format', T.TEXT, 'Online, one-to-one', 'Pricing Table', 19),
  f('price_row_2_hours', 'Row 2 Hours', T.TEXT, '60 hours: 20 coaching + 40 self-work.', 'Pricing Table', 20),
  f('price_row_2_duration', 'Row 2 Duration', T.TEXT, 'Up to 4 months', 'Pricing Table', 21),
  f('price_row_2_price_inr', 'Row 2 Price (INR)', T.NUMBER, '345000', 'Pricing Table', 22),
  f('price_row_3_level', 'Row 3 Level', T.TEXT, 'Level 3: Sage', 'Pricing Table', 23),
  f('price_row_3_credential', 'Row 3 Credential', T.TEXT, '(ICI-S)', 'Pricing Table', 24),
  f('price_row_3_format', 'Row 3 Format', T.TEXT, 'Online, one-to-one', 'Pricing Table', 25),
  f('price_row_3_hours', 'Row 3 Hours', T.TEXT, '90 hours: 30 coaching + 60 self-work.', 'Pricing Table', 26),
  f('price_row_3_duration', 'Row 3 Duration', T.TEXT, 'Up to 6 months', 'Pricing Table', 27),
  f('price_row_3_price_inr', 'Row 3 Price (INR)', T.NUMBER, '495000', 'Pricing Table', 28),
  f('price_row_4_level', 'Row 4 Level', T.TEXT, 'Level 4: Luminary', 'Pricing Table', 29),
  f('price_row_4_credential', 'Row 4 Credential', T.TEXT, '(ICI-L)', 'Pricing Table', 30),
  f('price_row_4_format', 'Row 4 Format', T.TEXT, 'Online, one-to-one', 'Pricing Table', 31),
  f('price_row_4_hours', 'Row 4 Hours', T.TEXT, '120 hours: 40 live + 80 self-work and capstone.', 'Pricing Table', 32),
  f('price_row_4_duration', 'Row 4 Duration', T.TEXT, 'Up to 12 months', 'Pricing Table', 33),
  f('price_row_4_price_inr', 'Row 4 Price (INR)', T.NUMBER, '695000', 'Pricing Table', 34),
  f('includes_heading', 'What\'s Included Heading', T.TEXT, 'What every price includes', 'Includes', 40),
  f('include_1', 'Included Item 1', T.TEXT, 'One-to-one online coaching with a coach matched to the level', 'Includes', 41),
  f('include_2', 'Included Item 2', T.TEXT, 'All guided self-work, research materials and assignments', 'Includes', 42),
  f('include_3', 'Included Item 3', T.TEXT, 'Assessment and the credential on successful completion', 'Includes', 43),
  f('include_4', 'Included Item 4', T.TEXT, 'The right to use the credential and post-nominal letters', 'Includes', 44),
  f('include_5', 'Included Item 5', T.TEXT, 'Membership of the ICI coaching community', 'Includes', 45),
  f('enrolment_heading', 'How Enrolment Works Heading', T.TEXT, 'How enrolment works', 'Enrolment', 50),
  f('enrolment_step_1', 'Enrolment Step 1', T.TEXTAREA, 'Choose your level, or speak to an advisor if you are unsure where to start.', 'Enrolment', 51),
  f('enrolment_step_2', 'Enrolment Step 2', T.TEXTAREA, 'Speak briefly with an advisor to confirm the right fit.', 'Enrolment', 52),
  f('enrolment_step_3', 'Enrolment Step 3', T.TEXTAREA, 'Pay securely online, in full or by an agreed instalment plan.', 'Enrolment', 53),
  f('enrolment_step_4', 'Enrolment Step 4', T.TEXTAREA, 'Get matched with your coach and begin, usually within 7 working days.', 'Enrolment', 54),
  f('payment_options_heading', 'Payment Options Heading', T.TEXT, 'Payment options', 'Payment', 60),
  f('payment_options_body', 'Payment Options Content', T.TEXTAREA, 'Pay in full at checkout, or choose an instalment option where available. Card EMI is offered by most major banks at checkout; if you would prefer an institute instalment plan, speak to an advisor and we will agree a schedule before you enrol.', 'Payment', 61),
  f('gst_heading', 'GST Section Heading', T.TEXT, 'GST and international clients', 'Payment', 62),
  f('gst_note', 'GST Note', T.TEXTAREA, 'All prices are exclusive of GST. Applicable GST is added at checkout for clients billed in India. International clients see the price they will be charged in their own currency at checkout.', 'Payment', 63),
  f('faq_heading', 'FAQ Heading', T.TEXT, 'Frequently asked questions', 'FAQ', 70),
  f('faq_1_question', 'FAQ 1 Question', T.TEXT, 'Do I have to complete all four levels?', 'FAQ', 71),
  f('faq_1_answer', 'FAQ 1 Answer', T.TEXTAREA, 'No. Each level is a complete certification in its own right. Many coaches stop at Catalyst or Architect. The higher levels are there when, and if, you want them.', 'FAQ', 72),
  f('faq_2_question', 'FAQ 2 Question', T.TEXT, 'Is it really one-to-one?', 'FAQ', 73),
  f('faq_2_answer', 'FAQ 2 Answer', T.TEXTAREA, 'Yes. You are coached and developed individually. That is the heart of the ICI model and the reason our coaches are ready for real clients.', 'FAQ', 74),
  f('faq_3_question', 'FAQ 3 Question', T.TEXT, 'What is your refund policy?', 'FAQ', 75),
  f('faq_3_answer', 'FAQ 3 Answer', T.TEXTAREA, 'All enrolments and payments are final. Due to the intensive, one-to-one nature of our coaching and the limited availability of our faculty, once a payment has been successfully processed, it is strictly non-refundable under any circumstances.', 'FAQ', 76),
  f('faq_4_question', 'FAQ 4 Question', T.TEXT, 'Can I transfer my enrolment to someone else?', 'FAQ', 77),
  f('faq_4_answer', 'FAQ 4 Answer', T.TEXTAREA, 'No. Because each pathway is highly individualised and tailored to the specific coach\'s development, enrolments and payments are strictly non-transferable to another individual.', 'FAQ', 78),
  f('faq_5_question', 'FAQ 5 Question', T.TEXT, 'What happens if I face an emergency and cannot continue?', 'FAQ', 79),
  f('faq_5_answer', 'FAQ 5 Answer', T.TEXTAREA, 'While payments remain non-refundable, we understand that unforeseen emergencies arise. You may submit a formal request to pause your current training level. If approved, you can resume your sessions at a later date within the programme\'s suggested duration, subject to faculty availability.', 'FAQ', 80),
  f('faq_6_question', 'FAQ 6 Question', T.TEXT, 'Are there any exceptions to the non-refundable policy?', 'FAQ', 81),
  f('faq_6_answer', 'FAQ 6 Answer', T.TEXTAREA, 'No. To maintain the integrity of our scheduling and the deep commitment required for one-to-one professional coaching, the non-refundable policy applies universally without exception. We encourage you to consult with an advisor to ensure the pathway is right for you before enrolling.', 'FAQ', 82),
  f('cta_heading', 'Bottom CTA Heading', T.TEXT, 'Ready to begin your journey?', 'CTA', 90),
  f('cta_button_1_text', 'CTA Button 1 Text', T.TEXT, 'Choose your level', 'CTA', 91),
  f('cta_button_1_link', 'CTA Button 1 Link', T.URL, '/credentials', 'CTA', 92),
  f('cta_button_2_text', 'CTA Button 2 Text', T.TEXT, 'Not sure where to start? Speak to an advisor', 'CTA', 93),
  f('cta_button_2_link', 'CTA Button 2 Link', T.URL, '/admissions/contact', 'CTA', 94),
  codeField(999),
]);

const ADMISSIONS_PAGE: SeedPage = page('/admissions', 'Admissions', 'How to join ICI', [
  f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Admissions', 'Hero', 1),
  f('hero_heading', 'Page Heading', T.TEXT, 'Joining ICI', 'Hero', 2),
  f('hero_body', 'Page Introduction', T.TEXTAREA, 'Applying to ICI is meant to be human, not bureaucratic. There is no entrance exam and no long wait. We want to understand where you are, what you want to build, and which level will get you there, then help you take the next step with confidence. Here is exactly how it works.', 'Hero', 3),
  f('how_to_apply_heading', 'How to Apply Heading', T.TEXT, 'How to apply', 'How to Apply', 10),
  f('apply_step_1', 'Step 1', T.TEXTAREA, 'Choose your level, or speak to an advisor if you are unsure.', 'How to Apply', 11),
  f('apply_step_2', 'Step 2', T.TEXTAREA, 'Submit a short application. It takes a few minutes and costs nothing.', 'How to Apply', 12),
  f('apply_step_3', 'Step 3', T.TEXTAREA, 'Speak with an advisor to confirm the right fit and answer your questions.', 'How to Apply', 13),
  f('apply_step_4', 'Step 4', T.TEXTAREA, 'Confirm your place and complete enrolment, in full or by instalments.', 'How to Apply', 14),
  f('apply_step_5', 'Step 5', T.TEXTAREA, 'Get matched with your coach and begin.', 'How to Apply', 15),
  f('entry_requirements_heading', 'Entry Requirements Heading', T.TEXT, 'Entry requirements', 'Entry Requirements', 20),
  f('entry_requirements_body', 'Entry Requirements Content', T.TEXTAREA, 'Catalyst is open to anyone serious about learning to coach, with no prior qualification required. Higher levels require the level below or equivalent experience, which we confirm with you.', 'Entry Requirements', 21),
  f('assessment_heading', 'Assessment Section Heading', T.TEXT, 'Free assessment: which level is right for me?', 'Assessment', 30),
  f('assessment_body', 'Assessment Section Body', T.TEXTAREA, 'Not sure whether to start at Catalyst or higher? Our short, free assessment asks about your experience and goals and points you to the right starting place. No email wall, no pressure.', 'Assessment', 31),
  f('assessment_link_text', 'Assessment Link Text', T.TEXT, 'Not sure where to start? Speak to an advisor', 'Assessment', 32),
  f('assessment_link_url', 'Assessment Link URL', T.URL, '/admissions/contact', 'Assessment', 33),
  f('tuition_heading', 'Tuition Section Heading', T.TEXT, 'Tuition and pricing', 'Tuition', 40),
  f('tuition_body', 'Tuition Section Body', T.TEXTAREA, 'Every price is complete and set out plainly on our Pricing page, with instalment options available.', 'Tuition', 41),
  f('tuition_link_text', 'Tuition Link Text', T.TEXT, 'See pricing', 'Tuition', 42),
  f('tuition_link_url', 'Tuition Link URL', T.URL, '/pricing', 'Tuition', 43),
  f('faq_heading', 'FAQ Heading', T.TEXT, 'Frequently asked questions', 'FAQ', 50),
  f('faq_1_question', 'FAQ 1 Question', T.TEXT, 'Is the training live or self-paced?', 'FAQ', 51),
  f('faq_1_answer', 'FAQ 1 Answer', T.TEXTAREA, 'Live and one-to-one. You are coached individually in real time, with guided self-work between sessions. This is how coaching skill is actually built.', 'FAQ', 52),
  f('faq_2_question', 'FAQ 2 Question', T.TEXT, 'How long does it take?', 'FAQ', 53),
  f('faq_2_answer', 'FAQ 2 Answer', T.TEXTAREA, 'It depends on the level, from around three months for Catalyst to up to a year for Luminary. You will have a clear schedule before you enrol.', 'FAQ', 54),
  f('faq_3_question', 'FAQ 3 Question', T.TEXT, 'Can my organisation train a team?', 'FAQ', 55),
  f('faq_3_answer', 'FAQ 3 Answer', T.TEXTAREA, 'Yes. Speak to us about organisational and team training.', 'FAQ', 56),
  f('faq_4_question', 'FAQ 4 Question', T.TEXT, 'What are the entry requirements?', 'FAQ', 57),
  f('faq_4_answer', 'FAQ 4 Answer', T.TEXTAREA, 'Our foundation level, Catalyst, is open to anyone committed to learning to coach. The advanced levels (Architect, Sage, Luminary) require prior certification or equivalent experience, which we will discuss during your admissions conversation.', 'FAQ', 58),
  f('faq_5_question', 'FAQ 5 Question', T.TEXT, 'Is there an interview process?', 'FAQ', 59),
  f('faq_5_answer', 'FAQ 5 Answer', T.TEXTAREA, 'Yes. Before your enrolment is finalised, you will have a brief, informal conversation with an advisor. This is simply to ensure the pathway is the right fit for your goals and to answer any questions you have.', 'FAQ', 60),
  f('faq_6_question', 'FAQ 6 Question', T.TEXT, 'When can I start my training?', 'FAQ', 61),
  f('faq_6_answer', 'FAQ 6 Answer', T.TEXTAREA, 'Because our coaching is strictly one-to-one, we do not run fixed cohorts or intake dates. You can apply at any time, and you will typically begin your sessions within 7 working days of your enrolment being confirmed.', 'FAQ', 62),
  f('cta_button_1_text', 'CTA Button 1', T.TEXT, 'Start your application', 'CTA', 70),
  f('cta_button_1_link', 'CTA Button 1 Link', T.URL, '/apply', 'CTA', 71),
  f('cta_button_2_text', 'CTA Button 2', T.TEXT, 'Speak to an Advisor', 'CTA', 72),
  f('cta_button_2_link', 'CTA Button 2 Link', T.URL, '/admissions/contact', 'CTA', 73),
  codeField(999),
]);

const STATIC_PAGES: SeedPage[] = [
  page('/admissions/contact', 'Speak to an Advisor', 'Admissions advisor contact page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Not sure? Talk it through', 'Hero', 1),
    f('hero_subheading', 'Page Subheading', T.TEXTAREA, 'Choosing how to train as a coach is a real decision, and sometimes you simply want to talk it through with someone who knows. That is what our advisors are for. Ask anything: about levels, timing, cost, or whether coaching is right for you at all. No script, no pressure.', 'Hero', 2),
    f('advisor_name', 'Advisor Name', T.TEXT, 'ICI Admissions Team', 'Advisor', 10),
    f('advisor_title', 'Advisor Title', T.TEXT, 'Coaching Advisor', 'Advisor', 11),
    f('advisor_image', 'Advisor Photo', T.IMAGE, '', 'Advisor', 12),
    f('advisor_bio', 'Advisor Bio', T.RICHTEXT, '<p>Our advisors are experienced coaches who know the pathway inside out and will give you an honest conversation, not a sales pitch.</p>', 'Advisor', 13),
    f('booking_heading', 'Booking Section Heading', T.TEXT, 'Book a conversation', 'Booking', 20),
    f('booking_body', 'Booking Description', T.TEXTAREA, 'Tell us a little about yourself and we will arrange a call at a time that suits you.', 'Booking', 21),
    codeField(999),
  ]),
  page('/apply', 'Apply', 'Application page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Take the first step', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you.</p>', 'Hero', 2),
    f('trust_point_1', 'Trust Point 1', T.TEXT, 'Free application, no obligation', 'Trust Points', 10),
    f('trust_point_2', 'Trust Point 2', T.TEXT, 'Advisor call within 2 working days', 'Trust Points', 11),
    f('trust_point_3', 'Trust Point 3', T.TEXT, 'Begin within 7 days of enrolment', 'Trust Points', 12),
    f('success_heading', 'Success Heading', T.TEXT, 'Application received', 'Success', 20, 'Shown after form submission'),
    f('success_body', 'Success Message', T.TEXTAREA, 'Thank you for applying. We will review your application and be in touch within 2 working days.', 'Success', 21),
    codeField(999),
  ]),
  page('/contact', 'Contact', 'Contact page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Talk to a human', 'Hero', 1),
    f('hero_subheading', 'Page Subheading', T.TEXTAREA, 'Whatever brought you here, there is a person at ICI happy to help. Ask about programmes, credentials, timing, cost, or training a team. No script and no pressure, just a straight conversation.', 'Hero', 2),
    f('email_display', 'Contact Email', T.EMAIL, 'info@internationalcoachinginstitute.org', 'Contact Details', 10),
    f('phone_display', 'Contact Phone', T.PHONE, '+91 98199 84575', 'Contact Details', 11),
    f('address_line_1', 'Address Line 1', T.TEXT, 'Registered office: Mumbai – 400051', 'Contact Details', 12),
    f('address_line_2', 'Address Line 2', T.TEXT, 'India', 'Contact Details', 13),
    f('form_heading', 'Form Heading', T.TEXT, 'Send us a message', 'Form', 20),
    f('form_subheading', 'Form Subheading', T.TEXTAREA, 'We aim to respond within 1–2 business days.', 'Form', 21),
    f('form_success_message', 'Form Success Message', T.TEXT, 'Thank you. We will be in touch shortly.', 'Form', 22),
    codeField(999),
  ]),
  page('/faculty', 'Faculty', 'Faculty and research page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Taught by people who still do the work', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers, people who carry real client work into the room with them.</p>', 'Hero', 2),
    f('faculty_section_heading', 'Faculty Section Heading', T.TEXT, 'Our faculty', 'Faculty', 10),
    f('faculty_section_body', 'Faculty Section Intro', T.RICHTEXT, '<p>ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour. Many continue to coach senior leaders while they teach.</p>', 'Faculty', 11),
    f('cta_heading', 'CTA Heading', T.TEXT, 'Ready to learn from the best?', 'CTA', 20),
    f('cta_button_text', 'CTA Button Text', T.TEXT, 'Explore programmes', 'CTA', 21),
    f('cta_button_link', 'CTA Button Link', T.URL, '/programmes', 'CTA', 22),
    codeField(999),
  ]),
  page('/about/global', 'Global Network', 'About global network page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Online, and genuinely global', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>We do not measure our reach in buildings. Because every programme is delivered online and one-to-one, ICI trains coaches wherever they are, across many countries and time zones, without asking anyone to pause their life or relocate.</p>', 'Hero', 2),
    f('stat_1_number', 'Stat 1 Number', T.NUMBER, '60', 'Stats', 10),
    f('stat_1_suffix', 'Stat 1 Suffix', T.TEXT, '+', 'Stats', 11),
    f('stat_1_label', 'Stat 1 Label', T.TEXT, 'Countries', 'Stats', 12),
    f('stat_2_number', 'Stat 2 Number', T.NUMBER, '1000', 'Stats', 13),
    f('stat_2_suffix', 'Stat 2 Suffix', T.TEXT, '+', 'Stats', 14),
    f('stat_2_label', 'Stat 2 Label', T.TEXT, 'Coaches', 'Stats', 15),
    f('stat_3_number', 'Stat 3 Number', T.NUMBER, '100', 'Stats', 16),
    f('stat_3_suffix', 'Stat 3 Suffix', T.TEXT, '%', 'Stats', 17),
    f('stat_3_label', 'Stat 3 Label', T.TEXT, 'Online & One-to-One', 'Stats', 18),
    f('how_it_works_heading', 'How It Works Heading', T.TEXT, 'How global delivery works', 'How It Works', 20),
    f('step_1_heading', 'Step 1 Heading', T.TEXT, 'Your Time Zone', 'How It Works', 21),
    f('step_1_body', 'Step 1 Description', T.TEXTAREA, 'Live, one-to-one sessions scheduled around your time zone', 'How It Works', 22),
    f('step_2_heading', 'Step 2 Heading', T.TEXT, 'Global Faculty', 'How It Works', 23),
    f('step_2_body', 'Step 2 Description', T.TEXTAREA, 'Coaches and faculty drawn from multiple countries', 'How It Works', 24),
    f('step_3_heading', 'Step 3 Heading', T.TEXT, 'One Network', 'How It Works', 25),
    f('step_3_body', 'Step 3 Description', T.TEXTAREA, 'A single global community rather than separate regional ones', 'How It Works', 26),
    f('step_4_heading', 'Step 4 Heading', T.TEXT, 'Universal Standard', 'How It Works', 27),
    f('step_4_body', 'Step 4 Description', T.TEXTAREA, 'The same standard and credential wherever you are based', 'How It Works', 28),
    f('where_coaches_are_heading', 'Where Coaches Are Heading', T.TEXT, 'Where our coaches are', 'Map', 30),
    f('where_coaches_are_body', 'Where Coaches Are Body', T.TEXTAREA, 'Our coaches train from 60+ countries and counting.', 'Map', 31),
    f('cta_link_1_text', 'CTA Link 1', T.TEXT, 'Explore programmes', 'CTA', 40),
    f('cta_link_1_url', 'CTA Link 1 URL', T.URL, '/programmes', 'CTA', 41),
    f('cta_link_2_text', 'CTA Link 2', T.TEXT, 'Speak to an advisor', 'CTA', 42),
    f('cta_link_2_url', 'CTA Link 2 URL', T.URL, '/admissions/contact', 'CTA', 43),
    codeField(999),
  ]),
  page('/about/accreditation', 'Accreditation', 'About accreditation page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Standards you can stand behind', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>A credential is only worth what it can be trusted to mean. This page sets out how ICI holds its standard, the bodies it works with, and the recognition behind its credentials, stated plainly and only where it is genuinely earned.</p>', 'Hero', 2),
    f('accreditation_1_name', 'Accreditation 1 Name', T.TEXT, 'ICF', 'Accreditations', 10),
    f('accreditation_1_description', 'Accreditation 1 Description', T.RICHTEXT, '<p>International Coaching Federation — aligned to international coaching competency standards.</p>', 'Accreditations', 11),
    f('accreditation_2_name', 'Accreditation 2 Name', T.TEXT, 'EMCC', 'Accreditations', 12),
    f('accreditation_2_description', 'Accreditation 2 Description', T.RICHTEXT, '<p>European Mentoring and Coaching Council — global standard for coaching excellence.</p>', 'Accreditations', 13),
    f('accreditation_3_name', 'Accreditation 3 Name', T.TEXT, 'AC', 'Accreditations', 14),
    f('accreditation_3_description', 'Accreditation 3 Description', T.RICHTEXT, '<p>Association for Coaching — professional body for coaches worldwide.</p>', 'Accreditations', 15),
    f('accreditation_4_name', 'Accreditation 4 Name', T.TEXT, 'CCE', 'Accreditations', 16),
    f('accreditation_4_description', 'Accreditation 4 Description', T.RICHTEXT, '<p>Center for Credentialing & Education — approved provider status.</p>', 'Accreditations', 17),
    f('accreditation_5_name', 'Accreditation 5 Name', T.TEXT, 'ISO 9001:2015', 'Accreditations', 18),
    f('accreditation_5_description', 'Accreditation 5 Description', T.RICHTEXT, '<p>Quality management system certification for our training operations.</p>', 'Accreditations', 19),
    codeField(999),
  ]),
  page('/about/mission', 'Mission', 'About mission page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Mission, vision and values', 'Hero', 1),
    f('hero_body', 'Mission Statement', T.RICHTEXT, '<p>To raise the standard of coaching by training and certifying coaches who combine genuine skill with genuine self-awareness.</p>', 'Hero', 2),
    f('section_1_heading', 'Section 1 Heading', T.TEXT, 'Our vision', 'Content', 10),
    f('section_1_body', 'Section 1 Content', T.RICHTEXT, '<p>A world where good coaching is widely available and widely trusted, and where leaders are measured by how well they help others grow.</p>', 'Content', 11),
    f('section_2_heading', 'Section 2 Heading', T.TEXT, 'What we value', 'Content', 12),
    f('section_2_body', 'Section 2 Content', T.RICHTEXT, '<ul><li><strong>Depth over performance.</strong> We prize real understanding of people over polished technique.</li><li><strong>Evidence with humanity.</strong> We teach what the science supports, in language that respects the person in front of you.</li><li><strong>Practice, not theory.</strong> Every concept is tied to what happens in a real session.</li><li><strong>Self-mastery first.</strong> A coach can only take a client as far as they have gone themselves.</li></ul>', 'Content', 13),
    codeField(999),
  ]),
  page('/community', 'Community', 'ICI community page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'You will not be coaching alone', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Coaching can be quietly isolating. You hold other people\'s struggles all day, then close the call and sit with them by yourself. The ICI community exists so that you do not have to.</p>', 'Hero', 2),
    f('what_we_offer_heading', 'What Community Offers Heading', T.TEXT, 'What the community offers', 'Offers', 10),
    f('offer_1_heading', 'Offer 1 Heading', T.TEXT, 'Peer supervision', 'Offers', 11),
    f('offer_1_body', 'Offer 1 Description', T.TEXTAREA, 'Reflective practice groups with coaches who understand the work.', 'Offers', 12),
    f('offer_2_heading', 'Offer 2 Heading', T.TEXT, 'Referral network', 'Offers', 13),
    f('offer_2_body', 'Offer 2 Description', T.TEXTAREA, 'A working network of coaches who refer clients to one another.', 'Offers', 14),
    f('offer_3_heading', 'Offer 3 Heading', T.TEXT, 'Continued learning', 'Offers', 15),
    f('offer_3_body', 'Offer 3 Description', T.TEXTAREA, 'Masterclasses, events and continued development throughout your career.', 'Offers', 16),
    f('cta_heading', 'CTA Heading', T.TEXT, 'Join the community', 'CTA', 20),
    f('cta_button_text', 'CTA Button Text', T.TEXT, 'Apply now', 'CTA', 21),
    f('cta_button_link', 'CTA Button Link', T.URL, '/apply', 'CTA', 22),
    codeField(999),
  ]),
  page('/future-students', 'Future Students', 'Information for future students', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Thinking about becoming a coach?', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>If you have ever been the person others come to, and wondered whether you could do it properly, this is where to start. Becoming a coach is a serious decision and a deeply rewarding one.</p>', 'Hero', 2),
    f('section_1_heading', 'Section 1 Heading', T.TEXT, 'Why choose ICI?', 'Content', 10),
    f('section_1_body', 'Section 1 Content', T.RICHTEXT, '<p>One-to-one training, real assessment on real coaching, and a credential that means something. Everything you need to begin a coaching career with confidence.</p>', 'Content', 11),
    f('cta_heading', 'CTA Heading', T.TEXT, 'Ready to begin?', 'CTA', 20),
    f('cta_button_text', 'CTA Button Text', T.TEXT, 'Start your application', 'CTA', 21),
    f('cta_button_link', 'CTA Button Link', T.URL, '/apply', 'CTA', 22),
    codeField(999),
  ]),
  page('/current-students', 'Current Students', 'Resources for enrolled students', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Welcome back', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>You are in the middle of the work, and this is your home base for it. Here you will find your schedule, your materials, your supervision and the people who can help.</p>', 'Hero', 2),
    f('portal_link_text', 'Student Portal Link Text', T.TEXT, 'Access your dashboard', 'Portal', 10),
    f('portal_link_url', 'Student Portal Link URL', T.URL, '/dashboard', 'Portal', 11),
    f('support_email', 'Support Email', T.EMAIL, 'info@internationalcoachinginstitute.org', 'Support', 20),
    f('support_phone', 'Support Phone', T.PHONE, '+91 98199 84575', 'Support', 21),
    codeField(999),
  ]),
  page('/organisations', 'Organisations', 'Corporate and organisational coaching', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Build a coaching culture, not just send people on a course', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Most leadership training is forgotten within a month because it teaches ideas, not habits. Coaching is different. When managers learn to coach, the change shows up in everyday conversations.</p>', 'Hero', 2),
    f('benefit_1_heading', 'Benefit 1 Heading', T.TEXT, 'Better leadership', 'Benefits', 10),
    f('benefit_1_body', 'Benefit 1 Description', T.TEXTAREA, 'Managers who coach create clearer feedback, real accountability and people who grow.', 'Benefits', 11),
    f('benefit_2_heading', 'Benefit 2 Heading', T.TEXT, 'Higher retention', 'Benefits', 12),
    f('benefit_2_body', 'Benefit 2 Description', T.TEXTAREA, 'People stay where they feel seen, supported and developed.', 'Benefits', 13),
    f('benefit_3_heading', 'Benefit 3 Heading', T.TEXT, 'Lasting culture change', 'Benefits', 14),
    f('benefit_3_body', 'Benefit 3 Description', T.TEXTAREA, 'Build coaching capability from the inside, so your organisation owns it.', 'Benefits', 15),
    f('cta_heading', 'CTA Heading', T.TEXT, 'Contact our corporate team', 'CTA', 20),
    f('cta_button_text', 'CTA Button Text', T.TEXT, 'Enquire now', 'CTA', 21),
    f('cta_button_link', 'CTA Button Link', T.URL, '/contact', 'CTA', 22),
    codeField(999),
  ]),
  page('/alumni', 'Alumni', 'Alumni network page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Once an ICI coach, always part of ICI', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>The credential was a milestone, not an exit. Our alumni stay connected for supervision, referrals, continued learning and the company of people who understand the work.</p>', 'Hero', 2),
    f('stat_1_number', 'Stat 1 Number', T.TEXT, '25,000+', 'Stats', 10),
    f('stat_1_label', 'Stat 1 Label', T.TEXT, 'Graduates worldwide', 'Stats', 11),
    f('stat_2_number', 'Stat 2 Number', T.TEXT, '60+', 'Stats', 12),
    f('stat_2_label', 'Stat 2 Label', T.TEXT, 'Countries', 'Stats', 13),
    f('cta_heading', 'CTA Heading', T.TEXT, 'Stay connected', 'CTA', 20),
    f('cta_button_text', 'CTA Button Text', T.TEXT, 'Log in to your account', 'CTA', 21),
    f('cta_button_link', 'CTA Button Link', T.URL, '/login', 'CTA', 22),
    codeField(999),
  ]),
  page('/faculty-staff', 'Faculty & Staff', 'Internal faculty and staff portal', [
    f('hero_heading', 'Page Heading', T.TEXT, 'For the people who make ICI work', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Teaching coaching well is demanding, and so is running the institute behind it. This area gives faculty and staff quick access to what they need.</p>', 'Hero', 2),
    f('portal_link_text', 'Portal Link Text', T.TEXT, 'Staff login', 'Portal', 10),
    f('portal_link_url', 'Portal Link URL', T.URL, '/admin', 'Portal', 11),
    f('contact_email', 'Contact Email', T.EMAIL, 'info@internationalcoachinginstitute.org', 'Contact', 20),
    codeField(999),
  ]),
  page('/resources', 'Resources', 'Resources and downloads', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Thinking worth your time', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Good coaching rests on good thinking. Here we share articles, guides and tools on leadership, psychology, neuroscience and the real work of change.</p>', 'Hero', 2),
    f('resource_1_title', 'Resource 1 Title', T.TEXT, 'ICI Prospectus', 'Resources', 10),
    f('resource_1_description', 'Resource 1 Description', T.TEXTAREA, 'Everything in one place: the Mastery Pathway, specialisations, pricing and admissions.', 'Resources', 11),
    f('resource_1_link', 'Resource 1 Link', T.URL, '/prospectus', 'Resources', 12),
    f('resource_2_title', 'Resource 2 Title', T.TEXT, 'Blog & Insights', 'Resources', 13),
    f('resource_2_description', 'Resource 2 Description', T.TEXTAREA, 'Articles on coaching, leadership and the psychology of change.', 'Resources', 14),
    f('resource_2_link', 'Resource 2 Link', T.URL, '/blog', 'Resources', 15),
    f('brochure_download_link', 'Prospectus / Brochure Download Link', T.URL, '/resources/brochure', 'Resources', 16),
    codeField(999),
  ]),
  page('/events', 'Events', 'Events listing page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Where the community comes together', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Some things only happen when people gather, even online. ICI events bring together coaches, leaders and the people we teach for masterclasses, summits and live sessions that go deeper than any recording can.</p>', 'Hero', 2),
    codeField(999),
  ]),
  page('/find-a-coach', 'Find a Coach', 'Coach directory page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Find a coach you can trust', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Anyone can call themselves a coach. The coaches listed here have earned an ICI credential through real training, one-to-one, and assessment on real coaching, which means you can approach them with confidence.</p>', 'Hero', 2),
    codeField(999),
  ]),
  page('/terms', 'Terms of Service', 'Terms of service page', [
    f('page_heading', 'Page Heading', T.TEXT, 'Terms of Service', 'Content', 1),
    f('last_updated', 'Last Updated Date', T.TEXT, 'Last updated: 1 June 2026', 'Content', 2),
    f('content', 'Full Terms Content', T.RICHTEXT, TERMS_CONTENT_HTML, 'Content', 3),
    codeField(999),
  ]),
  page('/privacy', 'Privacy Policy', 'Privacy policy page', [
    f('page_heading', 'Page Heading', T.TEXT, 'Privacy Policy', 'Content', 1),
    f('last_updated', 'Last Updated Date', T.TEXT, 'Last updated: 1 June 2026', 'Content', 2),
    f('content', 'Full Privacy Policy Content', T.RICHTEXT, PRIVACY_CONTENT_HTML, 'Content', 3),
    codeField(999),
  ]),
  page('/complaints', 'Complaints', 'Complaints procedure page', [
    f('page_heading', 'Page Heading', T.TEXT, 'Complaints Procedure', 'Header', 1),
    f('page_body', 'Page Introduction', T.RICHTEXT, '<p>We take complaints seriously. If something has not met your expectations, here is how to raise it and what you can expect from us.</p>', 'Header', 2),
    f('contact_email', 'Complaints Email', T.EMAIL, 'complaints@internationalcoachinginstitute.org', 'Process', 10),
    f('process_step_1', 'Process Step 1', T.TEXTAREA, 'Submit your complaint via email to complaints@internationalcoachinginstitute.org with as much detail as possible.', 'Process', 11),
    f('process_step_2', 'Process Step 2', T.TEXTAREA, 'We will acknowledge receipt within 48 hours.', 'Process', 12),
    f('process_step_3', 'Process Step 3', T.TEXTAREA, 'A formal review will be conducted and a response provided within 14 days.', 'Process', 13),
    codeField(999),
  ]),

  // ── About section (additional pages) ──
  page('/about', 'About ICI', 'About the International Coaching Institute overview', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'About the Institute', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'Coaching education with a soul and a standard', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>The International Coaching Institute exists because the world has enough people with advice and too few who can truly help someone change. We train coaches to do the harder, quieter work: to listen well, to see clearly, and to hold the space where real change happens. Our standards are demanding on purpose, because the people our graduates serve deserve nothing less.</p>', 'Hero', 3),
    f('story_heading', 'Our Story Heading', T.TEXT, 'Our story', 'Our Story', 10),
    f('story_body', 'Our Story Content', T.RICHTEXT, '<p>ICI was created by a group of experienced coaches and educators who kept seeing the same gap. Plenty of coaching qualifications taught technique, but few taught the depth, self-awareness and rigour that distinguish a coach people trust. We built the institute to close that gap, with one unusual decision at its heart: we would teach coaching one-to-one, the way coaching itself is done, rather than herding people through a classroom.</p><p>Today we train coaches entirely online, one-to-one, for clients all over the world. Our graduates want more than a certificate. They want the judgement, the craft and the standing to do this work well.</p>', 'Our Story', 11),
    codeField(999),
  ]),
  page('/about/history', 'History & Heritage', 'ICI history and heritage page', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Our Story', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'History & Heritage', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>The International Coaching Institute is young, and we say so plainly. Our heritage is not measured in decades of our own, but in the far older traditions we draw upon and bring together.</p>', 'Hero', 3),
    f('paragraph_1', 'Paragraph 1', T.RICHTEXT, '<p>Coaching, at its best, sits at a meeting point. From the behavioural sciences, psychology and neuroscience, we inherit a clear understanding of how people actually change. From the world\'s contemplative and reflective traditions, we inherit something quieter and just as vital: the practice of self-mastery, and the conviction that no one can guide another further than they have travelled themselves.</p>', 'Content', 10),
    f('paragraph_2', 'Paragraph 2', T.RICHTEXT, '<p>We also inherit a way of teaching. Craft has always been passed from one person to another, closely and personally, and that is why we train one-to-one rather than in crowded rooms. It is the oldest method there is, and still the best.</p>', 'Content', 11),
    f('paragraph_3', 'Paragraph 3', T.RICHTEXT, '<p>So when we speak of heritage, we mean a lineage of ideas about human growth that long predates us, and which we are proud to carry forward with rigour and care.</p>', 'Content', 12),
    f('closing_heading', 'Closing Section Heading', T.TEXT, 'The Next Chapter', 'Content', 14),
    f('closing_body', 'Closing Paragraph', T.RICHTEXT, '<p>The institute\'s own history begins now. Every coach we train, and everyone they go on to help, adds to a history we are only beginning to write.</p>', 'Content', 15),
    codeField(999),
  ]),
  simpleHeroPage(
    '/about/leadership-faculty',
    'Leadership & Faculty',
    'Leadership and faculty overview',
    'Leadership & Faculty',
    '<p>ICI programmes are delivered live, online and one-to-one, by faculty who still coach. You practise from early on, receive supervision, and are assessed on real coaching, not multiple-choice tests. The blend of leadership thinking, applied psychology, neuroscience and reflective practice means you come to understand both the person in front of you and yourself.</p>',
    [
      f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'About ICI', 'Hero', 0),
      f('cta_heading', 'CTA Heading', T.TEXT, 'Meet our faculty', 'CTA', 20),
      f('cta_button_text', 'CTA Button Text', T.TEXT, 'View faculty', 'CTA', 21),
      f('cta_button_link', 'CTA Button Link', T.URL, '/faculty', 'CTA', 22),
    ],
  ),
  page('/about/press', 'Press & Media', 'Press and media enquiries', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Press & Media', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'Information for journalists and editors', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>For journalists, editors and event producers: ICI faculty speak and write on coaching, leadership, the inner life of high achievers, and how people actually change. We are glad to provide commentary, contributed articles and interviews on these themes.</p>', 'Hero', 3),
    f('media_email', 'Media Enquiries Email', T.EMAIL, 'info@internationalcoachinginstitute.org', 'Contact', 10),
    f('media_response_time', 'Response Time Note', T.TEXT, 'Media enquiries answered within 2 working days', 'Contact', 11),
    f('press_kit_heading', 'Press Kit Heading', T.TEXT, 'Press kit', 'Press Kit', 20),
    f('press_kit_body', 'Press Kit Description', T.RICHTEXT, '<p>Download our press kit: logo, brand guidelines, fact sheet and approved descriptions.</p>', 'Press Kit', 21),
    codeField(999),
  ]),
  page('/about/partnerships', 'Partnerships & Alliances', 'Partnerships and alliances page', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Collaborate with us', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'Partnerships & Alliances', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Good coaching does not happen in isolation, and neither does good coaching education. We work with organisations that share our standard: universities and colleges, professional bodies, employers building a coaching culture, and platforms that help good coaches reach the people who need them.</p>', 'Hero', 3),
    f('ways_heading', 'Ways We Work Heading', T.TEXT, 'Ways we work together', 'Content', 10),
    f('way_1', 'Way 1', T.TEXTAREA, 'Training and certifying coaches inside organisations', 'Content', 11),
    f('way_2', 'Way 2', T.TEXTAREA, 'Co-developing programmes with institutions and employers', 'Content', 12),
    f('way_3', 'Way 3', T.TEXTAREA, 'Referral and delivery alliances with aligned platforms', 'Content', 13),
    f('way_4', 'Way 4', T.TEXTAREA, 'Community and social-impact collaborations', 'Content', 14),
    f('cta_heading', 'CTA Heading', T.TEXT, 'Partner with ICI', 'CTA', 20),
    f('cta_button_text', 'CTA Button Text', T.TEXT, 'Get in touch', 'CTA', 21),
    f('cta_button_link', 'CTA Button Link', T.URL, '/contact', 'CTA', 22),
    codeField(999),
  ]),
  page('/about/annual-reports', 'Annual Reports', 'Annual reports and transparency', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Transparency', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'Annual Reports', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>We believe an institution that asks people to trust it should be willing to show its workings. As ICI completes each year, we will publish a report covering what we set out to do, what we achieved, and what we learned.</p>', 'Hero', 3),
    f('commitments_heading', 'Commitments Heading', T.TEXT, 'What we commit to reporting on', 'Content', 10),
    f('commitment_1', 'Commitment 1', T.TEXTAREA, 'Coaches trained and credentials awarded', 'Content', 11),
    f('commitment_2', 'Commitment 2', T.TEXTAREA, 'How we upheld our assessment standard', 'Content', 12),
    f('commitment_3', 'Commitment 3', T.TEXTAREA, 'Community, alumni and social-impact activity', 'Content', 13),
    f('commitment_4', 'Commitment 4', T.TEXTAREA, 'What worked, what did not, and what we are changing', 'Content', 14),
    codeField(999),
  ]),

  // ── Admissions, resources, blog ──
  page('/admissions/assessment', 'Free Assessment', 'Admissions assessment page', [
    f('hero_heading', 'Page Heading', T.TEXT, 'Free Admissions Assessment', 'Hero', 1),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Answer a few quick questions to discover which coaching credential level aligns with your experience and goals.</p>', 'Hero', 2),
    f('form_heading', 'Form Section Heading', T.TEXT, 'Find your level', 'Form', 10),
    codeField(999),
  ]),
  page('/prospectus', 'Prospectus', 'Request prospectus page', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Resources', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'Request Prospectus', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>If you would rather read at your own pace, the prospectus brings together the whole picture, from philosophy to practicalities, in a single document.</p>', 'Hero', 3),
    f('form_heading', 'Form Heading', T.TEXT, 'Download the ICI Prospectus', 'Form', 10),
    f('form_subheading', 'Form Subheading', T.TEXTAREA, 'Enter your email to receive an instant link to download our comprehensive guide to coaching credentials.', 'Form', 11),
    codeField(999),
  ]),
  page('/resources/brochure', 'Download Brochure', 'Prospectus / brochure download page', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Prospectus', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'Everything in one place', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>If you would rather read at your own pace, the prospectus brings together the whole picture: the Mastery Pathway and its four levels, the specialisations you can pursue, pricing, and how admissions work. Tell us where to send it and it is yours.</p>', 'Hero', 3),
    f('form_heading', 'Form Heading', T.TEXT, 'Request the prospectus', 'Form', 10),
    codeField(999),
  ]),
  page('/blog', 'Blog', 'Blog listing page hero content', [
    f('hero_eyebrow', 'Hero Eyebrow', T.TEXT, 'Journal', 'Hero', 1),
    f('hero_heading', 'Page Heading', T.TEXT, 'Insights from the field', 'Hero', 2),
    f('hero_body', 'Page Introduction', T.RICHTEXT, '<p>Coaching changes when practitioners keep questioning it. This is where ICI faculty share their thinking on leadership, psychology, and the craft of coaching itself.</p>', 'Hero', 3),
    codeField(999),
  ]),
];

function credentialFromDefaults(slug: string, title: string, d: CredentialDetailDefaults): SeedPage {
  return credentialPage(
    slug,
    title,
    {
      heroLabel: d.heroLabel,
      heroHeading: d.heroHeading,
      heroBody: d.heroBody,
      programmeHours: d.sidebarHours,
      programmeLevel: d.sidebarLevel.split('(')[1]?.replace(')', '') ?? '',
      overviewHeading: d.whoHeading,
      overviewBody: d.forWho.join('; '),
      learningPoints: d.learningPoints as CredentialPageData['learningPoints'],
      assessmentHeading: d.assessmentHeading,
      assessmentBody: d.assessmentBody,
      ctaHeading: '',
      ctaButtonText: d.ctaPrimaryText,
      ctaButtonLink: d.ctaPrimaryLink,
    },
    {
      forWho: d.forWho,
      entryRequirementsBody: d.entryRequirementsBody,
      formatIntro: d.formatIntro,
      formatItems: d.formatItems,
      syllabusIntro: d.syllabusIntro,
      modules: d.modules,
      graduateItems: d.graduateItems,
      sidebarLevel: d.sidebarLevel,
      sidebarFormat: d.sidebarFormat,
      sidebarDuration: d.sidebarDuration,
      sidebarInvestment: d.sidebarInvestment,
      advisorLinkText: d.ctaSecondaryText,
      advisorLinkUrl: d.ctaSecondaryLink,
    },
  );
}

const CREDENTIAL_DETAIL_PAGES: SeedPage[] = [
  credentialFromDefaults('/credentials/catalyst', 'Credentials: Catalyst', CATALYST_CREDENTIAL),
  credentialFromDefaults('/credentials/architect', 'Credentials: Architect', ARCHITECT_CREDENTIAL),
  credentialFromDefaults('/credentials/sage', 'Credentials: Sage', SAGE_CREDENTIAL),
  credentialFromDefaults('/credentials/luminary', 'Credentials: Luminary', LUMINARY_CREDENTIAL),
];

const PROGRAMME_DETAIL_PAGES: SeedPage[] = [
  programmePage('/programmes/certified-life-coach', 'Programme: Certified Life Coach', CERTIFIED_LIFE_COACH),
  programmePage('/programmes/executive-coaching', 'Programme: Executive Coaching', EXECUTIVE_COACHING),
  programmePage('/programmes/business-coach', 'Programme: Business Coaching', BUSINESS_COACH),
  programmePage('/programmes/health-wellness', 'Programme: Health & Wellness Coaching', HEALTH_WELLNESS),
  programmePage('/programmes/team-coaching', 'Programme: Team & Organisational Coaching', TEAM_COACHING),
];

export const SEED_PAGES: SeedPage[] = [
  HOME_PAGE,
  GLOBAL_PAGE,
  PROGRAMMES_PAGE,
  CREDENTIALS_PAGE,
  PRICING_PAGE,
  ADMISSIONS_PAGE,
  ...STATIC_PAGES,
  ...CREDENTIAL_DETAIL_PAGES,
  ...PROGRAMME_DETAIL_PAGES,
];
