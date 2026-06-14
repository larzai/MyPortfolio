'use client'
import { useEffect, useState } from 'react'

export default function RevealTextCurved({ text }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame

    const animate = () => {
      setOffset((prev) => (prev + 0.3) % 100)
      frame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  const style = {
    width: '100%',
    background: '#000',
    overflow: 'hidden',
    padding: '80px 0',
    display: 'flex',
    justifyContent: 'center'
  }

  const svgStyle = {
    width: '100%',
    height: '200px'
  }

  return (
    <div style={style}>
      <svg viewBox="0 0 400 400" style={svgStyle}>
        <defs>
          <path
            id="curve"
            d="M 50 200 A 150 150 0 1 1 350 200"
          />
        </defs>

        <text fontSize="22" fill="white">
          <textPath href="#curve" startOffset={`${offset}%`}>
            {text + ' • ' + text + ' • ' + text + ' • '}
          </textPath>
        </text>
      </svg>
    </div>
  )
}