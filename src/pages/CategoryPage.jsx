import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import styles from './CategoryPage.module.scss'

const CategoryPage = () => {
  const { category } = useParams()
  const [projects, setProjects] = useState([])
  
  const categoryInfo = {
    hero: {
      title: 'HERO',
      desc: 'Building iconic brands that stand the test of time',
      color: '#00FF00'
    },
    hack: {
      title: 'HACK',
      desc: 'Disrupting the norm with innovative solutions',
      color: '#FF00FF'
    },
    hook: {
      title: 'HOOK',
      desc: 'Creating experiences that captivate audiences',
      color: '#00FFFF'
    },
    hunt: {
      title: 'HUNT',
      desc: 'Discovering insights that drive growth',
      color: '#FFFF00'
    },
    hype: {
      title: 'HYPE',
      desc: 'Generating buzz that spreads like wildfire',
      color: '#FF0000'
    }
  }
  
  useEffect(() => {
    // Load category-specific projects
    // This would typically fetch from an API
    setProjects([
      // Sample projects for the category
    ])
    
    // Animate page entrance
    gsap.fromTo('.hero-section',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
  }, [category])
  
  const info = categoryInfo[category] || categoryInfo.hero
  
  return (
    <div className={styles.categoryPage}>
      <section className="hero-section" style={{ '--accent-color': info.color }}>
        <h1>{info.title}</h1>
        <p>{info.desc}</p>
      </section>
      {/* Add more content here */}
    </div>
  )
}

export default CategoryPage