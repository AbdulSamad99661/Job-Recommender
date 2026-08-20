export const SAMPLE_RESUMES = {
  default: {
    id: "cv-001",
    name: "Alex Morgan",
    title: "Senior Full-Stack & AI Web Engineer",
    email: "alex.morgan@example.com",
    phone: "+92 300 1234567 / +91 98765 43210",
    location: "Karachi, PK / Open to Remote (India & Pakistan)",
    summary: "Passionate Full-Stack Developer with 4 years of experience building modern web applications, intelligent automation dashboards, and responsive frontends using React, JavaScript, and Node.js. Enthusiastic about agentic AI workflows and semantic matching systems.",
    experienceLevel: "Mid-Senior (3.5 Years)",
    targetRole: "Full-Stack AI Engineer / Lead Frontend",
    topSkills: [
      { name: "React / Modern JS", rating: 95, category: "Frontend" },
      { name: "HTML5 / CSS3 Layouts", rating: 92, category: "Frontend" },
      { name: "Node.js / Express", rating: 88, category: "Backend" },
      { name: "Python Automation", rating: 84, category: "AI / Automation" },
      { name: "REST APIs & Webhooks", rating: 90, category: "Backend" },
      { name: "Git & Web Performance", rating: 86, category: "DevOps" }
    ],
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Vanguard Tech Systems",
        period: "2023 - Present",
        description: "Architected responsive React SaaS dashboards, integrated REST APIs with Node.js backend services, and improved Core Web Vitals performance by 40%."
      },
      {
        role: "Frontend Developer",
        company: "Innovate Digital",
        period: "2021 - 2023",
        description: "Built pixel-perfect web interfaces, collaborated with UI/UX designers, and introduced modern CSS grid systems and accessible web standards."
      }
    ],
    education: [
      {
        degree: "B.S. in Computer Science",
        institution: "National University of Sciences & Technology (NUST)",
        year: "2017 - 2021",
        honors: "First Class Honors (GPA 3.82)"
      }
    ],
    insights: {
      matchScoreBoosters: [
        "Add Vector Database experience (ChromaDB / Pinecone) to gain +8% match score on AI roles",
        "Demonstrate FastAPI or GraphQL skills for higher backend alignment (+5%)",
        "Include Docker containerization examples for senior cloud positions (+6%)"
      ],
      strengthAreas: ["React Architecture", "Responsive CSS", "RESTful API Integration", "Async JS Logic"],
      weaknessAreas: ["Kubernetes Deployment", "TypeScript Strict Types"]
    }
  },
  aiDataSpecialist: {
    id: "cv-002",
    name: "Sarah Khan",
    title: "AI Specialist & Python Data Engineer",
    email: "sarah.khan@example.com",
    phone: "+92 321 9876543",
    location: "Lahore, Pakistan",
    summary: "Data & ML Engineer specialized in Python, Natural Language Processing, n8n workflow automation, and predictive data modeling. Focused on building automated agentic pipelines.",
    experienceLevel: "Junior-Mid (2.5 Years)",
    targetRole: "AI Developer / Data Analyst",
    topSkills: [
      { name: "Python / Data Stack", rating: 94, category: "AI / Automation" },
      { name: "n8n & Webhooks", rating: 90, category: "AI / Automation" },
      { name: "SQL & Databases", rating: 88, category: "Backend" },
      { name: "REST APIs", rating: 85, category: "Backend" },
      { name: "React Fundamentals", rating: 72, category: "Frontend" },
      { name: "Git Version Control", rating: 82, category: "DevOps" }
    ],
    experience: [
      {
        role: "AI Workflow Developer",
        company: "Automation Works",
        period: "2022 - Present",
        description: "Designed n8n orchestrations, integrated OpenAI APIs for automated resume parsing, and optimized SQL data transformation scripts."
      }
    ],
    education: [
      {
        degree: "B.S. in Artificial Intelligence",
        institution: "FAST NUCES",
        year: "2018 - 2022",
        honors: "Dean's Honor List"
      }
    ],
    insights: {
      matchScoreBoosters: [
        "Learn advanced React hook patterns to qualify for Full-Stack AI Engineer positions (+12%)",
        "Add cloud deployment experience (AWS Lambda / Cloud Run) (+7%)"
      ],
      strengthAreas: ["Python Scripting", "NLP Pipelines", "n8n Orchestration"],
      weaknessAreas: ["Advanced Frontend Styling", "GraphQL"]
    }
  },
  bellaTrevino: {
    id: "cv-bella-trevino",
    name: "Bella Trevino",
    title: "Web Developer (Full-Stack & React)",
    email: "bellatrevino@email.com",
    phone: "(123) 456-7890",
    location: "Chicago, IL / Open to Remote & International",
    summary: "Graduate of Computer Science with experience working across full-stack software development. Built internal book recommendation app in React/Node.js and Django-based tools.",
    experienceLevel: "Junior - Entry Level (GPA: 3.9)",
    targetRole: "Full-Stack Web Developer",
    topSkills: [
      { name: "JavaScript (React, Node.js)", rating: 94, category: "Frontend" },
      { name: "Python (Django, scikit-learn)", rating: 88, category: "AI / Automation" },
      { name: "SQL (PostgreSQL)", rating: 90, category: "Backend" },
      { name: "REST API Development", rating: 92, category: "Backend" },
      { name: "Agile & Cross-Functional", rating: 95, category: "Soft Skills" }
    ],
    experience: [
      {
        role: "Web Developer Intern",
        company: "Book of the Month",
        period: "April 2019 - September 2019",
        description: "Built an internal book recommendation app in React and Node.js. Partnered to architect PostgreSQL-backed search module for catalog filtering."
      },
      {
        role: "Creator - Social Media Scheduler",
        company: "UIC Project",
        period: "2019 - 2020",
        description: "Designed Django-and-Node scheduling tool. Trained scikit-learn model on engagement data lifting interaction rates by 23%."
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science (GPA: 3.9)",
        institution: "University of Illinois Chicago",
        year: "2016 - 2020",
        honors: "Cum Laude Society • Presidential Scholarship"
      }
    ],
    insights: {
      matchScoreBoosters: [
        "Add production React 19 / Vite project examples to increase match score to 95%",
        "Highlight PostgreSQL optimization & REST API experiences on resume"
      ],
      strengthAreas: ["React & Node.js", "Django & Scikit-Learn", "PostgreSQL", "REST API Development"],
      weaknessAreas: ["Kubernetes", "AWS Infrastructure"]
    }
  }
};

/** Plain-text CV snippets sent to backend when using sample profiles (no PDF file) */
export const SAMPLE_RESUME_TEXT = {
  default: `Alex Morgan
Senior Full-Stack & AI Web Engineer
alex.morgan@example.com | +92 300 1234567 | Karachi, Pakistan

SUMMARY
Passionate Full-Stack Developer with 4 years of experience building modern web applications using React, JavaScript, Node.js, Python, REST APIs, and Git.

SKILLS
React, JavaScript, TypeScript, Node.js, Express, Python, HTML5, CSS3, Tailwind CSS, PostgreSQL, SQL, REST APIs, Docker, Git, Agile

EXPERIENCE
Senior Software Engineer | Vanguard Tech Systems | 2023 - Present
Architected responsive React SaaS dashboards, integrated REST APIs with Node.js backend services.

Frontend Developer | Innovate Digital | 2021 - 2023
Built pixel-perfect web interfaces with modern CSS and accessible web standards.

EDUCATION
B.S. in Computer Science | National University of Sciences & Technology (NUST) | 2017 - 2021`,

  aiDataSpecialist: `Sarah Khan
AI Specialist & Python Data Engineer
sarah.khan@example.com | +92 321 9876543 | Lahore, Pakistan

SUMMARY
Data & ML Engineer specialized in Python, NLP, n8n workflow automation, SQL, and predictive data modeling.

SKILLS
Python, Machine Learning, SQL, PostgreSQL, n8n, REST APIs, React, Git, Pandas, NumPy

EXPERIENCE
AI Workflow Developer | Automation Works | 2022 - Present
Designed n8n orchestrations and integrated OpenAI APIs for automated resume parsing.

EDUCATION
B.S. in Artificial Intelligence | FAST NUCES | 2018 - 2022`,

  bellaTrevino: `Bella Trevino
Web Developer (Full-Stack & React)
bellatrevino@email.com | (123) 456-7890 | Chicago, IL

SUMMARY
Computer Science graduate with full-stack experience in React, Node.js, Python, Django, PostgreSQL, and REST API development.

SKILLS
JavaScript, React, Node.js, Python, Django, scikit-learn, PostgreSQL, SQL, REST APIs, Agile

EXPERIENCE
Web Developer Intern | Book of the Month | April 2019 - September 2019
Built internal book recommendation app in React and Node.js with PostgreSQL search module.

Creator - Social Media Scheduler | UIC Project | 2019 - 2020
Designed Django-and-Node scheduling tool with scikit-learn engagement model.

EDUCATION
B.S. Computer Science (GPA: 3.9) | University of Illinois Chicago | 2016 - 2020`
};
