/// src/utils/index.js
// ===== CENTRALIZED UTILITIES FOR PURPLEHERO PROJECT =====

// ==========================================
// 🎨 LOGO UTILITIES
// ==========================================

// Main HGROUP logos
export const Hgroup_blanco = '/images/logo-blanco.png';
export const Hgroup_negro = '/images/logo-negro.png';

// HERO logos
export const Hero_blanco = '/images/herologo-blanco.png'; // White logo for dark backgrounds
export const Hero_negro = '/images/herologo-negro.png';   // Dark logo for light backgrounds

// Company logos configuration
export const companyLogos = {
  hero: {
    light: Hero_negro,  // Dark logo for light theme
    dark: Hero_blanco   // Light logo for dark theme
  },
  hack: {
    light: '/images/hacklogo-negro.png',
    dark: '/images/hacklogo-blanco.png'
  },
  hook: {
    light: '/images/hooklogo-negro.png', 
    dark: '/images/hooklogo-blanco.png'
  },
  hunt: {
    light: '/images/huntlogo-negro.png',
    dark: '/images/huntlogo-blanco.png'
  },
  hype: {
    light: '/images/hypelogo-negro.png',
    dark: '/images/hypelogo-blanco.png'
  }
};

// Logo utility functions
export const getLogoForTheme = (theme) => {
  return theme === 'dark' ? Hgroup_blanco : Hgroup_negro;
};

export const getHeroLogoForTheme = (theme) => {
  return theme === 'dark' ? Hero_blanco : Hero_negro;
};

export const getCompanyLogo = (company, theme) => {
  const logos = companyLogos[company];
  if (!logos) {
    console.warn(`No logo configuration found for company: ${company}`);
    return null;
  }
  return theme === 'dark' ? logos.dark : logos.light;
};

// Alternative exports for backward compatibility
export const logoWhite = Hgroup_blanco;
export const logoBlack = Hgroup_negro;
export const heroLogoWhite = Hero_blanco;
export const heroLogoBlack = Hero_negro;

// ==========================================
// 🌓 THEME UTILITIES
// ==========================================

export const themes = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const toggleTheme = (currentTheme) => {
  return currentTheme === themes.LIGHT ? themes.DARK : themes.LIGHT;
};

export const getThemeColors = (theme) => {
  return {
    light: {
      primary: '#FFFFFF',
      secondary: '#F8F8F8',
      tertiary: '#F0F0F0',
      text: '#000000',
      textSecondary: '#666666',
      border: '#E0E0E0',
      accent: '#000000'
    },
    dark: {
      primary: '#000000',
      secondary: '#0A0A0A',
      tertiary: '#141414',
      text: '#FFFFFF',
      textSecondary: '#999999',
      border: '#222222',
      accent: '#FFFFFF'
    }
  }[theme] || getThemeColors('light');
};

export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

export const getStoredTheme = () => {
  return localStorage.getItem('theme') || themes.LIGHT;
};

// ==========================================
// 🌐 LANGUAGE UTILITIES
// ==========================================

export const languages = {
  EN: 'en',
  ES: 'es'
};

export const languageLabels = {
  [languages.EN]: 'English',
  [languages.ES]: 'Español'
};

export const toggleLanguage = (currentLanguage) => {
  return currentLanguage === languages.EN ? languages.ES : languages.EN;
};

export const getStoredLanguage = () => {
  return localStorage.getItem('language') || languages.EN;
};

export const applyLanguage = (language) => {
  document.documentElement.setAttribute('lang', language);
  localStorage.setItem('language', language);
};

// Text utilities for multilingual content
export const getText = (textObj, language) => {
  if (typeof textObj === 'string') return textObj;
  return textObj[language] || textObj[languages.EN] || '';
};

// ==========================================
// 🎯 COMPANY DATA & CONFIGURATION
// ==========================================

export const companyData = {
  hero: {
    id: 'hero',
    label: 'HERO',
    description: {
      en: 'Building iconic brands that stand the test of time',
      es: 'Construyendo marcas icónicas que perduran en el tiempo'
    },
    color: '#8B5CF6',
    hasLogo: true,
    services: {
      en: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
      es: ['Estrategia de Marca', 'Identidad Visual', 'Manual de Marca']
    }
  },
  hack: {
    id: 'hack',
    label: 'HACK',
    description: {
      en: 'Disrupting the norm with innovative solutions',
      es: 'Rompiendo lo convencional con soluciones innovadoras'
    },
    color: '#EC4899',
    hasLogo: true,
    services: {
      en: ['Tech Innovation', 'Digital Solutions', 'Automation'],
      es: ['Innovación Tech', 'Soluciones Digitales', 'Automatización']
    }
  },
  hook: {
    id: 'hook',
    label: 'HOOK',
    description: {
      en: 'Creating experiences that captivate audiences',
      es: 'Creando experiencias que cautivan audiencias'
    },
    color: '#10B981',
    hasLogo: true,
    services: {
      en: ['UX/UI Design', 'User Research', 'Experience Strategy'],
      es: ['Diseño UX/UI', 'Investigación de Usuario', 'Estrategia de Experiencia']
    }
  },
  hunt: {
    id: 'hunt',
    label: 'HUNT',
    description: {
      en: 'Discovering insights that drive growth',
      es: 'Descubriendo insights que impulsan el crecimiento'
    },
    color: '#F59E0B',
    hasLogo: true,
    services: {
      en: ['Market Research', 'Data Analysis', 'Consumer Insights'],
      es: ['Investigación de Mercado', 'Análisis de Datos', 'Insights del Consumidor']
    }
  },
  hype: {
    id: 'hype',
    label: 'HYPE',
    description: {
      en: 'Generating buzz that spreads like wildfire',
      es: 'Generando expectación que se extiende como fuego'
    },
    color: '#EF4444',
    hasLogo: true,
    services: {
      en: ['PR Strategy', 'Social Media', 'Influencer Marketing'],
      es: ['Estrategia de PR', 'Redes Sociales', 'Marketing de Influencers']
    }
  }
};

export const getCompanyData = (companyId) => {
  return companyData[companyId] || null;
};

export const getAllCompanies = () => {
  return Object.values(companyData);
};

// ==========================================
// 🔧 GENERAL UTILITIES
// ==========================================

// Animation utilities
export const animationDurations = {
  FAST: 0.2,
  MEDIUM: 0.3,
  SLOW: 0.5,
  EXTRA_SLOW: 1.0
};

export const easingFunctions = {
  POWER2_OUT: 'power2.out',
  POWER2_IN: 'power2.in',
  POWER2_INOUT: 'power2.inOut',
  POWER3_OUT: 'power3.out',
  ELASTIC_OUT: 'elastic.out(1, 0.3)',
  BACK_OUT: 'back.out(1.7)'
};

// Responsive utilities
export const breakpoints = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
  LARGE: 1920
};

export const isMobile = () => {
  return window.innerWidth < breakpoints.MOBILE;
};

export const isTablet = () => {
  return window.innerWidth >= breakpoints.MOBILE && window.innerWidth < breakpoints.TABLET;
};

export const isDesktop = () => {
  return window.innerWidth >= breakpoints.TABLET;
};

// URL utilities
export const getCompanyUrl = (companyId) => {
  return `/${companyId}`;
};

export const getCurrentPath = () => {
  return window.location.pathname;
};

export const navigateTo = (path) => {
  window.location.href = path;
};

// Storage utilities
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }
};

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Format utilities
export const formatNumber = (number, locale = 'en-US') => {
  return new Intl.NumberFormat(locale).format(number);
};

export const formatDate = (date, locale = 'en-US', options = {}) => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ==========================================
// 📱 MOBILE UTILITIES
// ==========================================

export const mobileUtils = {
  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },
  isAndroid: () => {
    return /Android/.test(navigator.userAgent);
  },
  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
  getViewportHeight: () => {
    return window.innerHeight || document.documentElement.clientHeight;
  },
  preventZoom: () => {
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
  }
};

// ==========================================
// 🎨 COLOR UTILITIES
// ==========================================

export const colorUtils = {
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  
  rgbToHex: (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },
  
  adjustBrightness: (hex, percent) => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (color) => {
      const adjusted = Math.round(color * (100 + percent) / 100);
      return Math.max(0, Math.min(255, adjusted));
    };
    
    return colorUtils.rgbToHex(
      adjust(rgb.r),
      adjust(rgb.g),
      adjust(rgb.b)
    );
  }
};

// ==========================================
// 📊 ANALYTICS UTILITIES (Future use)
// ==========================================

export const analytics = {
  trackEvent: (eventName, properties = {}) => {
    // Future implementation for analytics
    console.log('Event tracked:', eventName, properties);
  },
  
  trackPageView: (page) => {
    // Future implementation for page tracking
    console.log('Page viewed:', page);
  }
};

// ==========================================
// 🚀 PERFORMANCE UTILITIES
// ==========================================

export const performance = {
  measureTime: (name, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  },
  
  loadImage: (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },
  
  preloadImages: (imageSources) => {
    return Promise.all(imageSources.map(src => performance.loadImage(src)));
  }
};