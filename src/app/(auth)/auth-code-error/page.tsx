'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldAlert, RefreshCw, Home } from 'lucide-react'

export default function AuthCodeErrorPage() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4  transition-colors duration-300">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-[#101212] text-center flex flex-col items-center gap-4">
        
        {/* Warning Visual Indicator Icon */}
        <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 shrink-0">
          <ShieldAlert className="h-10 w-full max-w-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            Authentication Conflict
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            The security verification handshake failed. This can happen due to a login timeout, role mismatch, or an incomplete database synchronization.
          </p>
        </div>

        {/* Action Button Navigation Rows */}
        <div className="flex flex-col w-full gap-2 mt-2">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 font-medium text-white shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4" />
            Try Logging In Again
          </button>
        </div>
      </div>
    </main>
  )
}

