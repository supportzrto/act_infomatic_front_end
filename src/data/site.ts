import staffing from "@/assets/staffing.jpg";
import cloud from "@/assets/cloud.jpg";
import hire from "@/assets/hire.jpg";
import data from "@/assets/data.jpg";
import careers from "@/assets/careers.jpg";

export const company = {
  name: "Act Informatics, Inc.",
  address: "4 Diggins Crt, South Windsor, CT 06040",
  phone: "860-881-6811",
  phoneHref: "tel:+18608816811",
  email: "Srini@actinformatics.com",
  jobsEmail: "jobs@actinformatics.com",
};

// Client names as listed on the original actinformatics.com site.
export const clients = [
  "The Hartford", "Aetna", "ConnectiCare", "Cigna", "Pfizer", "Merck", "Citigroup",
  "ING Financial", "FedEx", "Cisco Systems", "EDS", "Verizon", "IBM", "BB&T",
  "Lucent Technologies", "Travelers Insurance",
];

export type ServiceGroup = "talent" | "technology";

export type Service = {
  slug: string;
  group: ServiceGroup;
  title: string;
  short: string;
  tagline: string;
  intro: string;
  image: string;
  offerings: { title: string; text: string }[];
  process: string[];
  idealFor: string[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "it-staffing",
    group: "talent",
    title: "IT Staffing Services",
    short: "IT Staffing",
    tagline: "Skilled technology professionals, matched to your projects and culture.",
    intro:
      "Our IT staffing practice connects organizations with experienced developers, analysts, architects, testers and administrators. We combine technical screening with a clear understanding of your environment so every placement can contribute from day one.",
    image: staffing,
    offerings: [
      { title: "Application & software roles", text: "Java, .Net, web and enterprise application developers and leads." },
      { title: "Data & BI roles", text: "Data warehousing, ETL (including Informatica), BI and reporting specialists." },
      { title: "ERP & enterprise roles", text: "Oracle, SAP and enterprise platform consultants." },
      { title: "Quality assurance", text: "Manual and automated QA engineers and test leads." },
    ],
    process: ["Understand the role and team", "Source and technically screen", "Present a focused shortlist", "Coordinate interviews and onboarding"],
    idealFor: ["Teams scaling for a new initiative", "Hard-to-fill technical skill sets", "Organizations needing a dependable staffing partner"],
    related: ["contract-staffing", "contract-to-hire", "direct-hire"],
  },
  {
    slug: "contract-staffing",
    group: "talent",
    title: "Contract Staffing",
    short: "Contract Staffing",
    tagline: "Flexible, project-based expertise exactly when you need it.",
    intro:
      "Contract staffing gives you qualified IT consultants for a defined period — to deliver a project, cover a peak workload or bring in specialist skills — without adding permanent headcount.",
    image: staffing,
    offerings: [
      { title: "Short- and long-term contracts", text: "Engagements sized to your project timeline." },
      { title: "Rapid ramp-up", text: "Pre-screened consultants ready to join active projects." },
      { title: "Specialist skills on demand", text: "Niche expertise for migrations, upgrades and implementations." },
      { title: "Simplified administration", text: "We handle consultant employment and payroll details." },
    ],
    process: ["Define scope, skills and duration", "Shortlist available consultants", "Onboard to your project", "Check in throughout the engagement"],
    idealFor: ["Time-boxed projects", "Seasonal or peak demand", "Budget-controlled initiatives"],
    related: ["contract-to-hire", "it-staffing", "managed-it-services"],
  },
  {
    slug: "contract-to-hire",
    group: "talent",
    title: "Contract-to-Hire",
    short: "Contract-to-Hire",
    tagline: "Evaluate on the job, then hire with confidence.",
    intro:
      "Contract-to-hire lets you work with a professional on a contract basis first, then convert them to a permanent employee once you've seen their skills and fit in your real environment.",
    image: hire,
    offerings: [
      { title: "Trial period", text: "Assess technical ability and team fit before making an offer." },
      { title: "Lower hiring risk", text: "Reduce the cost of a mis-hire for critical roles." },
      { title: "Smooth conversion", text: "We coordinate the transition from contract to permanent." },
      { title: "Candidate commitment", text: "Professionals who are actively seeking a long-term role." },
    ],
    process: ["Agree role, contract term and conversion terms", "Present qualified candidates", "Contract period with regular feedback", "Convert to permanent employment"],
    idealFor: ["New roles still being defined", "Critical hires where fit matters", "Teams that prefer to try before they hire"],
    related: ["contract-staffing", "direct-hire", "it-staffing"],
  },
  {
    slug: "direct-hire",
    group: "talent",
    title: "Direct Hire / Permanent Staffing",
    short: "Direct Hire / Permanent",
    tagline: "Permanent technology talent for the long term.",
    intro:
      "When you're building a lasting team, our direct hire service identifies, screens and presents candidates for permanent positions — so you meet only people who match your requirements and culture.",
    image: hire,
    offerings: [
      { title: "Targeted search", text: "Candidates sourced for your specific technology stack and seniority." },
      { title: "Thorough screening", text: "Technical and professional evaluation before you interview." },
      { title: "Offer support", text: "Help aligning expectations through offer and acceptance." },
      { title: "Long-term focus", text: "Placements built around retention, not just filling a seat." },
    ],
    process: ["Role and culture briefing", "Search and screening", "Shortlist and interviews", "Offer, acceptance and start"],
    idealFor: ["Core team positions", "Growing in-house capability", "Replacing long-term contractors"],
    related: ["executive-search", "contract-to-hire", "it-staffing"],
  },
  {
    slug: "executive-search",
    group: "talent",
    title: "Executive Search",
    short: "Executive Search",
    tagline: "Technology leaders who can set direction and deliver.",
    intro:
      "Our executive search service supports confidential searches for senior technology leadership — from IT directors and architects to heads of delivery — with a discreet, consultative approach.",
    image: hire,
    offerings: [
      { title: "Leadership roles", text: "IT directors, engineering and delivery leaders, enterprise architects." },
      { title: "Confidential searches", text: "Discreet outreach for sensitive or replacement searches." },
      { title: "In-depth assessment", text: "Evaluation of leadership, strategy and technical depth." },
      { title: "Market insight", text: "Guidance on candidate availability and expectations." },
    ],
    process: ["Leadership profile and success criteria", "Discreet market search", "Assessment and shortlist", "Selection, offer and transition"],
    idealFor: ["New leadership positions", "Confidential replacements", "Transformation programs needing senior direction"],
    related: ["direct-hire", "digital-transformation", "it-staffing"],
  },
  {
    slug: "cloud-consulting",
    group: "technology",
    title: "Cloud Consulting",
    short: "Cloud Consulting",
    tagline: "Plan, migrate and run on the cloud with clarity.",
    intro:
      "We help organizations assess readiness, design cloud architectures and move applications and data with a plan that balances cost, security and performance.",
    image: cloud,
    offerings: [
      { title: "Readiness assessment", text: "Review applications, data and infrastructure for cloud fit." },
      { title: "Architecture & design", text: "Scalable, secure target architectures." },
      { title: "Migration", text: "Phased moves of applications and data with minimal disruption." },
      { title: "Optimization", text: "Ongoing tuning of cost, performance and governance." },
    ],
    process: ["Assess current state", "Design target architecture", "Migrate in phases", "Optimize and govern"],
    idealFor: ["Data center exits", "Modernizing legacy systems", "Teams new to cloud operations"],
    related: ["managed-it-services", "digital-transformation", "application-development"],
  },
  {
    slug: "digital-transformation",
    group: "technology",
    title: "Digital Transformation",
    short: "Digital Transformation",
    tagline: "Modernize how your business works, not just its technology.",
    intro:
      "Building on our strategic consulting, technical architecture and enterprise architecture experience, we help organizations modernize processes and systems around clear business outcomes.",
    image: cloud,
    offerings: [
      { title: "Strategy & roadmap", text: "E-Business and technology strategy tied to business goals." },
      { title: "Enterprise architecture", text: "Target-state architecture and SOA-based integration." },
      { title: "Process modernization", text: "Digitizing manual and paper-based workflows." },
      { title: "Change enablement", text: "Training to help teams adopt new systems." },
    ],
    process: ["Discover goals and pain points", "Define roadmap", "Deliver in iterations", "Measure and refine"],
    idealFor: ["Organizations with aging systems", "Mergers and consolidations", "Customer experience initiatives"],
    related: ["cloud-consulting", "application-development", "data-analytics"],
  },
  {
    slug: "application-development",
    group: "technology",
    title: "Application Development",
    short: "Application Development",
    tagline: "Business applications built, maintained and modernized.",
    intro:
      "Application development and maintenance is one of Act Informatics' founding services. Our teams build and support enterprise applications on-site and off-shore, using technologies such as Java and .Net.",
    image: staffing,
    offerings: [
      { title: "Custom development", text: "Applications designed around your processes." },
      { title: "Maintenance & support", text: "Enhancements, fixes and ongoing support for existing systems." },
      { title: "ERP solutions", text: "Oracle ERP implementation and customization." },
      { title: "Offshore delivery", text: "Managed off-shore development for cost-effective scale." },
    ],
    process: ["Requirements and design", "Iterative development", "Quality assurance", "Deployment and support"],
    idealFor: ["New business applications", "Legacy modernization", "Extending in-house dev capacity"],
    related: ["data-analytics", "managed-it-services", "contract-staffing"],
  },
  {
    slug: "data-analytics",
    group: "technology",
    title: "Data & Analytics",
    short: "Data & Analytics",
    tagline: "From scattered data to decisions you can trust.",
    intro:
      "Our data warehousing and business intelligence practice designs the data foundations and reporting your teams rely on, with experience across tools such as Informatica, Cognos and Business Objects.",
    image: data,
    offerings: [
      { title: "Data warehousing", text: "Warehouse and data mart design and build." },
      { title: "Data integration", text: "ETL pipelines that consolidate data across systems." },
      { title: "Business intelligence", text: "Dashboards and reporting for every level of the business." },
      { title: "Data quality", text: "Validation and governance to keep data reliable." },
    ],
    process: ["Assess data sources", "Model and integrate", "Build reporting", "Govern and evolve"],
    idealFor: ["Fragmented reporting", "Regulated industries", "Leadership needing a single view"],
    related: ["application-development", "cloud-consulting", "digital-transformation"],
  },
  {
    slug: "managed-it-services",
    group: "technology",
    title: "Managed IT Services",
    short: "Managed IT Services",
    tagline: "Dependable ongoing support so your team can focus on growth.",
    intro:
      "Building on our managed off-shore services, we take responsibility for defined application and IT functions under agreed service levels — combining on-site and off-shore resources.",
    image: cloud,
    offerings: [
      { title: "Application support", text: "Monitoring, incident handling and enhancements." },
      { title: "Managed off-shore teams", text: "Dedicated teams operating as an extension of yours." },
      { title: "Service levels", text: "Clear responsibilities and reporting." },
      { title: "Continuous improvement", text: "Regular reviews to reduce issues and cost." },
    ],
    process: ["Transition and knowledge transfer", "Steady-state operations", "Reporting and reviews", "Ongoing improvement"],
    idealFor: ["Stable applications needing support", "Reducing operating cost", "Freeing internal teams for new work"],
    related: ["cloud-consulting", "application-development", "contract-staffing"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const talentServices = services.filter((s) => s.group === "talent");
export const techServices = services.filter((s) => s.group === "technology");

export const industries = [
  { name: "Healthcare & Pharma", text: "Insurers, providers and pharmaceutical companies with strict data, compliance and reliability needs." },
  { name: "Financial Services & Insurance", text: "Banks, insurers and financial firms running complex, regulated enterprise systems." },
  { name: "Telecommunications", text: "Carriers and network technology companies managing large-scale systems and data." },
  { name: "E-Commerce", text: "Online businesses needing scalable applications and fast-moving development teams." },
  { name: "Technology", text: "Technology and IT services companies that need specialist talent quickly." },
  { name: "Logistics", text: "Shipping and logistics operations that depend on dependable, data-driven systems." },
];

export const caseStudies = [
  {
    slug: "scaling-a-data-warehouse-team",
    sector: "Healthcare",
    title: "Scaling a data warehouse team for a reporting overhaul",
    service: "contract-staffing",
    challenge: "A healthcare organization needed several ETL and BI specialists to deliver a reporting modernization within a fixed timeline.",
    approach: "We supplied pre-screened data warehousing and BI consultants on contract, onboarded in phases as the project expanded.",
    outcome: "The client added the skills needed for the project without permanent headcount, then released consultants as phases completed.",
  },
  {
    slug: "contract-to-hire-for-a-core-dev-team",
    sector: "Insurance",
    title: "Building a permanent development team through contract-to-hire",
    service: "contract-to-hire",
    challenge: "An insurer wanted to grow its in-house Java team but was cautious after previous hires didn't fit.",
    approach: "Developers joined on contract with agreed conversion terms, giving managers time to assess skills and fit on live work.",
    outcome: "Developers who proved a strong fit were converted to permanent roles with confidence on both sides.",
  },
  {
    slug: "offshore-application-support",
    sector: "Financial Services",
    title: "Moving application support to a managed on-site/off-shore model",
    service: "managed-it-services",
    challenge: "A financial firm's internal team was spending most of its time supporting stable legacy applications.",
    approach: "We transitioned support to a blended on-site and off-shore team with defined responsibilities and regular reporting.",
    outcome: "The internal team was freed to focus on new initiatives while support continued under clear service expectations.",
  },
];

export const posts = [
  {
    slug: "contract-vs-contract-to-hire",
    title: "Contract vs. contract-to-hire: choosing the right model",
    category: "Hiring",
    minutes: 4,
    image: hire,
    excerpt: "Both bring in talent quickly — but they solve different problems. Here's how to decide.",
    body: [
      "Contract staffing and contract-to-hire both let you bring in skilled professionals quickly, but they're built for different goals.",
      "Choose contract staffing when the work has a clear end: a migration, an upgrade, a peak period. You get the exact skills you need for as long as you need them, without long-term commitments.",
      "Choose contract-to-hire when the role is permanent but you want certainty first. The contract period lets you see how someone performs on your real systems and with your team before making an offer.",
      "A simple test: if you'd be disappointed to see the person leave when the project ends, contract-to-hire is probably the better fit.",
    ],
  },
  {
    slug: "preparing-for-a-cloud-migration",
    title: "Five questions to answer before a cloud migration",
    category: "Cloud",
    minutes: 5,
    image: cloud,
    excerpt: "A successful move to the cloud starts long before the first workload moves.",
    body: [
      "Cloud migrations succeed or stall based on the planning that happens up front. Before you move anything, answer these questions.",
      "1. Which applications should move first? Start with workloads that are lower-risk and well understood.",
      "2. What does success look like? Define cost, performance and availability targets you can measure.",
      "3. Who will run it afterward? Operating in the cloud needs new skills — plan for training, hiring or managed support.",
      "4. How will data move safely? Map dependencies and plan for validation and rollback.",
      "5. How will you control cost? Establish tagging, budgets and regular reviews from day one.",
    ],
  },
  {
    slug: "landing-your-next-it-role",
    title: "How to stand out when applying for IT roles",
    category: "Careers",
    minutes: 3,
    image: careers,
    excerpt: "Practical tips for job seekers working with a staffing partner.",
    body: [
      "Recruiters and hiring managers often review resumes quickly. Make the important things easy to find.",
      "Lead with your core technologies and the environments you've used them in. Be specific: versions, tools and the scale of the systems you worked on.",
      "Describe outcomes, not just duties. What did your work make possible?",
      "Keep learning visible. Recent training and certifications show you're keeping pace with technology.",
      "Finally, be clear about what you want — contract, contract-to-hire or permanent — so your recruiter can match you to the right opportunities.",
    ],
  },
  {
    slug: "why-data-warehousing-still-matters",
    title: "Why a solid data foundation still matters",
    category: "Data & Analytics",
    minutes: 4,
    image: data,
    excerpt: "Dashboards are only as good as the data underneath them.",
    body: [
      "New analytics tools arrive constantly, but every one of them depends on consistent, trustworthy data.",
      "A well-designed data warehouse brings data from separate systems into one place, applies consistent definitions and keeps history — so reports agree with each other.",
      "Investing in integration and data quality first means every dashboard built later is faster to create and easier to trust.",
    ],
  },
];

import type { NetworkVariant } from "@/components/network";

/** Which form the signature network takes on each service page. */
const visuals: Record<string, NetworkVariant> = {
  "it-staffing": "talent",
  "contract-staffing": "talent",
  "contract-to-hire": "talent",
  "direct-hire": "talent",
  "executive-search": "talent",
  "cloud-consulting": "cloud",
  "digital-transformation": "hero",
  "application-development": "modules",
  "data-analytics": "data",
  "managed-it-services": "cloud",
};
export const visualFor = (slug: string): NetworkVariant => visuals[slug] ?? "hero";
