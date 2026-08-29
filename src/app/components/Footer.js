'use client'
import Link from 'next/link'
import styles from '@/styles/footer.module.css'
import { useLang } from '@/context/LangContext.js'
import CurvedLoop from '@/components/CurvedLoop.js'
import { useTransition } from "@/components/Transition"

export default function Footer() {
  const { go } = useTransition()
  const { lang, setLang } = useLang()

  return (
    <footer>
      <CurvedLoop 
        marqueeText="Building ✦ Ideas ✦ Shipping ✦ Code ✦ Learning ✦ Daily ✦ Growth"
        speed={2}
        curveAmount={400}
        direction="right"
        interactive
        className="custom-text-style"
      />
      
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <h2>RIFAL</h2>
              <p>Design • Code • Build</p>
            </div>
            <div className={styles.navGroup}>
              <div className={styles.col}>
                <span>Pages</span>
                <a onClick={() => go("/")}>Home</a>
                <a onClick={() => go("/about")}>About</a>
                <a onClick={() => go("/gallery")}>Gallery</a>
                <a onClick={() => go("/contact")}>Contact</a>
              </div>
              <div className={styles.col}>
                <span>More</span>
                <a onClick={() => go("/journey")}>Journey</a>
                <a onClick={() => go("/blog")}>Blog</a>
                <a onClick={() => go("/gallery")}>Project</a>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.cta}>
              <h1 className={styles.talk}>Let’s Talk</h1>
              <p>GOT AN IDEA? LET’S BUILD IT.</p>
            </div>
            <div className={styles.lang}>
              <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
                {lang.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}