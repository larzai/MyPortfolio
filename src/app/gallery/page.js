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

export default function Gallery() {
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
              <div className={styles.galleryHeroDec}>
                <div className={styles.galleryTextHeroDec}>
                  <h1>{t.galleryTitle1}</h1>
                  <div className={styles.box}></div>
                </div>
                <h1>{t.galleryTitle2}</h1>
                <div className={`${styles.galleryTextHeroDec} ${styles.reverse}`}>
                  <h1>{t.galleryTitle3}</h1>
                  <div className={styles.box}></div>
                </div>
              </div>
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
        <section className={styles.galleryTop}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >{t.GalleryTitle}</motion.h1>
          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery
              bend={1}
              textColor="#000000"
              borderRadius={0.05}
              scrollEase={0.05}
              fontUrl=""
              font="bold 30px Montserrat"
              scrollSpeed={2}
            />
          </div>
        </section>
        <section className={styles.galleryItems}>
          <div className={styles.galleryItemsContainer}>
          {datas
            .slice()
            .reverse()
            .slice(0, visible)
            .map((data) => (
              <div key={data.id} className={styles.galleryItemsContent}>
                <Image
                  src={data.url || "/image/error.png"}
                  alt="foto"
                  width={300}
                  height={500}
                />
                <div className={styles.caption}>
                  {data.link ? (
                    <>
                      <Link href={data.link} target="_blank">{t.galleryButton}</Link>
                      <p>{data.date}</p>
                      <h2>{data.caption}</h2>
                    </>
                  ) : (
                    <>
                      <p>{data.date}</p>
                      <h2>{data.caption}</h2>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        
          <button
            className={styles.showMore}
            onClick={() => setVisible((prev) => prev + 4)}
            disabled={visible >= datas.length}
          >
            {visible >= datas.length
              ? t.showMoreNo
              : t.showMoreYes}
          </button>
        </section>
        <Footer />
      </main>
    </div>
  )
}