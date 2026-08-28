'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { useTransition } from "@/components/Transition"
import language from "@/components/language.json"
import Footer from "@/components/Footer"
import CircularGallery from "@/components/CircularGallery"
import { useLang } from "@/context/LangContext"

import styles from "@/gallery/page.module.css"

export default function Gallery() {
  const { go } = useTransition()
  const { lang } = useLang()
  const t = language[lang]

  const [datas, setDatas] = useState([])
  const [visible, setVisible] = useState(4)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    fetch('https://cdn.rifaldo.my.id/gallery/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data')
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) setDatas(data)
      })
      .catch(err => console.error('Gagal mengambil data:', err))
  }, [])

  const filteredDatas = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    const result = datas.filter(data => {
      if (!keyword) return true

      const title = String(data.title || '').toLowerCase()
      const type = String(data.type || '').toLowerCase()
      const technology = Array.isArray(data.technology)
        ? data.technology.join(' ').toLowerCase()
        : ''

      return (
        title.includes(keyword) ||
        type.includes(keyword) ||
        technology.includes(keyword)
      )
    })

    result.sort((a, b) => {
      const dateA = getDateValue(a.date)
      const dateB = getDateValue(b.date)

      return sort === 'newest'
        ? dateB - dateA
        : dateA - dateB
    })

    return result
  }, [datas, search, sort])

  const visibleDatas = filteredDatas.slice(0, visible)

  useEffect(() => {
    setVisible(4)
  }, [search, sort])

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
              <a className={styles.link1} onClick={() => go("/")}>
                HOME
              </a>

              <a className={styles.link2} onClick={() => go("/about")}>
                ABOUT
              </a>

              <a className={styles.link3} onClick={() => go("/gallery")}>
                GALLERY
              </a>

              <a className={styles.link4} onClick={() => go("/contact")}>
                CONTACT
              </a>
            </div>
          </div>
        </section>

        <section className={styles.galleryTop}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.GalleryTitle}
          </motion.h1>

          <div className={styles.circularGallery}>
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

          <div className={styles.galleryControls}>
            <div className={styles.searchBox}>
              <svg viewBox="0 0 24 24">
                <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari karya..."
                aria-label="Cari karya"
              />

              {search && (
                <button
                  type="button"
                  className={styles.clearSearch}
                  onClick={() => setSearch('')}
                  aria-label="Hapus pencarian"
                >
                  ×
                </button>
              )}
            </div>

            <div className={styles.sortBox}>
              <button
                type="button"
                className={sort === 'newest' ? styles.activeSort : ''}
                onClick={() => setSort('newest')}
              >
                Terbaru
              </button>

              <button
                type="button"
                className={sort === 'oldest' ? styles.activeSort : ''}
                onClick={() => setSort('oldest')}
              >
                Terlama
              </button>
            </div>
          </div>

          <div className={styles.resultInfo}>
            {filteredDatas.length} karya ditemukan
          </div>

          {visibleDatas.length > 0 ? (
            <div className={styles.galleryItemsContainer}>
              <AnimatePresence mode="popLayout">
                {visibleDatas.map(data => (
                  <WorkCard
                    key={data.id}
                    data={data}
                    t={t}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>⌕</div>
              <h2>Tidak ditemukan</h2>
              <p>
                Tidak ada karya yang cocok dengan pencarian.
              </p>
            </div>
          )}

          {visible < filteredDatas.length && (
            <button
              className={styles.showMore}
              onClick={() => setVisible(prev => prev + 4)}
            >
              {t.showMoreYes || "Lihat lebih banyak"}
            </button>
          )}

        </section>

        <Footer />

      </main>
    </div>
  )
}

function WorkCard({ data, t }) {
  const media = Array.isArray(data.media) ? data.media : []

  const [current, setCurrent] = useState(0)
  const [preview, setPreview] = useState(null)
  const [readerOpen, setReaderOpen] = useState(false)
  const [readerContent, setReaderContent] = useState('')
  const [readerLoading, setReaderLoading] = useState(false)
  const [readerError, setReaderError] = useState('')

  const hasMultipleMedia = media.length > 1
  const currentMedia = media[current]

  const nextMedia = e => {
    e.stopPropagation()

    setCurrent(prev =>
      prev >= media.length - 1 ? 0 : prev + 1
    )
  }

  const previousMedia = e => {
    e.stopPropagation()

    setCurrent(prev =>
      prev <= 0 ? media.length - 1 : prev - 1
    )
  }

  const openReader = async () => {
    if (!data.file) return

    setReaderOpen(true)
    setReaderLoading(true)
    setReaderError('')
    setReaderContent('')

    try {
      const response = await fetch(data.file)

      if (!response.ok) {
        throw new Error('File tidak dapat dibaca')
      }

      const contentType = response.headers.get('content-type') || ''

      if (
        contentType.includes('text/') ||
        contentType.includes('json') ||
        data.file.endsWith('.txt') ||
        data.file.endsWith('.md')
      ) {
        const text = await response.text()
        setReaderContent(text)
      } else {
        setReaderError(
          'File ini tidak dapat ditampilkan sebagai teks.'
        )
      }
    } catch {
      setReaderError(
        'Gagal mengambil isi cerpen. Pastikan file bisa diakses dari browser.'
      )
    } finally {
      setReaderLoading(false)
    }
  }

  return (
    <>
      <motion.article
        className={styles.galleryItemsContent}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        layout
      >

        <div className={styles.mediaWrapper}>
          {currentMedia?.type === 'video' ? (
            <video
              className={styles.media}
              src={currentMedia.url}
              controls
              playsInline
              preload="metadata"
            />
          ) : currentMedia?.url ? (
            <button
              type="button"
              className={styles.imageButton}
              onClick={() => setPreview(currentMedia.url)}
              aria-label={`Lihat ${data.title || 'gambar'} dalam ukuran besar`}
            >
              <Image
                className={styles.media}
                src={currentMedia.url}
                alt={data.title || "Karya"}
                width={800}
                height={600}
              />

              <span className={styles.zoomHint}>
                Klik untuk memperbesar
              </span>
            </button>
          ) : (
            <div className={styles.mediaError}>
              Media tidak tersedia
            </div>
          )}

          {hasMultipleMedia && (
            <>
              <button
                type="button"
                className={`${styles.mediaButton} ${styles.previous}`}
                onClick={previousMedia}
                aria-label="Media sebelumnya"
              >
                ←
              </button>

              <button
                type="button"
                className={`${styles.mediaButton} ${styles.next}`}
                onClick={nextMedia}
                aria-label="Media berikutnya"
              >
                →
              </button>

              <div className={styles.mediaCounter}>
                {current + 1} / {media.length}
              </div>
            </>
          )}
        </div>

        <div className={styles.caption}>

          <div className={styles.captionTop}>
            <span className={styles.type}>
              {data.type || 'Karya'}
            </span>

            <p>{data.date}</p>
          </div>

          <h2>{data.title}</h2>

          {Array.isArray(data.technology) &&
            data.technology.length > 0 && (
              <div className={styles.technology}>
                {data.technology.map((tech, index) => (
                  <span key={`${tech}-${index}`}>
                    {tech}
                  </span>
                ))}
              </div>
            )}

          <div className={styles.cardActions}>
            {data.link && (
              <Link
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitButton}
              >
                {t.galleryButton || "Kunjungi"}
              </Link>
            )}

            {data.file && (
              <button
                type="button"
                className={`${styles.visitButton} ${styles.readButton}`}
                onClick={openReader}
              >
                Baca
              </button>
            )}
          </div>

        </div>

      </motion.article>

      <AnimatePresence>
        {preview && (
          <motion.div
            className={styles.previewOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <button
              type="button"
              className={styles.previewClose}
              onClick={() => setPreview(null)}
              aria-label="Tutup gambar"
            >
              ×
            </button>

            <motion.div
              className={styles.previewContent}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={preview}
                alt={data.title || "Preview"}
                width={1600}
                height={1200}
                className={styles.previewImage}
              />

              {data.title && (
                <div className={styles.previewTitle}>
                  {data.title}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {readerOpen && (
          <ReaderModal
            title={data.title || "Cerpen"}
            content={readerContent}
            loading={readerLoading}
            error={readerError}
            onClose={() => setReaderOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function ReaderModal({
  title,
  content,
  loading,
  error,
  onClose
}) {
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className={styles.readerOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.readerBox}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.readerHeader}>
          <div>
            <span>CERPEN</span>
            <h2>{title}</h2>
          </div>

          <button
            type="button"
            className={styles.readerClose}
            onClick={onClose}
            aria-label="Tutup pembaca"
          >
            ×
          </button>
        </div>

        <div className={styles.readerLine}></div>

        <div className={styles.readerBody}>
          {loading && (
            <div className={styles.readerLoading}>
              Memuat cerita...
            </div>
          )}

          {!loading && error && (
            <div className={styles.readerError}>
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className={styles.readerText}>
              {content.split(/\n\s*\n/).map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function getDateValue(date) {
  if (!date) return 0

  const value = String(date).trim()

  const numeric = value.match(
    /^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/
  )

  if (numeric) {
    const [, day, month, year] = numeric

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).getTime()
  }

  const indonesian = value.match(
    /^(\d{1,2})\s+(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+(\d{4})$/i
  )

  if (indonesian) {
    const months = {
      januari: 0,
      februari: 1,
      maret: 2,
      april: 3,
      mei: 4,
      juni: 5,
      juli: 6,
      agustus: 7,
      september: 8,
      oktober: 9,
      november: 10,
      desember: 11
    }

    const [, day, month, year] = indonesian

    return new Date(
      Number(year),
      months[month.toLowerCase()],
      Number(day)
    ).getTime()
  }

  const parsed = Date.parse(value)

  return Number.isNaN(parsed) ? 0 : parsed
}