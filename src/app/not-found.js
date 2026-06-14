'use client'
import { useEffect, useState, useRef } from 'react'
import { useTransition } from "@/components/Transition"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import styles from "@/gallery/page.module.css"
import language from "@/components/language.json"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import ScrollVelocity from "@/components/ScrollVelocity"
import CountUp from "@/components/CountUp"
import CircularGallery from "@/components/CircularGallery"
import { useLang } from "@/context/LangContext"

export default function NotFound() {
  const { go } = useTransition()
  const { lang } = useLang()
  const t = language[lang]
  
  const [datas, setDatas] = useState([]);
  const [visible, setVisible] = useState(4);
  
  const MotionImage = motion(Image)
  
  useEffect(() => {
    fetch('https://cdn.rifaldo.my.id/gallery/data.json')
      .then(res => res.json())
      .then(setDatas);
    return () => {
      
    }
    
  }, [])
  
  
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.backGround}>
            <div className={styles.mainWrapper}>
              <h1>404 :(</h1>
            </div>
          </div>
          <div className={styles.optionHero}>
            <div className={styles.linkButton}>
              <a className={styles.link1} onClick={() => go("/")}>Home</a>
              <a className={styles.link2} onClick={() => go("/about")}>About</a>
              <a className={styles.link3} onClick={() => go("/gallery")}>Galery</a>
              <a className={styles.link4} onClick={() => go("/contact")}>Contact</a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}