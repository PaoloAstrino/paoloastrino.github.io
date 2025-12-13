"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

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
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "experience", "education", "projects", "skills", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { if (el) sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-6xl sm:text-7xl lg:text-7xl font-light tracking-tight">
                  Paolo
                  <br />
                  <span className="text-muted-foreground">Astrino</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl lg:text-xl text-muted-foreground leading-relaxed">
                  Data Analyst & ML Enthusiast leveraging
                  <span className="text-foreground"> data-driven</span> and
                  <span className="text-foreground"> AI-powered</span> solutions to solve real-world challenges. Whether it's learning a new tool or solving a new problem, I'm always ready to
                  <span className="text-foreground"> dive in and figure it out</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Padova, Italy</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-base text-foreground">Junior Developer Freelance</div>
                  <div className="text-base text-muted-foreground">@ Freelance</div>
                  <div className="text-sm text-muted-foreground">Jul 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "React", "Node.js", "Data Analytics", "Machine Learning"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="experience"
          ref={(el) => { if (el) sectionsRef.current[1] = el }}
          className="min-h-screen flex items-center py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-4xl font-light">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2023 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "Junior Developer Freelance",
                  company: "Freelance",
                  description: "Developed responsive front-end components using React, built backend services with Node.js, and applied Python for data processing and automation tasks.",
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
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-2xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-base text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
          ref={(el) => { if (el) sectionsRef.current[2] = el }}
          className="min-h-screen flex items-center py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-4xl font-light">Education</h2>
              <div className="text-sm text-muted-foreground font-mono">2020 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
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
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-2xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {edu.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{edu.role}</h3>
                      <div className="text-base text-muted-foreground">{edu.company}</div>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-lg">{edu.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {edu.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => { if (el) sectionsRef.current[3] = el }}
          className="min-h-screen flex items-center py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <h2 className="text-4xl sm:text-4xl font-light">Featured Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Local Hybrid Retrieval-Augmented Document QA",
                  excerpt: "We present a question-answering system that resolves the trade-off between cloud-based AI and local processing by combining semantic understanding with keyword precision, operating entirely on local infrastructure.",
                  tech: ["NLP", "Retrieval-Augmented Generation", "Local AI"],
                  status: "Published",
                  github: null,
                  link: "https://arxiv.org/abs/2511.10297",
                },
                {
                  title: "Odo - Oral Health Detection System",
                  excerpt: "AI-powered computer vision application that helps dental professionals detect oral illnesses and conditions through photo analysis.",
                  tech: ["Python", "Computer Vision", "Deep Learning", "Medical AI"],
                  status: "Work in Progress",
                  github: null,
                },
                {
                  title: "CUBO - Local RAG Chatbot",
                  excerpt: "CUBO is a lightweight RAG chatbot that operates entirely locally without internet connectivity, prioritizing user privacy and high-quality document retrieval for secure, offline AI conversations.",
                  tech: ["Python", "LangChain", "Local LLM", "Privacy-First"],
                  status: "Work in Progress",
                  github: null,
                },
                {
                  title: "SEO Analysis for Niche Perfume Brands",
                  excerpt: "Web scraping tool analyzing perfume brand websites with keyword extraction and visualizations.",
                  tech: ["Python", "MySQL", "BeautifulSoup4", "Pandas"],
                  status: "Completed",
                  github: "https://github.com/PaoloAstrino/niche-perfume-seo-analysis",
                },
                {
                  title: "GPU-Accelerated Trading Strategy Optimizer",
                  excerpt: "GPU-powered trading system optimizing multiple rules with enhanced returns and performance.",
                  tech: ["Python", "PyTorch", "CUDA", "Quantitative Finance"],
                  status: "Completed",
                  github: "https://github.com/PaoloAstrino/pso-trading-optimizer",
                },
                {
                  title: "Eating Habits and Emissions Analysis",
                  excerpt: "Data analysis of dietary patterns and greenhouse gas emissions in Europe.",
                  tech: ["Python", "Pandas", "Plotly", "Geopandas"],
                  status: "Completed",
                  github: "https://github.com/paoloastrino/eating-habits-and-emissions",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.status}</span>
                      {post.github ? (
                        <Link href={post.github} target="_blank" className="hover:text-foreground transition-colors">
                          GitHub →
                        </Link>
                      ) : post.link ? (
                        <Link href={post.link} target="_blank" className="hover:text-foreground transition-colors">
                          View Paper →
                        </Link>
                      ) : null}
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2">
                      {post.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          ref={(el) => { if (el) sectionsRef.current[4] = el }}
          className="min-h-screen flex items-center py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <h2 className="text-4xl sm:text-4xl font-light">Technical Skills</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  category: "Programming & Data Analysis",
                  skills: ["Python", "SQL", "R", "VBA"],
                },
                {
                  category: "Data Visualization",
                  skills: ["Power BI", "Excel Charts", "Matplotlib"],
                },
                {
                  category: "Databases",
                  skills: ["PostgreSQL", "MySQL", "Supabase"],
                },
                {
                  category: "Machine Learning",
                  skills: ["Scikit-learn", "Pandas", "NumPy", "PyTorch", "CUDA"],
                },
                {
                  category: "Quantitative Finance",
                  skills: ["Algorithmic Trading", "Risk Management", "Portfolio Optimization"],
                },
                {
                  category: "Advanced Computing",
                  skills: ["GPU Computing", "Parallel Processing", "Optimization Algorithms"],
                },
              ].map((skillGroup, index) => (
                <div
                  key={index}
                  className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
                        <h4 className="text-base font-medium">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer} · {cert.year}</p>
                      </div>
                      {cert.link && (
                        <Link
                          href={cert.link}
                          target="_blank"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                            className="text-xs px-2 py-1 border border-border rounded hover:border-muted-foreground/50 transition-colors"
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

        <section id="connect" ref={(el) => { if (el) sectionsRef.current[5] = el }} className="min-h-screen flex items-center py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 w-full">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Feel free to reach out — whether it's to talk data, exchange ideas, or just have a good chat.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:paoloastrino01@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">paoloastrino01@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="tel:+393426202332"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">+39 342 620 2332</span>
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
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@paoloastrino", url: "https://github.com/paoloastrino" },
                  { name: "LinkedIn", handle: "paolo-astrino", url: "https://www.linkedin.com/in/paolo-astrino-9792061a3" },
                  { name: "Portfolio", handle: "paoloastrino.github.io", url: "https://paoloastrino.github.io/" },
                  { name: "Download CV", handle: "PDF Resume", url: "/CV/CV_PaoloAstrino_eng.pdf" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-base text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Paolo Astrino. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Privacy-First Portfolio • No Tracking • No Data Collection</div>
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

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
