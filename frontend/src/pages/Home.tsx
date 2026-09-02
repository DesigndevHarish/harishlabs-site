import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  BriefcaseBusiness,
  Code2,
  Mail,
  Menu,
  MoveUpRight,
  Network,
  Play,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
};

type ArchitectureNode = {
  id: string;
  label: string;
  tool: string;
  detail: string;
};

const navItems = [
  ["About", "about"],
  ["Stack", "stack"],
  ["Projects", "projects"],
  ["Architecture", "architecture"],
  ["Analytics", "analytics"],
  ["Contact", "contact"],
] as const;

const stackGroups = {
  "Data engineering": ["Python", "SQL", "Kafka", "Redpanda", "ETL", "ELT", "Data pipelines"],
  Warehousing: ["Snowflake", "Dimensional modeling", "Fact tables", "Dimension tables", "Incremental models"],
  Cloud: ["AWS S3", "AWS IAM", "Cloud storage", "Object lifecycle"],
  Transformation: ["dbt", "SQL", "Data quality", "Data testing", "Incremental loads", "Merge strategies"],
  Analytics: ["Power BI", "DAX", "Data visualization", "Business KPIs", "Semantic models"],
  Development: ["Git", "GitHub", "Docker", "VS Code", "CI workflows"],
};

const projects: Project[] = [
  {
    number: "01",
    category: "Data engineering / Cloud / Analytics",
    title: "Real-time retail data platform",
    description:
      "An end-to-end retail platform that moves historical and streaming events into trusted, business-ready models.",
    tags: ["Python", "Redpanda", "AWS S3", "Snowflake", "dbt", "Power BI"],
    accent: "cyan",
  },
  {
    number: "02",
    category: "Data warehousing / Analytics",
    title: "Hotel booking data warehouse",
    description:
      "A cloud warehouse that turns raw booking records into clean analytical models and reliable reporting layers.",
    tags: ["Snowflake", "SQL", "dbt", "Python", "Power BI"],
    accent: "blue",
  },
  {
    number: "03",
    category: "Data analytics / BI",
    title: "Customer & sales analytics",
    description:
      "An analytical solution for understanding sales, customer behavior, product performance, returns, and KPIs.",
    tags: ["SQL", "Snowflake", "Power BI", "DAX"],
    accent: "green",
  },
];

const architecture: ArchitectureNode[] = [
  { id: "events", label: "Event generation", tool: "Python", detail: "Synthetic retail events, contracts, and validation-ready payloads." },
  { id: "streaming", label: "Streaming", tool: "Redpanda / Kafka", detail: "Durable topics decouple producers from downstream consumers." },
  { id: "storage", label: "Cloud storage", tool: "AWS S3", detail: "Raw event landing zone with partitioned, replayable objects." },
  { id: "warehouse", label: "Data warehouse", tool: "Snowflake", detail: "Bronze → Silver → Gold layers for governed analytics." },
  { id: "transform", label: "Transformation", tool: "dbt", detail: "Tested models, incremental loads, and dimensional business logic." },
  { id: "analytics", label: "Analytics", tool: "Power BI", detail: "Semantic models and decision-ready dashboards for the business." },
];

const dashboards = [
  { name: "Executive sales", question: "How is revenue trending across the retail business?", kpis: ["$2.84M revenue", "+18.6% YoY", "24.8K orders"], bars: [42, 58, 48, 73, 64, 88, 79, 96] },
  { name: "Product & inventory", question: "Which products need attention before availability drops?", kpis: ["91.4% in stock", "184 SKUs low", "12.8K units"], bars: [78, 65, 82, 57, 72, 49, 61, 54] },
  { name: "Store performance", question: "Where are stores outperforming or falling behind?", kpis: ["48 stores", "86.2% target hit", "7 regions"], bars: [52, 75, 68, 90, 61, 84, 72, 78] },
  { name: "Customer & returns", question: "Which segments generate value, and where are returns hurting margin?", kpis: ["18.4K customers", "6.8% return rate", "$154 RPC"], bars: [35, 45, 62, 58, 76, 70, 84, 91] },
];

const principles = [
  ["01", "Reliable", "Data pipelines should be predictable and observable."],
  ["02", "Scalable", "Design systems that can grow with data volume."],
  ["03", "Tested", "Data quality should be validated before analytics."],
  ["04", "Modeled", "Transform raw data into clear analytical models."],
  ["05", "Automated", "Reduce repetitive manual processes."],
  ["06", "Business-driven", "Technology should solve real business problems."],
] as const;

const externalLinks = {
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  email: "mailto:harish.kumar@example.com",
};

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label" data-testid={`section-label-${number}`}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({ children, href, testId }: { children: string; href: string; testId: string }) {
  return (
    <a className="arrow-link" href={href} data-testid={testId}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={15} />
    </a>
  );
}

function PipelineGraphic({ compact = false }: { compact?: boolean }) {
  const nodes = compact ? architecture.slice(0, 4) : architecture;
  return (
    <div className={`pipeline-graphic ${compact ? "pipeline-graphic-compact" : ""}`} data-testid={compact ? "project-architecture-preview" : "hero-pipeline-visual"}>
      {nodes.map((node, index) => (
        <div className="pipeline-step" key={node.id}>
          <div className="pipeline-node">
            <span className="pipeline-node-dot" />
            <span className="pipeline-node-tool">{node.tool}</span>
            <span className="pipeline-node-label">{node.label}</span>
          </div>
          {index < nodes.length - 1 && <div className="pipeline-connector"><span /></div>}
        </div>
      ))}
    </div>
  );
}

function DashboardPreview({ bars, index }: { bars: number[]; index: number }) {
  return (
    <div className="dashboard-preview" data-testid={`dashboard-preview-${index}`}>
      <div className="dashboard-toolbar"><span className="dashboard-dot" /><span className="dashboard-dot" /><span className="dashboard-dot" /><span className="dashboard-toolbar-title">BI / {String(index + 1).padStart(2, "0")}</span></div>
      <div className="dashboard-body">
        <div className="dashboard-chart-label">Performance overview <span>Last 12 months</span></div>
        <div className="dashboard-chart">
          {bars.map((height, barIndex) => <div className="dashboard-bar" style={{ height: `${height}%` }} key={`${index}-${barIndex}`} />)}
        </div>
        <div className="dashboard-axis"><span>JAN</span><span>APR</span><span>JUL</span><span>OCT</span><span>DEC</span></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeStack, setActiveStack] = useState<keyof typeof stackGroups>("Data engineering");
  const [selectedProject, setSelectedProject] = useState(0);
  const [activeArchitecture, setActiveArchitecture] = useState("warehouse");
  const [activeDashboard, setActiveDashboard] = useState(0);
  const selectedArchitecture = architecture.find((node) => node.id === activeArchitecture) ?? architecture[3];
  const dashboard = dashboards[activeDashboard];

  const closeMobile = () => setMobileOpen(false);

  return (
    <main className="portfolio-shell" data-testid="portfolio-page">
      <header className="site-nav" data-testid="site-navigation">
        <a className="brand-mark" href="#top" onClick={closeMobile} data-testid="brand-home-link">
          <span className="brand-symbol">HK</span>
          <span>Harish Kumar</span>
        </a>
        <nav className={`nav-links ${mobileOpen ? "nav-links-open" : ""}`} data-testid="desktop-navigation">
          {navItems.map(([label, id]) => <a href={`#${id}`} onClick={closeMobile} key={id} data-testid={`nav-${id}-link`}>{label}</a>)}
          <a className="nav-connect" href={externalLinks.email} data-testid="nav-connect-link">Let's connect <ArrowDownRight size={14} /></a>
        </nav>
        <Button className="mobile-menu-button" variant="ghost" size="icon" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} data-testid="mobile-navigation-toggle">
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </Button>
      </header>

      <section className="hero-section" id="top" data-testid="hero-section">
        <div className="hero-grid-bg" />
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} data-testid="hero-eyebrow">
            <span className="eyebrow-pulse" /> Harish Kumar <span className="eyebrow-slash">/</span> Data engineer
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} data-testid="hero-heading">
            Building data systems<br /><span>that turn raw events</span><br />into business insights<span className="heading-period">.</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} data-testid="hero-description">
            I build scalable data pipelines, cloud data platforms, analytics workflows, and business intelligence solutions using the modern data stack.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}>
            <Button className="button-cyan" size="lg" render={<a href="#projects" />} data-testid="hero-view-projects-button">View projects <ArrowDownRight size={16} /></Button>
            <a className="text-action" href={externalLinks.github} target="_blank" rel="noreferrer" data-testid="hero-github-link">GitHub <MoveUpRight size={15} /></a>
          </motion.div>
          <div className="hero-stack-line" data-testid="hero-technology-line">Python <i /> SQL <i /> Snowflake <i /> AWS <i /> dbt <i /> Kafka-Redpanda <i /> Power BI</div>
        </div>
        <motion.div className="hero-visual-wrap" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.18 }}>
          <div className="visual-caption"><span>01 / system view</span><span>live architecture</span></div>
          <PipelineGraphic />
          <div className="visual-footer"><span><span className="tiny-status-dot" /> all systems operational</span><span>01—06</span></div>
        </motion.div>
      </section>

      <div className="ticker" data-testid="technology-ticker"><span>Data systems</span><span>Cloud platforms</span><span>Analytics engineering</span><span>Business intelligence</span><span>Data systems</span></div>

      <section className="section about-section" id="about" data-testid="about-section">
        <div className="section-intro"><SectionLabel number="01">About me</SectionLabel><p className="section-note" data-testid="about-section-note">From raw event to clear decision.</p></div>
        <div className="about-layout">
          <h2 data-testid="about-heading">I don't just analyze data.<br /><span>I build the systems</span><br />that make data usable.</h2>
          <div className="about-body"><p data-testid="about-description">I'm Harish Kumar, a data professional focused on building reliable data pipelines, cloud data platforms, data warehouses, transformations, and analytics solutions.</p><p data-testid="about-description-secondary">I work across the modern data stack — from generation and ingestion to storage, transformation, modeling, visualization, and business intelligence.</p><ArrowLink href="#contact" testId="about-contact-link">Work together</ArrowLink></div>
        </div>
        <div className="capability-grid">
          {["Data engineering", "Cloud data platforms", "Analytics & BI"].map((title, index) => (
            <Card className="capability-card" key={title} data-testid={`capability-card-${index + 1}`}>
              <div className="card-number">0{index + 1}</div><Network size={19} strokeWidth={1.5} className="card-icon" />
              <h3 data-testid={`capability-title-${index + 1}`}>{title}</h3>
              <p data-testid={`capability-description-${index + 1}`}>{["Building data pipelines, ingestion workflows, streaming systems, and reliable data processing.", "AWS S3, Snowflake, cloud storage, data warehousing, and scalable architectures.", "SQL, dbt, Power BI, DAX, dimensional modeling, business KPIs, and dashboards."][index]}</p>
              <span className="card-arrow"><ArrowDownRight size={17} /></span>
            </Card>
          ))}
        </div>
      </section>

      <section className="section stack-section" id="stack" data-testid="stack-section">
        <div className="section-intro"><SectionLabel number="02">The stack</SectionLabel><p className="section-note" data-testid="stack-section-note">Tools I use to build data systems.</p></div>
        <div className="stack-header"><h2 data-testid="stack-heading">A modern stack,<br /><span>used with intent.</span></h2><p data-testid="stack-description">The tools matter. The system thinking matters more.</p></div>
        <div className="stack-layout">
          <div className="stack-tabs" role="tablist" aria-label="Technology categories">
            {Object.keys(stackGroups).map((group) => <button className={`stack-tab ${activeStack === group ? "stack-tab-active" : ""}`} type="button" role="tab" aria-selected={activeStack === group} onClick={() => setActiveStack(group as keyof typeof stackGroups)} key={group} data-testid={`stack-category-${group.toLowerCase().replaceAll(" ", "-")}`}>{group}<ArrowRight size={14} /></button>)}
          </div>
          <div className="stack-chips" data-testid="active-stack-technologies">{stackGroups[activeStack].map((technology) => <Badge className="tech-chip" variant="outline" key={technology} data-testid={`technology-chip-${technology.toLowerCase().replaceAll(" ", "-")}`}>{technology}</Badge>)}</div>
        </div>
      </section>

      <section className="section projects-section" id="projects" data-testid="projects-section">
        <div className="section-intro"><SectionLabel number="03">Selected work</SectionLabel><p className="section-note" data-testid="projects-section-note">Real data systems. Real business problems.</p></div>
        <div className="projects-heading"><h2 data-testid="projects-heading">Projects that move<br /><span>from raw to ready.</span></h2><span className="project-count">0{projects.length} systems</span></div>
        <div className="project-list">
          {projects.map((project, index) => (
            <motion.div key={project.number} className={`project-card project-card-${project.accent} ${selectedProject === index ? "project-card-selected" : ""}`} whileHover={{ y: -5 }} onClick={() => setSelectedProject(index)} data-testid={`project-card-${index + 1}`}>
              <div className="project-topline"><span>{project.number} / {project.category}</span><span className="project-open-indicator">{selectedProject === index ? "Selected" : "Explore"} <ArrowDownRight size={15} /></span></div>
              <div className="project-content"><div className="project-info"><h3 data-testid={`project-title-${index + 1}`}>{project.title}</h3><p data-testid={`project-description-${index + 1}`}>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag} data-testid={`project-${index + 1}-tag-${tag.toLowerCase().replaceAll(" ", "-")}`}>{tag}</span>)}</div><button className="case-study-button" type="button" onClick={(event) => { event.stopPropagation(); setSelectedProject(index); document.getElementById("case-study")?.scrollIntoView({ behavior: "smooth" }); }} data-testid={`project-${index + 1}-case-study-button`}>View case study <ArrowRight size={15} /></button></div><div className="project-visual"><PipelineGraphic compact={index !== 0} /><div className="project-visual-grid" /></div></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section case-study-section" id="case-study" data-testid="case-study-section">
        <div className="case-study-header"><SectionLabel number="04">Flagship case study</SectionLabel><Badge variant="outline" className="case-study-badge">01 / Real-time retail data platform</Badge></div>
        <div className="case-study-title"><h2 data-testid="case-study-heading">A complete data platform<br /><span>for a moving business.</span></h2><p data-testid="case-study-description">Historical and streaming retail events, shaped into a reliable system for inventory, sales, customers, stores, and returns.</p></div>
        <div className="problem-solution-grid"><div><span className="mono-kicker">01 / the problem</span><h3 data-testid="case-study-problem-heading">Retail teams need<br />visibility now.</h3><p data-testid="case-study-problem-text">Sales, product availability, inventory, returns, customers, and stores all tell a different part of the story. The system connects them.</p></div><div><span className="mono-kicker">02 / the solution</span><h3 data-testid="case-study-solution-heading">One path from event<br />to insight.</h3><p data-testid="case-study-solution-text">Python generates events, Redpanda streams them, S3 preserves the raw layer, Snowflake warehouses it, dbt models it, and Power BI makes it useful.</p></div></div>
        <div className="architecture-panel" id="architecture" data-testid="architecture-section"><div className="architecture-panel-head"><div><span className="mono-kicker">03 / architecture</span><h3 data-testid="architecture-heading">The path of a retail event.</h3></div><span className="architecture-hint"><Play size={12} fill="currentColor" /> click a node to inspect</span></div><div className="architecture-flow">{architecture.map((node, index) => <div className="architecture-flow-item" key={node.id}><button type="button" className={`architecture-node ${activeArchitecture === node.id ? "architecture-node-active" : ""}`} onClick={() => setActiveArchitecture(node.id)} data-testid={`architecture-node-${node.id}`}><span className="architecture-node-index">0{index + 1}</span><span className="architecture-node-label">{node.label}</span><strong>{node.tool}</strong></button>{index < architecture.length - 1 && <div className="architecture-line"><span /></div>}</div>)}</div><div className="architecture-detail" data-testid="architecture-node-detail"><div className="detail-index">/ selected component</div><h4>{selectedArchitecture.tool}</h4><p>{selectedArchitecture.detail}</p><Check size={15} /></div></div>
        <div className="data-model-wrap"><div><span className="mono-kicker">04 / data model</span><h3 data-testid="data-model-heading">A star schema for<br />clear questions.</h3><p data-testid="data-model-description">A simple analytical shape keeps business concepts easy to query, test, and explain.</p></div><div className="star-schema" data-testid="star-schema-diagram"><div className="schema-node schema-fact">FACT_RETAIL_EVENTS</div><div className="schema-node schema-customer">DIM_CUSTOMER</div><div className="schema-node schema-product">DIM_PRODUCT</div><div className="schema-node schema-store">DIM_STORE</div><div className="schema-node schema-date">DIM_DATE</div><div className="schema-line schema-line-v1" /><div className="schema-line schema-line-v2" /><div className="schema-line schema-line-h1" /><div className="schema-line schema-line-h2" /></div></div>
        <div className="data-flow-strip" data-testid="data-flow-strip">{["Raw event", "Validation", "S3 landing", "Snowflake staging", "dbt transformation", "Fact & dimensions", "Power BI"].map((step, index) => <div key={step}><span>0{index + 1}</span>{step}{index < 6 && <ArrowRight size={13} />}</div>)}</div>
      </section>

      <section className="section analytics-section" id="analytics" data-testid="analytics-section">
        <div className="section-intro"><SectionLabel number="05">From data to decisions</SectionLabel><p className="section-note" data-testid="analytics-section-note">Engineering is only part of the workflow.</p></div>
        <div className="analytics-header"><h2 data-testid="analytics-heading">The last mile<br /><span>is the point.</span></h2><p data-testid="analytics-description">A reliable pipeline earns its value when a decision-maker can see the signal, trust the metric, and act on it.</p></div>
        <div className="analytics-layout"><div className="dashboard-tabs" role="tablist" aria-label="Dashboard areas">{dashboards.map((item, index) => <button className={`dashboard-tab ${activeDashboard === index ? "dashboard-tab-active" : ""}`} type="button" onClick={() => setActiveDashboard(index)} role="tab" aria-selected={activeDashboard === index} key={item.name} data-testid={`dashboard-tab-${index + 1}`}><span>0{index + 1}</span>{item.name}<ArrowRight size={14} /></button>)}</div><div className="dashboard-case-study"><DashboardPreview bars={dashboard.bars} index={activeDashboard} /><div className="dashboard-insight"><span className="mono-kicker">business question</span><h3 data-testid="dashboard-question">{dashboard.question}</h3><div className="dashboard-kpis">{dashboard.kpis.map((kpi) => <div key={kpi} data-testid={`dashboard-kpi-${kpi.split(" ")[0].toLowerCase()}`}>{kpi}</div>)}</div><ArrowLink href="#contact" testId="dashboard-insight-link">Discuss the insight</ArrowLink></div></div></div>
      </section>

      <section className="section principles-section" data-testid="principles-section"><div className="section-intro"><SectionLabel number="06">How I build</SectionLabel><p className="section-note" data-testid="principles-section-note">Principles over preferences.</p></div><div className="principles-heading"><h2 data-testid="principles-heading">Good data work<br /><span>compounds.</span></h2><p data-testid="principles-description">The best systems make the next question easier to answer than the last.</p></div><div className="principles-grid">{principles.map(([number, title, description]) => <div className="principle" key={number} data-testid={`principle-${number}`}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>

      <section className="terminal-section" data-testid="terminal-section"><div className="terminal-topline"><span>data-platform / runtime</span><span><span className="tiny-status-dot" /> visual system check</span></div><div className="terminal-grid"><div className="terminal-copy"><span className="mono-kicker">07 / pipeline status</span><h2 data-testid="terminal-heading">Quietly reliable<br /><span>by design.</span></h2><p data-testid="terminal-description">The system is only impressive when it keeps doing its job.</p></div><div className="terminal-window" data-testid="terminal-window"><div className="terminal-window-bar"><span>pipeline_status</span><span>●</span></div><div className="terminal-lines">{[["INGESTION", "ONLINE"], ["STREAMING", "ONLINE"], ["S3 STORAGE", "ONLINE"], ["SNOWFLAKE", "ONLINE"], ["DBT", "ONLINE"], ["POWER BI", "ONLINE"]].map(([label, status]) => <div key={label}><span>{label}</span><i /><strong>{status}</strong></div>)}</div><div className="terminal-result"><span>system status:</span><strong><span className="tiny-status-dot" /> all systems operational</strong></div></div></div></section>

      <section className="section github-section" data-testid="github-section"><div className="section-intro"><SectionLabel number="08">Code that builds the system</SectionLabel><p className="section-note" data-testid="github-section-note">Selected repositories / placeholder links.</p></div><div className="github-heading"><h2 data-testid="github-heading">Show the work.<br /><span>Share the thinking.</span></h2><a className="github-main-link" href={externalLinks.github} target="_blank" rel="noreferrer" data-testid="github-main-link"><Code2 size={17} /> View GitHub <MoveUpRight size={15} /></a></div><div className="repo-grid">{projects.map((project, index) => <Card className="repo-card" key={project.title} data-testid={`repository-card-${index + 1}`}><div className="repo-top"><Code2 size={18} /><span>public / project-{project.number}</span></div><h3 data-testid={`repository-title-${index + 1}`}>{index === 0 ? "retail-data-platform" : index === 1 ? "hotel-booking-warehouse" : "customer-sales-analytics"}</h3><p>{project.description}</p><div className="repo-bottom"><span>{project.tags.slice(0, 3).join(" · ")}</span><a href={externalLinks.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`} data-testid={`repository-${index + 1}-link`}><MoveUpRight size={15} /></a></div></Card>)}</div></section>

      <section className="next-step-section" id="contact" data-testid="contact-section"><div className="next-step-label"><span className="tiny-status-dot" /> Open to data engineering opportunities</div><h2 data-testid="contact-heading">Let's build<br /><span>something with data.</span></h2><p data-testid="contact-description">Open to opportunities, collaborations, and interesting data engineering problems.</p><div className="contact-actions"><Button className="button-cyan" size="lg" render={<a href={externalLinks.email} />} data-testid="contact-email-button"><Mail size={16} /> Email me</Button><a className="contact-text-link" href={externalLinks.linkedin} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link"><BriefcaseBusiness size={16} /> LinkedIn</a><a className="contact-text-link" href={externalLinks.github} target="_blank" rel="noreferrer" data-testid="contact-github-link"><Code2 size={16} /> GitHub</a></div><div className="placeholder-note" data-testid="placeholder-links-note">Placeholder links are ready to replace with Harish's live profiles and resume.</div></section>

      <footer className="site-footer" data-testid="site-footer"><div className="footer-brand"><span className="brand-symbol">HK</span><div><strong data-testid="footer-name">Harish Kumar</strong><span data-testid="footer-role">Data engineer</span></div></div><div className="footer-links"><a href="#about" data-testid="footer-about-link">About</a><a href="#projects" data-testid="footer-projects-link">Projects</a><a href="#stack" data-testid="footer-stack-link">Stack</a><a href="#contact" data-testid="footer-contact-link">Contact</a></div><div className="footer-meta"><span>© 2026 Harish Kumar</span><span>Built with curiosity, SQL, Python and data.</span></div></footer>
    </main>
  );
}
