import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation } from "react-router-dom";
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
  { tag: "LEGISLATIVE", date: "MAY 16, 2025", title: "Senate Committee advances cannabis reform bill", image: "capitol" },
  { tag: "MEDICAL", date: "MAY 15, 2025", title: "Medical cannabis access expands across the South", image: "cultivation" },
  { tag: "ECONOMICS", date: "MAY 14, 2025", title: "New report: Alabama could gain $335M+ annually", image: "city" },
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
  "/resources/faqs": ["RESOURCES", "Frequently Asked Questions", "Clear responses to common questions about medical access, adult use, regulation, taxes, and public safety.", [["Who Benefits?", "Patients, responsible adults, communities, and a safer regulated marketplace."], ["How Is It Controlled?", "Through licensing, product testing, age restrictions, and transparent rules."], ["Where Does Revenue Go?", "Smart policy can direct new proceeds to visible Alabama priorities."]]],
  "/resources/fact-sheets": ["RESOURCES", "Fact Sheets", "Concise materials for community education, conversations with lawmakers, and responsible public outreach.", [["Adult-Use Framework", "Core controls for a regulated adult cannabis market."], ["Medical Access", "Patient safeguards, physician oversight, and tested products."], ["Economic Impact", "Revenue, jobs, and local investment considerations."]]],
  "/resources/reports": ["RESEARCH", "Reports", "Policy research and economic analysis supporting an informed conversation about reform in Alabama.", [["Revenue Analysis", "Understand potential annual economic activity and tax receipts."], ["Jobs Outlook", "Explore jobs across cultivation, testing, compliance, and retail."], ["Public Safety", "Review regulation-focused consumer and community protections."]]],
  "/resources/state-laws": ["LEGAL RESOURCES", "State Laws", "Follow Alabama's existing cannabis laws and legislative pathways for responsible reform.", [["Current Policy", "A practical overview of the present legal environment."], ["Proposed Reform", "The goals and controls of legalization legislation."], ["Legislative Tracker", "Track hearings, votes, and opportunities for engagement."]]],
  "/get-involved/take-action": ["GET INVOLVED", "Take Action", "Make your voice heard in support of thoughtful cannabis policy for Alabama patients, adults, and communities.", [["Stay Informed", "Get timely legislative updates and action opportunities."], ["Contact Leaders", "Tell elected officials why sensible reform matters."], ["Share The Facts", "Help your community engage with reliable information."]]],
  "/get-involved/events": ["GET INVOLVED", "Events", "Join educational sessions, policy briefings, community conversations, and volunteer gatherings.", [["Community Forums", "Participate in public discussions grounded in facts."], ["Policy Briefings", "Learn how legislative developments affect Alabamians."], ["Volunteer Meetups", "Connect with people helping move reform forward."]]],
  "/get-involved/volunteer": ["GET INVOLVED", "Volunteer", "Support outreach, education, events, and community organizing for responsible cannabis policy.", [["Outreach", "Help distribute facts and connect with local supporters."], ["Events", "Assist with educational and advocacy opportunities."], ["Digital Support", "Amplify updates and reliable resources online."]]],
  "/get-involved/donate": ["GET INVOLVED", "Donate", "Support policy education, public outreach, organizing efforts, and the campaign for better Alabama cannabis laws.", [["Education", "Expand access to evidence-based policy resources."], ["Advocacy", "Communicate responsible reform priorities statewide."], ["Community", "Strengthen outreach to patients, adults, and families."]]],
  "/privacy": ["LEGAL", "Privacy Policy", "Information about how Legalize Alabama handles contact information submitted through updates and volunteer forms.", [["Information Collected", "Contact details are collected only when voluntarily submitted."], ["How It Is Used", "Submitted details support updates, action alerts, and requested communication."], ["Your Choices", "Subscribers may request changes to communication preferences."]]],
  "/terms": ["LEGAL", "Terms of Use", "Terms governing use of the Legalize Alabama website, educational content, and campaign resources.", [["Educational Use", "Site materials are provided for informational and advocacy purposes."], ["Merchandise Display", "Storefront elements may be preview-oriented until purchasing is enabled."], ["Site Updates", "Content may be updated as legislation develops."]]],
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
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="merch" element={<MerchPage />} />
        <Route path="merch/apparel" element={<MerchPage initialFilter="APPAREL" />} />
        <Route path="merch/accessories" element={<MerchPage initialFilter="ACCESSORIES" />} />
        <Route path="merch/stickers" element={<MerchPage initialFilter="STICKERS" />} />
        <Route path="get-involved" element={<GetInvolvedPage />} />
        <Route path="shop-merch" element={<Navigate to="/merch" replace />} />
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

function NewsPreview({ full = false }) {
  return (
    <section className={full ? "news-block full" : "news-block"}>
      <SectionHeading title={full ? "NEWS & UPDATES" : "LATEST NEWS & UPDATES"} link="VIEW ALL NEWS" to="/news" />
      <div className="article-grid">
        {(full ? [...articles, ...articles] : articles).map((article, index) => <ArticleCard key={`${article.title}-${index}`} {...article} />)}
      </div>
    </section>
  );
}

function ArticleCard({ tag, date, title, image }) {
  return (
    <article className="article-card">
      <div className={`article-image ${image}`} />
      <div className="article-meta"><span>{tag}</span><time>{date}</time></div>
      <h3>{title}</h3>
      <Link to="/news">Read More <ArrowRight size={13} /></Link>
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
  return (
    <>
      <InnerHero eyebrow="LATEST COVERAGE" title="News & Updates" intro="Track legislation, patient access developments, economic research, and community voices shaping Alabama's next chapter." />
      <div className="container filters">{["ALL", "LEGISLATIVE", "MEDICAL", "ECONOMICS", "COMMUNITY"].map((label, index) => <button className={index === 0 ? "active" : ""} key={label}>{label}</button>)}</div>
      <div className="container standalone-news"><NewsPreview full /></div>
    </>
  );
}

function ResourcesPage() {
  const resources = [
    [FileText, "FAQs", "Straight answers to common legalization and regulation questions."],
    [FileText, "Fact Sheets", "Plain-language policy materials for community conversations."],
    [ChartNoAxesColumnIncreasing, "Reports", "Research on public health, jobs, tax impact, and enforcement."],
    [Landmark, "State Laws", "Current Alabama cannabis statutes and proposed reforms."],
    [CalendarDays, "Legislative Tracker", "Monitor bills, hearings, votes, and opportunities to be heard."],
    [ShieldCheck, "How Regulation Works", "Testing, licensing, age controls, and consumer protections."],
  ];
  return (
    <>
      <InnerHero eyebrow="GET THE FACTS" title="Resources For Better Policy" intro="Explore practical, reliable information about safe cannabis regulation and what reform means for Alabama." />
      <section className="container resource-grid">
        {resources.map(([Icon, title, text]) => <article className="resource-card" key={title}><Icon /><h2>{title}</h2><p>{text}</p><button>OPEN RESOURCE <ArrowRight size={14} /></button></article>)}
      </section>
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
