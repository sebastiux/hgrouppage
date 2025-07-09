import React, { useState } from 'react'
import { getLogoForTheme } from '../../utils'
import styles from './Logo.module.scss'

const Logo = ({ theme = 'light', size = 'default', onClick }) => {
  const [imageError, setImageError] = useState(false)
  
  const logoSrc = getLogoForTheme(theme)
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  
  // Show fallback text if image fails to load
  if (imageError) {
    return (
      <div 
        className={`${styles.logoContainer} ${styles[size]}`}
        onClick={handleClick}
        title="HGROUP - Click to go home"
      >
        <div className={`${styles.logoFallback} ${styles[size]}`}>
          HGROUP
        </div>
      </div>
    )
  }
  
  // Show the actual logo image
  return (
    <div 
      className={`${styles.logoContainer} ${styles[size]}`}
      onClick={handleClick}
      title="HGROUP - Click to go home"
    >
      <img 
        src={logoSrc}
        alt="HGROUP"
        className={styles.logoImage}
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />
    </div>
  )
}

export default Logo