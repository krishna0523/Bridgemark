"use client"

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export default function CrispChat() {
  useEffect(() => {
    // Configure Crisp with your Website ID
    Crisp.configure('5e4e780c-0d2f-4a42-b594-b390272d73f4')
    
    // Optional: Set user data if available
    // Crisp.user.setEmail('user@example.com')
    // Crisp.user.setNickname('User Name')
    
    // Optional: Configure chat appearance
    Crisp.chat.setHelpdeskView()
    
    // Optional: Show a welcome message
    // Crisp.message.show('text', "👋 Hi! How can we help you today?")
    
    // Fix z-index and visibility issues
    const ensureCrispVisibility = () => {
      const crispElements = document.querySelectorAll('[class*="crisp"]')
      crispElements.forEach(element => {
        element.style.zIndex = '9999'
        element.style.position = 'fixed'
      })
    }
    
    // Run after Crisp initializes
    setTimeout(ensureCrispVisibility, 1000)
    
  }, [])

  // This component doesn't render anything visible
  // The chat widget is automatically added to the page by Crisp
  return null
}