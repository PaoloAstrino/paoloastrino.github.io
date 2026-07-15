"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Typed from "react-typed"
import RotatingText from "@/components/RotatingText"
import LogoLoop from "@/components/LogoLoop"
import { Particles } from "@/components/ui/particles"
import FadeContent from "@/components/FadeContent"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import {
  LaptopIcon,
  ChatBubbleIcon,
  ReaderIcon,
  EyeOpenIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons"
import {
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiPython, 
  SiPytorch, 
  SiPostgresql, 
  SiNodedotjs, 
  SiSqlite, 
  SiOllama, 
  SiGit,
  SiDocker,
  SiTailwindcss
} from "react-icons/si";

const techLogos = [
  { node: <SiPython className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://www.python.org", title: "Python" },
  { node: <SiReact className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://react.dev", title: "React" },
  { node: <SiNextdotjs className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://nextjs.org", title: "Next.js" },
  { node: <SiPytorch className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://pytorch.org", title: "PyTorch" },
  { node: <SiPostgresql className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://www.postgresql.org", title: "PostgreSQL" },
  { node: <SiNodedotjs className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://nodejs.org", title: "Node.js" },
  { node: <SiTypescript className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://www.typescriptlang.org", title: "TypeScript" },
  { node: <SiTailwindcss className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://tailwindcss.com", title: "Tailwind CSS" },
  { node: <SiSqlite className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://www.sqlite.org", title: "SQLite" },
  { node: <SiOllama className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://ollama.com", title: "Ollama" },
  { node: <SiGit className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://git-scm.com", title: "Git" },
  { node: <SiDocker className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground hover:text-foreground transition-colors duration-300 select-none" />, href: "https://www.docker.com", title: "Docker" },
];

const trackGAEvent = (action: string, category: string, label: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<HTMLElement[]>([])
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const isMobile = (typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) || (typeof window !== 'undefined' && window.innerWidth <= 768)
    if (isMobile) {
      setIsMobileDevice(true)
      sectionsRef.current.forEach((section) => {
        section?.classList.remove('opacity-0')
      })
      return
    }

    setIsMobileDevice(false)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      
      {/* Header placed outside <main> to allow full-viewport WebGL background canvas */}
      <header
        id="intro"
        ref={(el) => { if (el) sectionsRef.current[0] = el }}
        className="min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center py-16 sm:py-24 opacity-0 relative overflow-hidden w-full border-b border-border/10"
      >
        {/* Futuristic atmospheric Particles background extending absolute edge-to-edge */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Particles
            className="absolute inset-0"
            quantity={100}
            staticity={30}
            ease={50}
            color={isDark ? "#ffffff" : "#000000"}
          />
        </div>

        {/* Content container aligned with main site width */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full items-center">
            {/* Left Column: Bio */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground font-mono tracking-widest uppercase">PORTFOLIO / 2026</div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight tracking-tight leading-none text-foreground">
                  Paolo
                  <span className="text-muted-foreground block font-light">Astrino</span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light max-w-xl">
                Project Manager & Full Stack Developer focused on
                <span className="text-foreground"> purposeful building</span>. I help define product roadmaps by identifying the root of a problem and
                <span className="text-foreground"> engineering high-impact solutions</span> with AI-native speed and a
                <span className="text-foreground"> builder's autonomy</span>.
              </p>
            </div>

            {/* Right Column: Profile Card */}
            <div className="lg:col-span-2 bg-primary/[0.01] border border-border/80 rounded-2xl p-6 sm:p-8 space-y-8 backdrop-blur-sm mt-8 lg:mt-0 shadow-sm hover:border-muted-foreground/30 transition-all duration-300">
              <div className="space-y-4">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Currently</div>
                <div className="space-y-1">
                  <div className="text-lg font-medium text-foreground">Technical Problem Solver & Builder</div>
                  <div className="text-base text-muted-foreground">@ Freelance</div>
                  <div className="text-sm text-muted-foreground/75">Jul 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "React", "Product Strategy", "Solution Architecture", "DevOps"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300 select-none bg-background/50 text-muted-foreground hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/30">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Available for work
                  </div>
                  <span className="text-border">|</span>
                  <span>Padova, Italy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-12 sm:mt-16 border-t border-border/40 pt-8 text-center">
            <Link
              href="#connect"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group block w-full"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] transition-colors duration-500 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 select-none">
                <span className="text-foreground">Got an idea?</span>
                <span className="text-muted-foreground group-hover:text-foreground transition-all duration-500 inline-flex items-center gap-x-3">
                  <span className="relative inline-flex overflow-hidden h-[1.2em] items-center align-middle">
                    <RotatingText
                      texts={["Let's talk.", "Let's build.", "Let's create.", "Let's connect.", "Let's solve."]}
                      mainClassName="inline-flex overflow-hidden"
                      staggerDuration={0.02}
                      splitBy="characters"
                      rotationInterval={2500}
                      initial={{ y: "30%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-30%", opacity: 0 }}
                      transition={{ type: "spring", damping: 30, stiffness: 350 }}
                    />
                  </span>
                  <svg
                    className="w-[0.7em] h-[0.7em] transform group-hover:translate-x-3 transition-transform duration-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </h2>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

        <section
          id="projects"
          ref={(el) => { if (el) sectionsRef.current[1] = el }}
          className="min-h-screen flex items-center py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <h2 className="text-4xl sm:text-4xl font-light">Featured Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              {/* Card 1: Enterprise ML & Monitoring (col-span-2, row-span-2) */}
              <article
                className="group relative p-6 sm:p-8 border border-primary/50 shadow-[0_0_40px_-12px_var(--color-primary)] bg-primary/[0.02] rounded-lg transition-all duration-500 hover:shadow-xl cursor-pointer col-span-3 lg:col-span-2 lg:row-span-2 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between text-xs text-muted-foreground font-mono">
                    <span>Completed</span>
                    <span className="text-primary font-medium tracking-wider uppercase">Featured Project</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-light text-foreground transition-colors duration-300">
                      Enterprise ML & Real-Time Monitoring Platform for Large-Scale IoT Data
                    </h3>
                    <div className="text-sm text-muted-foreground font-mono tracking-wide">
                      Lead Full-Stack Engineer & Software Architect (Freelance Contractor)
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 pt-4 border-t border-border/30">
                    {/* Left Side: Overview */}
                    <div className="col-span-1 lg:col-span-6 space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Project Overview</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-3 lg:line-clamp-none">
                          Transformed research-grade ML algorithms into a production-ready enterprise SaaS. Productized isolated academic executables into a scalable platform capable of safely ingesting massive IoT datasets (25GB+), training models asynchronously, and running real-time monitoring dashboards.
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-1 hidden lg:block">
                        <h4 className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">System Architecture</h4>
                        <pre className="p-3 bg-muted/10 border border-border/50 rounded text-[9px] font-mono text-muted-foreground/80 overflow-x-auto leading-normal whitespace-pre">
                          {`React Dashboard ⇆ FastAPI Backend (WebSockets)
  ↳ Celery & Redis Task Queue ↳ ML Executables ⇆ PostgreSQL`}
                        </pre>
                      </div>
                    </div>

                    {/* Right Side: Contributions */}
                    <div className="hidden lg:block col-span-1 lg:col-span-6 space-y-4">
                      <h4 className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Contributions & Architecture Highlights</h4>
                      <div className="space-y-3.5">
                        {[
                          { title: "Massive Data Ingestion", text: "Chunked pipeline uploading 25GB+ files with 1M-row validation, preventing server exhaustion." },
                          { title: "Async Heavy Compute", text: "Celery & Redis task queue handling ML training sessions up to 6+ hours." },
                          { title: "Live Dashboards", text: "WebSocket streaming architecture broadcasting 200+ live metrics to concurrent users." },
                        ].map((detail, i) => (
                          <div key={i} className="space-y-0.5">
                            <h5 className="text-sm font-medium text-foreground">{detail.title}</h5>
                            <p className="text-xs text-muted-foreground font-light leading-relaxed">{detail.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-border/30 mt-6">
                  {["FastAPI (Python)", "React", "TypeScript", "Celery", "Redis", "PostgreSQL", "Docker", "Shell Scripting"].map((tech) => (
                    <span key={tech} className="inline-flex items-center h-fit px-2.5 py-0.5 text-xs border border-border rounded-full text-muted-foreground select-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>

              {/* Card 2: CUBO - Industrial-Grade Local RAG (col-span-1, row-span-2) */}
              <article
                className="group relative p-6 border border-border hover:border-muted-foreground/50 rounded-lg transition-all duration-500 hover:shadow-lg cursor-pointer col-span-3 lg:col-span-1 lg:row-span-2 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between text-xs text-muted-foreground font-mono">
                    <span>Completed</span>
                    <div className="flex gap-2">
                      <Link href="https://github.com/PaoloAstrino/cubo" target="_blank" className="hover:text-foreground transition-colors">
                        GitHub →
                      </Link>
                      <Link href="https://arxiv.org/abs/2602.03731" target="_blank" className="hover:text-foreground transition-colors ml-1">
                        Paper →
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-foreground transition-colors duration-300">
                      CUBO - Industrial-Grade Local RAG
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                    Enterprise-grade RAG system engineered for privacy-first environments. Features tiered hybrid retrieval, O(1) memory scaling for 50GB+ corpora, and specialized support for European languages on consumer hardware.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-border/30 mt-6">
                  {["Python", "SQLite", "FAISS", "Ollama", "RAG"].map((tech) => (
                    <span key={tech} className="inline-flex items-center h-fit px-2.5 py-0.5 text-xs border border-border rounded-full text-muted-foreground select-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>

              {/* Card 3: Local Hybrid QA Research Paper (col-span-1) */}
              <article
                className="group relative p-6 border border-border hover:border-muted-foreground/50 rounded-lg transition-all duration-500 hover:shadow-lg cursor-pointer col-span-3 lg:col-span-1 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between text-xs text-muted-foreground font-mono">
                    <span>Published</span>
                    <Link href="https://arxiv.org/abs/2511.10297" target="_blank" className="hover:text-foreground transition-colors">
                      Paper →
                    </Link>
                  </div>

                  <h3 className="text-xl font-light text-foreground transition-colors duration-300">
                    Local Hybrid Retrieval QA
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                    We present a question-answering system that resolves the trade-off between cloud-based AI and local processing by combining semantic understanding with keyword precision, operating entirely on local infrastructure.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30 mt-4">
                  {["NLP", "RAG", "Local AI"].map((tech) => (
                    <span key={tech} className="inline-flex items-center h-fit px-2.5 py-0.5 text-xs border border-border rounded-full text-muted-foreground select-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>

              {/* Card 4: Odo Oral Health Detection (col-span-1) */}
              <article
                className="group relative p-6 border border-border hover:border-muted-foreground/50 rounded-lg transition-all duration-500 hover:shadow-lg cursor-pointer col-span-3 lg:col-span-1 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between text-xs text-muted-foreground font-mono">
                    <span>Work in Progress</span>
                    <div />
                  </div>

                  <h3 className="text-xl font-light text-foreground transition-colors duration-300">
                    Odo - Oral Health Detection
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                    AI-powered computer vision application that helps dental professionals detect oral illnesses and conditions through photo analysis.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30 mt-4">
                  {["Python", "Computer Vision", "Deep Learning", "Medical AI"].map((tech) => (
                    <span key={tech} className="inline-flex items-center h-fit px-2.5 py-0.5 text-xs border border-border rounded-full text-muted-foreground select-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>

              {/* Card 5: GPU Trading Optimizer (col-span-1) */}
              <article
                className="group relative p-6 border border-border hover:border-muted-foreground/50 rounded-lg transition-all duration-500 hover:shadow-lg cursor-pointer col-span-3 lg:col-span-1 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between text-xs text-muted-foreground font-mono">
                    <span>Completed</span>
                    <Link href="https://github.com/PaoloAstrino/pso-trading-optimizer" target="_blank" className="hover:text-foreground transition-colors">
                      GitHub →
                    </Link>
                  </div>

                  <h3 className="text-xl font-light text-foreground transition-colors duration-300">
                    GPU Strategy Optimizer
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                    GPU-powered trading system optimizing multiple trading rules with PyTorch/CUDA, achieving substantial speedups and parameter grid validation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30 mt-4">
                  {["Python", "PyTorch", "CUDA", "FinTech"].map((tech) => (
                    <span key={tech} className="inline-flex items-center h-fit px-2.5 py-0.5 text-xs border border-border rounded-full text-muted-foreground select-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => { if (el) sectionsRef.current[2] = el }}
          className="min-h-screen flex items-center py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-16 w-full">
            <h2 className="text-4xl sm:text-4xl font-light border-b border-border/40 pb-4">Background</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              {/* Left Column: Experience */}
              <div className="space-y-8 sm:space-y-10">
                <h3 className="text-xl font-mono text-muted-foreground uppercase tracking-wider">Experience</h3>
                <div className="space-y-8">
                  {[
                    {
                      year: "2025",
                      role: "Project Manager & Full Stack Developer",
                      company: "Freelance",
                      description: "Operating as a generalist to eliminate product bottlenecks. I identify business problems and own the entire lifecycle from discovery to implementation, leveraging AI-native workflows to build high-utility solutions at scale.",
                      tech: ["Python", "React", "Node.js", "Frontend Development"],
                    },
                    {
                      year: "2025",
                      role: "Credit Analyst",
                      company: "Power 4U",
                      description: "Analyzed large volumes of customer portfolio and payment behavior data using Excel, supported strategic decisions through data-driven insights.",
                      tech: ["Excel", "Risk Analysis", "Data Insights"],
                    },
                    {
                      year: "2023",
                      role: "Junior Data Analyst & Back Office",
                      company: "Adecco",
                      description: "Monitored personnel and vehicle costs, developed Excel VBA macros, automating repetitive tasks and saving 10+ hours per week.",
                      tech: ["VBA", "Automation", "Cost Analysis"],
                    },
                  ].map((job, index) => (
                    <div key={index} className="space-y-3 pb-6 border-b border-border/30 last:border-b-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="text-xl sm:text-2xl font-light text-foreground">{job.role}</h4>
                        <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">{job.year}</span>
                      </div>
                      <div className="text-base text-muted-foreground font-mono">{job.company}</div>
                      <p className="text-base text-muted-foreground leading-relaxed font-light line-clamp-2 lg:line-clamp-none">{job.description}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {job.tech.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center h-fit px-2.5 py-0.5 text-xs border border-border rounded-full text-muted-foreground select-none"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Education */}
              <div className="space-y-8 sm:space-y-10">
                <h3 className="text-xl font-mono text-muted-foreground uppercase tracking-wider">Education</h3>
                <div className="space-y-8">
                  {[
                    {
                      year: "2025",
                      role: "Master's in Data Analytics for Business and Society",
                      company: "Ca' Foscari University",
                      description: "Graduated with Master's degree focusing on Data Analytics, Business Intelligence, and Machine Learning applications.",
                      tech: ["Data Analytics", "Business Intelligence", "ML"],
                    },
                    {
                      year: "2024-25",
                      role: "Intelligent Systems (Erasmus+)",
                      company: "Universitat de les Illes Balears",
                      description: "Exchange program focused on AI, Machine Learning, and Intelligent Systems.",
                      tech: ["AI", "Machine Learning", "International"],
                    },
                    {
                      year: "2020-23",
                      role: "Bachelor's Degree in Economics",
                      company: "Università degli Studi di Padova",
                      description: "Graduated with Bachelor's degree in Economics with focus on quantitative methods and statistics.",
                      tech: ["Economics", "Statistics", "Quantitative Methods"],
                    },
                  ].map((edu, index) => (
                    <div key={index} className="space-y-3 pb-6 border-b border-border/30 last:border-b-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="text-xl sm:text-2xl font-light text-foreground">{edu.role}</h4>
                        <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">{edu.year}</span>
                      </div>
                      <div className="text-base text-muted-foreground font-mono">{edu.company}</div>
                      <p className="text-base text-muted-foreground leading-relaxed font-light line-clamp-2 lg:line-clamp-none">{edu.description}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {edu.tech.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center h-fit px-2.5 py-0.5 text-xs border border-border rounded-full text-muted-foreground select-none"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-screen relative left-[50%] -translate-x-[50%] py-20 my-16 overflow-hidden">
          <LogoLoop
            logos={techLogos}
            speed={60}
            gap={112}
            logoHeight={80}
            fadeOut={false}
            pauseOnHover={true}
            scaleOnHover={true}
            className="[--logoloop-logoHeight:56px] md:[--logoloop-logoHeight:80px] [--logoloop-gap:64px] md:[--logoloop-gap:112px]"
          />
        </div>

        <section
          id="skills"
          ref={(el) => { if (el) sectionsRef.current[3] = el }}
          className="min-h-screen flex items-center py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <h2 className="text-4xl sm:text-4xl font-light">Technical Skills</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  category: "Strategy & Problem Solving",
                  skills: ["Problem Discovery", "Solution Architecture", "Agile Execution", "Product Decision Making"],
                },
                {
                  category: "Programming & Full-Stack",
                  skills: ["Python", "TypeScript", "SQL", "FastAPI", "React", "Node.js", "R", "VBA"],
                },
                {
                  category: "Asynchronous Systems & DevOps",
                  skills: ["Docker & Docker Compose", "Celery", "Redis (Pub/Sub & Task Queue)", "Git", "Shell Scripting"],
                },
                {
                  category: "Databases & Data Engines",
                  skills: ["PostgreSQL", "MySQL", "SQLite", "FAISS", "Supabase"],
                },
                {
                  category: "Machine Learning & AI",
                  skills: ["Retrieval-Augmented Generation (RAG)", "Ollama", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
                },
                {
                  category: "Advanced Computing & FinTech",
                  skills: ["CUDA (GPU Computing)", "Parallel Processing", "Algorithmic Trading", "Risk Management"],
                },
              ].map((skillGroup, index) => (
                <FadeContent
                  key={index}
                  blur={true}
                  duration={1000}
                  ease="power2.out"
                  initialOpacity={0}
                  className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <Link
                          key={skill}
                          href={`https://www.google.com/search?q=${encodeURIComponent(skill + " programming definition")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300 select-none"
                          style={{
                            cursor: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9JyM4ODg4ODgnIHN0cm9rZS13aWR0aD0nMi41JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnPjxjaXJjbGUgY3g9JzExJyBjeT0nMTEnIHI9JzcnPjwvY2lyY2xlPjxsaW5lIHgxPScyMScgeTE9JzIxJyB4Mj0nMTYuNjUnIHkyPScxNi42NSc+PC9saW5lPjwvc3ZnPg==") 8 8, pointer`
                          }}
                        >
                          {skill}
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeContent>
              ))}
            </div>

            <div className="space-y-6 border-t border-border pt-12">
              <h3 className="text-2xl font-light">Certifications</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Machine Learning Specialization",
                    issuer: "Coursera - Stanford University",
                    year: "2024",
                    link: "https://coursera.org/share/ddf4b0322b0a7d17a7d9d482357f2729",
                  },
                  {
                    title: "DeepLearning.AI Courses (5)",
                    issuer: "DeepLearning.AI",
                    year: "2024",
                    courses: [
                      { name: "Transformer LLMs", link: "https://learn.deeplearning.ai/accomplishments/3bc02648-e1c5-4093-8b4c-ac327ea69711?usp=sharing" },
                      { name: "LangChain Chat", link: "https://learn.deeplearning.ai/accomplishments/ed7a5035-4138-460d-a93c-fad9aca6b453?usp=sharing" },
                      { name: "Evaluating AI Agents", link: "https://learn.deeplearning.ai/accomplishments/853f8926-180c-401d-a850-cb0c0d176d2e?usp=sharing" },
                      { name: "ChatGPT Prompt Engineering", link: "https://learn.deeplearning.ai/accomplishments/d61333af-8499-4fcb-86a2-5c73d51907ee?usp=sharing" },
                      { name: "Agentic AI", link: "https://learn.deeplearning.ai/accomplishments/e3f65dbd-5e07-4034-99a0-de778015d564?usp=sharing" },
                    ],
                  },
                  {
                    title: "B2 English Certificate",
                    issuer: "Cambridge English",
                    year: "2024",
                    link: null,
                  },
                ].map((cert, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-medium">{cert.title}</h4>
                        <p className="text-base text-muted-foreground">{cert.issuer} · {cert.year}</p>
                      </div>
                      {cert.link && (
                        <Link
                          href={cert.link}
                          target="_blank"
                          className="text-base text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Verify →
                        </Link>
                      )}
                    </div>
                    {cert.courses && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {cert.courses.map((course) => (
                          <Link
                            key={course.name}
                            href={course.link}
                            target="_blank"
                            className="text-sm px-3 py-1 border border-border rounded hover:border-muted-foreground/50 transition-colors"
                          >
                            {course.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { if (el) sectionsRef.current[4] = el }} className="min-h-screen flex items-center py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 w-full">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
                  Feel free to reach out — whether it's to talk data, exchange ideas, or just have a good chat.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:paoloastrino01@gmail.com"
                    onClick={() => trackGAEvent("click_email", "Contact", "mailto:paoloastrino01@gmail.com")}
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-lg sm:text-xl">paoloastrino01@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-base text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@paoloastrino", url: "https://github.com/paoloastrino", isExternal: true },
                  { name: "LinkedIn", handle: "paolo-astrino", url: "https://www.linkedin.com/in/paolo-astrino-9792061a3", isExternal: true },
                  { name: "Portfolio", handle: "paoloastrino.github.io", url: "https://paoloastrino.github.io/", isExternal: true },
                  { name: "Download CV", handle: "PDF Resume", url: "/CV/CV_PaoloAstrino_eng.pdf", isExternal: true, download: true },
                ].map((social) => {
                  const Comp = social.isExternal ? 'a' : Link;
                  return (
                    <Comp
                      key={social.name}
                      href={social.url}
                      target={social.isExternal ? "_blank" : undefined}
                      rel={social.isExternal ? "noopener noreferrer" : undefined}
                      download={social.download ? "" : undefined}
                      onClick={() => {
                        const eventName = social.download ? "download_cv" : `click_${social.name.toLowerCase().replace(" ", "_")}`;
                        trackGAEvent(eventName, "Elsewhere", social.url);
                      }}
                      className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="text-lg text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                          {social.name}
                        </div>
                        <div className="text-base text-muted-foreground">{social.handle}</div>
                      </div>
                    </Comp>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-base text-muted-foreground">© 2026 Paolo Astrino. All rights reserved.</div>
              <div className="text-sm text-muted-foreground">Portfolio • Padova, Italy</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
