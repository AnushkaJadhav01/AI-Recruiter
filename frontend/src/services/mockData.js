// Realistic recruitment mock data for AI Recruiter

export const mockJobs = [
  {
    id: "job-1",
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote (US/Canada)",
    type: "Full-time",
    status: "Open",
    postedDate: "2026-06-12",
    candidatesCount: 12,
    skills: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "AWS", "Framer Motion"],
    description: "We are looking for a Senior Full-Stack Developer to lead the engineering team for our core SaaS dashboard. You will own the front-to-back architecture, establish coding standards, and build responsive, premium user interfaces using React and Tailwind CSS."
  },
  {
    id: "job-2",
    title: "AI/ML Research Engineer",
    department: "AI Labs",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    status: "Open",
    postedDate: "2026-06-20",
    candidatesCount: 8,
    skills: ["Python", "PyTorch", "Transformers", "LLMs", "Docker", "SQL", "FastAPI"],
    description: "Join our AI research team to build and optimize advanced recommendation algorithms and custom LLM evaluation agents. You will work on fine-tuning models, scaling inference pipelines, and creating clean APIs for recruiting workflows."
  },
  {
    id: "job-3",
    title: "Lead UI/UX Product Designer",
    department: "Product Design",
    location: "Remote (Global)",
    type: "Full-time",
    status: "Open",
    postedDate: "2026-06-22",
    candidatesCount: 5,
    skills: ["Figma", "Design Systems", "Prototyping", "HTML/CSS", "User Research", "Wireframing"],
    description: "We are looking for a designer who is obsessed with aesthetics, minimalism, and premium UI layouts. You will build and scale our multi-platform design systems and design high-fidelity dashboards comparable to Stripe and Linear."
  },
  {
    id: "job-4",
    title: "DevOps & Infrastructure Lead",
    department: "Platform Engineering",
    location: "Austin, TX (In-Office)",
    type: "Full-time",
    status: "Draft",
    postedDate: "2026-06-28",
    candidatesCount: 0,
    skills: ["Terraform", "Kubernetes", "AWS", "CI/CD", "Prometheus", "Nginx", "Python"],
    description: "Manage and secure our cloud infrastructure, automate deployment pipelines, and improve service reliability. Responsibilities include migrating legacy containers, optimizing cloud spend, and implementing multi-region load balancing."
  },
  {
    id: "job-5",
    title: "Product Manager - AI Platform",
    department: "Product Management",
    location: "Remote (US)",
    type: "Full-time",
    status: "Closed",
    postedDate: "2026-05-10",
    candidatesCount: 24,
    skills: ["SaaS Product Lifecycle", "Agile Roadmap", "Data Analytics", "Customer Interviews", "SQL"],
    description: "Coordinate with engineering and sales to define the product roadmap for our candidate assessment APIs. Analyze product metrics, lead sprints, and drive product integrations with ATS systems."
  }
];

export const mockCandidates = [
  {
    id: "cand-1",
    name: "Sarah Jenkins",
    avatar: "SJ",
    role: "Senior Full-Stack Developer",
    experience: "7 years",
    skills: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "AWS", "GraphQL", "Redux"],
    githubScore: 92,
    linkedinScore: 89,
    overallScore: 94,
    recommendation: "Strong Match",
    confidence: 96,
    email: "sarah.jenkins@devmail.com",
    phone: "+1 (555) 234-5678",
    linkedinUrl: "linkedin.com/in/sarah-jenkins-dev",
    githubUsername: "sarahj-codes",
    jobId: "job-1",
    resumeSummary: "Sarah is a seasoned full-stack engineer with 7+ years of experience specialized in building scalable React dashboards, microservices in Node.js, and cloud configurations on AWS. She has a proven track record of optimizing page load speeds by 40% and leading developer teams of 5-8 members.",
    projects: [
      { name: "SaaS Dashboard Kit", stars: 124, description: "A highly customizable React dashboard boilerplate utilizing tailwindcss and Framer Motion.", url: "github.com/sarahj-codes/saas-dashboard-kit", language: "JavaScript" },
      { name: "QuickAPI Express", stars: 78, description: "Microservice boilerplate for building ultra-fast endpoints with automated Swagger docs.", url: "github.com/sarahj-codes/quickapi-express", language: "JavaScript" }
    ],
    experienceTimeline: [
      { role: "Senior Frontend Engineer", company: "Vercel Partner Agency", duration: "2023 - Present", description: "Led frontend development for 10+ enterprise dashboard products. Architected reusable component library." },
      { role: "Full Stack Developer", company: "HiringLoop Inc.", duration: "2021 - 2023", description: "Built microservices backend using Node.js and Express. Maintained PostgreSQL database and optimized query routines." },
      { role: "Junior Web Developer", company: "WebPixel Studio", duration: "2019 - 2021", description: "Implemented responsive user interfaces for clients. Managed Git versions and deployment cycles." }
    ],
    education: { degree: "B.S. in Computer Science", school: "University of Washington", year: "2019" },
    certifications: ["AWS Certified Solutions Architect", "Certified Scrum Master"],
    githubAnalysis: {
      stars: 202,
      forks: 34,
      totalRepos: 18,
      contributionsLastYear: 1450,
      languages: [
        { name: "JavaScript", percentage: 55 },
        { name: "TypeScript", percentage: 25 },
        { name: "HTML/CSS", percentage: 15 },
        { name: "SQL", percentage: 5 }
      ],
      projectQuality: "Excellent clean code structure, consistent linting, high test coverage (88%), and detailed README documentations.",
      technicalScore: 95
    },
    linkedinAnalysis: {
      growthRate: "Consistent promotion path",
      leadershipRating: "High (Mentored junior devs, ran sprint planning)",
      professionalSummary: "Results-driven engineer focused on writing clean, modular code. Recognized as top-performing individual contributor at HiringLoop.",
      recommendationsCount: 4,
      endorsements: [
        { skill: "React.js", count: 42 },
        { skill: "Node.js", count: 35 },
        { skill: "AWS Architecture", count: 18 }
      ]
    },
    skillGap: {
      matched: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "AWS"],
      missing: ["Framer Motion"],
      extra: ["GraphQL", "Redux", "Docker", "MongoDB"]
    },
    interviewQuestions: {
      easy: [
        { question: "Explain the difference between state and props in React.", answer: "Props are read-only components arguments passed down from parents, while state is local, mutable data managed internally by the component itself." }
      ],
      medium: [
        { question: "How would you optimize SQL queries for a dashboard displaying real-time data?", answer: "Implement appropriate database indexes, use pagination to restrict load sizes, cache stable lookup queries, and utilize explain plans to locate table scans." }
      ],
      hard: [
        { question: "Explain how you would handle complex animation-related re-renders using Framer Motion.", answer: "Leverage layoutId for shared layouts, isolate animating components to avoid parent re-renders, and use useTransform/useMotionValue to handle animations outside of the standard React state cycle." }
      ]
    }
  },
  {
    id: "cand-2",
    name: "Alex Rivera",
    avatar: "AR",
    role: "Senior Full-Stack Developer",
    experience: "5 years",
    skills: ["React", "Node.js", "Express", "SQL", "Tailwind CSS", "Docker", "Python", "Redis"],
    githubScore: 88,
    linkedinScore: 84,
    overallScore: 87,
    recommendation: "Good Match",
    confidence: 90,
    email: "rivera.alex@devmail.com",
    phone: "+1 (555) 987-6543",
    linkedinUrl: "linkedin.com/in/alex-rivera-dev",
    githubUsername: "rivera-alex",
    jobId: "job-1",
    resumeSummary: "Alex is a reliable software engineer with 5 years of experience in JavaScript web development and DevOps. He is highly proficient in Docker and Redis, making him strong in backend scaling and database caching layers.",
    projects: [
      { name: "Dockerized Express App", stars: 45, description: "A plug-and-play template for deploying Express, PostgreSQL, and Redis in local containers.", url: "github.com/rivera-alex/dockerized-express", language: "Shell" },
      { name: "RedisCacheWrapper", stars: 32, description: "An easy-to-use npm wrapper for caching database responses with automatic TTL settings.", url: "github.com/rivera-alex/rediscache-wrapper", language: "JavaScript" }
    ],
    experienceTimeline: [
      { role: "Software Engineer II", company: "DataSync Systems", duration: "2023 - Present", description: "Improved data processing system efficiency by 25%. Containerized development environments." },
      { role: "Full Stack Developer", company: "BuildCloud", duration: "2021 - 2023", description: "Developed web applications for enterprise clients. Handled database migrations and security upgrades." }
    ],
    education: { degree: "B.S. in Software Engineering", school: "UT Austin", year: "2021" },
    certifications: ["Docker Certified Associate"],
    githubAnalysis: {
      stars: 87,
      forks: 12,
      totalRepos: 12,
      contributionsLastYear: 980,
      languages: [
        { name: "JavaScript", percentage: 50 },
        { name: "Python", percentage: 30 },
        { name: "SQL", percentage: 10 },
        { name: "Docker/Shell", percentage: 10 }
      ],
      projectQuality: "Good separation of concerns. Average test coverage (65%). Commits are descriptive and organized.",
      technicalScore: 86
    },
    linkedinAnalysis: {
      growthRate: "Steady upward movement",
      leadershipRating: "Medium (Led database refactoring project)",
      professionalSummary: "Backend-leaning full stack developer focused on performance tuning, system architecture, and Docker deployments.",
      recommendationsCount: 1,
      endorsements: [
        { skill: "Node.js", count: 28 },
        { skill: "Docker", count: 24 },
        { skill: "Redis", count: 15 }
      ]
    },
    skillGap: {
      matched: ["React", "Node.js", "Express", "Tailwind CSS"],
      missing: ["AWS", "PostgreSQL", "Framer Motion"],
      extra: ["Docker", "Python", "Redis", "SQL"]
    },
    interviewQuestions: {
      easy: [
        { question: "What is Docker and why use it?", answer: "Docker is a containerization platform that packages an application and its dependencies into a lightweight, portable container, guaranteeing it runs consistently across environments." }
      ],
      medium: [
        { question: "How does Redis cache invalidation work?", answer: "It can be handled using Time-To-Live (TTL) expiration, active deletion on update, or utilizing cache expulsion algorithms like Least Recently Used (LRU) when memory is full." }
      ],
      hard: [
        { question: "Describe how to set up an Express API cluster to handle heavy loads.", answer: "Use the Node.js cluster module to spawn multiple worker processes that share the same port, or deploy multiple containerized instances behind an Nginx load balancer." }
      ]
    }
  },
  {
    id: "cand-3",
    name: "Elena Rostova",
    avatar: "ER",
    role: "AI/ML Research Engineer",
    experience: "4 years",
    skills: ["Python", "PyTorch", "Transformers", "LLMs", "FastAPI", "Docker", "numpy", "pandas", "scikit-learn"],
    githubScore: 95,
    linkedinScore: 91,
    overallScore: 93,
    recommendation: "Strong Match",
    confidence: 94,
    email: "elena.r@mlmail.io",
    phone: "+1 (555) 789-0123",
    linkedinUrl: "linkedin.com/in/elena-rostova-ml",
    githubUsername: "rostova-elena",
    jobId: "job-2",
    resumeSummary: "Elena is an expert ML engineer with 4 years of experience focusing on LLMs and transformer architectures. She has worked extensively on fine-tuning open-source models (LLaMA, Mistral) for domain-specific NLP applications and deploying them efficiently via FastAPI and Docker.",
    projects: [
      { name: "LocalLLM-Optimizer", stars: 345, description: "Quantization tools for running large models on consumer GPUs with minimal precision loss.", url: "github.com/rostova-elena/localllm-optimizer", language: "Python" },
      { name: "FastAPI-ML-Deploy", stars: 189, description: "A scalable, production-ready template for serving PyTorch predictions with request batching.", url: "github.com/rostova-elena/fastapi-ml-deploy", language: "Python" }
    ],
    experienceTimeline: [
      { role: "NLP Research Scientist", company: "CognitiveAgents LLC", duration: "2023 - Present", description: "Fine-tuned models for proprietary conversational assistants. Built retrieval-augmented generation (RAG) pipelines." },
      { role: "Machine Learning Engineer", company: "VisionAI", duration: "2022 - 2023", description: "Worked on computer vision classifiers and model compression techniques. Managed training clusters." }
    ],
    education: { degree: "M.S. in Artificial Intelligence", school: "Stanford University", year: "2022" },
    certifications: [],
    githubAnalysis: {
      stars: 534,
      forks: 78,
      totalRepos: 10,
      contributionsLastYear: 1890,
      languages: [
        { name: "Python", percentage: 80 },
        { name: "C++", percentage: 12 },
        { name: "Docker/Shell", percentage: 8 }
      ],
      projectQuality: "Exceptional. Research code is highly optimized, documented, and includes regression tests for model parameters.",
      technicalScore: 98
    },
    linkedinAnalysis: {
      growthRate: "Rapid career progression",
      leadershipRating: "Medium (Supervised 2 intern projects)",
      professionalSummary: "Research-driven ML engineer specializing in LLM optimization, deep learning training pipelines, and efficient model hosting.",
      recommendationsCount: 2,
      endorsements: [
        { skill: "Python", count: 50 },
        { skill: "PyTorch", count: 48 },
        { skill: "Natural Language Processing", count: 35 }
      ]
    },
    skillGap: {
      matched: ["Python", "PyTorch", "Transformers", "LLMs", "Docker", "FastAPI"],
      missing: ["SQL"],
      extra: ["numpy", "pandas", "scikit-learn", "C++", "RAG"]
    },
    interviewQuestions: {
      easy: [
        { question: "What is a Transformer model?", answer: "A Transformer is a deep learning architecture that relies on self-attention mechanisms to process sequential data in parallel, avoiding recurrence and proving highly effective for NLP." }
      ],
      medium: [
        { question: "How does LLM quantization reduce memory footprint?", answer: "It maps weights from high-precision floating-point formats (e.g., FP32 or FP16) to lower-bit formats (e.g., INT8 or INT4), reducing model size and enabling faster hardware arithmetic." }
      ],
      hard: [
        { question: "Explain the pipeline of fine-tuning LLaMA-3 using LoRA.", answer: "LoRA freezes original weights and injects trainable rank decomposition matrices into self-attention layers. This drastically reduces trainable parameters, speeds up learning, and prevents catastrophic forgetting." }
      ]
    }
  },
  {
    id: "cand-4",
    name: "Marcus Chen",
    avatar: "MC",
    role: "Lead UI/UX Product Designer",
    experience: "8 years",
    skills: ["Figma", "Design Systems", "Prototyping", "HTML/CSS", "Wireframing", "React", "Illustrator"],
    githubScore: 72,
    linkedinScore: 93,
    overallScore: 91,
    recommendation: "Strong Match",
    confidence: 93,
    email: "marcus.chen@designart.com",
    phone: "+1 (555) 432-1098",
    linkedinUrl: "linkedin.com/in/marcus-chen-designer",
    githubUsername: "marcusdesign",
    jobId: "job-3",
    resumeSummary: "Marcus is an outstanding designer with 8 years of experience building design systems for high-growth tech companies. He bridges the gap between design and engineering, utilizing his skills in HTML/CSS and basic React to implement pixel-perfect user interfaces.",
    projects: [
      { name: "Spectrum-UI-Figma", stars: 56, description: "Open-source Figma token system aligned with Tailwind spacing variables.", url: "github.com/marcusdesign/spectrum-ui-figma", language: "HTML" },
      { name: "AeroCSS", stars: 28, description: "A tiny library of premium glassmorphic and blur utilities.", url: "github.com/marcusdesign/aerocss", language: "CSS" }
    ],
    experienceTimeline: [
      { role: "Lead Product Designer", company: "ScribeHQ", duration: "2022 - Present", description: "Created and maintained core product design system. Reduced design-to-development handoff times by 50%." },
      { role: "Senior Product Designer", company: "GrowthCart", duration: "2019 - 2022", description: "Designed onboarding flows that boosted signup conversions by 35%. Mentored two junior UI designers." }
    ],
    education: { degree: "B.F.A. in Graphic Communication", school: "RISD", year: "2018" },
    certifications: [],
    githubAnalysis: {
      stars: 84,
      forks: 8,
      totalRepos: 5,
      contributionsLastYear: 230,
      languages: [
        { name: "CSS", percentage: 60 },
        { name: "HTML", percentage: 25 },
        { name: "JavaScript", percentage: 15 }
      ],
      projectQuality: "Highly visual. Repositories consist mostly of documentation, design tokens, and CSS frameworks. Clean, semantic coding style.",
      technicalScore: 70
    },
    linkedinAnalysis: {
      growthRate: "Excellent leadership path",
      leadershipRating: "High (Led design system team, spoke at conferences)",
      professionalSummary: "Product designer committed to creating clean, readable, and highly accessible user flows. Skilled in responsive layouts and frontend integration.",
      recommendationsCount: 5,
      endorsements: [
        { skill: "Figma", count: 67 },
        { skill: "Design Systems", count: 54 },
        { skill: "UI/UX Design", count: 48 }
      ]
    },
    skillGap: {
      matched: ["Figma", "Design Systems", "Prototyping", "HTML/CSS", "Wireframing"],
      missing: ["User Research"],
      extra: ["React", "Illustrator", "After Effects"]
    },
    interviewQuestions: {
      easy: [
        { question: "What is a Design Token?", answer: "Design tokens are the visual design atoms (colors, spacing, fonts) stored as variables, allowing developers to maintain consistent brand representation across platforms." }
      ],
      medium: [
        { question: "How do you handle responsive screen grid structures?", answer: "By using fluid layouts, mobile-first design, and breakpoints in CSS that adjust spacing, columns, and navigation systems according to device viewport width." }
      ],
      hard: [
        { question: "Explain how you design for accessibility (WCAG 2.1 compliance).", answer: "Ensure a minimum 4.5:1 text-to-background contrast ratio, design keyboard-accessible navigation flows, provide alt tags, and use explicit ARIA landmarks to support screen readers." }
      ]
    }
  },
  {
    id: "cand-5",
    name: "Sophia Patel",
    avatar: "SP",
    role: "AI/ML Research Engineer",
    experience: "3 years",
    skills: ["Python", "PyTorch", "Transformers", "SQL", "pandas", "Flask", "Docker"],
    githubScore: 82,
    linkedinScore: 80,
    overallScore: 81,
    recommendation: "Potential Match",
    confidence: 85,
    email: "sophia.patel@mlmail.io",
    phone: "+1 (555) 345-6789",
    linkedinUrl: "linkedin.com/in/sophia-patel-ml",
    githubUsername: "spatel-ai",
    jobId: "job-2",
    resumeSummary: "Sophia is an AI engineer with 3 years of experience. She is highly proficient in Python and data analytics, focused on fine-tuning classification models and analyzing training sets.",
    projects: [
      { name: "DataCleaner-Python", stars: 12, description: "A simple command line tool for automating data cleaning scripts.", url: "github.com/spatel-ai/datacleaner-python", language: "Python" }
    ],
    experienceTimeline: [
      { role: "Data Scientist", company: "Nova Analytics", duration: "2023 - Present", description: "Cleaned and processed training data for vision models. Created Flask backend APIs." }
    ],
    education: { degree: "B.S. in Applied Mathematics", school: "Georgia Tech", year: "2023" },
    certifications: [],
    githubAnalysis: {
      stars: 18,
      forks: 3,
      totalRepos: 6,
      contributionsLastYear: 450,
      languages: [
        { name: "Python", percentage: 85 },
        { name: "SQL", percentage: 10 },
        { name: "Other", percentage: 5 }
      ],
      projectQuality: "Functional, but lacks tests and detailed setup documentation in README.",
      technicalScore: 80
    },
    linkedinAnalysis: {
      growthRate: "Standard early-career growth",
      leadershipRating: "Low (Individual contributor)",
      professionalSummary: "Applied math graduate transitioning into machine learning pipelines. Practical experience in model training and Flask development.",
      recommendationsCount: 0,
      endorsements: [
        { skill: "Python", count: 18 },
        { skill: "SQL", count: 12 }
      ]
    },
    skillGap: {
      matched: ["Python", "PyTorch", "Docker", "SQL"],
      missing: ["Transformers", "LLMs", "FastAPI"],
      extra: ["pandas", "Flask", "Matplotlib"]
    },
    interviewQuestions: {
      easy: [
        { question: "What is overfitting?", answer: "Overfitting happens when a model learns the noise in training data too well, resulting in poor generalization on unseen, new test data." }
      ],
      medium: [
        { question: "Explain the difference between Flask and FastAPI.", answer: "FastAPI is built on ASGI, natively asynchronous, validates input automatically via Pydantic, and is generally faster. Flask is WSGI-based and synchronous by default." }
      ],
      hard: [
        { question: "How do you resolve gradient vanishing issues in deep neural networks?", answer: "Use activation functions like ReLU instead of sigmoid, implement batch normalization, set up skip connections (like ResNet), or apply proper weight initializations (e.g., He or Xavier)." }
      ]
    }
  }
];

export const mockInsights = [
  {
    title: "Best Candidate Match",
    metric: "Sarah Jenkins",
    description: "Matches 94% of the Senior Full-Stack role requirements.",
    trend: "+2% above average",
    type: "success"
  },
  {
    title: "Key Skill Gap Spotted",
    metric: "Framer Motion",
    description: "Most candidates miss core animation skills required for the premium dashboard design.",
    trend: "80% of applicants miss this",
    type: "warning"
  },
  {
    title: "Top Sourced Technology",
    metric: "Python & PyTorch",
    description: "Great influx of machine learning talent from the West Coast.",
    trend: "+15% increase in resume uploads",
    type: "info"
  },
  {
    title: "Hiring Pipeline Trend",
    metric: "12 Days to Offer",
    description: "AI filtering has reduced candidate evaluation lead times.",
    trend: "-4 days from last month",
    type: "success"
  }
];

export const mockActivities = [
  { id: 1, action: "Resume Uploaded", target: "Sophia Patel for AI/ML Engineer", time: "10 mins ago", type: "upload" },
  { id: 2, action: "AI Matching Completed", target: "Sarah Jenkins scored 94% fit", time: "1 hour ago", type: "score" },
  { id: 3, action: "Feedback Sent", target: "Recruiter reviewed Alex Rivera", time: "3 hours ago", type: "feedback" },
  { id: 4, action: "Interview Scheduled", target: "Elena Rostova (Round 1)", time: "5 hours ago", type: "interview" },
  { id: 5, action: "Job Status Changed", target: "DevOps Lead moved to Draft", time: "Yesterday", type: "job" }
];
