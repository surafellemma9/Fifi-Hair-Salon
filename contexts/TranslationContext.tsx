"use client"

import { Language, translations } from '@/lib/translations'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('fifi-hair-salon-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'am' || savedLanguage === 'es')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('fifi-hair-salon-language', language)
  }, [language])

  const t = translations[language]

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
