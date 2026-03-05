import { useState, useCallback, useEffect, useRef } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SearchBar } from './components/SearchBar'
import { TabNav } from './components/TabNav'
import { LevelFilter } from './components/LevelFilter'
import { SectionContent } from './components/SectionContent'
import { Footer } from './components/Footer'
import { LoginGate, useAuth } from './components/LoginGate'
import { useTheme } from './hooks/useTheme'
import { useSearch } from './hooks/useSearch'

function App() {
  const { theme, toggle } = useTheme()
  const { isAuthenticated, authenticate } = useAuth()
  const { query, setQuery, results, isFocused, handleFocus, handleBlur } = useSearch()
  const [activeTab, setActiveTab] = useState('primeiros-passos')
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)
  const [levelFilter, setLevelFilter] = useState('todos')
  const [showGuide, setShowGuide] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showGuide) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShowGuide(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [showGuide])

  const handleStart = useCallback(() => {
    setShowGuide(true)
    setTimeout(() => {
      document.getElementById('guide-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  const handleSelectResult = useCallback((sectionId: string, cardIndex: number) => {
    setActiveTab(sectionId)
    setOpenCardIndex(cardIndex)
    setShowGuide(true)
    setTimeout(() => {
      document.getElementById('guide-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  if (!isAuthenticated) {
    return <LoginGate onAuthenticated={authenticate} />
  }

  return (
    <div className="relative z-10 min-h-screen">
      <Header theme={theme} onToggleTheme={toggle} />

      <main className="max-w-[840px] mx-auto px-4 sm:px-8 pt-14">
        <div ref={heroRef}>
          <Hero onStart={handleStart} />
        </div>

        <div id="guide-content" className={`transition-opacity duration-500 ${showGuide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="mb-6">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              results={results}
              onSelectResult={handleSelectResult}
              isFocused={isFocused}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div className="mb-4">
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="mb-6">
            <LevelFilter active={levelFilter} onChange={setLevelFilter} />
          </div>

          <SectionContent
            activeTab={activeTab}
            openCardIndex={openCardIndex}
            onCardToggle={setOpenCardIndex}
            levelFilter={levelFilter}
          />

          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
