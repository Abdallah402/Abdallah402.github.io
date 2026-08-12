/**
 * Knowledge base for the site's "ask me anything" chatbot.
 * Same content model as the Python RAG demo — each entry is a source
 * document that gets chunked and retrieved. Sections marked [FILL IN]
 * are gaps to fill in with your own words before relying on this live.
 */
const KNOWLEDGE = [
  {
    id: "bio-overview",
    source: "About — Overview",
    text: "I'm Abdallah Ayyash, a Software Developer at Spikes Trophy in Philadelphia. I graduated from Penn State Abington in May 2025 with a B.S. in Information Technology, GPA 3.6/4.0. I'm currently open to software engineer and AI automation engineer roles. My background is building production automation systems — connecting ERPs, APIs, and business workflows to remove manual work — and I'm actively closing the gap toward more AI/agent-focused engineering. [FILL IN: the one or two sentences you'd say out loud to introduce yourself.]"
  },
  {
    id: "career-goals",
    source: "About — Career Goals",
    text: "I'm looking for roles as a software engineer or AI automation engineer. I want to keep building systems that connect real business processes to automation and AI — the kind of work I did with the invoice pipeline at Spikes Trophy, but with more direct exposure to LLM tooling: agents, RAG pipelines, and orchestration frameworks like LangChain and LangGraph. [FILL IN: why you're looking to move on, and what you want that you don't have now.]"
  },
  {
    id: "work-style",
    source: "About — How I Work",
    text: "[FILL IN: How do you approach a problem you don't know how to solve? Independent or collaborative? How do you handle disagreement with a teammate? A real mistake and what you learned from it?]"
  },
  {
    id: "strengths",
    source: "About — Strengths & Growth Areas",
    text: "A real strength: taking a messy manual process — invoice entry, payroll, offboarding — and turning it into a working automated system end to end, repeatedly, across different companies and stacks. A real, honestly-stated growth area: hands-on production experience with LLM/agent frameworks — LangChain, LangGraph, vector databases, RAG — which I'm actively building toward rather than claiming as mastered. [FILL IN: one more strength and one more growth area, in your own words.]"
  },
  {
    id: "spikes-invoice",
    source: "Project — Invoice Automation Pipeline",
    text: "At Spikes Trophy, I built an AI-powered pipeline that reads incoming PDF invoices and automatically loads the extracted data into the company's M1 ERP system, using Google Document AI to extract structured fields and Power Automate to route and validate the data. Before this, processing a single invoice took 10 to 15 minutes of manual data entry; after automation it takes seconds — about a 99% reduction in processing time. [FILL IN: hardest part of building it, what you got wrong the first time, how you validated accuracy.]"
  },
  {
    id: "spikes-erp",
    source: "Project — ERP/Shopify Integration",
    text: "I built and maintain the backend systems connecting Spikes Trophy's ERP and its Shopify storefronts, keeping orders, products, and customer data synchronized across the business, using C#, SQL Server, and JavaScript. I also designed a service managing product catalogs across multiple Shopify stores from one place, cutting manual updates and pricing errors through automated sync logic."
  },
  {
    id: "wistar",
    source: "Project — Employee Offboarding System",
    text: "At the Wistar Institute, I led the design of a centralized employee offboarding system using SharePoint and Power Automate, replacing a scattered manual process with one trackable workflow. I built Power BI dashboards giving managers a live view of offboarding status, and automated notification and account-deactivation steps."
  },
  {
    id: "autoworks",
    source: "Project — Autoworks Shop Tools",
    text: "At Autoworks, I built the internal tools the shop used to track jobs and manage customer intake, in SQL and JavaScript, handling over 200 jobs. I automated scheduling and invoicing workflows and integrated VIN decoder and CARFAX APIs so vehicle details populated automatically."
  },
  {
    id: "employee-mgmt",
    source: "Project — Employee Management System",
    text: "I built a full internal platform for managing employees from onboarding to payroll, using Node.js, SQL, and JavaScript, with role-based access control, time tracking, approval flows, and a complete audit log. It replaced a third-party payroll service and cut payroll processing from hours to about one minute."
  },
  {
    id: "mechanic-shop-pro",
    source: "Project — Mechanic Shop Pro",
    text: "Mechanic Shop Pro is a full shop management app I built for Autoworks — Node.js, SQL, JavaScript, the Stripe API, and the CARFAX API — handling job tracking, customer intake, scheduling, and invoicing from one place, with Stripe integrated for payments. Estimated to have improved shop efficiency by around 50%."
  },
  {
    id: "package-dim",
    source: "Project — Automated Package Dimensioning",
    text: "I built a physical system using a Raspberry Pi and camera that automatically measures package dimensions in real time using computer vision, Python, and OpenCV, letting warehouse employees get accurate measurements instantly."
  },
  {
    id: "education",
    source: "About — Education",
    text: "I graduated from Pennsylvania State University, Abington in May 2025 with a B.S. in Information Technology, GPA 3.6/4.0. Relevant coursework: Data Structures & Algorithms, Database Systems, System Design, Software Engineering, API Development, Computer Networks. I was involved in the Penn State Abington Technology and Innovation Society from 2024-2025, supporting peers through project guidance and office hours."
  },
  {
    id: "skills",
    source: "About — Technical Skills",
    text: "Languages: Python, Java, C#, JavaScript/TypeScript, SQL, Bash, HTML/CSS. Frameworks: Node.js, .NET/ASP.NET, REST API, GraphQL. Cloud & DevOps: Azure, AWS, GitHub, Azure DevOps, CI/CD, Docker, Kubernetes. Data: SQL Server, PostgreSQL, MongoDB, Oracle Apex, Power BI. Tools: Git, Agile/Scrum, Power Automate, SharePoint, Postman. Currently building hands-on experience with LangChain, LangGraph, vector databases, and RAG pipelines."
  },
  {
    id: "outside-work",
    source: "About — Outside of Work",
    text: "[FILL IN: hobbies, interests, what you do outside work — the stuff that makes you memorable after the interview ends.]"
  }
];

if (typeof module !== "undefined") module.exports = { KNOWLEDGE };
