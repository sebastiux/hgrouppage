import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Logo from '../Logo/Logo'
import { 
  getCompanyLogo,
  getText,
  navigateTo,
  animationDurations,
  easingFunctions
} from '../../utils'
import styles from './Sidebar.module.scss'

const Sidebar = ({ theme, setTheme, language, setLanguage }) => {
  const [expandedItem, setExpandedItem] = useState(null)
  const menuRef = useRef(null)
  const submenuRefs = useRef({})
  const submenuTimeline = useRef(null)
  
  // Simplified company data - using Hero logo for all for now
  const companyItems = [
    { 
      id: 'hero', 
      label: 'HERO', 
      desc: { 
        en: 'Building a better world',
        es: 'Construyendo un mejor mundo'
      }
    },
    { 
      id: 'hack', 
      label: 'HACK', 
      desc: { 
        en: 'Disrupting the norm with innovative solutions',
        es: 'Rompiendo lo convencional con soluciones innovadoras'
      }
    },
    { 
      id: 'hook', 
      label: 'HOOK', 
      desc: { 
        en: 'Creating experiences that captivate audiences',
        es: 'Creando experiencias que cautivan audiencias'
      }
    },
    { 
      id: 'hunt', 
      label: 'HUNT', 
      desc: { 
        en: 'Discovering insights that drive growth',
        es: 'Descubriendo insights que impulsan el crecimiento'
      }
    },
    { 
      id: 'hype', 
      label: 'HYPE', 
      desc: { 
        en: 'Generating buzz that spreads like wildfire',
        es: 'Generando expectación que se extiende como fuego'
      }
    },
    { 
      id: 'halo', 
      label: 'HALO', 
      desc: { 
        en: 'Generating buzz that spreads like wildfire',
        es: 'Generando expectación que se extiende como fuego'
      }
    },
    { 
        id: 'here', 
        label: 'HERE', 
        desc: { 
          en: 'Generating buzz that spreads like wildfire',
          es: 'Generando expectación que se extiende como fuego'
        }
      }

  ]
  
  const menuItems = [
    {
      id: 'work',
      label: { en: 'WORK WITH US', es: 'TRABAJA CON NOSOTROS' },
      submenu: companyItems
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
    if (expandedItem && submenuRefs.current[expandedItem]) {
      const submenu = submenuRefs.current[expandedItem]
      const submenuItems = submenu.children
      
      // Kill any existing timeline
      if (submenuTimeline.current) {
        submenuTimeline.current.kill()
      }
      
      // Create new timeline for smooth animation
      submenuTimeline.current = gsap.timeline()
      
      // First, set initial state
      gsap.set(submenu, { height: 'auto', display: 'block' })
      const height = submenu.offsetHeight
      gsap.set(submenu, { height: 0, opacity: 0 })
      
      // Animate submenu container
      submenuTimeline.current
        .to(submenu, {
          height: height,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut'
        })
        .fromTo(submenuItems,
          { 
            opacity: 0,
            y: -8
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out'
          },
          '-=0.2'
        )
    }
  }, [expandedItem])
  
  const handleItemClick = (itemId) => {
    const item = menuItems.find(m => m.id === itemId)
    
    if (item.submenu) {
      if (expandedItem === itemId) {
        // Collapse animation
        const submenu = submenuRefs.current[itemId]
        const submenuItems = submenu.children
        
        if (submenuTimeline.current) {
          submenuTimeline.current.kill()
        }
        
        submenuTimeline.current = gsap.timeline({
          onComplete: () => setExpandedItem(null)
        })
        
        submenuTimeline.current
          .to(submenuItems, {
            opacity: 0,
            y: -8,
            duration: 0.2,
            stagger: 0.03,
            ease: 'power2.in'
          })
          .to(submenu, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          }, '-=0.1')
      } else {
        // First collapse any open submenu
        if (expandedItem && submenuRefs.current[expandedItem]) {
          const oldSubmenu = submenuRefs.current[expandedItem]
          gsap.to(oldSubmenu, {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
          })
        }
        // Then expand the new one
        setTimeout(() => setExpandedItem(itemId), expandedItem ? 200 : 0)
      }
    } else if (item.link) {
      navigateTo(item.link)
    }
  }

  // Handle logo click
  const handleLogoClick = () => {
    if (expandedItem) {
      setExpandedItem(null)
    }
    navigateTo('/')
  }

  // Get Hero logo for all items (temporary)
  const getItemLogo = () => {
    return getCompanyLogo('hero', theme)
  }
  
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Main Logo */}
        <div className={styles.logo}>
          <Logo 
            theme={theme} 
            size="default"
            onClick={handleLogoClick}
          />
        </div>
        
        {/* Main Navigation */}
        <nav className={styles.mainNav} ref={menuRef}>
          {menuItems.map(item => (
            <div key={item.id} className={styles.menuItemWrapper}>
              <div 
                className={`${styles.menuItem} ${expandedItem === item.id ? styles.active : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className={styles.menuLink}>
                  {getText(item.label, language)}
                  {item.submenu && (
                    <span className={`${styles.arrow} ${expandedItem === item.id ? styles.rotated : ''}`}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                        <path d="M1.5 2.5l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                    </span>
                  )}
                </span>
              </div>
              
              {item.submenu && (
                <div 
                  className={`${styles.submenu} ${expandedItem === item.id ? styles.expanded : ''}`}
                  ref={el => submenuRefs.current[item.id] = el}
                >
                  {item.submenu.map(subItem => {
                    const logoSrc = getItemLogo() // Using Hero logo for all items
                    
                    return (
                      <a 
                        key={subItem.id}
                        href={`/${subItem.id}`}
                        className={styles.submenuItem}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            x: 4,
                            duration: 0.2,
                            ease: 'power2.out'
                          })
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            x: 0,
                            duration: 0.2,
                            ease: 'power2.out'
                          })
                        }}
                      >
                        <div className={styles.submenuContent}>
                          <div className={styles.submenuHeader}>
                            {logoSrc && (
                              <img 
                                src={logoSrc} 
                                alt={`${subItem.label} logo`}
                                className={styles.submenuLogo}
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                }}
                              />
                            )}
                            <div className={styles.submenuText}>
                              <p>{getText(subItem.desc, language)}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    )
                  })}
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
            title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
          >
            {language === 'en' ? 'EN' : 'ES'}
          </button>
          <button 
            className={styles.themeToggle}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title={language === 'en' 
              ? (theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode')
              : (theme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro')
            }
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar