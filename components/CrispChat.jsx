"use client"

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export default function CrispChat() {
  useEffect(() => {
    try {
      console.log('CrispChat: Initializing...')
      
      // Configure Crisp with your Website ID
      Crisp.configure('5e4e780c-0d2f-4a42-b594-b390272d73f4')
      console.log('CrispChat: Configured')
      
      // Force show the chat widget
      Crisp.chat.show()
      console.log('CrispChat: Show called')
      
      // Set to maximized view for better visibility
      Crisp.chat.maximize()
      console.log('CrispChat: Maximized')
      
      // Fix z-index and visibility issues
      const ensureCrispVisibility = () => {
        console.log('CrispChat: Ensuring visibility...')
        
        // Target all possible Crisp elements
        const selectors = [
          '[class*="crisp"]',
          '[id*="crisp"]',
          'crisp-client',
          '.crisp-client'
        ]
        
        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector)
          console.log(`CrispChat: Found ${elements.length} elements for selector: ${selector}`)
          elements.forEach(element => {
            element.style.zIndex = '999999'
            element.style.position = 'fixed'
            element.style.display = 'block'
            element.style.visibility = 'visible'
            element.style.opacity = '1'
          })
        })
      }
      
      // Run multiple times to ensure it catches the widget
      setTimeout(ensureCrispVisibility, 500)
      setTimeout(ensureCrispVisibility, 1000)
      setTimeout(ensureCrispVisibility, 2000)
      setTimeout(ensureCrispVisibility, 3000)
      
    } catch (error) {
      console.error('CrispChat initialization error:', error)
    }
  }, [])

  // This component doesn't render anything visible
  // The chat widget is automatically added to the page by Crisp
  return null
}