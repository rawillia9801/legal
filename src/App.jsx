import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  FileText,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Mail,
  MapPinned,
  Megaphone,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Stethoscope,
  UsersRound,
  X,
} from "lucide-react";

const navItems = [
  ["REC USE", "/rec-use"],
  ["MEDICAL", "/medical"],
  ["ECONOMICS", "/economics"],
  ["NEWS", "/news"],
  ["RESOURCES", "/resources"],
  ["MERCH", "/merch"],
];

const stats = [
  { icon: UsersRound, value: "68%", label: "PUBLIC SUPPORT", detail: "Alabamians support legalization" },
  { icon: ChartNoAxesColumnIncreasing, value: "$335M+", label: "ANNUAL REVENUE", detail: "Estimated annual economic impact" },
  { icon: BriefcaseBusiness, value: "12,400+", label: "JOBS CREATED", detail: "New jobs for Alabamians" },
  { icon: HeartPulse, value: "100K+", label: "PATIENTS BENEFIT", detail: "Improved access to medical cannabis" },
];

const features = [
  { icon: Leaf, title: "ADULT USE", text: "Legalize, regulate, and tax responsibly. Respect personal freedom and keep adults safe.", route: "/rec-use" },
  { icon: MedicalCross, title: "MEDICAL ACCESS", text: "Expand access for patients with serious conditions through safe, regulated medical cannabis.", route: "/medical" },
  { icon: ChartNoAxesColumnIncreasing, title: "ECONOMIC GROWTH", text: "Generate hundreds of millions annually for education, roads, and community programs.", route: "/economics", gold: true },
  { icon: ShieldCheck, title: "SAFE REGULATION", text: "Strong rules. Tested products. Protecting health, youth, and our communities.", route: "/resources", gold: true },
];

const insights = [
  { icon: FileText, title: "HOW LEGALIZATION WORKS", text: "From licensing to taxation, here's how a regulated market creates safety, transparency, and revenue." },
  { icon: ShieldCheck, title: "WHY REGULATION MATTERS", text: "Regulation protects consumers, prevents youth access, and eliminates the unregulated market." },
  { icon: AlabamaMark, title: "WHAT IT MEANS FOR ALABAMA", text: "Stronger communities, better jobs, and millions kept here at home instead of going elsewhere." },
];

const articles = [
  {
    slug: "dispensary-licenses-issued",
    tag: "MEDICAL",
    date: "JAN 08, 2026",
    title: "Alabama issues three medical cannabis dispensary licenses",
    image: "capitol",
    intro: "Alabama's medical cannabis program moved closer to patient access when three awarded dispensary licenses were issued in January 2026.",
    sections: [
      ["What happened", "The Alabama Medical Cannabis Commission (AMCC) says it voted to award four dispensary licenses on December 11, 2025. Three of those licenses issued on January 8, 2026, authorizing those licensees to open dispensing sites."],
      ["What remains unresolved", "AMCC says the fourth awarded dispensary license was stayed pending judicial review. Its general FAQ also says the date medical cannabis product will be available remains uncertain, so license issuance should not be treated as confirmation that patient sales have started."],
      ["Why it matters", "Licensed dispensing sites are a required part of Alabama's medical-only access system. Patients still must satisfy state eligibility and registration requirements before obtaining approved products."],
    ],
    sources: [
      ["AMCC: Patients, Caregivers, & Physicians", "https://amcc.alabama.gov/patients/"],
      ["AMCC: Frequently Asked Questions", "https://amcc.alabama.gov/frequently-asked-questions/"],
    ],
  },
  {
    slug: "patient-registration-guide",
    tag: "MEDICAL",
    date: "UPDATED MAY 25, 2026",
    title: "How Alabama patients and caregivers register for medical cannabis",
    image: "cultivation",
    intro: "AMCC has published registration instructions for patients, caregivers, and physicians as Alabama's medical cannabis system advances.",
    sections: [
      ["Patient pathway", "According to AMCC, a patient must have a qualifying medical condition, receive a recommendation from an Alabama physician certified to recommend medical cannabis, and be registered in the AMCC patient registry system."],
      ["Physician role", "AMCC says a recommendation must come from a registered certifying physician approved by both the Alabama Board of Medical Examiners and AMCC. The agency provides a current physician list on its patients page."],
      ["Caregiver access", "If a patient is required to have or chooses to have a caregiver, AMCC requires a separate caregiver application through the registry process."],
    ],
    sources: [
      ["AMCC: Patients, Caregivers, & Physicians", "https://amcc.alabama.gov/patients/"],
      ["Alabama Board of Medical Examiners: Medical Cannabis", "https://www.albme.gov/licensing/md-do/registrations/medical-cannabis"],
    ],
  },
  {
    slug: "medical-cannabis-tax-obligations",
    tag: "ECONOMICS",
    date: "UPDATED MAY 25, 2026",
    title: "Alabama defines medical cannabis privilege tax obligations",
    image: "city",
    intro: "Alabama's Department of Revenue has published filing rules for licensed medical cannabis entities operating under the Compassion Act.",
    sections: [
      ["Who must file", "The Alabama Department of Revenue says Section 20-2A-80(b)(1) requires licensed cultivators, processors, dispensaries, secure transporters, testing laboratories, and integrated facilities to file and pay the Medical Cannabis Privilege Tax."],
      ["How returns are filed", "The department says annual Medical Cannabis Privilege Tax returns must be filed electronically through My Alabama Taxes, with no paper filing option for the annual return."],
      ["Why this is relevant", "A regulated medical market includes state tax and reporting obligations for licensees. This official tax framework concerns medical cannabis businesses; it is not evidence that Alabama has enacted adult-use legalization."],
    ],
    sources: [
      ["Alabama Department of Revenue: Medical Cannabis Privilege Tax", "https://www.revenue.alabama.gov/faq-categories/medical-cannabis-privilege-tax/"],
      ["AMCC: Alabama Medical Cannabis Statute", "https://amcc.alabama.gov/wp-content/uploads/2024/11/Alabama-Medical-Cannabis-Statute-updated-November-2024.pdf"],
    ],
  },
  {
    slug: "dispensing-sites-by-municipality",
    tag: "COMMUNITY",
    date: "UPDATED MAY 25, 2026",
    title: "AMCC lists municipalities for issued dispensing licenses",
    image: "capitol",
    intro: "The commission now identifies Alabama communities where dispensing sites may be located based on licenses issued to date.",
    sections: [
      ["Locations listed by AMCC", "AMCC lists Athens, Attalla, Bessemer, Birmingham, Daphne, Mobile, Montgomery, Oxford, and Talladega as municipalities for dispensing sites based on licenses issued to date."],
      ["Possible expansion", "AMCC notes that an additional three retail dispensing sites may be added if another dispensary license is issued. It also says integrated facility licensing could add sites, subject to the commission's proceedings."],
      ["Check before visiting", "The commission's published list describes authorized locations, not a guarantee that every site is currently open or that product is available. Patients should consult AMCC updates before making access plans."],
    ],
    sources: [
      ["AMCC: Patients, Caregivers, & Physicians", "https://amcc.alabama.gov/patients/"],
      ["AMCC: Frequently Asked Questions", "https://amcc.alabama.gov/frequently-asked-questions/"],
    ],
  },
  {
    slug: "allowed-medical-products",
    tag: "MEDICAL",
    date: "UPDATED MAY 25, 2026",
    title: "What medical cannabis products Alabama allows and prohibits",
    image: "cultivation",
    intro: "Alabama's medical cannabis framework permits specific non-smokable forms and prohibits raw plant material and products intended for smoking or vaping.",
    sections: [
      ["Allowed forms", "AMCC lists non-sugar-coated gelatinous cubes or cuboids, lozenges, tablets, capsules, tinctures, topical gels, oils and creams, suppositories, transdermal patches, nebulizers, and liquids or oils for an inhaler as allowed forms."],
      ["Prohibited forms", "AMCC lists raw plant material, products that could be smoked or vaped, and food products such as cookies or candies as prohibited."],
      ["A medical-only system", "These restrictions apply within Alabama's medical cannabis program. They do not create a recreational cannabis market or permit general adult-use sales."],
    ],
    sources: [
      ["AMCC: Patients, Caregivers, & Physicians", "https://amcc.alabama.gov/patients/"],
      ["AMCC: Frequently Asked Questions", "https://amcc.alabama.gov/frequently-asked-questions/"],
    ],
  },
  {
    slug: "commission-meeting-calendar",
    tag: "LEGISLATIVE",
    date: "JUN 11, 2026",
    title: "AMCC posts June meeting as program oversight continues",
    image: "capitol",
    intro: "The state's medical cannabis commission continues public oversight activity as licensing and patient-access implementation proceed.",
    sections: [
      ["Next published meeting", "As of May 25, 2026, the AMCC meetings page lists a June 11, 2026 meeting at 1:00 p.m. and marks the previously listed May 14, 2026 meeting as cancelled."],
      ["Where proceedings are documented", "The commission publishes meeting information and minutes on its meetings page, including minutes dated February 12, 2026 and January 26, 2026."],
      ["How to stay current", "Schedules, agenda materials, licensing actions, and program updates can change. The commission meeting page is the primary official source for the next proceeding."],
    ],
    sources: [
      ["AMCC: Meetings", "https://amcc.alabama.gov/meetings/"],
      ["AMCC: News", "https://amcc.alabama.gov/news/"],
    ],
  },
];

const products = [
  { name: "Legalize Alabama Future Tee", price: "$28.00", image: "/assets/future-tee.jpg", category: "APPAREL" },
  { name: "Classic Snapback Hat", price: "$25.00", image: "/assets/snapback.jpg", category: "ACCESSORIES" },
  { name: "Legalize Alabama Sticker", price: "$4.00", image: "/assets/sticker.jpg", category: "STICKERS" },
  { name: "Movement Hoodie", price: "$54.00", image: "/assets/future-tee.jpg", category: "APPAREL" },
  { name: "Policy Tote Bag", price: "$22.00", image: "/assets/sticker.jpg", category: "ACCESSORIES" },
  { name: "Capitol Leaf Decal Pack", price: "$9.00", image: "/assets/sticker.jpg", category: "STICKERS" },
];

const footerGroups = [
  { heading: "ABOUT", links: [["Our Mission", "/about/mission"], ["Leadership", "/about/leadership"], ["Press", "/about/press"], ["Contact", "/about/contact"]] },
  { heading: "ISSUES", links: [["Recreational Use", "/rec-use"], ["Medical Access", "/medical"], ["Economic Impact", "/economics"], ["Safe Regulation", "/issues/safe-regulation"]] },
  { heading: "RESOURCES", links: [["FAQs", "/resources/faqs"], ["Fact Sheets", "/resources/fact-sheets"], ["Reports", "/resources/reports"], ["State Laws", "/resources/state-laws"]] },
  { heading: "GET INVOLVED", links: [["Take Action", "/get-involved/take-action"], ["Events", "/get-involved/events"], ["Volunteer", "/get-involved/volunteer"], ["Donate", "/get-involved/donate"]] },
  { heading: "SHOP", links: [["All Products", "/merch"], ["Apparel", "/merch/apparel"], ["Accessories", "/merch/accessories"], ["Stickers", "/merch/stickers"]] },
];

const detailPages = {
  "/about/mission": ["ABOUT LEGALIZE ALABAMA", "Our Mission", "We advocate for safe, responsible cannabis policy that improves medical access, respects adults, and strengthens Alabama communities.", [["Responsible Policy", "Support clear regulation, testing, labeling, and accountable oversight."], ["Patient Access", "Ensure Alabamians with qualifying conditions can pursue supervised treatment options."], ["Economic Opportunity", "Keep jobs, revenue, and investment working for communities across the state."]]],
  "/about/leadership": ["ABOUT LEGALIZE ALABAMA", "Leadership", "Our work is guided by advocates, patients, small business voices, health professionals, and citizens seeking better policy.", [["Community First", "Leadership begins with listening to patients, families, and local communities."], ["Policy Integrity", "We prioritize evidence, transparency, and practical implementation."], ["Public Accountability", "A successful movement stays answerable to the people it represents."]]],
  "/about/press": ["MEDIA CENTER", "Press", "Press resources, campaign updates, and factual materials for reporting on cannabis reform in Alabama.", [["Media Inquiries", "Request statements, interviews, or campaign background information."], ["News Releases", "Review major legislative and organizational announcements."], ["Fact Resources", "Access accurate context on medical, adult-use, and economic policy."]]],
  "/about/contact": ["CONNECT WITH US", "Contact", "Reach the Legalize Alabama team about community engagement, media inquiries, policy questions, or volunteer opportunities.", [["General Questions", "Send questions about the movement or the policy platform."], ["Community Outreach", "Coordinate educational events and local conversations."], ["Media Contact", "Request comment or factual materials for coverage."]]],
  "/issues/safe-regulation": ["PUBLIC SAFETY", "Safe Regulation", "Responsible legalization means age controls, rigorous testing, transparent labels, secure licensing, and enforcement focused on real harms.", [["Tested Products", "Require quality and contaminant testing before products reach consumers."], ["Youth Protection", "Use strict age verification, packaging, and marketing safeguards."], ["Accountable Licensing", "Set clear standards for producers, retailers, and regulators."]]],
  "/get-involved/take-action": ["GET INVOLVED", "Take Action", "Make your voice heard in support of thoughtful cannabis policy for Alabama patients, adults, and communities.", [["Stay Informed", "Get timely legislative updates and action opportunities."], ["Contact Leaders", "Tell elected officials why sensible reform matters."], ["Share The Facts", "Help your community engage with reliable information."]]],
  "/get-involved/events": ["GET INVOLVED", "Events", "Join educational sessions, policy briefings, community conversations, and volunteer gatherings.", [["Community Forums", "Participate in public discussions grounded in facts."], ["Policy Briefings", "Learn how legislative developments affect Alabamians."], ["Volunteer Meetups", "Connect with people helping move reform forward."]]],
  "/get-involved/volunteer": ["GET INVOLVED", "Volunteer", "Support outreach, education, events, and community organizing for responsible cannabis policy.", [["Outreach", "Help distribute facts and connect with local supporters."], ["Events", "Assist with educational and advocacy opportunities."], ["Digital Support", "Amplify updates and reliable resources online."]]],
  "/get-involved/donate": ["GET INVOLVED", "Donate", "Support policy education, public outreach, organizing efforts, and the campaign for better Alabama cannabis laws.", [["Education", "Expand access to evidence-based policy resources."], ["Advocacy", "Communicate responsible reform priorities statewide."], ["Community", "Strengthen outreach to patients, adults, and families."]]],
  "/privacy": ["LEGAL", "Privacy Policy", "Information about how Legalize Alabama handles contact information submitted through updates and volunteer forms.", [["Information Collected", "Contact details are collected only when voluntarily submitted."], ["How It Is Used", "Submitted details support updates, action alerts, and requested communication."], ["Your Choices", "Subscribers may request changes to communication preferences."]]],
  "/terms": ["LEGAL", "Terms of Use", "Terms governing use of the Legalize Alabama website, educational content, and campaign resources.", [["Educational Use", "Site materials are provided for informational and advocacy purposes."], ["Merchandise Display", "Storefront elements may be preview-oriented until purchasing is enabled."], ["Site Updates", "Content may be updated as legislation develops."]]],
};

const resourceCards = [
  { icon: FileText, title: "FAQs", text: "Straight answers to common legalization and regulation questions.", route: "/resources/faqs" },
  { icon: FileText, title: "Fact Sheets", text: "Plain-language policy materials for community conversations.", route: "/resources/fact-sheets" },
  { icon: ChartNoAxesColumnIncreasing, title: "Reports", text: "Research on public health, jobs, tax impact, and enforcement.", route: "/resources/reports" },
  { icon: Landmark, title: "State Laws", text: "Current Alabama cannabis statutes and proposed reforms.", route: "/resources/state-laws" },
  { icon: CalendarDays, title: "Legislative Tracker", text: "Monitor bills, hearings, votes, and opportunities to be heard.", route: "/resources/legislative-tracker" },
  { icon: ShieldCheck, title: "How Regulation Works", text: "Testing, licensing, age controls, and consumer protections.", route: "/resources/how-regulation-works" },
];

const resourcePages = {
  "/resources/faqs": {
    eyebrow: "RESOURCES",
    title: "Frequently Asked Questions",
    intro: "Clear answers to the questions Alabamians ask most about cannabis law, medical access, adult-use reform, hemp products, and public safety.",
    summary: "Last reviewed May 25, 2026. Cannabis policy changes quickly; always verify current law with the Alabama Legislature, Alabama Medical Cannabis Commission, or a licensed attorney.",
    sections: [
      { title: "Is recreational cannabis legal in Alabama?", text: "No. Adult-use cannabis remains illegal in Alabama. First-time possession for personal use is generally prosecuted as second-degree possession, while repeat possession, possession for other than personal use, sale, trafficking, and distribution carry more serious penalties." },
      { title: "Is medical cannabis legal?", text: "Yes, Alabama enacted the Darren Wesley 'Ato' Hall Compassion Act in 2021. The law created the Alabama Medical Cannabis Commission and a physician-certification system for qualifying patients, but the commercial rollout has been delayed by licensing disputes and implementation steps." },
      { title: "When will patients be able to buy medical cannabis?", text: "The program has moved forward but is not a mature retail market yet. The commission approved several dispensary licenses in late 2025, and public reporting from the commission anticipated patient access beginning in spring 2026 after physician certification and patient registry steps are completed." },
      { title: "Who may qualify as a patient?", text: "Alabama law lists qualifying medical conditions including cancer-related symptoms, epilepsy or seizure disorders, Crohn's disease, depression, panic disorder, Parkinson's disease, PTSD, sickle cell anemia, spasticity linked to multiple sclerosis or spinal cord injury, Tourette's syndrome, autism spectrum disorder, terminal illness, and chronic or intractable pain when conventional treatment has failed or caused intolerable side effects." },
      { title: "Can Alabama patients smoke or vape medical cannabis?", text: "No. Alabama's medical cannabis law does not authorize smoking, vaping, raw plant material, or food products such as cookies or candies. Allowed product forms are limited by statute and commission rules." },
      { title: "What changed for hemp-derived THC products?", text: "House Bill 445 added statewide rules for consumable hemp products, including a ban on smokable hemp products, age restrictions, testing and labeling standards, THC limits per serving and container, a 10% excise tax, and ABC Board licensing for sellers and manufacturers." },
      { title: "Why regulate instead of prohibit?", text: "Regulation gives the state tools prohibition cannot provide: age checks, product testing, clear labels, licensed businesses, track-and-trace accountability, recall authority, tax collection, and enforcement focused on unsafe actors rather than patients or responsible adults." },
      { title: "Is this legal advice?", text: "No. This page is educational. Anyone facing a cannabis charge, starting a business, or seeking medical certification should consult the relevant state agency or qualified legal counsel." },
    ],
    takeaways: ["Adult use remains illegal.", "Medical cannabis is legal but implementation is still developing.", "Hemp-derived products are regulated separately from medical cannabis.", "Testing, labeling, licensing, and age controls are central to safe reform."],
    sources: [
      ["Alabama Medical Cannabis Commission", "https://amcc.alabama.gov/"],
      ["Alabama Legislature Bill Search", "https://alison.legislature.state.al.us/bill-search"],
      ["Alabama Code, Title 13A Criminal Code", "https://codes.findlaw.com/al/title-13a-criminal-code/"],
    ],
  },
  "/resources/fact-sheets": {
    eyebrow: "RESOURCES",
    title: "Fact Sheets",
    intro: "Plain-language materials built for conversations with neighbors, faith leaders, lawmakers, employers, patients, and local officials.",
    summary: "Use these fact sheets as discussion guides. They explain the difference between current Alabama law and policy choices Alabama could make through future legislation.",
    sections: [
      { title: "Adult-Use Reform", text: "A responsible adult-use framework would limit sales to adults 21 and older, require state licenses, mandate testing and child-resistant packaging, prohibit youth-focused marketing, collect taxes transparently, and create penalties for unlicensed sales." },
      { title: "Medical Access", text: "Alabama's medical program is designed around physician certification, qualifying medical conditions, patient registry cards, licensed cultivation and processing, secure transport, state-regulated dispensaries, and tested non-smokable products." },
      { title: "Public Safety", text: "Regulation supports public safety by replacing untested products with lab-verified products, requiring labels, limiting access to minors, and giving regulators inspection and recall authority." },
      { title: "Economic Opportunity", text: "A regulated market can create roles in cultivation, processing, laboratory testing, logistics, retail, security, compliance, construction, accounting, and professional services. Revenue projections should always be tied to actual tax rates, license caps, patient access, and market size." },
      { title: "Criminal Justice", text: "Alabama still criminalizes adult possession outside the medical program. Reform proposals often address possession penalties, expungement, and redirecting enforcement resources toward impaired driving, youth access, and unlicensed sales." },
      { title: "Hemp Products", text: "Consumable hemp products are governed separately from medical cannabis. Alabama's 2025 hemp law restricts smokable products, sets limits on intoxicating THC servings and packages, adds testing and labeling, and shifts licensing oversight to the ABC Board." },
      { title: "Local Communities", text: "Local officials can prepare for reform by studying zoning, buffer distances, hours of operation, security plans, community reinvestment, impaired-driving education, and transparent public reporting." },
      { title: "Talking Point", text: "The core message is simple: Alabama can keep cannabis unregulated in the illegal market, or it can set rules that protect patients, adults, families, and communities." },
    ],
    takeaways: ["Separate what current law says from what reform could do.", "Do not promise tax numbers without showing assumptions.", "Center patient access, public safety, and accountability.", "Use agency and legislative sources when speaking publicly."],
    sources: [["Alabama Medical Cannabis Commission", "https://amcc.alabama.gov/"], ["Alabama Legislature", "https://alison.legislature.state.al.us/"]],
  },
  "/resources/reports": {
    eyebrow: "RESEARCH",
    title: "Reports",
    intro: "Research summaries for people who want the evidence behind cannabis policy, including health protections, enforcement, jobs, tax structure, and state implementation.",
    summary: "This page separates confirmed Alabama status from broader policy findings. Exact fiscal outcomes depend on the law Alabama adopts, agency capacity, licensing decisions, tax rates, and consumer behavior.",
    sections: [
      { title: "Alabama Status Brief", text: "Adult-use cannabis remains illegal. Medical cannabis is legal under state law but has faced years of licensing litigation and implementation delays. Dispensary licenses approved in late 2025 moved the program closer to patient access." },
      { title: "Medical Implementation", text: "Successful medical programs require certified physicians, an accessible patient registry, clear product rules, accurate labels, secure supply chains, trained dispensary staff, and timely updates from regulators." },
      { title: "Public Health Review", text: "Evidence-based regulation prioritizes youth prevention, impaired-driving education, contaminant testing, potency disclosure, serving-size clarity, adverse-event reporting, and fast recalls when products fail standards." },
      { title: "Tax & Revenue Note", text: "Cannabis tax revenue is not automatic. It depends on legal access, license availability, product price, tax design, enforcement against the illicit market, local participation, and whether patients are overtaxed." },
      { title: "Jobs & Small Business", text: "A regulated system can support jobs in agriculture, labs, processing, compliance, retail, construction, logistics, software, legal services, security, and accounting. License rules determine whether opportunity is broad or concentrated." },
      { title: "Enforcement Impact", text: "Prohibition keeps possession and distribution cases in the criminal system. Reform can reduce low-level possession enforcement while preserving penalties for sales to minors, unlicensed production, trafficking, and impaired driving." },
      { title: "Regional Context", text: "Alabama is surrounded by states with varied cannabis policies. A practical Alabama approach should account for cross-border patient demand, hemp product rules, law enforcement clarity, and economic leakage." },
      { title: "Implementation Risks", text: "Common risks include litigation over licenses, too few legal outlets, high taxes that preserve illicit sales, unclear product standards, delayed testing capacity, and public confusion between hemp, medical cannabis, and adult-use cannabis." },
    ],
    takeaways: ["Reliable reports show assumptions, not just headline numbers.", "Patient access depends on implementation, not just legalization on paper.", "Public health improves when regulators can test, label, inspect, and recall products.", "A strong licensing design matters as much as tax rate."],
    sources: [["National Conference of State Legislatures Cannabis Overview", "https://www.ncsl.org/civil-and-criminal-justice/cannabis-overview"], ["Alabama Medical Cannabis Commission", "https://amcc.alabama.gov/"], ["Alabama Legislature", "https://alison.legislature.state.al.us/"]],
  },
  "/resources/state-laws": {
    eyebrow: "LEGAL RESOURCES",
    title: "State Laws",
    intro: "A practical overview of Alabama cannabis law today: adult possession, medical cannabis, hemp-derived products, and the places where state and federal law still conflict.",
    summary: "This is a policy summary, not legal advice. The Code of Alabama, enacted bills, agency rules, and court orders control when they differ from any educational summary.",
    sections: [
      { title: "Adult Possession", text: "Alabama does not allow adult-use cannabis. Personal-use possession can be charged as second-degree possession, while possession for other than personal use or a subsequent personal-use offense can be charged as first-degree possession." },
      { title: "Sale & Distribution", text: "Unlicensed sale or distribution remains criminal. Penalties increase with conduct, quantity, location, prior record, sales to minors, and trafficking allegations." },
      { title: "Medical Cannabis Act", text: "The 2021 Compassion Act created the Alabama Medical Cannabis Commission, medical cannabis business license categories, qualifying patient rules, physician certification requirements, and limits on product forms." },
      { title: "Allowed Medical Products", text: "Alabama's medical program is limited to approved non-smokable forms. The statute excludes smoking, vaping, raw plant material, and conventional food products such as baked goods or candies." },
      { title: "Hemp-Derived Products", text: "Alabama's 2025 hemp law regulates consumable hemp products separately. It bans smokable hemp, sets THC serving and container limits, requires labeling and testing, restricts sales channels, adds an excise tax, and assigns licensing to the ABC Board." },
      { title: "Local Government Role", text: "Local rules can affect siting, zoning, business licenses, setbacks, signage, nuisance rules, and enforcement coordination. Local policy should be transparent, consistent, and tied to public safety." },
      { title: "Federal Law", text: "Cannabis remains controlled under federal law. State legalization can create a state-law defense or licensing system, but it does not erase federal restrictions or banking, tax, and interstate commerce complications." },
      { title: "What To Verify", text: "Before acting, verify the current Code of Alabama sections, AMCC rules, ABC Board hemp rules, local ordinances, and any active litigation or court orders affecting licensing." },
    ],
    takeaways: ["Adult-use cannabis is not legal in Alabama.", "Medical cannabis is legal under state law but tightly limited.", "Hemp-derived THC products now have separate statewide rules.", "Federal law remains an important limitation."],
    sources: [["Code of Alabama", "https://alison.legislature.state.al.us/code-of-alabama"], ["Alabama Medical Cannabis Commission", "https://amcc.alabama.gov/"], ["Alabama ABC Board", "https://alabcboard.gov/"]],
  },
  "/resources/legislative-tracker": {
    eyebrow: "LEGISLATIVE TRACKER",
    title: "Track Cannabis Bills In Alabama",
    intro: "A simple guide to following cannabis, hemp, medical access, licensing, and criminal-justice bills through the Alabama Legislature.",
    summary: "This tracker is a guide, not a live feed. Always confirm real-time bill status on ALISON, the Alabama Legislature's public bill-search system.",
    sections: [
      { title: "Step 1: Search ALISON", text: "Use the Alabama Legislature bill-search portal and search terms such as cannabis, marijuana, medical cannabis, hemp, THC, cannabinoid, ABC Board, AMCC, possession, expungement, and impaired driving." },
      { title: "Step 2: Read The Text", text: "Open the latest bill version, not just the summary. Amendments can change age limits, penalties, tax rates, product forms, agency authority, licensing caps, and effective dates." },
      { title: "Step 3: Check Committee", text: "Most bills must pass through committee before a full chamber vote. Committee agendas are where public testimony, substitutions, and major amendments often happen." },
      { title: "Step 4: Follow Votes", text: "Track first reading, committee action, second reading, floor votes, conference committee activity, enrollment, governor action, and effective dates." },
      { title: "Step 5: Contact Lawmakers", text: "When a bill is active, contact your senator and representative with concise, respectful comments. Share personal stories, public-safety priorities, and specific bill sections when possible." },
      { title: "What To Watch", text: "Key policy points include adult-use possession limits, medical patient access, hemp product restrictions, tax structure, licensing categories, local control, testing standards, packaging rules, expungement, and penalties for unlicensed sales." },
      { title: "2025-2026 Context", text: "Recent Alabama cannabis activity has included medical cannabis licensing progress and new regulation of hemp-derived THC products. Any new bill should be read against those existing frameworks." },
      { title: "Action Checklist", text: "Save the bill number, read the newest text, identify the sponsor, note the assigned committee, check hearing times, prepare comments, and share factual updates with your community." },
    ],
    takeaways: ["Bill summaries are helpful but not enough.", "Committee hearings are key moments for public input.", "Amendments can completely change a cannabis bill.", "Use bill numbers and exact sections when contacting officials."],
    sources: [["Alabama Legislature Bill Search", "https://alison.legislature.state.al.us/bill-search"], ["Find My Legislator", "https://alison.legislature.state.al.us/representatives-house-leaders"], ["Alabama Senate", "https://alison.legislature.state.al.us/senate-leaders"]],
  },
  "/resources/how-regulation-works": {
    eyebrow: "SAFE REGULATION",
    title: "How Cannabis Regulation Works",
    intro: "A regulated cannabis system is built from enforceable rules: licenses, testing, age controls, labels, inspections, tracking, taxes, and penalties for unsafe conduct.",
    summary: "Good regulation turns policy goals into day-to-day requirements businesses and regulators can actually follow.",
    sections: [
      { title: "Licensing", text: "The state decides who may cultivate, process, test, transport, dispense, or sell products. Strong licensing requires background review, financial disclosure, security plans, local compliance, and ongoing renewal standards." },
      { title: "Seed-To-Sale Tracking", text: "Tracking systems document product movement from cultivation through processing, testing, transport, and sale. That helps prevent diversion, identify recalls, and audit inventory." },
      { title: "Laboratory Testing", text: "Independent labs test for potency and contaminants such as pesticides, residual solvents, heavy metals, microbial contamination, and other unsafe materials before products reach consumers." },
      { title: "Labels & Packaging", text: "Labels should clearly show product type, THC/CBD content, serving size, batch number, ingredients, warnings, expiration or use-by guidance, and a way to connect the product to test results." },
      { title: "Age & Patient Controls", text: "Adult-use markets use age-21 checks. Medical systems use physician certification and patient registries. Both models should protect minors and prevent unauthorized sales." },
      { title: "Retail Rules", text: "Retail rules can cover employee training, ID checks, purchase limits, security cameras, restricted hours, advertising limits, signage, recordkeeping, and procedures for refusing unsafe sales." },
      { title: "Tax Collection", text: "Taxes may be based on price, potency, weight, or a hybrid model. Transparent tax rules help fund enforcement and public programs without pushing prices so high that illicit sales continue." },
      { title: "Enforcement & Recalls", text: "Regulators need inspection authority, product-hold authority, recall procedures, civil penalties, license suspension, and criminal referrals for serious violations like sales to minors or falsified testing." },
    ],
    takeaways: ["Testing and labels make products knowable.", "Licensing and tracking make businesses accountable.", "Age controls protect youth.", "Recall authority protects consumers when something goes wrong."],
    sources: [["Alabama Medical Cannabis Commission", "https://amcc.alabama.gov/"], ["Alabama ABC Board", "https://alabcboard.gov/"], ["National Conference of State Legislatures Cannabis Overview", "https://www.ncsl.org/civil-and-criminal-justice/cannabis-overview"]],
  },
};

const pageData = {
  "/rec-use": {
    eyebrow: "RESPONSIBLE FREEDOM",
    title: "Adult Use Cannabis Policy for Alabama",
    intro: "Regulated adult-use cannabis protects personal freedom while replacing an untested market with clear standards, age limits, and public accountability.",
    sections: [
      { icon: HeartHandshake, title: "Personal Freedom", text: "Treat responsible adult cannabis decisions with the same practical judgment Alabama expects elsewhere." },
      { icon: ShieldCheck, title: "Consumer Safety", text: "Require tested products, secure packaging, retail training, and meaningful age verification." },
      { icon: CircleDollarSign, title: "Tax Revenue", text: "Keep revenue in Alabama and direct proceeds toward priorities communities can see." },
      { icon: Landmark, title: "Enforcement Reform", text: "Focus public safety resources on serious harm rather than low-level adult possession." },
    ],
    faq: ["Who could legally purchase cannabis?", "How will products be tested and labeled?", "Where would cannabis tax dollars go?"],
  },
  "/medical": {
    eyebrow: "PATIENT-CENTERED POLICY",
    title: "Medical Cannabis Access for Alabama Patients",
    intro: "Patients and physicians deserve a dependable, carefully supervised medical cannabis system built around safety, compassion, and clinical oversight.",
    sections: [
      { icon: HeartPulse, title: "Patient Access", text: "Reliable access for qualified patients without forcing families to seek care elsewhere." },
      { icon: Stethoscope, title: "Physician Oversight", text: "Recommendations and follow-up care guided by licensed health professionals." },
      { icon: ShieldCheck, title: "Product Testing", text: "Batch testing and transparent labeling for potency, contaminants, and dosing." },
      { icon: FileText, title: "Qualifying Conditions", text: "Evidence-guided pathways for patients facing serious and chronic conditions." },
    ],
    faq: ["How do patients qualify?", "How does physician oversight work?", "What products and testing standards apply?"],
  },
};

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rec-use" element={<PolicyPage data={pageData["/rec-use"]} />} />
        <Route path="medical" element={<PolicyPage data={pageData["/medical"]} />} />
        <Route path="economics" element={<EconomicsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<ArticlePage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="merch" element={<MerchPage />} />
        <Route path="merch/apparel" element={<MerchPage initialFilter="APPAREL" />} />
        <Route path="merch/accessories" element={<MerchPage initialFilter="ACCESSORIES" />} />
        <Route path="merch/stickers" element={<MerchPage initialFilter="STICKERS" />} />
        <Route path="get-involved" element={<GetInvolvedPage />} />
        <Route path="shop-merch" element={<Navigate to="/merch" replace />} />
        {Object.entries(resourcePages).map(([path, data]) => <Route key={path} path={path.slice(1)} element={<ResourceDetailPage data={data} />} />)}
        {Object.entries(detailPages).map(([path, data]) => <Route key={path} path={path.slice(1)} element={<DetailPage data={data} />} />)}
      </Route>
    </Routes>
  );
}

function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [showAlert, setShowAlert] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className={isHome ? "site home-shell" : "site"}>
      <ScrollToTop />
      {showAlert && (
        <div className="alert-bar">
          <div className="container alert-inner">
            <span className="alert-label">WARNING&nbsp; LEGISLATIVE UPDATE:</span>
            <span>Senate Bill 242 is moving forward. Stay informed. Make your voice count.</span>
            <Link to="/news" className="alert-link">VIEW BILL STATUS <ArrowRight size={13} /></Link>
            <button type="button" className="icon-close" aria-label="Dismiss legislative update" onClick={() => setShowAlert(false)}><X size={14} /></button>
          </div>
        </div>
      )}
      <header className="main-header">
        <div className="container header-inner">
          <Logo />
          <button className="mobile-toggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
            {navItems.map(([label, route]) => (
              <NavLink key={route} to={route} onClick={() => setMenuOpen(false)}>{label}</NavLink>
            ))}
            <div className="mobile-actions">
              <Link className="button primary" to="/get-involved">GET INVOLVED</Link>
              <Link className="button secondary" to="/merch">SHOP MERCH</Link>
            </div>
          </nav>
          <div className="header-actions">
            <Link className="button primary" to="/get-involved">GET INVOLVED</Link>
            <Link className="button secondary" to="/merch">SHOP MERCH</Link>
            <button type="button" className="search-trigger" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)}><Search size={20} /></button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-panel">
            <label htmlFor="site-search">SEARCH THE SITE</label>
            <div><input id="site-search" autoFocus placeholder="Search policy, news, resources..." /><button className="button primary">SEARCH</button></div>
          </div>
        )}
      </header>
      <main><Outlet /></main>
      <SignupBand />
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <ApprovedDesktopHome />
      <div className="responsive-live-home">
        <section className="hero">
          <div className="hero-grid-lines" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">SMARTER POLICY. STRONGER ALABAMA.</p>
              <h1>LEGALIZE IT.<Leaf className="hero-leaf" /><br />FOR ALABAMA.</h1>
              <p className="hero-points"><span>RECREATIONAL FREEDOM.</span> <span>MEDICAL ACCESS.</span> <strong>ECONOMIC PROSPERITY.</strong></p>
              <p className="lede">It's time for safe, sensible cannabis policy that supports patients, empowers adults, fuels our economy, and keeps revenue in Alabama.</p>
              <div className="cta-row">
                <Link to="/resources" className="button primary">EXPLORE THE BENEFITS <ArrowRight size={16} /></Link>
                <Link to="/rec-use" className="button secondary"><FileText size={15} /> READ THE PLAN</Link>
              </div>
            </div>
            <div className="alabama-overlay" aria-hidden="true"><AlabamaHero /></div>
          </div>
          <div className="container stats-grid">
            {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          </div>
        </section>
        <section className="feature-strip">
          <div className="container feature-grid">
            {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
          </div>
        </section>
        <EducationSection />
        <div className="container split-showcase">
          <NewsPreview />
          <MerchPreview />
        </div>
      </div>
    </>
  );
}

function ApprovedDesktopHome() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  function submitSignup(event) {
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setSignupStatus("Please enter a valid email address.");
      return;
    }
    setSignupStatus("You're on the list for updates.");
    setEmail("");
  }
  return (
    <section className="approved-desktop-home" aria-label="Legalize Alabama homepage">
      <img src="/assets/approved-homepage.png" alt="" />
      <div className="approved-home-links">
        <Link className="hit-logo" to="/" aria-label="Legalize Alabama home" />
        <Link className="hit-rec" to="/rec-use" aria-label="Recreational use" />
        <Link className="hit-medical" to="/medical" aria-label="Medical cannabis" />
        <Link className="hit-economics" to="/economics" aria-label="Economics" />
        <Link className="hit-news" to="/news" aria-label="News" />
        <Link className="hit-resources" to="/resources" aria-label="Resources" />
        <Link className="hit-merch" to="/merch" aria-label="Merch" />
        <Link className="hit-involved" to="/get-involved" aria-label="Get involved" />
        <Link className="hit-shop" to="/merch" aria-label="Shop merch" />
        <button className="hit-search" type="button" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)} />
        <Link className="hit-benefits" to="/resources" aria-label="Explore the benefits" />
        <Link className="hit-plan" to="/rec-use" aria-label="Read the plan" />
        <Link className="hit-facts" to="/resources" aria-label="View all resources" />
        <Link className="hit-all-news" to="/news" aria-label="View all news" />
        <Link className="hit-merch-preview" to="/merch" aria-label="Shop Legalize Alabama merchandise" />
        {footerGroups.flatMap((group, groupIndex) => group.links.map(([label, to], linkIndex) => (
          <Link key={to} className={`hit-footer hit-footer-${groupIndex}-${linkIndex}`} to={to} aria-label={label} />
        )))}
        <Link className="hit-privacy" to="/privacy" aria-label="Privacy Policy" />
        <Link className="hit-terms" to="/terms" aria-label="Terms of Use" />
      </div>
      <form className="approved-signup-form" onSubmit={submitSignup}>
        <label className="sr-only" htmlFor="approved-email">Email address</label>
        <input id="approved-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email address" placeholder=" " />
        <button type="submit" aria-label="Stay informed" />
        {signupStatus && <span role="status">{signupStatus}</span>}
      </form>
      {searchOpen && (
        <div className="approved-search-panel">
          <label htmlFor="approved-search">SEARCH THE SITE</label>
          <input id="approved-search" autoFocus placeholder="Search policy, news, resources..." />
        </div>
      )}
    </section>
  );
}

function StatCard({ icon: Icon, value, label, detail }) {
  return (
    <article className="stat-card">
      <Icon />
      <div><strong>{value}</strong><h3>{label}</h3><p>{detail}</p></div>
    </article>
  );
}

function FeatureCard({ icon: Icon, title, text, route, gold }) {
  return (
    <article className={gold ? "feature-card gold" : "feature-card"}>
      <Icon />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link to={route}>Learn More <ArrowRight size={14} /></Link>
      </div>
    </article>
  );
}

function EducationSection() {
  return (
    <section className="education">
      <div className="container education-grid">
        <div className="education-heading">
          <p className="eyebrow">GET THE FACTS</p>
          <h2>EDUCATION &amp; INSIGHT</h2>
          <p>Clear answers. Real data.<br />Better policy for a better Alabama.</p>
          <Link className="button primary compact" to="/resources">VIEW ALL RESOURCES</Link>
        </div>
        {insights.map(({ icon: Icon, title, text }) => (
          <article className="insight-card" key={title}>
            <Icon />
            <div><h3>{title}</h3><p>{text}</p><Link to="/resources">Read More <ArrowRight size={13} /></Link></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsPreview({ full = false, displayedArticles = articles }) {
  const visibleArticles = full ? displayedArticles : articles.slice(0, 3);
  return (
    <section className={full ? "news-block full" : "news-block"}>
      <SectionHeading title={full ? "NEWS & UPDATES" : "LATEST NEWS & UPDATES"} link="VIEW ALL NEWS" to="/news" />
      <div className="article-grid">
        {visibleArticles.map((article) => <ArticleCard key={article.slug} {...article} />)}
      </div>
    </section>
  );
}

function ArticleCard({ slug, tag, date, title, image }) {
  return (
    <article className="article-card">
      <Link className="article-card-link" to={`/news/${slug}`} aria-label={`Read ${title}`}>
        <div className={`article-image ${image}`} />
        <div className="article-meta"><span>{tag}</span><time>{date}</time></div>
        <h3>{title}</h3>
        <span className="article-read-more">Read More <ArrowRight size={13} /></span>
      </Link>
    </article>
  );
}

function MerchPreview() {
  return (
    <section className="merch-preview">
      <SectionHeading title="LEGALIZE ALABAMA MERCH" sub="SHOW YOUR SUPPORT. WEAR THE MOVEMENT." link="SHOP MERCH" to="/merch" />
      <div className="product-grid preview">
        {products.slice(0, 3).map((product) => <ProductCard product={product} key={product.name} />)}
      </div>
    </section>
  );
}

function SectionHeading({ title, sub, link, to }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {sub && <span>{sub}</span>}
      <Link to={to}>{link} <ArrowRight size={13} /></Link>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image"><img src={product.image} alt={product.name} /></div>
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      <div className="price-action"><strong>{product.price}</strong><button type="button">View Product <ArrowRight size={12} /></button></div>
    </article>
  );
}

function InnerHero({ eyebrow, title, intro }) {
  return (
    <section className="inner-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}

function PolicyPage({ data }) {
  return (
    <>
      <InnerHero eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
      <section className="container page-cards four">
        {data.sections.map(({ icon: Icon, title, text }) => (
          <article className="panel-card" key={title}><Icon /><h2>{title}</h2><p>{text}</p></article>
        ))}
      </section>
      <section className="container faq-layout">
        <div><p className="eyebrow">COMMON QUESTIONS</p><h2>Understanding The Policy</h2><p>Safe legalization requires clear answers, transparent rules, and participation from Alabama communities.</p></div>
        <div className="faq-list">{data.faq.map((question) => <details key={question}><summary>{question}</summary><p>Our framework prioritizes adult accountability, state oversight, testing, and public reporting.</p></details>)}</div>
      </section>
      <PageCta />
    </>
  );
}

function EconomicsPage() {
  const cards = [
    { icon: CircleDollarSign, value: "$335M+", title: "Annual impact", text: "Estimated economic activity retained in Alabama." },
    { icon: BriefcaseBusiness, value: "12,400+", title: "New jobs", text: "Cultivation, labs, retail, compliance, and support roles." },
    { icon: Sprout, value: "LOCAL", title: "Agriculture", text: "Opportunity for responsible in-state growers and processors." },
    { icon: Building2, value: "GROWTH", title: "Communities", text: "Revenue for roads, services, and education priorities." },
  ];
  return (
    <>
      <InnerHero eyebrow="JOBS. REVENUE. OPPORTUNITY." title="A Smarter Cannabis Economy for Alabama" intro="A regulated industry can build Alabama jobs, keep consumer spending at home, and invest new revenue in strong communities." />
      <section className="container economy-grid">
        {cards.map(({ icon: Icon, value, title, text }) => <article className="economic-card" key={title}><Icon /><strong>{value}</strong><h2>{title}</h2><p>{text}</p></article>)}
      </section>
      <section className="container impact-panel">
        <div><p className="eyebrow">ECONOMIC RETENTION</p><h2>Revenue working here at home</h2><p>Smart taxation and local licensing can support public services while giving Alabama entrepreneurs a fair, carefully regulated market.</p></div>
        <div className="impact-bars">
          {["Education investments", "Local jobs & business", "Public health & safety"].map((label, index) => <div key={label}><span>{label}</span><i style={{ width: `${90 - index * 17}%` }} /></div>)}
        </div>
      </section>
      <PageCta />
    </>
  );
}

function NewsPage() {
  const [category, setCategory] = useState("ALL");
  const displayedArticles = category === "ALL" ? articles : articles.filter((article) => article.tag === category);
  return (
    <>
      <InnerHero eyebrow="OFFICIAL SOURCES / UPDATED MAY 25, 2026" title="News & Updates" intro="Track Alabama medical cannabis access, oversight, tax rules, and community implementation with direct links to the official sources." />
      <div className="container filters">{["ALL", "LEGISLATIVE", "MEDICAL", "ECONOMICS", "COMMUNITY"].map((label) => <button type="button" aria-pressed={category === label} className={category === label ? "active" : ""} key={label} onClick={() => setCategory(label)}>{label}</button>)}</div>
      <div className="container standalone-news"><NewsPreview full displayedArticles={displayedArticles} /></div>
    </>
  );
}

function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) {
    return <Navigate to="/news" replace />;
  }
  return (
    <>
      <InnerHero eyebrow={`${article.tag} / VERIFIED MAY 25, 2026`} title={article.title} intro={article.intro} />
      <article className="container story-layout">
        <aside className="story-aside">
          <div className={`story-image article-image ${article.image}`} />
          <p className="story-status">SOURCE CHECKED: MAY 25, 2026</p>
          <p>Information on this page is based on Alabama state agency materials linked below. Official schedules and program status may change.</p>
          <Link className="story-back" to="/news"><ArrowRight size={14} /> BACK TO NEWS</Link>
        </aside>
        <div className="story-content">
          {article.sections.map(([heading, text]) => (
            <section className="story-section" key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
          <section className="story-sources">
            <p className="eyebrow">PRIMARY SOURCES</p>
            <h2>Official references</h2>
            {article.sources.map(([label, url]) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">{label}<ArrowRight size={15} /></a>
            ))}
          </section>
        </div>
      </article>
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <InnerHero eyebrow="GET THE FACTS" title="Resources For Better Policy" intro="Explore practical, reliable information about safe cannabis regulation and what reform means for Alabama." />
      <section className="container resource-grid">
        {resourceCards.map(({ icon: Icon, title, text, route }) => (
          <article className="resource-card" key={title}>
            <Icon />
            <h2>{title}</h2>
            <p>{text}</p>
            <Link to={route}><button type="button">OPEN RESOURCE <ArrowRight size={14} /></button></Link>
          </article>
        ))}
      </section>
    </>
  );
}

function ResourceDetailPage({ data }) {
  return (
    <>
      <InnerHero eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
      <section className="container resource-summary">
        <p>{data.summary}</p>
      </section>
      <section className="container detail-grid resource-detail-grid">
        {data.sections.map(({ title, text }) => <article className="resource-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}
      </section>
      <section className="container faq-layout resource-takeaways">
        <div><p className="eyebrow">KEY TAKEAWAYS</p><h2>What To Remember</h2><p>Use these points when sharing resources, preparing testimony, or speaking with local officials.</p></div>
        <div className="faq-list">{data.takeaways.map((takeaway) => <details open key={takeaway}><summary>{takeaway}</summary><p>Keep the focus on facts, safety, transparency, and accountable state oversight.</p></details>)}</div>
      </section>
      <section className="container detail-grid source-grid">
        {data.sources.map(([label, href]) => <article className="resource-card" key={href}><h2>{label}</h2><p>Primary reference for verifying current language, rules, or bill status.</p><a className="resource-link" href={href} target="_blank" rel="noreferrer">OPEN SOURCE <ArrowRight size={14} /></a></article>)}
      </section>
      <PageCta />
    </>
  );
}

function MerchPage({ initialFilter = "ALL" }) {
  const [filter, setFilter] = useState(initialFilter);
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);
  const displayed = filter === "ALL" ? products : products.filter((product) => product.category === filter);
  return (
    <>
      <InnerHero eyebrow="WEAR THE MOVEMENT" title="Legalize Alabama Merch" intro="Premium campaign goods built to start conversations and show your support for smarter Alabama policy." />
      <div className="container store-toolbar">
        <div>{["ALL", "APPAREL", "ACCESSORIES", "STICKERS"].map((category) => <button key={category} className={category === filter ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div>
        <button className="cart"><ShoppingBag size={17} /> CART (0)</button>
      </div>
      <section className="container store-grid">{displayed.map((product) => <ProductCard product={product} key={product.name} />)}</section>
    </>
  );
}

function DetailPage({ data }) {
  const [eyebrow, title, intro, cards] = data;
  return (
    <>
      <InnerHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="container detail-grid">
        {cards.map(([heading, text]) => <article className="resource-card" key={heading}><h2>{heading}</h2><p>{text}</p></article>)}
      </section>
      <PageCta />
    </>
  );
}

function GetInvolvedPage() {
  const actions = [
    [BellRing, "Get Updates", "Receive legislative news and action alerts."],
    [Megaphone, "Contact Representatives", "Share your support for responsible reform."],
    [UsersRound, "Volunteer", "Help educate and organize your community."],
    [HeartHandshake, "Support The Cause", "Power research, outreach, and advocacy."],
  ];
  return (
    <>
      <InnerHero eyebrow="BUILD A BETTER ALABAMA" title="Get Involved" intro="This movement belongs to patients, adults, families, employers, and communities ready for sensible policy." />
      <section className="container involve-layout">
        <div className="page-cards actions">{actions.map(([Icon, title, text]) => <article className="panel-card" key={title}><Icon /><h2>{title}</h2><p>{text}</p></article>)}</div>
        <VolunteerForm />
      </section>
    </>
  );
}

function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form className="volunteer-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <p className="eyebrow">TAKE ACTION</p><h2>Volunteer Interest</h2>
      <label>FULL NAME<input required placeholder="Your name" /></label>
      <label>EMAIL ADDRESS<input type="email" required placeholder="you@email.com" /></label>
      <label>HOW WOULD YOU LIKE TO HELP?<select defaultValue=""><option value="" disabled>Select an option</option><option>Community outreach</option><option>Events</option><option>Policy updates</option></select></label>
      <button className="button primary" type="submit">{submitted ? "THANK YOU" : "JOIN THE MOVEMENT"} <ArrowRight size={15} /></button>
      {submitted && <p className="success">Thanks for stepping forward. We will be in touch.</p>}
    </form>
  );
}

function PageCta() {
  return (
    <section className="container page-cta">
      <h2>Help Move Alabama Forward</h2>
      <p>Stay informed and make your voice count for thoughtful cannabis policy.</p>
      <Link className="button primary" to="/get-involved">GET INVOLVED <ArrowRight size={15} /></Link>
    </section>
  );
}

function SignupBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("You're on the list for updates.");
    setEmail("");
  }
  return (
    <section className="signup-band">
      <div className="container signup-inner">
        <Leaf className="signup-leaf" />
        <div className="signup-copy"><h2>JOIN THE MOVEMENT</h2><p>Stay informed. Get updates. Take action.<br />Together, we can build a better Alabama.</p></div>
        <form className="signup-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="signup-email">Email address</label>
          <input id="signup-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" required />
          <button className="button primary" type="submit">STAY INFORMED</button>
          {status && <span role="status">{status}</span>}
        </form>
        <div className="signup-actions">
          <MiniAction icon={BellRing} title="GET UPDATES" text="News & alerts" />
          <MiniAction icon={Megaphone} title="TAKE ACTION" text="Make your voice heard" />
          <MiniAction icon={HeartPulse} title="SUPPORT THE CAUSE" text="Volunteer & donate" />
        </div>
      </div>
    </section>
  );
}

function MiniAction({ icon: Icon, title, text }) {
  return <div><Icon /><span><strong>{title}</strong><small>{text}</small></span></div>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo /><p>Working for safe, responsible cannabis policy that strengthens Alabama.</p><div className="socials"><span>X</span><span>f</span><span>◎</span><span>▶</span><span>♪</span></div></div>
        {footerGroups.map(({ heading, links }) => <div className="footer-links" key={heading}><h2>{heading}</h2>{links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div>)}
        <aside className="footer-signup"><h2>NEVER MISS AN UPDATE</h2><p>News, alerts, and opportunities to take action.</p><Link to="/get-involved" className="button secondary compact">SIGN UP</Link></aside>
      </div>
      <div className="container copyright"><span>&copy; 2025 Legalize Alabama. All rights reserved.</span><span><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Use</Link></span></div>
    </footer>
  );
}

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Legalize Alabama home">
      <span className="logo-mark">★</span>
      <span>LEGALIZE<small>ALABAMA</small></span>
    </Link>
  );
}

function Leaf({ className = "", ...props }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path d="M32 4 26 27 12 12l8 24L3 31l19 13-12 5 20 1 2 10 2-10 20-1-12-5 19-13-17 5 8-24-14 15z" />
    </svg>
  );
}

function MedicalCross(props) {
  return <svg viewBox="0 0 48 48" {...props}><path d="M18 3h12v15h15v12H30v15H18V30H3V18h15z" /></svg>;
}

function AlabamaMark(props) {
  return <svg viewBox="0 0 240 330" {...props}><path d={alabamaBoundary} /></svg>;
}

function AlabamaHero() {
  return (
    <svg viewBox="0 0 240 330">
      <path d={alabamaBoundary} />
      <Leaf className="state-leaf" x="75" y="120" width="88" height="88" />
    </svg>
  );
}

const alabamaBoundary = "M 10.0 192.5 L 23.5 81.0 L 32.0 16.8 L 28.7 15.0 L 25.8 10.0 L 178.0 11.4 L 202.7 135.8 L 206.3 140.9 L 208.7 149.1 L 213.8 159.7 L 213.2 166.0 L 220.0 171.0 L 209.9 178.4 L 206.9 192.4 L 206.1 204.1 L 211.1 213.1 L 208.1 223.5 L 211.8 240.5 L 213.4 244.8 L 155.0 245.3 L 61.2 245.0 L 59.1 252.7 L 72.5 263.9 L 70.2 272.5 L 74.7 278.0 L 69.4 283.7 L 57.6 288.7 L 36.1 290.3 L 52.5 286.6 L 43.2 279.4 L 43.5 271.2 L 37.1 263.3 L 34.1 265.7 L 31.4 281.3 L 29.2 284.0 L 25.5 282.3 L 20.8 280.7 L 16.8 279.6 L 14.6 281.8 L 10.0 192.5 Z";
