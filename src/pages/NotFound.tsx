import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0b0f17] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/60">404</p>
        <h1 className="mb-3 text-4xl font-semibold tracking-tight sm:text-5xl">Page Not Found</h1>
        <p className="mb-8 max-w-xl text-sm text-white/75 sm:text-base">
          The route you requested is not available in this build. Use the button below to return to the public home page.
        </p>
        <Link
          to="/"
          className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/15"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}