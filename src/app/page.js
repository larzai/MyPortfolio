'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './styles/page.module.css'
import RevealText from './components/RevealText'
import Footer from './components/Footer.js'
import language from './components/language.json'
import { useTransition } from '@/components/Transition'
import { useLang } from './context/LangContext'
import Stack from './components/Stack'
import Intro from '@/components/Intro.js'
import lyn from 'lycaxia-notification'

export default function Home() {
  const { go } = useTransition()
  const { lang } = useLang()
  const t = language[lang]

  const aboutRef = useRef(null)
  const timeoutRef = useRef(null)
  const notificationRef = useRef(null)
  const blurTimeoutRef = useRef(null)

  const [mouseTrack, setMouseTrack] = useState({
    x: 0,
    y: 0
  })

  const [circleHeight, setCircleHeight] = useState(30)
  const [blur, setBlur] = useState(false)

  const images = [
    'https://images.unsplash.com/photo-1480074A568708-e7b720bb3f09?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
  ]

  useEffect(() => {
    lyn.soundNotification("allow");
    
    const handleScroll = () => {
      if (!aboutRef.current) return

      const windowHeight = window.innerHeight
      const aboutRect = aboutRef.current.getBoundingClientRect()

      const progress =
        (windowHeight - aboutRect.top) /
        (windowHeight + aboutRect.height)

      const clamped = Math.max(0, Math.min(progress, 1))
      const newHeight = 10 - clamped * 20

      setCircleHeight(newHeight)
    }

    window.addEventListener('scroll', handleScroll)

    notificationRef.current = setTimeout(() => {
      if (lyn?.dynamicIsland) {
        lyn.dynamicIsland({
          Status: 'default',
          Mess: t.greetU,
          Label: 'info'
        })
      }
    }, 5500)

    const loop = () => {
      const delay = Math.random() * 6000 + 4000

      timeoutRef.current = setTimeout(() => {
        setBlur(true)

        blurTimeoutRef.current = setTimeout(() => {
          setBlur(false)
          loop()
        }, 500)
      }, delay)
    }

    loop()

    return () => {
      window.removeEventListener('scroll', handleScroll)

      clearTimeout(notificationRef.current)
      clearTimeout(timeoutRef.current)
      clearTimeout(blurTimeoutRef.current)
    }
  }, [t])

  return (
    <div className={styles.page}>
      <Intro />

      <main className={styles.main}>
        <section
          className={styles.hero}
          onMouseMove={(e) => {
            setMouseTrack({
              x: e.clientX,
              y: e.clientY
            })
          }}
        >
          <div
            className={styles.backGround}
            style={{
              filter: blur ? 'blur(8px)' : 'blur(0px)',
              transition: 'filter 0.5s ease'
            }}
          >
            <div className={styles.mainWrapper}>
              <span className={styles.labelTop}>
                {t.greet}
              </span>

              <h1 className={styles.rifaldo}>
                RIFALDO
              </h1>

              <h1 className={styles.saputra}>
                SAPUTRA
              </h1>

              <span className={styles.labelBottom}>
                {t.welcome}
              </span>
            </div>
          </div>

          <div className={styles.optionHero}>
            <div className={styles.linkButton}>
              <a
                className={styles.link1}
                onClick={() => go('/')}
              >
                HOME
              </a>

              <a
                className={styles.link2}
                onClick={() => go('/about')}
              >
                ABOUT
              </a>

              <a
                className={styles.link3}
                onClick={() => go('/gallery')}
              >
                GALLERY
              </a>

              <a
                className={styles.link4}
                onClick={() => go('/contact')}
              >
                CONTACT
              </a>
            </div>
          </div>

          <div
            className={styles.cursorTrack}
            style={{
              left: mouseTrack.x,
              top: mouseTrack.y
            }}
          />
        </section>

        <div
          className={styles.homeAboutCircle}
          style={{
            height: `${circleHeight}vw`
          }}
        />

        <section
          ref={aboutRef}
          className={styles.homeAbout}
        >
          <RevealText text={t.homeAbout} />

          <a
            className={styles.buttonHomeAbout}
            onClick={() => go('/about')}
          >
            {t.buttonHomeAbout}
          </a>
        </section>

        <section className={styles.homeExperience}>
          <motion.h2
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4
            }}
          >
            {t.homeExperienceTitle}
          </motion.h2>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
          >
            {t.homeExperienceHeading}
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8
            }}
          >
            {t.homeExperienceDescription}
          </motion.p>

          <div className={styles.timeLine}>
            <div className={styles.item}>
              <div className={styles.line} />
              <div className={styles.dot} />

              <motion.div
                className={styles.content}
                initial={{
                  opacity: 0,
                  x: 30
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 0.6
                }}
                viewport={{
                  once: false,
                  amount: 0.3
                }}
              >
                <span>2021</span>
                <h3>{t.homeExperience2021}</h3>
                <p>{t.homeExperience2021P}</p>
              </motion.div>
            </div>

            <div className={styles.item}>
              <div className={styles.line} />
              <div className={styles.dot} />

              <motion.div
                className={styles.content}
                initial={{
                  opacity: 0,
                  x: -30
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 0.6
                }}
                viewport={{
                  once: false,
                  amount: 0.3
                }}
              >
                <span>2022</span>
                <h3>{t.homeExperience2022}</h3>
                <p>{t.homeExperience2022P}</p>
              </motion.div>
            </div>

            <div className={styles.item}>
              <div className={styles.line} />
              <div className={styles.dot} />

              <motion.div
                className={styles.content}
                initial={{
                  opacity: 0,
                  x: 30
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 0.6
                }}
                viewport={{
                  once: false,
                  amount: 0.3
                }}
              >
                <span>2023</span>
                <h3>{t.homeExperience2023}</h3>
                <p>{t.homeExperience2023P}</p>
              </motion.div>
            </div>

            <div className={styles.item}>
              <div className={styles.line} />
              <div className={styles.dot} />

              <motion.div
                className={styles.content}
                initial={{
                  opacity: 0,
                  x: -30
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 0.6
                }}
                viewport={{
                  once: false,
                  amount: 0.3
                }}
              >
                <span>2025</span>
                <h3>{t.homeExperience2025}</h3>
                <p>{t.homeExperience2025P}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.homeSelf}>
          <div className={styles.homeSelfTop}>
            <span>01</span>
            <span>10</span>
          </div>

          <div className={styles.homeSelfCenter}>
            <motion.h1
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6
              }}
            >
              {t.homeSelfTitle}
            </motion.h1>

            <motion.h2
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6
              }}
            >
              {t.homeSelfSubtitle}
            </motion.h2>
          </div>

          <div className={styles.homeSelfBottom}>
            <motion.p
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}
            >
              {t.homeSelfParagraph1}
            </motion.p>

            <div className={styles.star10} />

            <motion.p
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}
            >
              {t.homeSelfParagraph2}
            </motion.p>
          </div>
        </section>

        <section className={styles.homeBestProject}>
          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6
            }}
          >
            <h1>
              {t.homeBestProjectTitle1}
              <br />
              <span>
                {t.homeBestProjectTitle2}
              </span>
              <br />
              {t.homeBestProjectTitle3}
            </h1>
          </motion.div>

          <div className={styles.homeBestProjectGallery}>
            <motion.a
              onClick={() => go('/gallery')}
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}
            >
              {t.buttonHomeProjectGallery}
            </motion.a>

            <div className={styles.galleryStack}>
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                cards={images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`card-${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ))}
                autoplay={false}
                autoplayDelay={3000}
                pauseOnHover={false}
              />
            </div>
          </div>
        </section>

        <section className={styles.homeContactMe}>
          <a onClick={() => go('/contact')}>
            <motion.h1
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6
              }}
            >
              {t.homeContactMeTitle}
            </motion.h1>

            <motion.h2
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6
              }}
            >
              {t.homeContactMeSubtitle}
            </motion.h2>
          </a>
        </section>

        <Footer />
      </main>
    </div>
  )
}