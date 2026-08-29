'use client'
import { useEffect, useState, useRef } from 'react'
import { useTransition } from "@/components/Transition"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import styles from "@/about/page.module.css"
import language from "@/components/language.json"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import ScrollVelocity from "@/components/ScrollVelocity"
import CountUp from "@/components/CountUp"
import { useLang } from "@/context/LangContext"

export default function About() {
  const { go } = useTransition()
  const { lang } = useLang()
  const t = language[lang]
  
  const MotionImage = motion(Image)
  
  useEffect(() => {
    return () => {
      
    }
    
  }, [])
  
  
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.backGround}>
            <div className={styles.mainWrapper}>
              <div className={styles.shape}></div>
              <h1 className={styles.about}>{t.aboutTitle}</h1>
              <div className={styles.aboutMe}>
                <h1>{t.aboutSubtitle}</h1>
                <p>{t.aboutHeroDescription1}<br/><br/>{t.aboutHeroDescription2}</p>
              </div>
            </div>
          </div>
          <div className={styles.optionHero}>
            <div className={styles.linkButton}>
              <a className={styles.link1} onClick={() => go("/")}>HOME</a>
              <a className={styles.link2} onClick={() => go("/about")}>ABOUT</a>
              <a className={styles.link3} onClick={() => go("/gallery")}>GALLERY</a>
              <a className={styles.link4} onClick={() => go("/contact")}>CONTACT</a>
            </div>
          </div>
        </section>
        <section className={styles.aboutIAM}>
          <ScrollVelocity
            texts={[t.aboutProfile, t.aboutBackground]}
            velocity={70}
            className="custom-scroll-text"
            numCopies={6}
            damping={80}
            stiffness={400}
          />
          <div className={styles.aboutMeMore}>
            <MotionImage
              src="/image/about-foto.png"
              alt="foto"
              width={300}
              height={500}
              initial={{
                filter: "blur(8px)"
              }}
              whileInView={{
                filter: "blur(0px)"
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
            />
            <motion.p
              initial={{
                opacity: 0,
                filter: "blur(8px)"
              }}
              whileInView={{
                opacity: 1,
                filter: "blur(0px)"
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
            >
{t.aboutDescription1}
<br/>
<br/>
{t.aboutDescription2}
<br/>
<br/>
{t.aboutDescription3}
<br/>
<br/>
{t.aboutDescription4}
            </motion.p>
          </div>
          <motion.div
            className={styles.aboutMeInfo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.aboutMeInfoItem}>
              <h1>0
                <CountUp
                  from={0}
                  to={4}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  delay={0}
                />+
              </h1>
              <h2>{t.aboutYearsLearning}</h2>
              <p>{t.aboutYearsLearningDescription}</p>
            </div>
            
            <div className={styles.aboutMeInfoItem}>
              <h1>
                <CountUp
                  from={0}
                  to={15}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  delay={0}
                />+
              </h1>
              <h2>{t.aboutProjectsBuilt}</h2>
              <p>{t.aboutProjectsBuiltDescription}</p>
            </div>
            
            <div className={styles.aboutMeInfoItem}>
              <h1>0
                <CountUp
                  from={0}
                  to={5}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  delay={0}
                />+
              </h1>
              <h2>{t.aboutFieldsExplored}</h2>
              <p>{t.aboutFieldsExploredDescription}</p>
            </div>
            
            <div className={styles.aboutMeInfoItem}>
              <h1>∞</h1>
              <h2>{t.aboutCuriosityLevel}</h2>
              <p>{t.aboutCuriosityLevelDescription}</p>
            </div>
          </motion.div>
        </section>
        <section className={styles.aboutMeTechStack}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t.aboutTechStackTitle}
          </motion.h2>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.aboutTechStackHeading}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t.aboutTechStackDescription}
          </motion.p>
        
          <motion.div
            className={styles.aboutMeTechGrid}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.aboutMeTechCard}>
              <h2>Front-End Development</h2>
              <div className={styles.aboutMeTechItems}>
                <span>
                  <div style={{ backgroundColor: "#256095" }}></div>
                  React
                </span>
                <span>
                  <div style={{ backgroundColor: "#6e6e6e" }}></div>
                  Next.js
                </span>
                <span>
                  <div style={{ backgroundColor: "#e6e21f" }}></div>
                  JavaScript
                </span>
                <span>
                  <div style={{ backgroundColor: "#d86636" }}></div>
                  HTML
                </span>
                <span>
                  <div style={{ backgroundColor: "#256095" }}></div>
                  CSS
                </span>
              </div>
            </div>
        
            <div className={styles.aboutMeTechCard}>
              <h2>Back-End Development</h2>
              <div className={styles.aboutMeTechItems}>
                <span>
                  <div style={{ backgroundColor: "#508a44" }}></div>
                  Node.js
                </span>
                <span>
                  <div style={{ backgroundColor: "#6a6a6a" }}></div>
                  Express.js
                </span>
                <span>
                  <div style={{ backgroundColor: "#813416" }}></div>
                  REST API
                </span>
                <span>
                  <div style={{ backgroundColor: "#b88b1b" }}></div>
                  MySQL
                </span>
              </div>
            </div>
        
            <div className={styles.aboutMeTechCard}>
              <h2>Product Design</h2>
              <div className={styles.aboutMeTechItems}>
                <span>
                  <div style={{ backgroundColor: "#cfeb4f" }}></div>
                  Figma
                </span>
                <span>
                  <div style={{ backgroundColor: "#c027bd" }}></div>
                  UI Design
                </span>
                <span>
                  <div style={{ backgroundColor: "#953025" }}></div>
                  UX Research
                </span>
                <span>
                  <div style={{ backgroundColor: "#e1e92e" }}></div>
                  Wireframing
                </span>
              </div>
            </div>
        
            <div className={styles.aboutMeTechCard}>
              <h2>IoT & Electronics</h2>
              <div className={styles.aboutMeTechItems}>
                <span>
                  <div style={{ backgroundColor: "#4178c5" }}></div>
                  Arduino
                </span>
                <span>
                  <div style={{ backgroundColor: "#256095" }}></div>
                  Sensors
                </span>
                <span>
                  <div style={{ backgroundColor: "#5b5b5b" }}></div>
                  Embedded Systems
                </span>
                <span>
                  <div style={{ backgroundColor: "#952525" }}></div>
                  Hardware Integration
                </span>
              </div>
            </div>
        
            <div className={styles.aboutMeTechCard}>
              <h2>Creative Media</h2>
              <div className={styles.aboutMeTechItems}>
                <span>
                  <div style={{ backgroundColor: "#80d279" }}></div>
                  Photography
                </span>
                <span>
                  <div style={{ backgroundColor: "#78613f" }}></div>
                  Videography
                </span>
                <span>
                  <div style={{ backgroundColor: "#3783c6" }}></div>
                  Editing
                </span>
                <span>
                  <div style={{ backgroundColor: "#b265ca" }}></div>
                  Content Creation
                </span>
              </div>
            </div>
        
            <div className={styles.aboutMeTechCard}>
              <h2>Tools & Workflow</h2>
              <div className={styles.aboutMeTechItems}>
                <span>
                  <div style={{ backgroundColor: "#9a553c" }}></div>
                  Git
                </span>
                <span>
                  <div style={{ backgroundColor: "#6f6f6f" }}></div>
                  GitHub
                </span>
              </div>
            </div>
          </motion.div>
        </section>
        <section className={styles.aboutMeQuote}>
          <div className={styles.aboutMeBoxQuote}>
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >“</motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >{t.aboutQuote}</motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >Albert Einstein</motion.p>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}