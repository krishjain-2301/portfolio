export const siteConfig = {
  name: "Krish Jain",
  title: "Cybersecurity | AI Security | LLM Red Teaming",
  tagline: "Breaking systems to make them stronger.",
  location: "Hyderabad, India",
  email: "jainkrish232006@gmail.com",
  phone: "8143707807",
  github: "https://github.com/krishjain-2301",
  githubUsername: "krishjain-2301",
  linkedin: "https://www.linkedin.com/in/kriishjaiin/",
  twitter: "https://x.com/krishvain",
  about:
    "Cybersecurity student at VIT Chennai with a focus on AI Red Teaming and LLM security. I build tools that stress-test AI systems, hunt vulnerabilities in web applications, and compete in CTFs. My goal is to bridge offensive security with the emerging frontier of AI safety.",
  education: {
    degree: "B.Tech in Computer Science Engineering (Cyber Security)",
    school: "Vellore Institute of Technology (VIT), Chennai",
    period: "Jul 2024 – Jun 2028",
    cgpa: "8.72",
  },
  experience: [
    {
      role: "Cyber Security Intern",
      company: "Deloitte Touche Tohmatsu India LLP",
      location: "Hyderabad",
      period: "May 2026 – June 2026",
      highlights: [
        "Worked within Deloitte's Technology & Transformation – Cyber function.",
        "Gained exposure to enterprise cybersecurity practices and security workflows.",
        "Applied networking, security concepts, and risk awareness in practical scenarios.",
      ],
    },
  ],
  skills: [
    {
      category: "AI & LLM Security",
      items: [
        "Prompt Injection",
        "Jailbreak Testing",
        "Adversarial Testing",
        "LLM Red Teaming",
        "Agent Misuse",
        "Sensitive Data Disclosure",
        "RAG Poisoning",
        "Model DoS",
      ],
    },
    {
      category: "OWASP Frameworks",
      items: [
        "OWASP LLM Top 10",
        "OWASP Web Top 10",
        "OWASP API Security Top 10",
        "Secure SDLC",
        "Threat Modeling",
      ],
    },
    {
      category: "Web & App Security",
      items: [
        "VAPT",
        "API Security",
        "XSS",
        "SQL Injection",
        "SSRF",
        "Auth Bypass",
        "Business Logic Flaws",
        "Recon & Enumeration",
      ],
    },
    {
      category: "AI Security Tools",
      items: [
        "Promptfoo",
        "Garak",
        "PyRIT",
        "Ollama",
        "LLM-as-Judge",
        "Adversarial Prompt Libraries",
      ],
    },
    {
      category: "Industry Security Tools",
      items: [
        "Burp Suite",
        "Nmap",
        "Wireshark",
        "SQLMap",
        "Dalfox",
        "Subfinder",
        "httpx",
        "Kali Linux",
      ],
    },
    {
      category: "Languages",
      items: ["Python", "C++", "Java", "JavaScript", "SQL", "Bash"],
    },
  ],
  projects: [
    {
      title: "AYZO",
      subtitle: "Autonomous AI Red Teaming Platform",
      description:
        "Local AI red teaming framework for automated security testing of LLM applications with OWASP LLM Top 10 aligned attack pipelines.",
      tech: ["Python", "FastAPI", "Next.js", "SQLite", "Ollama"],
      highlights: [
        "Jailbreaks, prompt injection, data leakage, and agent misuse pipelines",
        "Multi-turn adversarial testing with mutation-based prompt generation",
        "LLM-as-a-Judge evaluation for automated scoring",
      ],
      github: "https://github.com/krishjain-2301/Ayzo",
      featured: true,
    },
    {
      title: "Revish",
      subtitle: "AI Red Teaming & LLM Security Platform",
      description:
        "Local-first lab for authorized LLM security testing against Ollama, with OWASP-aligned attack suites, mutation campaigns, and automated scoring.",
      tech: ["Python", "FastAPI", "Next.js", "Ollama", "Promptfoo"],
      highlights: [
        "Seven-strategy mutation engine with cross-model ASR benchmarking",
        "Rule-based judge for leaks, jailbreaks, and tool-policy violations",
        "Promptfoo CI gate with GitHub Actions regression testing",
      ],
      github: "https://github.com/krishjain-2301/revish",
      featured: true,
    },
    {
      title: "Plethora",
      subtitle: "Cybersecurity Knowledge & Research Platform",
      description:
        "Cybersecurity platform used by security learners globally for tracking research, labs, and documentation.",
      tech: ["Next.js", "SQLite", "Drizzle ORM"],
      highlights: [
        "Automated HTB synchronization workflows",
        "Local-first dashboards for cybersecurity progress tracking",
      ],
      github: "https://github.com/krishjain-2301/Kri27",
      featured: true,
    },
  ],
  achievements: [
    { title: "Winner", event: "AI Heist CTF", type: "Team Competition" },
    { title: "Winner", event: "Black Box CTF", type: "Team Competition" },
    {
      title: "Finalist",
      event: "CryptNite CTF",
      type: "National Level Cybersecurity Competition",
    },
    {
      title: "Rank 1",
      event: "Secleaf CTF",
      type: "Global Participant (competition phase)",
    },
  ],
  certifications: [
    {
      name: "Google Cybersecurity Professional Certificate",
      issuer: "Coursera",
      year: "2024",
    },
    {
      name: "Software Engineering Simulation",
      issuer: "JPMorgan Chase & Co. — Forage",
      year: "2025",
    },
    {
      name: "Prompt to Prototype",
      issuer: "Google Startup School",
      year: "2025",
    },
  ],
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Activity", href: "#activity" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
};
