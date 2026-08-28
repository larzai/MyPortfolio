'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from "@/styles/intro.module.css"

export default function Intro() {
  const youWords = [
    "You",
    "あなた",
    "你",
    "Tú",
    "Vous",
    "Du",
    "Você",
    "당신",
    "أنت",
    "Sen",
    "Вы",
    "Kamu"
  ]

  const [step, setStep] = useState(0)
  const [youIndex, setYouIndex] = useState(0)
  const [introVH, setIntroVH] = useState(0)
  const [radiusIntroVH, setRadiusIntroVH] = useState(0)

  useEffect(() => {
    if (window.__INTRO_PLAYED__) {
      setIntroVH(0)
      return
    }

    window.__INTRO_PLAYED__ = true

    const t1 = setTimeout(() => setStep(1), 800)
    const t2 = setTimeout(() => {
      setStep(2)
      const interval = setInterval(() => {
        setYouIndex((prev) => {
          if (prev + 1 >= youWords.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 200)
    }, 1500)

    const t3 = setTimeout(() => {
      setIntroVH(0)
      setRadiusIntroVH(100)
    }, 4300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <section
      className={styles.intro}
      style={{
        height: `${introVH}vh`,
        borderBottomLeftRadius: `${radiusIntroVH}%`,
        borderBottomRightRadius: `${radiusIntroVH}%`
      }}
    >
      <h1 className={styles.introText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3em' }}>
        {step >= 1 && (
          <motion.span
            className={styles.hi}
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 14 }}
          >
            Hi,
          </motion.span>
        )}
        {step >= 2 && (
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              className={styles.you}
              key={youIndex}
              initial={youIndex === 0 ? { x: 120, opacity: 0 } : { opacity: 0, y: 10 }}
              animate={youIndex === 0 ? { x: 0, opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: youIndex === 0 ? 0.25 : 0.08 }}
              style={{ display: 'inline-block' }}
            >
              {youWords[youIndex]}
            </motion.span>
          </span>
        )}
      </h1>
    </section>
  )
}
