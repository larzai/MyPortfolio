'use client'
import { useEffect, useRef, useState } from 'react'

export default function RevealText({ text }) {
  const words = text.split(' ')
  const ref = useRef(null)
  const [show, setShow] = useState(0)
  
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const start = windowHeight * 0.7
      const end = windowHeight * 0.4
      
      let progress = (start - rect.top) / (start - end)
      
      if (progress < 0) progress = 0
      if (progress > 1) progress = 1
      
      setShow(progress * words.length)
    }
    
    window.addEventListener('scroll', onScroll)
    onScroll()
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [words.length])
  
  return (
    <p ref={ref}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            color: i < show ? '#fff' : '#777',
            transition: 'color 0.25s ease'
          }}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  )
}