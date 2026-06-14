'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import styles from "./../styles/navigation.module.css"
import { useLang } from "@/context/LangContext.js"
import { useTransition } from "@/components/Transition"

export default function Navigation() {
  const { go } = useTransition()
  const [activeDex, setActiveDex] = useState(false)
  const [activeMobile, setActiveMobile] = useState(false)
  const { lang, setLang } = useLang()
  const [showNav, setShowNav] = useState(false)
  const [GlassSurface, setGlassSurface] = useState(null)
  
  useEffect(() => {
    if (window.innerWidth >= 720) {
      import('@/components/GlassSurface')
        .then(mod => setGlassSurface(() => mod.default))
    }
    
    const handleScroll = () => {
      setShowNav(window.scrollY >= window.innerHeight * 0.1)
    }
    
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <nav className={styles.nav}>
    {/* Desktop */}  
      {GlassSurface && (
      <GlassSurface
        className={`
          ${styles.navDex}
          ${activeDex ? styles.active : ''}
          ${showNav ? styles.show : ''}
        `}
      >  
        <div className={styles.navDexTop}>
          <h1>Rivall</h1>
          <button  
            className={styles.navDexButton}  
            onClick={() => setActiveDex(!activeDex)}  
          >  
            {activeDex ? '×' : '☰'}  
          </button>  
        </div>
        <hr />
        <div className={styles.navDexMenu}>
          <a onClick={() => go("/")}>
            <span className={styles.top}>Home</span>  
            <span className={styles.bottom}>Home</span>  
          </a>  
          <a onClick={() => go("/about")}>
            <span className={styles.top}>About</span>
            <span className={styles.bottom}>About</span>  
          </a>
            <a onClick={() => go("/gallery")}>
            <span className={styles.top}>Gallery</span>  
            <span className={styles.bottom}>Gallery</span>  
          </a>  
          <a onClick={() => go("/contact")}>
            <span className={styles.top}>Contact</span>  
            <span className={styles.bottom}>Contact</span>  
          </a>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
      </GlassSurface>
      )}
      {/* Mobile */}  
      <aside className={`${styles.navMobile} ${activeMobile ? styles.active : ''}`}>  
        <button  
          className={styles.navMobileButton}  
          onClick={() => setActiveMobile(!activeMobile)}  
        >  
          {activeMobile ? '×' : '☰'}  
        </button>  
        <div className={styles.navMobileMenu}>  
          <a onClick={() => go("/")}>
            <span className={styles.top}>Home</span>  
            <span className={styles.bottom}>Home</span>  
          </a>  
          <a onClick={() => go("/about")}>
            <span className={styles.top}>About</span>
            <span className={styles.bottom}>About</span>  
          </a>
            <a onClick={() => go("/gallery")}>
            <span className={styles.top}>Gallery</span>  
            <span className={styles.bottom}>Gallery</span>  
          </a>  
          <a onClick={() => go("/contact")}>
            <span className={styles.top}>Contact</span>  
            <span className={styles.bottom}>Contact</span>  
          </a>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>  
      </aside>  
    </nav>
  )
}