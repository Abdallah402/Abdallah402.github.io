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
    text: "Tell me about yourself — about me, my background, who I am: I'm Abdallah Ayyash, a Software Developer at Spikes Trophy in Philadelphia. I'm a Philly native — I went to Carver High School of Engineering and Science, then earned a full scholarship to Penn State Abington, where I studied Information Technology with a focus on application development, graduating in May 2025 with a 3.6 GPA. I'm currently open to software engineer and AI automation engineer roles. My background is building production automation systems — connecting ERPs, APIs, and business workflows to remove manual work — and I'm actively closing the gap toward more AI/agent-focused engineering."
  },
  {
    id: "career-goals",
    source: "About — Career Goals",
    text: "I'm looking for roles as a software engineer or AI automation engineer. I want to keep building systems that connect real business processes to automation and AI — the kind of work I did with the invoice pipeline at Spikes Trophy, but with more direct exposure to LLM tooling: agents, RAG pipelines, and orchestration frameworks like LangChain and LangGraph. What's mostly missing from where I am right now is structure — a defined team around me, and people more senior than me to learn from. I'm looking for a role with more of that: mentorship, a real team to be part of, not just working solo on most things."
  },
  {
    id: "work-style",
    source: "About — How I Work",
    text: "When I hit a problem I don't know how to solve, my first move is to take a step back and do research — read docs, look at how other people have solved it — before assuming I need to ask someone. I'm comfortable working solo or talking things through with a team; it genuinely doesn't matter to me either way, I just want to get it right. I haven't had a major mistake stand out at Spikes Trophy, but when smaller things came up, I'd flag it with my manager right away, get corrected on what I should've done differently, and take notes so it doesn't happen again."
  },
  {
    id: "strengths",
    source: "About — Strengths & Growth Areas",
    text: "A real strength: taking a messy manual process — invoice entry, payroll, offboarding — and turning it into a working automated system end to end, repeatedly, across different companies and stacks. Another one: communication — I'm good at explaining technical work clearly and keeping people in the loop, which matters a lot on integration work where you're constantly translating between different systems and teams. A real, honestly-stated growth area: hands-on production experience with LLM/agent frameworks — LangChain, LangGraph, vector databases, RAG — which I'm actively building toward rather than claiming as mastered."
  },
  {
    id: "spikes-invoice",
    source: "Project — Invoice Automation Pipeline",
    text: "At Spikes Trophy, I built an AI-powered pipeline that reads incoming PDF invoices and automatically loads the extracted data into the company's M1 ERP system, using Google Document AI to extract structured fields and Power Automate to route and validate the data. Before this, processing a single invoice took 10 to 15 minutes of manual data entry; after automation it takes seconds — about a 99% reduction in processing time."
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
    text: "I come from a family of mechanics, so fixing and building things — especially cars — has always been part of how I think. I still work on cars outside of work; there's a similar satisfaction to it as debugging a system, you're tracing a problem down to its actual cause instead of guessing. I also play tennis and pickleball."
  }
];

if (typeof module !== "undefined") module.exports = { KNOWLEDGE };
