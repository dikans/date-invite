"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Heart } from "lucide-react"

export default function DateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <header className="p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors">
          <Home size={20} />
          <span className="font-medium">Start Over</span>
        </Link>
        <div className="flex items-center gap-2">
          <Heart size={20} className="text-pink-400" />
          <span className="font-medium">Date Adventure</span>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
