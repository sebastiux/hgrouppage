import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Gallery.module.scss'

const Gallery = ({ filter = 'EVERYTHING', onToggleFilter, filterPanelOpen, isMobile }) => {
  const [viewMode, setViewMode] = useState('grid')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedItems, setLikedItems] = useState({})
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [lastTap, setLastTap] = useState(0)
  const [showHeart, setShowHeart] = useState(null)
  
  const galleryRef = useRef(null)
  const zoomContainerRef = useRef(null)
  const itemsRef = useRef([])
  const isScrolling = useRef(false)
  
  // Sample projects
  const allProjects = [
    { id: 1, title: 'Brand Evolution', category: 'HERO', image: 'https://picsum.photos/600/900?random=1', likes: 3421 },
    { id: 2, title: 'Identity System', category: 'HERO', image: 'https://picsum.photos/600/900?random=2', likes: 5672 },
    { id: 3, title: 'Visual Language', category: 'HERO', image: 'https://picsum.photos/600/900?random=3', likes: 4523 },
    { id: 4, title: 'Tech Innovation', category: 'HACK', image: 'https://picsum.photos/600/900?random=4', likes: 7890 },
    { id: 5, title: 'Digital Disruption', category: 'HACK', image: 'https://picsum.photos/600/900?random=5', likes: 6234 },
    { id: 6, title: 'Code Artistry', category: 'HACK', image: 'https://picsum.photos/600/900?random=6', likes: 8901 },
    { id: 7, title: 'Engagement Design', category: 'HOOK', image: 'https://picsum.photos/600/900?random=7', likes: 5432 },
    { id: 8, title: 'User Journey', category: 'HOOK', image: 'https://picsum.photos/600/900?random=8', likes: 7654 },
    { id: 9, title: 'Experience Flow', category: 'HOOK', image: 'https://picsum.photos/600/900?random=9', likes: 9012 },
    { id: 10, title: 'Market Research', category: 'HUNT', image: 'https://picsum.photos/600/900?random=10', likes: 3210 },
    { id: 11, title: 'Trend Analysis', category: 'HUNT', image: 'https://picsum.photos/600/900?random=11', likes: 4567 },
    { id: 12, title: 'Future Insights', category: 'HUNT', image: 'https://picsum.photos/600/900?random=12', likes: 6789 },
    { id: 13, title: 'Viral Campaign', category: 'HYPE', image: 'https://picsum.photos/600/900?random=13', likes: 12345 },
    { id: 14, title: 'Social Buzz', category: 'HYPE', image: 'https://picsum.photos/600/900?random=14', likes: 15678 },
    { id: 15, title: 'Trend Setting', category: 'HYPE', image: 'https://picsum.photos/600/900?random=15', likes: 18901 },
  ]
  
  // Filter projects
  const projects = filter === 'EVERYTHING' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter)
  
  // Grid animation
  useEffect(() => {
    if (viewMode === 'grid' && itemsRef.current.length > 0) {
      gsap.fromTo(itemsRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out'
        }
      )
    }
  }, [filter, viewMode])

  // Handle like toggle
  const toggleLike = (projectId) => {
    setLikedItems(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }))
    
    // Show heart animation
    setShowHeart(projectId)
    setTimeout(() => setShowHeart(null), 1000)
  }
  
  // Handle double tap
  const handleDoubleTap = (projectId) => {
    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300
    
    if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
      toggleLike(projectId)
    }
    setLastTap(now)
  }
  
  // Handle clicking on a grid item
  const handleItemClick = (index) => {
    setCurrentIndex(index)
    setViewMode('zoom')
    document.body.style.overflow = 'hidden'
  }
  
  // Switch to grid view
  const switchToGrid = () => {
    setViewMode('grid')
    document.body.style.overflow = 'auto'
  }
  
  // Switch to zoom view
  const switchToZoom = () => {
    if (projects.length > 0) {
      setCurrentIndex(0)
      setViewMode('zoom')
      document.body.style.overflow = 'hidden'
    }
  }
  
  // Handle scroll for TikTok-style navigation
  useEffect(() => {
    if (viewMode !== 'zoom' || !zoomContainerRef.current) return
    
    const handleScroll = (e) => {
      if (isScrolling.current) return
      
      const container = zoomContainerRef.current
      const scrollTop = container.scrollTop
      const itemHeight = window.innerHeight
      const newIndex = Math.round(scrollTop / itemHeight)
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < projects.length) {
        setCurrentIndex(newIndex)
      }
    }

    
    
    const container = zoomContainerRef.current
    container.addEventListener('scroll', handleScroll)
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [viewMode, currentIndex, projects.length])
  
  // Handle wheel events
  useEffect(() => {
    if (viewMode !== 'zoom') return
    
    const handleWheel = (e) => {
      e.preventDefault()
      
      if (isScrolling.current) return
      
      const direction = e.deltaY > 0 ? 1 : -1
      const newIndex = currentIndex + direction
      
      if (newIndex >= 0 && newIndex < projects.length) {
        isScrolling.current = true
        setCurrentIndex(newIndex)
        
        if (zoomContainerRef.current) {
          zoomContainerRef.current.scrollTo({
            top: newIndex * window.innerHeight,
            behavior: 'smooth'
          })
        }
        
        setTimeout(() => {
          isScrolling.current = false
        }, 500)
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [viewMode, currentIndex, projects.length])
  
  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY)
  }
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isUpSwipe = distance > 50
    const isDownSwipe = distance < -50
    
    if (isUpSwipe && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    
    if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  
  // Update scroll position when currentIndex changes
  useEffect(() => {
    if (viewMode === 'zoom' && zoomContainerRef.current) {
      zoomContainerRef.current.scrollTo({
        top: currentIndex * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }, [currentIndex, viewMode])
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (viewMode !== 'zoom') return
      
      if (e.key === 'ArrowDown' && currentIndex < projects.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1)
      } else if (e.key === 'Escape') {
        switchToGrid()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [viewMode, currentIndex, projects.length])
  
  // Grid view
  if (viewMode === 'grid') {
    return (
      <div className={styles.gallery}>
        <div className={styles.header}>
          <div className={styles.viewControls}>
            <button 
              className={`${styles.viewButton} ${styles.active}`}
              onClick={switchToGrid}
              title="Grid View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="1" y="1" width="8" height="8"/>
                <rect x="11" y="1" width="8" height="8"/>
                <rect x="1" y="11" width="8" height="8"/>
                <rect x="11" y="11" width="8" height="8"/>
              </svg>
            </button>
            <button 
              className={styles.viewButton}
              onClick={switchToZoom}
              title="Full View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="2" width="16" height="16"/>
              </svg>
            </button>
          </div>
          
          <button 
            className={styles.filterToggle}
            onClick={onToggleFilter}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{filterPanelOpen ? 'Hide Filter' : 'Show Filter'}</span>
          </button>
        </div>
        
        <div className={styles.grid} ref={galleryRef}>
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={el => itemsRef.current[index] = el}
              className={styles.gridItem}
              onClick={() => handleItemClick(index)}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <div className={styles.info}>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    )
  }
  
  // TikTok-style zoom view
  return (
    <div 
      className={styles.zoomView}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.zoomHeader}>
        <button 
          className={styles.backButton}
          onClick={switchToGrid}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12 16l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </button>
      </div>
      
      <div 
        className={styles.zoomContainer}
        ref={zoomContainerRef}
      >
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={styles.zoomSlide}
            onDoubleClick={() => toggleLike(project.id)}
            onTouchEnd={() => handleDoubleTap(project.id)}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className={styles.zoomImage}
            />
            
            {/* Heart animation */}
            {showHeart === project.id && (
              <div className={styles.heartAnimation}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
            )}
            
            <div className={styles.sidebar}>
              <button 
                className={`${styles.likeButton} ${likedItems[project.id] ? styles.liked : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLike(project.id)
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill={likedItems[project.id] ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{project.likes + (likedItems[project.id] ? 1 : 0)}</span>
              </button>
              
              <button className={styles.shareButton}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.bottomInfo}>
              <h2>{project.title}</h2>
              <p>{project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery