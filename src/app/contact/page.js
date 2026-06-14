'use client'
import { useEffect, useState, useRef } from 'react'
import { useTransition } from "@/components/Transition"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import styles from "@/contact/page.module.css"
import language from "@/components/language.json"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import ScrollVelocity from "@/components/ScrollVelocity"
import CountUp from "@/components/CountUp"
import CircularGallery from "@/components/CircularGallery"
import { useLang } from "@/context/LangContext"
import { FiInstagram, FiGithub } from "react-icons/fi"
import { FaWhatsapp, FaTiktok } from "react-icons/fa"

export default function Contact() {
  const { go } = useTransition()
  const { lang } = useLang()
  const t = language[lang]
  
  const MotionImage = motion(Image)
  
  useEffect(() => {
    
    return () => {
      
    }
    
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    
    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(
  `Nama: ${name}
  Email: ${email}
  
  Pesan:
  ${message}`
    );
    
    window.location.href =
      `mailto:rifaldosaputra917@gmail.com?subject=${subject}&body=${body}`;
  };
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.backGround}>
            <div className={styles.mainWrapper}>
              <div className={styles.gridContainerDex}>
                {/* Baris 1 */}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                {/* Baris 2 */}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}><Image src="/image/c.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}><Image src="/image/n.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}><Image src="/image/a.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}><Image src="/image/c.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}></div>
                {/* Baris 3 */}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}>
                  <video autoPlay loop muted playsInline>
                    <source src="/image/o.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className={styles.gridItem}><Image src="/image/t.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}>
                  <video autoPlay loop muted playsInline>
                    <source src="/image/t1.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className={styles.gridItem}></div>
                {/* Baris 4 */}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
              </div>
              <div className={styles.gridContainerMobile}>
                {/* Baris 1 */}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                {/* Baris 2 */}
                <div className={styles.gridItem}><Image src="/image/c.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}>
                  <video autoPlay loop muted playsInline>
                    <source src="/image/o.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                {/* Baris 3 */}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}><Image src="/image/n.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                {/* Baris 4*/}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}><Image src="/image/t.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                {/* Baris 5*/}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}><Image src="/image/c.png" alt="foto" width={300}height={500} /></div>
                <div className={styles.gridItem}></div>
                {/* Baris 6*/}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}>
                  <video autoPlay loop muted playsInline>
                    <source src="/image/t1.mp4" type="video/mp4" />
                  </video>
                </div>
                {/* Baris 7*/}
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
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
        <section className={styles.contactMe}>
          <div className={styles.leftContactMe}>
            <div>
              <h2>{t.contactMeTitle}</h2>
              <h3>{t.contactMeSubtitle}</h3>
              <h4>{t.contactMeDesk1}<br/>{t.contactMeDesk2}</h4>
            </div>
            <div className={styles.contactMeCredits}>
              <p>Rifaldo Saputra<br/>2011–2026</p>
              <p>Full-stack Developer,<br/>Product Design,<br/>Photograph,<br/>Electronic</p>
              <p>Students,<br/>Learning,<br/>Innovate</p>
            </div>
          </div>
          <div className={styles.rightContactMe}>
            <h2>rifaldosaputra@gmail.com</h2>
            <div className={styles.contactMeSocial}>
              <Link href="https://www.instagram.com/call_me_doooo" target="_blank">
                <FiInstagram />
                <span>Instagram</span>
              </Link>
              <Link href="https://github.com/larzai" target="_blank">
                <FiGithub />
                <span>GitHub</span>
              </Link>
              <Link href="https://whatsapp.com/channel/0029Vb75NCRHltY8M69uWK2n" target="_blank">
                <FaWhatsapp />
                <span>WhatsApp</span>
              </Link>
              <Link href="https://www.tiktok.com/@varsal_lasrav" target="_blank">
                <FaTiktok />
                <span>TikTok</span>
              </Link>
            </div>
            <div className={styles.contactMeForm}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder={t.formName}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.formEmail}
                  required
                />
                <textarea
                  name="message"
                  placeholder={t.formMessage}
                  required
                />
                <button type="submit">
                  {t.formSubmit}
                </button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}