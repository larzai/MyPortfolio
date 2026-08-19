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

  const handleNavClick = (path) => {
    setActiveDex(false)
    setActiveMobile(false)
    go(path)
  }
  
  return (
    <nav className={styles.nav}>  
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
          <a onClick={() => handleNavClick("/")}>
            <span className={styles.top}>
              {"HOME".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>  
            <span className={styles.bottom}>
              {"HOME".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>  
          </a>  
          <a onClick={() => handleNavClick("/about")}>
            <span className={styles.top}>
              {"ABOUT".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>
            <span className={styles.bottom}>
              {"ABOUT".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>  
          </a>
          <a onClick={() => handleNavClick("/gallery")}>
            <span className={styles.top}>
              {"GALLERY".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>  
            <span className={styles.bottom}>
              {"GALLERY".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>  
          </a>  
          <a onClick={() => handleNavClick("/contact")}>
            <span className={styles.top}>
              {"CONTACT".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>  
            <span className={styles.bottom}>
              {"CONTACT".split("").map((char, i) => <span key={i}>{char}</span>)}
            </span>  
          </a>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
      </GlassSurface>
      )} 
      <aside className={`${styles.navMobile} ${activeMobile ? styles.active : ''}`}>  
        <button  
          className={styles.navMobileButton}  
          onClick={() => setActiveMobile(!activeMobile)}  
        >  
          {activeMobile ? '×' : '☰'}  
        </button>  
        <div className={styles.navMobileMenu}>  
          <a onClick={() => handleNavClick("/")}>
            <span className={styles.top}>HOME</span>  
            <span className={styles.bottom}>HOME</span>  
          </a>  
          <a onClick={() => handleNavClick("/about")}>
            <span className={styles.top}>ABOUT</span>
            <span className={styles.bottom}>ABOUT</span>  
          </a>
          <a onClick={() => handleNavClick("/gallery")}>
            <span className={styles.top}>GALLERY</span>  
            <span className={styles.bottom}>GALLERY</span>  
          </a>  
          <a onClick={() => handleNavClick("/contact")}>
            <span className={styles.top}>CONTACT</span>  
            <span className={styles.bottom}>CONTACT</span>  
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
