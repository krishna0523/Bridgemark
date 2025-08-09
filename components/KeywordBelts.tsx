'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './KeywordBelts.module.css'

export type KeywordBeltsProps = {
  topKeywords: string[]
  bottomKeywords: string[]
  className?: string
  speedTop?: number      // pixels per second
  speedBottom?: number   // pixels per second
  pauseOnHover?: boolean
}

export default function KeywordBelts({
  topKeywords,
  bottomKeywords,
  className = '',
  speedTop = 60,
  speedBottom = 60,
  pauseOnHover = true
}: KeywordBeltsProps) {
  const topTrackRef = useRef<HTMLDivElement>(null)
  const bottomTrackRef = useRef<HTMLDivElement>(null)
  const [topDuration, setTopDuration] = useState<number>(20)
  const [bottomDuration, setBottomDuration] = useState<number>(20)
  const [isTopPaused, setIsTopPaused] = useState(false)
  const [isBottomPaused, setIsBottomPaused] = useState(false)

  // Calculate animation duration based on content width and speed
  const calculateDuration = (element: HTMLElement | null, speed: number): number => {
    if (!element) return 20
    
    const contentWidth = element.scrollWidth / 3 // Divide by 3 since we triplicate content
    const duration = contentWidth / speed
    return Math.max(duration, 8) // Minimum 8 seconds for smoother flow
  }

  // Measure content and set durations
  useEffect(() => {
    const measureAndSetDurations = () => {
      if (topTrackRef.current) {
        const duration = calculateDuration(topTrackRef.current, speedTop)
        setTopDuration(duration)
      }
      
      if (bottomTrackRef.current) {
        const duration = calculateDuration(bottomTrackRef.current, speedBottom)
        setBottomDuration(duration)
      }
    }

    // Initial measurement
    const timer = setTimeout(measureAndSetDurations, 100)

    // ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(measureAndSetDurations)
    if (topTrackRef.current) resizeObserver.observe(topTrackRef.current)
    if (bottomTrackRef.current) resizeObserver.observe(bottomTrackRef.current)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
    }
  }, [speedTop, speedBottom, topKeywords, bottomKeywords])

  // Create keyword row with separators - ensures continuous flow
  const createKeywordRow = (keywords: string[], testId: string) => (
    <div className={styles.row} data-testid={testId}>
      {keywords.map((keyword, index) => (
        <React.Fragment key={`${keyword}-${index}`}>
          <span className={styles.item}>{keyword}</span>
          <span className={styles.sep}>•</span>
        </React.Fragment>
      ))}
    </div>
  )

  // Hover handlers
  const handleTopMouseEnter = () => pauseOnHover && setIsTopPaused(true)
  const handleTopMouseLeave = () => pauseOnHover && setIsTopPaused(false)
  const handleBottomMouseEnter = () => pauseOnHover && setIsBottomPaused(true)
  const handleBottomMouseLeave = () => pauseOnHover && setIsBottomPaused(false)

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Top Belt - Left to Right */}
      <div
        className={`${styles.belt} ${styles.beltTop} ${isTopPaused ? styles.paused : ''}`}
        role="presentation"
        aria-hidden="true"
        onMouseEnter={handleTopMouseEnter}
        onMouseLeave={handleTopMouseLeave}
      >
        <div className={styles.maskTop} />
        <div
          ref={topTrackRef}
          className={styles.track}
          style={{
            '--duration': `${topDuration}s`,
            '--direction': '1'
          } as React.CSSProperties}
        >
          {createKeywordRow(topKeywords, 'top-keywords-1')}
          {createKeywordRow(topKeywords, 'top-keywords-2')}
          {createKeywordRow(topKeywords, 'top-keywords-3')}
        </div>
      </div>

      {/* Bottom Belt - Right to Left */}
      <div
        className={`${styles.belt} ${styles.beltBottom} ${isBottomPaused ? styles.paused : ''}`}
        role="presentation"
        aria-hidden="true"
        onMouseEnter={handleBottomMouseEnter}
        onMouseLeave={handleBottomMouseLeave}
      >
        <div className={styles.maskBottom} />
        <div
          ref={bottomTrackRef}
          className={styles.track}
          style={{
            '--duration': `${bottomDuration}s`,
            '--direction': '-1'
          } as React.CSSProperties}
        >
          {createKeywordRow(bottomKeywords, 'bottom-keywords-1')}
          {createKeywordRow(bottomKeywords, 'bottom-keywords-2')}
          {createKeywordRow(bottomKeywords, 'bottom-keywords-3')}
        </div>
      </div>
    </div>
  )
}