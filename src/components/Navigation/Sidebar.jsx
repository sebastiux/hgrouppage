import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Sidebar.module.scss'

const Sidebar = ({ theme, setTheme, language, setLanguage }) => {
  const [hoveredItem, setHoveredItem] = useState(null)
  const menuRef = useRef(null)
  const submenuRef = useRef(null)
  
  const menuItems = [
    {
      id: 'work',
      label: { en: 'WORK WITH US', es: 'TRABAJA CON NOSOTROS' },
      submenu: [
        { id: 'hero', label: 'HERO', desc: 'Building iconic brands that stand the test of time', color: '#00FF00' },
        { id: 'hack', label: 'HACK', desc: 'Disrupting the norm with innovative solutions', color: '#FF00FF' },
        { id: 'hook', label: 'HOOK', desc: 'Creating experiences that captivate audiences', color: '#00FFFF' },
        { id: 'hunt', label: 'HUNT', desc: 'Discovering insights that drive growth', color: '#FFFF00' },
        { id: 'hype', label: 'HYPE', desc: 'Generating buzz that spreads like wildfire', color: '#FF0000' }
      ]
    },
    {
      id: 'join',
      label: { en: 'JOIN US', es: 'ÚNETE' },
      link: '/careers'
    },
    {
      id: 'follow',
      label: { en: 'FOLLOW US', es: 'SÍGUENOS' },
      link: '/social'
    }
  ]
  
  useEffect(() => {
    if (hoveredItem && submenuRef.current) {
      gsap.fromTo(submenuRef.current.children,
        { 
          opacity: 0, 
          x: -20,
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        },
        { 
          opacity: 1, 
          x: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }
      )
    }
  }, [hoveredItem])
  
  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId)
  }
  
  const handleMouseLeave = () => {
    gsap.to(submenuRef.current?.children || [], {
      opacity: 0,
      x: -10,
      duration: 0.3,
      onComplete: () => setHoveredItem(null)
    })
  }
  
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <h1>HGROUP</h1>
        </div>
        
        {/* Main Navigation */}
        <nav className={styles.mainNav} ref={menuRef}>
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={styles.menuItem}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href={item.link || '#'}
                className={styles.menuLink}
              >
                {language === 'en' ? item.label.en : item.label.es}
                {item.submenu && <span className={styles.arrow}>→</span>}
              </a>
              
              {item.submenu && hoveredItem === item.id && (
                <div className={styles.submenu} ref={submenuRef}>
                  {item.submenu.map(subItem => (
                    <a 
                      key={subItem.id}
                      href={`/${subItem.id}`}
                      className={styles.submenuItem}
                      style={{ '--item-color': subItem.color }}
                    >
                      <div className={styles.submenuContent}>
                        <h3>{subItem.label}</h3>
                        <p>{subItem.desc}</p>
                      </div>
                      <div className={styles.submenuBg} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        
        {/* Bottom Controls */}
        <div className={styles.controls}>
          <button 
            className={styles.langToggle}
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          >
            {language === 'en' ? 'EN' : 'ES'}
          </button>
          <button 
            className={styles.themeToggle}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar