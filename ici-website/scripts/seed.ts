import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  console.log('Starting seed process...');
  const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'ici_website',
  });

  try {
    // 1. Create Tables
    console.log('Creating tables...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_slug VARCHAR(100) NOT NULL,
        section_key VARCHAR(150) NOT NULL,
        content_type ENUM('text','richtext','image','url','boolean') DEFAULT 'text',
        content_value LONGTEXT,
        previous_value LONGTEXT,
        label VARCHAR(200),
        required TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_page_section (page_slug, section_key)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS navigation_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        label VARCHAR(100) NOT NULL,
        url VARCHAR(255) NOT NULL,
        parent_id INT DEFAULT NULL,
        sort_order INT DEFAULT 0,
        nav_position ENUM('primary','footer','utility','footer_col1','footer_col2','footer_col3') DEFAULT 'primary',
        is_active TINYINT DEFAULT 1
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quote TEXT NOT NULL,
        author_name VARCHAR(150),
        author_role VARCHAR(255),
        author_location VARCHAR(150),
        author_image VARCHAR(500),
        credential VARCHAR(50),
        is_active TINYINT DEFAULT 1,
        sort_order INT DEFAULT 0
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        role VARCHAR(200),
        bio TEXT,
        photo VARCHAR(500),
        expertise TEXT,
        is_active TINYINT DEFAULT 1,
        sort_order INT DEFAULT 0
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        event_date DATE,
        event_time TIME,
        format ENUM('online','in-person','hybrid') DEFAULT 'online',
        location VARCHAR(255),
        description TEXT,
        register_url VARCHAR(500),
        is_active TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        body LONGTEXT,
        cover_image VARCHAR(500),
        author_id INT,
        is_published TINYINT DEFAULT 0,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        source_page VARCHAR(100),
        name VARCHAR(150),
        email VARCHAR(255),
        phone VARCHAR(50),
        country VARCHAR(100),
        programme_interest VARCHAR(100),
        level_interest VARCHAR(100),
        message TEXT,
        how_heard VARCHAR(150),
        is_contacted TINYINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS announcement_bar (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message TEXT NOT NULL,
        is_active TINYINT DEFAULT 1,
        sort_order INT DEFAULT 0,
        expires_at DATE DEFAULT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT,
        order_id VARCHAR(255) UNIQUE NOT NULL,
        payment_id VARCHAR(255),
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'INR',
        status ENUM('created','authorized','captured','failed','refunded') DEFAULT 'created',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id)
      );
    `);

    // 2. Admin User
    console.log('Seeding admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@internationalcoachinginstitute.org';
    const adminPassHash = process.env.ADMIN_PASSWORD_HASH || await bcrypt.hash('admin123', 10);
    
    await pool.query(
      `INSERT IGNORE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)`,
      [adminEmail, adminPassHash, 'Admin']
    );

    // 3. Site Content
    console.log('Seeding site content...');
    const contentToSeed = [
      // Global
      { p: 'global', k: 'site_name', v: 'International Coaching Institute' },
      { p: 'global', k: 'brand_tagline', v: 'Become the coach people trust' },
      { p: 'global', k: 'phone', v: '(+91) 98199 84575' },
      { p: 'global', k: 'email', v: 'info@internationalcoachinginstitute.org' },
      { p: 'global', k: 'registered_office', v: 'Mumbai – 400051' },
      { p: 'global', k: 'footer_brand_description', v: 'The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.' },
      { p: 'global', k: 'copyright_year', v: '2026' },
      
      // Home
      { p: 'home', k: 'hero_eyebrow', v: 'One-to-one, online coaching certification' },
      { p: 'home', k: 'hero_heading', v: 'Where great coaches are made.' },
      { p: 'home', k: 'hero_body', v: 'The International Coaching Institute trains and certifies coaches who want to do work that genuinely changes lives. Every programme is delivered one-to-one and online, blending rigorous coaching practice with leadership, psychology, neuroscience and human behaviour. Whether you are starting out or deepening an established practice, you will leave able to hold a room, read a person, and create lasting change. Become the coach people trust.' },
      { p: 'home', k: 'hero_btn_primary', v: 'Explore the Mastery Pathway', t: 'text' },
      { p: 'home', k: 'hero_btn_primary_url', v: '/credentials', t: 'url' },
      { p: 'home', k: 'hero_btn_secondary', v: 'Download Prospectus', t: 'text' },
      { p: 'home', k: 'hero_btn_secondary_url', v: '/resources/brochure', t: 'url' },
      { p: 'home', k: 'stat_1_value', v: '25,000+' },
      { p: 'home', k: 'stat_1_label', v: 'Coaches trained' },
      { p: 'home', k: 'stat_2_value', v: '60+' },
      { p: 'home', k: 'stat_2_label', v: 'Countries reached' },
      { p: 'home', k: 'stat_3_value', v: '4' },
      { p: 'home', k: 'stat_3_label', v: 'Credential levels' },
      { p: 'home', k: 'stat_4_value', v: '5' },
      { p: 'home', k: 'stat_4_label', v: 'Campuses' },
      { p: 'home', k: 'lead_form_heading', v: 'Start your coaching journey' },
      { p: 'home', k: 'lead_form_subtext', v: 'Free enquiry, no commitment. Tell us where you are and we will point you to the right level.' },
      { p: 'home', k: 'lead_form_btn', v: 'Get Started' },
      { p: 'home', k: 'recognition_heading', v: 'Recognised and trusted by' },
      { p: 'home', k: 'coaching_for_everyone_heading', v: 'Coaching for everyone' },
      { p: 'home', k: 'path1_title', v: 'Aspiring coaches' },
      { p: 'home', k: 'path1_body', v: 'Begin a new career on solid ground. Foundational certification and real one-to-one coaching, so you graduate ready to take your first paying clients.' },
      { p: 'home', k: 'path2_title', v: 'Experienced practitioners' },
      { p: 'home', k: 'path2_body', v: 'Deepen a practice that already works. Advanced credentialing and supervision that sharpen your judgement and raise your standing.' },
      { p: 'home', k: 'path3_title', v: 'Organisations and leaders' },
      { p: 'home', k: 'path3_body', v: 'Build a coaching culture from the inside, so feedback, accountability and growth become part of how your people work.' },
      { p: 'home', k: 'credential_eyebrow', v: 'The ICI Mastery Pathway' },
      { p: 'home', k: 'credential_heading', v: 'Your path to mastery' },
      { p: 'home', k: 'credential_subtext', v: 'Four progressive levels, each a credential you carry for life, taught one-to-one and online.' },
      { p: 'home', k: 'cred_catalyst_title', v: 'Catalyst' },
      { p: 'home', k: 'cred_catalyst_body', v: 'Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.' },
      { p: 'home', k: 'cred_architect_title', v: 'Architect' },
      { p: 'home', k: 'cred_architect_body', v: 'Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.' },
      { p: 'home', k: 'cred_sage_title', v: 'Sage' },
      { p: 'home', k: 'cred_sage_body', v: 'Senior. You coach with depth, range and presence, and work with the most complex clients. 90 hours, one-to-one.' },
      { p: 'home', k: 'cred_luminary_title', v: 'Luminary' },
      { p: 'home', k: 'cred_luminary_body', v: 'The institute\'s highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.' },
      { p: 'home', k: 'diff_heading', v: 'The ICI difference' },
      { p: 'home', k: 'diff_1_title', v: 'A curriculum built on evidence' },
      { p: 'home', k: 'diff_1_body', v: 'Our training draws on coaching psychology, neuroscience and behavioural science, taught in plain language and tied to what happens in a real session. You learn why an intervention works, not just the script.' },
      { p: 'home', k: 'diff_2_title', v: 'One-to-one, never one-to-many' },
      { p: 'home', k: 'diff_2_body', v: 'You are coached and developed individually, so nothing is glossed over and no one hides at the back of a room. It is the heart of how we work.' },
      { p: 'home', k: 'diff_3_title', v: 'Faculty who still practise' },
      { p: 'home', k: 'diff_3_body', v: 'You learn from experienced coaches who work with senior leaders across major organisations, so the teaching reflects real client work rather than theory at a distance.' },
      { p: 'home', k: 'featured_programmes_heading', v: 'Featured specialisations' },
      { p: 'home', k: 'graduates_heading', v: 'Hear from our graduates' },
      { p: 'home', k: 'global_network_heading', v: 'Connecting coaches worldwide' },
      { p: 'home', k: 'global_network_body', v: 'Because the whole pathway is online, our coaches come from many countries and one community. Connect, learn and grow alongside people who take the craft as seriously as you do.' },
      { p: 'home', k: 'global_stat_1', v: '60+ countries' },
      { p: 'home', k: 'global_stat_2', v: '25,000+ Alumni' },
      { p: 'home', k: 'global_stat_3', v: '5 Campuses' },
      { p: 'home', k: 'global_stat_4', v: '200+ Partners' },
      { p: 'home', k: 'global_campuses', v: 'New York . London . Dubai . Singapore . Mumbai' },
      { p: 'home', k: 'news_heading', v: 'News and events' },
      { p: 'home', k: 'cta_heading', v: 'Ready to do work that changes lives?' },
      { p: 'home', k: 'cta_body', v: 'Take the first step towards a coaching career that means something. Enrolment for the next cohort is open now.' },
      { p: 'home', k: 'cta_btn_primary', v: 'Start your application', t: 'text' },
      { p: 'home', k: 'cta_btn_primary_url', v: '/apply', t: 'url' },
      { p: 'home', k: 'cta_btn_secondary', v: 'Speak to an advisor', t: 'text' },
      { p: 'home', k: 'cta_btn_secondary_url', v: '/admissions/contact', t: 'url' },
      
      // About ICI Overview
      { p: 'about', k: 'hero_heading', v: 'Coaching education with a soul and a standard' },
      { p: 'about', k: 'hero_body', v: 'The International Coaching Institute exists because the world has enough people with advice and too few who can truly help someone change. We train coaches to do the harder, quieter work: to listen well, to see clearly, and to hold the space where real change happens. Our standards are demanding on purpose, because the people our graduates serve deserve nothing less.' },
      { p: 'about', k: 'our_story_heading', v: 'Our story' },
      { p: 'about', k: 'our_story_body', v: 'ICI was created by a group of experienced coaches and educators who kept seeing the same gap. Plenty of coaching qualifications taught technique, but few taught the depth, self-awareness and rigour that distinguish a coach people trust. We built the institute to close that gap, with one unusual decision at its heart: we would teach coaching one-to-one, the way coaching itself is done, rather than herding people through a classroom.\n\nToday we train coaches entirely online, one-to-one, for clients all over the world. Our graduates want more than a certificate. They want the judgement, the craft and the standing to do this work well.' },
      
      // About Mission
      { p: 'about-mission', k: 'heading', v: 'Mission, vision and values' },
      { p: 'about-mission', k: 'mission_title', v: 'Our mission' },
      { p: 'about-mission', k: 'mission_body', v: 'To raise the standard of coaching by training and certifying coaches who combine genuine skill with genuine self-awareness.' },
      { p: 'about-mission', k: 'vision_title', v: 'Our vision' },
      { p: 'about-mission', k: 'vision_body', v: 'A world where good coaching is widely available and widely trusted, and where leaders are measured by how well they help others grow.' },
      { p: 'about-mission', k: 'values_title', v: 'What we value' },
      { p: 'about-mission', k: 'value_1', v: 'Depth over performance. We prize real understanding of people over polished technique.' },
      { p: 'about-mission', k: 'value_2', v: 'Evidence with humanity. We teach what the science supports, in language that respects the person in front of you.' },
      { p: 'about-mission', k: 'value_3', v: 'Practice, not theory. Every concept is tied to what happens in a real session.' },
      { p: 'about-mission', k: 'value_4', v: 'Self-mastery first. A coach can only take a client as far as they have gone themselves.' },
      
      // About History
      { p: 'about-history', k: 'heading', v: 'History & Heritage' },
      { p: 'about-history', k: 'body', v: 'The International Coaching Institute is young, and we say so plainly. Our heritage is not measured in decades of our own, but in the far older traditions we draw upon and bring together.\n\nCoaching, at its best, sits at a meeting point. From the behavioural sciences, psychology and neuroscience, we inherit a clear understanding of how people actually change. From the world\'s contemplative and reflective traditions, we inherit something quieter and just as vital: the practice of self-mastery, and the conviction that no one can guide another further than they have travelled themselves.\n\nWe also inherit a way of teaching. Craft has always been passed from one person to another, closely and personally, and that is why we train one-to-one rather than in crowded rooms. It is the oldest method there is, and still the best.\n\nSo when we speak of heritage, we mean a lineage of ideas about human growth that long predates us, and which we are proud to carry forward with rigour and care.\n\nThe institute\'s own history begins now. Every coach we train, and everyone they go on to help, adds to a history we are only beginning to write.' },

      // About Leadership
      { p: 'about-leadership-faculty', k: 'heading', v: 'Leadership & Faculty' },
      { p: 'about-leadership-faculty', k: 'body', v: 'ICI programmes are delivered live, online and one-to-one, by faculty who still coach. You practise from early on, receive supervision, and are assessed on real coaching, not multiple-choice tests. The blend of leadership thinking, applied psychology, neuroscience and reflective practice means you come to understand both the person in front of you and yourself.' },
      
      // About Global
      { p: 'about-global', k: 'hero_heading', v: 'Online, and genuinely global' },
      { p: 'about-global', k: 'hero_body', v: 'We do not measure our reach in buildings. Because every programme is delivered online and one-to-one, ICI trains coaches wherever they are, across many countries and time zones, without asking anyone to pause their life or relocate. Our campus is the community: a working network of coaches who refer, supervise and support one another long after they qualify.' },
      { p: 'about-global', k: 'how_it_works_heading', v: 'How global delivery works' },
      { p: 'about-global', k: 'how_it_works_1', v: 'Live, one-to-one sessions scheduled around your time zone' },
      { p: 'about-global', k: 'how_it_works_2', v: 'Coaches and faculty drawn from multiple countries' },
      { p: 'about-global', k: 'how_it_works_3', v: 'A single global community rather than separate regional ones' },
      { p: 'about-global', k: 'how_it_works_4', v: 'The same standard and credential wherever you are based' },
      { p: 'about-global', k: 'map_heading', v: 'Where our coaches are' },
      { p: 'about-global', k: 'map_body', v: 'Our coaches train from 60+ countries and counting.' },
      
      // About Accreditation
      { p: 'about-accreditation', k: 'heading', v: 'Standards you can stand behind' },
      { p: 'about-accreditation', k: 'body', v: 'A credential is only worth what it can be trusted to mean. This page sets out how ICI holds its standard, the bodies it works with, and the recognition behind its credentials, stated plainly and only where it is genuinely earned. We would rather say less and be believed than claim more and be doubted.' },
      { p: 'about-accreditation', k: 'standard_heading', v: 'How we hold our standard' },
      { p: 'about-accreditation', k: 'standard_1', v: 'Every level is assessed on real coaching, not attendance' },
      { p: 'about-accreditation', k: 'standard_2', v: 'Faculty are practising coaches held to a professional code' },
      { p: 'about-accreditation', k: 'standard_3', v: 'Curriculum aligned to international coaching competency standards' },
      { p: 'about-accreditation', k: 'standard_4', v: 'Independent review of our assessment process [confirm]' },

      // About Partnerships
      { p: 'about-partnerships', k: 'heading', v: 'Partnerships & Alliances' },
      { p: 'about-partnerships', k: 'body', v: 'Good coaching does not happen in isolation, and neither does good coaching education. We work with organisations that share our standard: universities and colleges, professional bodies, employers building a coaching culture, and platforms that help good coaches reach the people who need them.\n\nWe partner where it genuinely raises the quality or reach of coaching, and we decline where it would only add a logo.\n\nWays we work together:\n- Training and certifying coaches inside organisations\n- Co-developing programmes with institutions and employers\n- Referral and delivery alliances with aligned platforms\n- Community and social-impact collaborations\n\nIf your organisation develops people, or serves a community we could serve better together, we would like to hear from you.' },

      // About Press
      { p: 'about-press', k: 'heading', v: 'Press & Media' },
      { p: 'about-press', k: 'body', v: 'For journalists, editors and event producers: ICI faculty speak and write on coaching, leadership, the inner life of high achievers, and how people actually change. We are glad to provide commentary, contributed articles and interviews on these themes.\n\nHere you will find:\n- Media enquiries, answered within 2 working days, at info@internationalcoachinginstitute.org\n- A downloadable press kit: logo, brand guidelines, fact sheet and approved descriptions\n- The topics our faculty can speak to with authority\n\nFor an interview or expert comment, contact info@internationalcoachinginstitute.org' },

      // About Annual Reports
      { p: 'about-annual-reports', k: 'heading', v: 'Annual Reports' },
      { p: 'about-annual-reports', k: 'body', v: 'We believe an institution that asks people to trust it should be willing to show its workings. As ICI completes each year, we will publish a report covering what we set out to do, what we achieved, and what we learned.\n\nUntil this year is fully complete, this is what we commit to reporting on, openly and without spin:\n- Coaches trained and credentials awarded\n- How we upheld our assessment standard\n- Community, alumni and social-impact activity\n- What worked, what did not, and what we are changing' },

      // Programmes Index
      { p: 'programmes', k: 'heading', v: 'One pathway, many ways to serve' },
      { p: 'programmes', k: 'body', v: 'Everything we teach is built around the same promise: you will leave able to coach well, not just talk about coaching. The core of ICI is the Mastery Pathway, a four-level certification journey taught one-to-one and online. Within it, you can focus on the kind of coaching that calls you, from life and executive work to business, wellness and teams. Here is how the two fit together.' },
      { p: 'programmes', k: 'core_heading', v: 'The core — the ICI Mastery Pathway' },
      { p: 'programmes', k: 'core_body', v: 'Your certification is earned through four progressive levels. Each is a complete credential in its own right, and each builds on the one before.\n\n- Catalyst (Level 1): the foundation. Become a competent, confident coach.\n- Architect (Level 2): the professional. Build a thriving practice and work with complexity.\n- Sage (Level 3): the senior coach. Coach with depth, range and presence.\n- Luminary (Level 4): the highest distinction. Master the craft and develop others.' },
      { p: 'programmes', k: 'spec_heading', v: 'Specialisations — where you focus' },
      { p: 'programmes', k: 'spec_body', v: 'As you progress, you can shape your training around a specialism. These are not separate courses with separate fees; they are the focus you bring to your pathway, supported by faculty experienced in that area. Your investment follows the Pathway, set out on the Pricing page.\n\n- Life Coaching\n- Executive & Leadership Coaching\n- Business Coaching\n- Health & Wellness Coaching\n- Team & Organisational Coaching' },
      { p: 'programmes', k: 'how_heading', v: 'How our programmes work' },
      { p: 'programmes', k: 'how_1', v: 'One-to-one. You are coached and developed individually.' },
      { p: 'programmes', k: 'how_2', v: 'Online, worldwide. Train from any country, around your schedule.' },
      { p: 'programmes', k: 'how_3', v: 'Coaching hours plus real self-work. Live coaching paired with guided study.' },
      { p: 'programmes', k: 'how_4', v: 'Assessed on real coaching. Your credential reflects what you can actually do.' },

      // Specialisation: Life Coaching
      { p: 'prog-life', k: 'label', v: 'SPECIALISATION | LIFE COACHING' },
      { p: 'prog-life', k: 'heading', v: 'Life Coaching' },
      { p: 'prog-life', k: 'body', v: 'Life coaching done well is not advice with enthusiasm. It is the skilled, patient work of helping a person see themselves clearly and move towards the life they actually want. As a life coaching focus within the Mastery Pathway, this is where most coaches begin, learning the craft that everything else builds on.' },
      { p: 'prog-life', k: 'suits_heading', v: 'Who this suits' },
      { p: 'prog-life', k: 'suits_1', v: 'People starting a coaching career' },
      { p: 'prog-life', k: 'suits_2', v: 'Helpers, mentors and managers formalising their skills' },
      { p: 'prog-life', k: 'suits_3', v: 'Professionals moving towards more meaningful work' },
      { p: 'prog-life', k: 'learn_heading', v: 'What you will learn to do' },
      { p: 'prog-life', k: 'learn_1', v: 'Build trust and emotional safety quickly' },
      { p: 'prog-life', k: 'learn_2', v: 'Listen beneath the words and ask the question that matters' },
      { p: 'prog-life', k: 'learn_3', v: 'Work with limiting beliefs and self-sabotage with compassion' },
      { p: 'prog-life', k: 'learn_4', v: 'Set goals that hold and support change that lasts' },
      { p: 'prog-life', k: 'fits_heading', v: 'How it fits the Mastery Pathway' },
      { p: 'prog-life', k: 'fits_body', v: 'You can begin a life coaching focus at the Catalyst level and carry it through the Pathway. Your credential and investment follow the level you are working towards, not the specialism.' },
      
      // Specialisation: Executive Coaching
      { p: 'prog-exec', k: 'label', v: 'SPECIALISATION | EXECUTIVE & LEADERSHIP' },
      { p: 'prog-exec', k: 'heading', v: 'Executive & Leadership Coaching' },
      { p: 'prog-exec', k: 'body', v: 'Coaching a senior leader is a different discipline. The stakes are higher, the defences are subtler, and the room can feel lonely at the top. As an executive and leadership focus within the Pathway, this prepares you to coach leaders through pressure, difficult decisions and growth, grounded in how leaders actually think and behave.' },
      { p: 'prog-exec', k: 'suits_heading', v: 'Who this suits' },
      { p: 'prog-exec', k: 'suits_1', v: 'Coaches ready for senior and executive clients' },
      { p: 'prog-exec', k: 'suits_2', v: 'Experienced leaders and HR professionals moving into coaching' },
      { p: 'prog-exec', k: 'suits_3', v: 'Consultants adding credible coaching to their offer' },
      { p: 'prog-exec', k: 'learn_heading', v: 'What you will learn to do' },
      { p: 'prog-exec', k: 'learn_1', v: 'Coach for judgement, not just behaviour change' },
      { p: 'prog-exec', k: 'learn_2', v: 'Work with power, ego, fear and isolation at senior levels' },
      { p: 'prog-exec', k: 'learn_3', v: 'Coach through high-stakes decisions and organisational pressure' },
      { p: 'prog-exec', k: 'learn_4', v: 'Measure impact in terms an organisation respects' },
      { p: 'prog-exec', k: 'fits_heading', v: 'How it fits the Mastery Pathway' },
      { p: 'prog-exec', k: 'fits_body', v: 'An executive focus suits coaches at the Architect level and above, where you work with greater complexity. Your credential and investment follow the level.' },
      
      // Specialisation: Business Coaching
      { p: 'prog-bus', k: 'label', v: 'SPECIALISATION | BUSINESS COACHING' },
      { p: 'prog-bus', k: 'heading', v: 'Business Coaching' },
      { p: 'prog-bus', k: 'body', v: 'Founders rarely fail for lack of effort. They struggle because the business outgrows the way they lead it, and no one taught them to step back. Business coaching is the craft of helping owners work on the business and on themselves at once. As a focus within the Pathway, it equips you to coach for growth without losing sight of the human carrying it all.' },
      { p: 'prog-bus', k: 'suits_heading', v: 'Who this suits' },
      { p: 'prog-bus', k: 'suits_1', v: 'Coaches drawn to founders and business owners' },
      { p: 'prog-bus', k: 'suits_2', v: 'Consultants and advisers adding coaching' },
      { p: 'prog-bus', k: 'suits_3', v: 'Experienced operators moving into a coaching role' },
      { p: 'prog-bus', k: 'learn_heading', v: 'What you will learn to do' },
      { p: 'prog-bus', k: 'learn_1', v: 'Coach the owner and the business as one system' },
      { p: 'prog-bus', k: 'learn_2', v: 'Help clients move from doing to leading' },
      { p: 'prog-bus', k: 'learn_3', v: 'Work with growth, money, risk and the fear beneath them' },
      { p: 'prog-bus', k: 'learn_4', v: 'Build accountability that drives results without breaking people' },
      { p: 'prog-bus', k: 'fits_heading', v: 'How it fits the Mastery Pathway' },
      { p: 'prog-bus', k: 'fits_body', v: 'A business focus suits the Architect level and above. Your credential and investment follow the level you pursue.' },

      // Specialisation: Health & Wellness
      { p: 'prog-health', k: 'label', v: 'SPECIALISATION | HEALTH & WELLNESS' },
      { p: 'prog-health', k: 'heading', v: 'Health & Wellness Coaching' },
      { p: 'prog-health', k: 'body', v: 'Most people already know what they should do for their health. What they lack is not information but the ability to change, and to keep changing when motivation fades. Health and wellness coaching is the skill of supporting that change so it lasts. As a focus within the Pathway, it pairs behavioural science with the coaching craft.' },
      { p: 'prog-health', k: 'suits_heading', v: 'Who this suits' },
      { p: 'prog-health', k: 'suits_1', v: 'Coaches specialising in health, fitness and wellbeing' },
      { p: 'prog-health', k: 'suits_2', v: 'Health and fitness professionals adding coaching' },
      { p: 'prog-health', k: 'suits_3', v: 'Helpers supporting change in body and mind' },
      { p: 'prog-health', k: 'learn_heading', v: 'What you will learn to do' },
      { p: 'prog-health', k: 'learn_1', v: 'Apply the behavioural science of lasting habit change' },
      { p: 'prog-health', k: 'learn_2', v: 'Coach around stress, sleep, movement and the nervous system' },
      { p: 'prog-health', k: 'learn_3', v: 'Work with shame, relapse and the all-or-nothing trap' },
      { p: 'prog-health', k: 'learn_4', v: 'Hold scope and know when to refer to clinical care' },
      { p: 'prog-health', k: 'fits_heading', v: 'How it fits the Mastery Pathway' },
      { p: 'prog-health', k: 'fits_body', v: 'A wellness focus can begin at Catalyst and deepen through the Pathway. Your credential and investment follow the level.' },

      // Specialisation: Team Coaching
      { p: 'prog-team', k: 'label', v: 'SPECIALISATION | TEAM & ORGANISATIONAL' },
      { p: 'prog-team', k: 'heading', v: 'Team & Organisational Coaching' },
      { p: 'prog-team', k: 'body', v: 'Coaching one leader changes one leader. Building a coaching culture changes how a whole organisation works. As a focus within the Pathway, this prepares internal coaches, people leaders and managers to coach in the flow of work, so honest feedback and real accountability become normal rather than annual.' },
      { p: 'prog-team', k: 'suits_heading', v: 'Who this suits' },
      { p: 'prog-team', k: 'suits_1', v: 'Internal coaches and coaching champions' },
      { p: 'prog-team', k: 'suits_2', v: 'HR, learning and people leaders' },
      { p: 'prog-team', k: 'suits_3', v: 'Managers who want to lead through coaching' },
      { p: 'prog-team', k: 'learn_heading', v: 'What you will learn to do' },
      { p: 'prog-team', k: 'learn_1', v: 'Coach teams as living systems, not collections of individuals' },
      { p: 'prog-team', k: 'learn_2', v: 'Embed coaching habits into everyday management' },
      { p: 'prog-team', k: 'learn_3', v: 'Improve feedback, accountability and psychological safety' },
      { p: 'prog-team', k: 'learn_4', v: 'Measure the impact of a coaching culture' },
      { p: 'prog-team', k: 'fits_heading', v: 'How it fits the Mastery Pathway' },
      { p: 'prog-team', k: 'fits_body', v: 'A team focus suits the Architect level and above, and is often pursued by organisations training several people. Your credential and investment follow the level.' },
      
      // Credentials Index
      { p: 'credentials', k: 'hero_heading', v: 'The ICI Mastery Pathway' },
      { p: 'credentials', k: 'hero_body', v: 'Most coaching certificates are earned by sitting in a group and watching the clock. Ours are earned one-to-one, online, with a coach who works with you directly, hour by hour, until the skill is genuinely yours. The Mastery Pathway has four progressive levels, each a credential you carry for life. Wherever you are now, there is a clear next step and a coach to take it with you.' },
      { p: 'credentials', k: 'why_diff_heading', v: 'Why this pathway is different' },
      { p: 'credentials', k: 'why_1', v: 'One-to-one, not one-to-many. Nothing is glossed over and no one hides at the back of a room.' },
      { p: 'credentials', k: 'why_2', v: 'Online, wherever you are. Train from any country without pausing your life.' },
      { p: 'credentials', k: 'why_3', v: 'Coaching hours plus real self-work. Live coaching paired with substantial guided study.' },
      { p: 'credentials', k: 'why_4', v: 'A credential that means something. Each level is assessed on real coaching, not attendance.' },
      { p: 'credentials', k: 'four_levels_heading', v: 'The four levels' },
      
      // Catalyst Page details
      { p: 'cred-catalyst', k: 'label', v: 'LEVEL 1 | FOUNDATION' },
      { p: 'cred-catalyst', k: 'heading', v: 'Catalyst' },
      { p: 'cred-catalyst', k: 'credential', v: 'ICI Catalyst Coach, post-nominal ICI-C' },
      { p: 'cred-catalyst', k: 'body', v: 'A catalyst is what makes change happen in others without being consumed by it. That is the work of a coach, and it is where your career begins. Over 36 hours of one-to-one work, you stop being someone who gives good advice and become someone who can genuinely coach: present, trusted, and skilled enough to hold another person\'s growth. You are coached individually throughout, so the learning is shaped around you. You finish ready to take your first clients with confidence rather than hope.' },
      
      // Architect Page details
      { p: 'cred-architect', k: 'label', v: 'LEVEL 2 | PROFESSIONAL' },
      { p: 'cred-architect', k: 'heading', v: 'Architect' },
      { p: 'cred-architect', k: 'credential', v: 'ICI Architect Coach, post-nominal ICI-A' },
      { p: 'cred-architect', k: 'body', v: 'Competence gets you started. Becoming an architect makes you a professional. An architect does not just react to what appears; they design and build. Over 60 hours of one-to-one work with a senior coach, you learn to work with the harder parts of real practice, emotion, resistance and complexity, and to build a coaching practice that lasts. You leave able to take on clients other coaches refer elsewhere.' },
      
      // Sage Page details
      { p: 'cred-sage', k: 'label', v: 'LEVEL 3 | SENIOR' },
      { p: 'cred-sage', k: 'heading', v: 'Sage' },
      { p: 'cred-sage', k: 'credential', v: 'ICI Sage Coach, post-nominal ICI-S' },
      { p: 'cred-sage', k: 'body', v: 'A sage is not someone with all the answers, but someone whose presence helps others find their own. At this level, technique is no longer the point. Depth is. Over 90 hours of one-to-one work with a master coach, you move from doing coaching to being a coach: able to sit with the most complex clients, to work with power and the inner life, and to bring a presence that cannot be faked. This is the level that marks you out among your peers.' },
      
      // Luminary Page details
      { p: 'cred-luminary', k: 'label', v: 'LEVEL 4 | HIGHEST DISTINCTION' },
      { p: 'cred-luminary', k: 'heading', v: 'Luminary' },
      { p: 'cred-luminary', k: 'credential', v: 'ICI Luminary, post-nominal ICI-L' },
      { p: 'cred-luminary', k: 'body', v: 'A luminary does not only practise the craft; they light the way for others in it. This is the highest recognition ICI offers, and it is rare on purpose. Over 120 hours of one-to-one work with our most senior faculty, you define your own coaching model, contribute something original to the field, and learn to develop other coaches. A Luminary is not just an excellent coach but a steward of the craft. This is the work of a coaching career at its summit.' },

      // Admissions
      { p: 'admissions', k: 'heading', v: 'Joining ICI' },
      { p: 'admissions', k: 'body', v: 'Applying to ICI is meant to be human, not bureaucratic. There is no entrance exam and no long wait. We want to understand where you are, what you want to build, and which level will get you there, then help you take the next step with confidence. Here is exactly how it works.' },
      { p: 'admissions', k: 'how_heading', v: 'How to apply' },
      { p: 'admissions', k: 'how_1', v: 'Choose your level, or take the free assessment if you are unsure.' },
      { p: 'admissions', k: 'how_2', v: 'Submit a short application. It takes a few minutes and costs nothing.' },
      { p: 'admissions', k: 'how_3', v: 'Speak with an advisor to confirm the right fit and answer your questions.' },
      { p: 'admissions', k: 'how_4', v: 'Confirm your place and complete enrolment, in full or by instalments.' },
      { p: 'admissions', k: 'how_5', v: 'Get matched with your coach and begin.' },
      { p: 'admissions', k: 'entry_heading', v: 'Entry requirements' },
      { p: 'admissions', k: 'entry_body', v: 'Catalyst is open to anyone serious about learning to coach, with no prior qualification required. Higher levels require the level below or equivalent experience, which we confirm with you.' },
      
      // Speak to an Advisor
      { p: 'admissions-contact', k: 'heading', v: 'Not sure? Talk it through' },
      { p: 'admissions-contact', k: 'body', v: 'Choosing how to train as a coach is a real decision, and sometimes you simply want to talk it through with someone who knows. That is what our advisors are for. Ask anything: about levels, timing, cost, or whether coaching is right for you at all. No script, no pressure.' },
      
      // Apply
      { p: 'apply', k: 'heading', v: 'Take the first step' },
      { p: 'apply', k: 'body', v: 'This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you. Most people say the hardest part was deciding to begin. You are already here.' },
      
      // Faculty
      { p: 'faculty', k: 'heading', v: 'Taught by people who still do the work' },
      { p: 'faculty', k: 'body', v: 'A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers, people who carry real client work into the room with them. Alongside our teaching, we share thinking on coaching, leadership and the psychology of change, because the field only advances when practitioners keep questioning it.' },
      { p: 'faculty', k: 'faculty_heading', v: 'Our faculty' },
      { p: 'faculty', k: 'faculty_body', v: 'ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour. Many continue to coach senior leaders while they teach, so what you learn reflects how coaching actually works today. Because we teach one-to-one, you work closely with a coach matched to your level and focus.' },
      
      // Community
      { p: 'community', k: 'heading', v: 'You will not be coaching alone' },
      { p: 'community', k: 'body', v: 'Coaching can be quietly isolating. You hold other people\'s struggles all day, then close the call and sit with them by yourself. The ICI community exists so that you do not have to. When you train with us you join a working network of coaches who supervise one another, refer clients, share what is hard, and keep each other sharp. The credential gets you started. The community keeps you going.' },
      { p: 'community', k: 'offers_heading', v: 'What the community offers' },
      { p: 'community', k: 'offer_1', v: 'Peer supervision and reflective practice groups' },
      { p: 'community', k: 'offer_2', v: 'A referral network among practising coaches' },
      { p: 'community', k: 'offer_3', v: 'Continued learning through masterclasses and events' },
      { p: 'community', k: 'offer_4', v: 'Honest support for the parts of coaching no one warns you about' },
      { p: 'community', k: 'offer_5', v: 'Connection across many countries and one shared standard' },
      
      // Events
      { p: 'events', k: 'heading', v: 'Where the community comes together' },
      { p: 'events', k: 'body', v: 'Some things only happen when people gather, even online. ICI events bring together coaches, leaders and the people we teach for masterclasses, summits and live sessions that go deeper than any recording can. Below are the events coming up. Each one is a chance to learn something real and meet people worth knowing.' },
      
      // Resources
      { p: 'resources', k: 'heading', v: 'Thinking worth your time' },
      { p: 'resources', k: 'body', v: 'Good coaching rests on good thinking. Here we share articles, guides and tools on leadership, psychology, neuroscience and the real work of change, written to be useful rather than impressive. Whether you are deciding whether to train, sharpening an established practice, or simply trying to understand yourself a little better, start here.' },
      
      // Prospectus
      { p: 'prospectus', k: 'heading', v: 'Everything in one place' },
      { p: 'prospectus', k: 'body', v: 'If you would rather read at your own pace, the prospectus brings together the whole picture: the Mastery Pathway and its four levels, the specialisations you can pursue, pricing, and how admissions work. Tell us where to send it and it is yours.' },
      
      // Contact
      { p: 'contact', k: 'heading', v: 'Talk to a human' },
      { p: 'contact', k: 'body', v: 'Whatever brought you here, there is a person at ICI happy to help. Ask about programmes, credentials, timing, cost, or training a team. No script and no pressure, just a straight conversation.' },
      
      // Find a Coach
      { p: 'find-a-coach', k: 'heading', v: 'Find a coach you can trust' },
      { p: 'find-a-coach', k: 'body', v: 'Anyone can call themselves a coach. The coaches listed here have earned an ICI credential through real training, one-to-one, and assessment on real coaching, which means you can approach them with confidence. Tell us what you are looking for and we will help you find someone who fits.' },
      
      // Future Students
      { p: 'future-students', k: 'heading', v: 'Thinking about becoming a coach?' },
      { p: 'future-students', k: 'body', v: 'If you have ever been the person others come to, and wondered whether you could do it properly, this is where to start. Becoming a coach is a serious decision and a deeply rewarding one. This page brings together everything you need to decide: what we teach, what you will hold at the end, and how to begin.' },
      
      // Current Students
      { p: 'current-students', k: 'heading', v: 'Welcome back' },
      { p: 'current-students', k: 'body', v: 'You are in the middle of the work, and this is your home base for it. Here you will find your schedule, your materials, your supervision and the people who can help. Coaching is learned by doing, and you are doing it. Use this hub to stay on track and get the most from your one-to-one sessions.' },
      
      // Organisations
      { p: 'organizations', k: 'heading', v: 'Build a coaching culture, not just send people on a course' },
      { p: 'organizations', k: 'body', v: 'Most leadership training is forgotten within a month because it teaches ideas, not habits. Coaching is different. When managers learn to coach, the change shows up in everyday conversations: clearer feedback, real accountability, people who grow instead of stall. ICI helps organisations build that capability from the inside, one-to-one, and own it.' },
      
      // Alumni
      { p: 'alumni', k: 'heading', v: 'Once an ICI coach, always part of ICI' },
      { p: 'alumni', k: 'body', v: 'The credential was a milestone, not an exit. Our alumni stay connected for the things that make a long coaching career sustainable: supervision, referrals, continued learning and the company of people who understand the work. The longer you practise, the more this matters. Welcome back, whenever you need us.' },
      
      // Faculty & Staff
      { p: 'faculty-staff', k: 'heading', v: 'For the people who make ICI work' },
      { p: 'faculty-staff', k: 'body', v: 'Teaching coaching well is demanding, and so is running the institute behind it. This area gives faculty and staff quick access to what they need: schedules, systems, materials and support. If you teach or work with us, start here.' },
    ];

    for (const item of contentToSeed) {
      await pool.query(
        `INSERT INTO site_content (page_slug, section_key, content_value, content_type) 
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)`,
        [item.p, item.k, item.v, item.t || 'text']
      );
    }

    // Testimonials
    console.log('Seeding testimonials...');
    await pool.query('TRUNCATE TABLE testimonials');
    const testimonials = [
      { quote: "I spent fifteen years telling people I was a good listener. My first one-to-one sessions quietly showed me how much I had been missing. The Catalyst work rebuilt the way I pay attention, and my clients can feel the difference.", name: "Priya Menon", role: "People and Culture leader turned coach", cred: "ICI-C", location: "Bengaluru, India" },
      { quote: "What sold me was that it was genuinely one-to-one. There was nowhere to hide and nothing to coast through. By the end I was coaching senior people with a steadiness I simply did not have before.", name: "Rohan Iyer", role: "Engineering manager and executive coach", cred: "ICI-A", location: "Mumbai, India" },
      { quote: "The self-work hours were harder than the live ones, and that was the point. I had to face my own patterns before I could help anyone with theirs.", name: "Ananya Reddy", role: "Health and wellness coach", cred: "ICI-C", location: "Hyderabad, India" },
      { quote: "I have sat through plenty of training in my life. This was the first that changed how I am, not just what I know. The work on presence stayed with me long after the certificate did.", name: "Vikram Singh", role: "Leadership coach and former Army officer", cred: "ICI-S", location: "Pune, India" },
      { quote: "I left a corporate career with more fear than confidence. The Architect level gave me the craft and the proof I needed to build a practice I am proud of.", name: "Sneha Kulkarni", role: "Life coach", cred: "ICI-A", location: "Pune, India" },
      { quote: "I coach founders, and they can smell anything shallow. The depth of the psychology and behavioural work here is what lets me sit in the room with them as an equal.", name: "Arjun Nair", role: "Business coach", cred: "ICI-A", location: "Kochi, India" },
      { quote: "As a doctor I thought I understood people. Coaching taught me to stop fixing and start listening. The two skills could not be more different, and I needed both.", name: "Dr Kavita Desai", role: "Physician and wellness coach", cred: "ICI-C", location: "Ahmedabad, India" },
      { quote: "Running an organisation had drained me. I came to learn coaching and ended up rebuilding myself in the process. I now lead and coach from a much steadier place.", name: "Imran Sheikh", role: "NGO leader and leadership coach", cred: "ICI-A", location: "New Delhi, India" },
      { quote: "I returned to work after a long break, certain it was too late to start something new. My coach met me exactly where I was. That is the whole philosophy here, and it works.", name: "Meera Pillai", role: "Coach", cred: "ICI-C", location: "Chennai, India" },
      { quote: "This is my first career, not my second. Learning one-to-one from an experienced coach meant I started years ahead of where I would have on my own.", name: "Aditya Bansal", role: "Coach", cred: "ICI-C", location: "Jaipur, India" },
      { quote: "I have an alphabet of letters after my name from other bodies. The ICI work was the most demanding and the most useful. The Sage level changed how I work with power and ego in the room.", name: "Sarah Whitfield", role: "Executive coach", cred: "ICI-S", location: "London, United Kingdom" },
      { quote: "Being coached one-to-one while learning to coach is a rare and clever design. You experience everything you are being taught from the client's side first.", name: "Aisha Al-Mansoori", role: "Leadership coach", cred: "ICI-A", location: "Dubai, United Arab Emirates" },
      { quote: "Practical without being shallow, deep without being vague. That balance is hard to find in coach training, and it is exactly what I got here.", name: "Daniel Tan", role: "Corporate coach", cred: "ICI-A", location: "Singapore" },
      { quote: "The faculty treated coaching as a serious craft and treated me as a serious professional. I have carried that respect into every client relationship since.", name: "Grace Wanjiru", role: "Life and leadership coach", cred: "ICI-C", location: "Nairobi, Kenya" },
      { quote: "I expected frameworks. I did not expect to be asked to do so much honest work on myself. That self-work is now the thing I value most about the whole programme.", name: "Hiroshi Tanaka", role: "Coach", cred: "ICI-C", location: "Tokyo, Japan" },
      { quote: "The neuroscience and psychology were taught in plain language I could use with clients the next day, not theory I would forget by the weekend.", name: "Emma Schneider", role: "Coach", cred: "ICI-A", location: "Berlin, Germany" },
      { quote: "I came for a credential and left with a craft. The one-to-one mentoring meant every weakness I had was seen, named and worked on, rather than glossed over in a group.", name: "Michael Roberts", role: "Executive coach", cred: "ICI-S", location: "Toronto, Canada" },
      { quote: "Studying entirely online from Lagos, I never once felt at a distance. The attention was personal, the standard was high, and the credential travels.", name: "Fatima Bello", role: "Coach and trainer", cred: "ICI-A", location: "Lagos, Nigeria" },
      { quote: "Training one-to-one and entirely online, I expected to feel like a number. Instead I felt known. The standard was high and the support was real from the first session.", name: "Jean-Pierre Laurent", role: "Coach", cred: "ICI-C", location: "Port Louis, Mauritius" },
      { quote: "The programme respects that change is slow and personal. Nothing here is rushed or formulaic, and my clients benefit from the patience it taught me.", name: "Olivia Bennett", role: "Wellness coach", cred: "ICI-C", location: "Sydney, Australia" }
    ];

    for (let i = 0; i < testimonials.length; i++) {
      const t = testimonials[i];
      await pool.query(
        'INSERT INTO testimonials (quote, author_name, author_role, credential, author_location, author_image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [t.quote, t.name, t.role, t.cred, t.location, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80', i + 1]
      );
    }

    // 4. Announcements
    console.log('Seeding announcement bar...');
    await pool.query(`TRUNCATE TABLE announcement_bar`);
    await pool.query(`INSERT INTO announcement_bar (message, sort_order) VALUES 
      ('Next cohort begins every month. Enrol at your own place and pace.', 1),
      ('Now enrolling worldwide: one-to-one, online coaching certification.', 2),
      ('The ICI Mastery Pathway, from Catalyst to Luminary. Explore the credentials.', 3)
    `);

    console.log('Seeding completed successfully!');
    process.exit(0);

  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
