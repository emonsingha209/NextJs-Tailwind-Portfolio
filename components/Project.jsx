"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Github 
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import projects from "@/public/data/projects"

const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef(null)
  const carouselRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Simple scroll-based animation without useTransform
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0.8)
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Calculate opacity based on scroll position
      let newOpacity = 0
      if (value < 0.2) {
        newOpacity = value * 5 // 0 to 1 in the first 20%
      } else if (value < 0.8) {
        newOpacity = 1 // Stay at 1 for 60% of the scroll
      } else {
        newOpacity = (1 - value) * 5 // 1 to 0 in the last 20%
        if (newOpacity < 0) newOpacity = 0
      }
      
      // Calculate scale based on scroll position
      let newScale = 0.8
      if (value < 0.2) {
        newScale = 0.8 + (value * 1) // 0.8 to 1 in the first 20%
      } else if (value < 0.8) {
        newScale = 1 // Stay at 1 for 60% of the scroll
      } else {
        newScale = 1 - ((value - 0.8) * 1) // 1 to 0.8 in the last 20%
        if (newScale < 0.8) newScale = 0.8
      }
      
      setOpacity(newOpacity)
      setScale(newScale)
    })
    
    return () => unsubscribe()
  }, [scrollYProgress])

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentProject(prev => 
      prev === 0 ? projects.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentProject(prev => 
      prev === projects.length - 1 ? 0 : prev + 1
    )
  }

  // Auto-scroll effect with pause on hover
  const [isPaused, setIsPaused] = useState(false)
  
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      goToNext()
    }, 6000)
    
    return () => clearInterval(interval)
  }, [currentProject, isPaused])

  // Progress bar animation
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (isPaused) return
    
    let startTime = Date.now()
    const intervalTime = 6000
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(elapsed / intervalTime, 1)
      setProgress(newProgress)
      
      if (newProgress >= 1) {
        startTime = Date.now()
        setProgress(0)
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [currentProject, isPaused])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    })
  }
  
  // Ensure we have a valid project to display
  const project = projects[currentProject] || {
    name: "Sample Project",
    description: "This is a sample project description.",
    technologies: ["React", "Next.js", "Tailwind"],
    features: ["Responsive design", "Modern architecture", "Performance optimized"],
    githubLinks: [{ url: "#", label: "GitHub" }],
    liveDemoLinks: [{ url: "#", label: "Live Demo" }]
  }

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative py-32 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-4"
      >
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-600 dark:from-violet-400 dark:via-indigo-300 dark:to-blue-400">
              Featured Work
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Explore my portfolio of projects combining design, code, and innovation
            </p>
          </motion.div>
        </div>

        <div 
          ref={carouselRef}
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="aspect-[16/9] relative overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentProject}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Card className="h-full overflow-hidden border-0 shadow-xl">
                  <div className="grid md:grid-cols-5 h-full">
                    <div className="md:col-span-3 relative overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                      </div>
                      <div className="absolute inset-0 flex items-end p-8">
                        <div className="max-w-md">
                          <h3 className="text-3xl font-bold text-white mb-3">{project.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="md:col-span-2 p-8 flex flex-col justify-between bg-white dark:bg-slate-900">
                      <div>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">{project.description}</p>
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Key Features</h4>
                          <ul className="space-y-2">
                            {project.features?.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                              </li>
                            )) || 
                            Array(3).fill().map((_, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                  {["Responsive design", "Modern architecture", "Performance optimized"][idx]}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-6">
                        {project.githubLinks?.map((link, idx) => (
                          <Button key={idx} variant="outline" size="sm" asChild className="gap-2">
                            <Link href={link.url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                              <span>Source Code</span>
                            </Link>
                          </Button>
                        ))}
                        {project.liveDemoLinks?.map((demo, idx) => (
                          <Button key={idx} variant="default" size="sm" asChild className="gap-2">
                            <Link href={demo.url} target="_blank" rel="noopener noreferrer">
                              <span>Live Demo</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Progress dots */}
          <div className="flex justify-center mt-6 gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentProject ? 1 : -1)
                  setCurrentProject(idx)
                  setProgress(0)
                }}
                className={`relative h-2 rounded-full transition-all ${
                  idx === currentProject ? "w-8 bg-indigo-600 dark:bg-indigo-400" : "w-2 bg-slate-300 dark:bg-slate-700"
                }`}
              >
                {idx === currentProject && !isPaused && (
                  <motion.div 
                    className="absolute inset-0 origin-left bg-indigo-400 dark:bg-indigo-300 rounded-full"
                    style={{ scaleX: progress }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="group">
            <Link href="/projects">
              <span>View All Projects</span>
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default ProjectShowcase