//@ts-nocheck
"use client"

import { Input } from "@medusajs/ui"
import { useRouter, usePathname } from "next/navigation"
import { useState, FormEvent, useEffect, useMemo } from "react"
import { MicroscopeIcon as MagnifyingGlassIcon } from 'lucide-react'

const NavbarSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [placeholder, setPlaceholder] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  const placeholders = useMemo(() => [
    "Find a test or checkup",
    "Diabetes",
    "Uric Acid",
    "Thyroid",
    "Vitamin D"
  ], [])

  useEffect(() => {
    const period = isDeleting ? 50 : 100 // Faster typing speed (was 100/200)
    const text = placeholders[loopNum % placeholders.length]
    
    const tick = () => {
      setPlaceholder(prev => {
        if (isDeleting) {
          if (prev.length === 0) {
            setIsDeleting(false)
            setLoopNum(loopNum => loopNum + 1)
            return ""
          }
          return prev.slice(0, -1)
        } else {
          if (prev.length === text.length) {
            setTimeout(() => setIsDeleting(true), 1500) // Shorter pause (was 2000)
            return prev
          }
          return text.slice(0, prev.length + 1)
        }
      })
    }

    const timer = setTimeout(tick, period)
    return () => clearTimeout(timer)
  }, [loopNum, isDeleting, placeholder, placeholders])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchTerm) return

    const countryCode = pathname.split('/')[1]
    router.push(`/${countryCode}/store?q=${encodeURIComponent(searchTerm.trim())}`)
    setSearchTerm("")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <style jsx global>{`
        .typewriter-input::placeholder {
          opacity: 0.85; /* Darker text (was 0.7) */
          transition: opacity 0.2s;
          color: #4B5563; /* Added darker gray color */
        }
        
        .typewriter-input:focus::placeholder {
          opacity: 0;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .typewriter-input::placeholder::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
      `}</style>
      <div className="relative">
        <Input
          type=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="typewriter-input w-full pr-10 pl-4 py-2 rounded-full border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-600 transition-colors duration-200"
          disabled={!searchTerm.trim()}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}

export default NavbarSearch