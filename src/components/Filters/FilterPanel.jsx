import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './FilterPanel.module.scss'

const FilterPanel = ({ onFilterChange, isOpen, onClose, activeFilter, isMobile }) => {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  
  const filters = [
    'EVERYTHING',
    'HERO',
    'HACK', 
    'HOOK',
    'HUNT',
    'HYPE'
  ]

  useEffect(() => {
    if (isOpen && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [isOpen])

  const handleFilterClick = (filter) => {
    onFilterChange(filter)
    // Auto close on mobile after selection
    if (isMobile) {
      setTimeout(() => onClose(), 300)
    }
  }

  const handleClose = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        x: 300,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => onClose()
      })
    } else {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className={styles.overlay}
          ref={overlayRef}
          onClick={handleClose}
        />
      )}
      
      <div className={styles.filterPanel} ref={panelRef}>
        <div className={styles.header}>
          <h3 className={styles.title}>BY TYPE</h3>
          <button 
            className={styles.closeButton} 
            onClick={handleClose}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div className={styles.filters}>
          {filters.map(filter => (
            <button
              key={filter}
              className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => handleFilterClick(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default FilterPanel