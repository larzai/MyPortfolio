"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect, useRef } from "react"

const TransitionContext = createContext()

export function useTransition() {
  return useContext(TransitionContext)
}

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  const [run, setRun] = useState(false)
  const [target, setTarget] = useState(null)
  const lock = useRef(false)

  const go = (href) => {
    if (href === pathname || lock.current) return
    lock.current = true
    setTarget(href)
    setRun(true)
  }

  useEffect(() => {
    if (run && target) router.push(target)
  }, [target])

  useEffect(() => {
    if (!run) return

    if (pathname === target) {
      const t = setTimeout(() => {
        setRun(false)
        setTarget(null)
        lock.current = false
      }, 1400)
      
      return () => clearTimeout(t)
    }
  }, [pathname])

  const ease = [0.22, 1, 0.36, 1]
  
  let pagesName
  if (target === "/") {
    pagesName = "Home"
  } else if (target === "/about") {
    pagesName = "About"
  } else if (target === "/gallery") {
    pagesName = "Gallery"
  } else if (target === "/contact") {
    pagesName = "Contact"
  } else {
    pagesName = "the page"
  }

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <AnimatePresence>
        {run && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
            {/* 1. WHITE FULL SCREEN (instant, no anim) */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0,
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: "white"
              }}
            />
            {/* 2. BLACK BOX (launch) */}
            <motion.div
              initial={{
                y: "100%",
                borderRadius: "50%"
              }}
              animate={{
                y: "0%",
                borderRadius: "0%"
              }}
              exit={{
                y: "-100%"
              }}
              transition={{
                duration: 0.7,
                ease
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                letterSpacing: "8px"
              }}
            >
              Launch to {pagesName}
            </motion.div>
            {/* 3. WHITE LAYER EXIT (naik terakhir) */}
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{
                delay: 0.75,
                duration: 0.6,
                ease
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: "white"
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}