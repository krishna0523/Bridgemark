import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BridgeAnimation({ isMobile = false }) {
  const gradientRef = useRef(null)

  useEffect(() => {
    if (!gradientRef.current) return

    // Animate the gradient to create flowing effect
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    tl.to(gradientRef.current, {
      attr: { x1: '100%', x2: '0%' },
      duration: 8,
      ease: 'power1.inOut'
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '50%',
      zIndex: 0,
      opacity: 0.4,
      pointerEvents: 'none'
    }}>
      <svg
        viewBox={isMobile ? "100 200 1000 300" : "0 200 1200 300"}
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          {/* Flowing gradient for main cables and towers */}
          <linearGradient
            id="flowingGradient"
            ref={gradientRef}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#7B3FF2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#2B9FFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.6" />
          </linearGradient>

          {/* Static gradient for subtle variation */}
          <linearGradient id="staticGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#333333" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#333333" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Left Tower */}
        <g id="leftTower">
          {/* Main tower pillars */}
          <rect x="280" y="80" width="12" height="320" fill="url(#flowingGradient)" filter="url(#glow)" />
          <rect x="320" y="80" width="12" height="320" fill="url(#flowingGradient)" filter="url(#glow)" />

          {/* Tower cross-bracing */}
          <rect x="280" y="120" width="52" height="3" fill="url(#staticGradient)" />
          <rect x="280" y="200" width="52" height="3" fill="url(#staticGradient)" />
          <rect x="280" y="280" width="52" height="3" fill="url(#staticGradient)" />
          <rect x="280" y="360" width="52" height="3" fill="url(#staticGradient)" />

          {/* Diagonal supports */}
          <line x1="292" y1="120" x2="320" y2="200" stroke="url(#staticGradient)" strokeWidth="2" />
          <line x1="320" y1="120" x2="292" y2="200" stroke="url(#staticGradient)" strokeWidth="2" />
          <line x1="292" y1="200" x2="320" y2="280" stroke="url(#staticGradient)" strokeWidth="2" />
          <line x1="320" y1="200" x2="292" y2="280" stroke="url(#staticGradient)" strokeWidth="2" />

          {/* Tower top */}
          <rect x="275" y="75" width="62" height="10" fill="url(#flowingGradient)" filter="url(#glow)" />
        </g>

        {/* Right Tower */}
        <g id="rightTower">
          {/* Main tower pillars */}
          <rect x="868" y="80" width="12" height="320" fill="url(#flowingGradient)" filter="url(#glow)" />
          <rect x="908" y="80" width="12" height="320" fill="url(#flowingGradient)" filter="url(#glow)" />

          {/* Tower cross-bracing */}
          <rect x="868" y="120" width="52" height="3" fill="url(#staticGradient)" />
          <rect x="868" y="200" width="52" height="3" fill="url(#staticGradient)" />
          <rect x="868" y="280" width="52" height="3" fill="url(#staticGradient)" />
          <rect x="868" y="360" width="52" height="3" fill="url(#staticGradient)" />

          {/* Diagonal supports */}
          <line x1="880" y1="120" x2="908" y2="200" stroke="url(#staticGradient)" strokeWidth="2" />
          <line x1="908" y1="120" x2="880" y2="200" stroke="url(#staticGradient)" strokeWidth="2" />
          <line x1="880" y1="200" x2="908" y2="280" stroke="url(#staticGradient)" strokeWidth="2" />
          <line x1="908" y1="200" x2="880" y2="280" stroke="url(#staticGradient)" strokeWidth="2" />

          {/* Tower top */}
          <rect x="863" y="75" width="62" height="10" fill="url(#flowingGradient)" filter="url(#glow)" />
        </g>

        {/* Main Suspension Cables (catenary curves) */}
        <path
          d="M 286 85 Q 600 280 894 85"
          stroke="url(#flowingGradient)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
        />
        <path
          d="M 326 85 Q 600 275 914 85"
          stroke="url(#flowingGradient)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
        />

        {/* Vertical Suspension Lines */}
        <g id="verticalCables" stroke="url(#staticGradient)" strokeWidth="1" opacity="0.4">
          {Array.from({ length: 35 }, (_, i) => {
            const x = 340 + (i * 16)
            // Calculate y position on catenary curve
            const t = i / 34
            const curveY = 85 + 195 * Math.sin(t * Math.PI)
            return (
              <line
                key={i}
                x1={x}
                y1={curveY}
                x2={x}
                y2="390"
              />
            )
          })}
        </g>

        {/* Bridge Deck */}
        <g id="bridgeDeck">
          {/* Main deck */}
          <rect x="280" y="385" width="640" height="8" fill="url(#staticGradient)" />

          {/* Deck support structure */}
          <rect x="280" y="393" width="640" height="12" fill="url(#staticGradient)" opacity="0.3" />

          {/* Truss pattern under deck */}
          {Array.from({ length: 20 }, (_, i) => {
            const x = 300 + (i * 30)
            return (
              <g key={i}>
                <line x1={x} y1="393" x2={x + 15} y2="405" stroke="url(#staticGradient)" strokeWidth="1.5" opacity="0.2" />
                <line x1={x + 15} y1="393" x2={x} y2="405" stroke="url(#staticGradient)" strokeWidth="1.5" opacity="0.2" />
              </g>
            )
          })}
        </g>

        {/* Tower Base Details */}
        <g id="towerBases">
          {/* Left base */}
          <rect x="270" y="395" width="72" height="25" fill="url(#staticGradient)" opacity="0.9" />
          <rect x="265" y="420" width="82" height="8" fill="url(#staticGradient)" opacity="0.7" />

          {/* Right base */}
          <rect x="858" y="395" width="72" height="25" fill="url(#staticGradient)" opacity="0.9" />
          <rect x="853" y="420" width="82" height="8" fill="url(#staticGradient)" opacity="0.7" />
        </g>
      </svg>
    </div>
  )
}
