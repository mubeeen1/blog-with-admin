"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import FontManager from "@/components/font-manager"

export default function FontsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/40 backdrop-blur-sm bg-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-slate-600"></div>
              <h1 className="text-lg font-semibold text-white">Font Management</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Custom Fonts</h1>
          <p className="text-slate-400">
            Upload and manage custom fonts to enhance your blog's visual appeal and brand identity. Fonts are stored in
            the database for persistent access.
          </p>
        </div>

        <FontManager />
      </div>
    </div>
  )
}
