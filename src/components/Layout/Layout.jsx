import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Sidebar from '../Navigation/Sidebar'
import Gallery from '../Gallery/Gallery'
import FilterPanel from '../Filters/FilterPanel'
import styles from './Layout.module.scss'

const Layout = ({ theme, setTheme, language, setLanguage }) => {
  const [activeFilter, setActiveFilter] = useState('EVERYTHING')
  const [filterPanelOpen, setFilterPanelOpen] = useState(false) // Always start closed
  const [isMobile, setIsMobile] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const layoutRef = useRef(null)
  const sidebarRef = useRef(null)
  const filterRef = useRef(null)
  const scrollTimeout = useRef(null)
  
  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Smooth scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      // Only hide if scrolled down more than 50px
      if (scrollDelta > 0 && currentScrollY > 50) {
        if (!isScrollingDown) {
          setIsScrollingDown(true)
          animateMenus('hide')
        }
      } else if (scrollDelta < -10 || currentScrollY < 50) {
        if (isScrollingDown) {
          setIsScrollingDown(false)
          animateMenus('show')
        }
      }
      
      setLastScrollY(currentScrollY)
      
      // Auto show menus when stopped scrolling
      scrollTimeout.current = setTimeout(() => {
        if (isScrollingDown) {
          setIsScrollingDown(false)
          animateMenus('show')
        }
      }, 1500)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [lastScrollY, isScrollingDown])
  
  const animateMenus = (direction) => {
    const tl = gsap.timeline()
    
    if (direction === 'hide') {
      // Desktop animations
      if (!isMobile && sidebarRef.current) {
        tl.to(sidebarRef.current, {
          x: -320,
          duration: 0.6,
          ease: 'power3.inOut'
        }, 0)
      }
      
      if (filterPanelOpen && filterRef.current) {
        tl.to(filterRef.current, {
          x: 300,
          duration: 0.6,
          ease: 'power3.inOut'
        }, 0)
      }
      
      // Mobile animations
      if (isMobile) {
        tl.to(`.${styles.mobileHeader}`, {
          y: -70,
          duration: 0.4,
          ease: 'power3.inOut'
        }, 0)
        .to(`.${styles.mobileNav}`, {
          y: 70,
          duration: 0.4,
          ease: 'power3.inOut'
        }, 0)
      }
    } else {
      // Show animations
      if (!isMobile && sidebarRef.current) {
        tl.to(sidebarRef.current, {
          x: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, 0)
      }
      
      if (filterPanelOpen && filterRef.current) {
        tl.to(filterRef.current, {
          x: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, 0)
      }
      
      if (isMobile) {
        tl.to(`.${styles.mobileHeader}`, {
          y: 0,
          duration: 0.4,
          ease: 'power3.out'
        }, 0)
        .to(`.${styles.mobileNav}`, {
          y: 0,
          duration: 0.4,
          ease: 'power3.out'
        }, 0)
      }
    }
  }
  
  const toggleFilterPanel = () => {
    const newState = !filterPanelOpen
    setFilterPanelOpen(newState)
    
    if (newState && filterRef.current) {
      gsap.fromTo(filterRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
  }
  
  return (
    <div className={`${styles.layout} ${isMobile ? styles.mobile : ''}`} ref={layoutRef}>
      {/* Mobile Header */}
      {isMobile && (
        <header className={styles.mobileHeader}>
          <h1>HGROUP</h1>
          <div className={styles.mobileControls}>
            <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>
              {language === 'en' ? 'EN' : 'ES'}
            </button>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>
      )}
      
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className={styles.sidebarWrapper} ref={sidebarRef}>
          <Sidebar 
            theme={theme} 
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
      )}
      
      <main className={`${styles.mainContent} ${filterPanelOpen && !isMobile ? styles.withFilter : ''}`}>
        <Gallery 
          filter={activeFilter} 
          onToggleFilter={toggleFilterPanel}
          filterPanelOpen={filterPanelOpen}
          isMobile={isMobile}
        />
      </main>
      
      {/* Filter Panel */}
      <aside 
        className={`${styles.filterPanel} ${!filterPanelOpen ? styles.hidden : ''} ${isMobile ? styles.mobile : ''}`}
        ref={filterRef}
      >
        <FilterPanel 
          onFilterChange={setActiveFilter}
          isOpen={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          activeFilter={activeFilter}
          isMobile={isMobile}
        />
      </aside>
      
      {/* Mobile bottom navigation */}
      {isMobile && (
        <nav className={styles.mobileNav}>
          <a href="/hero">HERO</a>
          <a href="/hack">HACK</a>
          <a href="/hook">HOOK</a>
          <a href="/hunt">HUNT</a>
          <a href="/hype">HYPE</a>
        </nav>
      )}
    </div>
  )
}

export default Layout