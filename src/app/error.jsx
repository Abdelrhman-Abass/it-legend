'use client'
 
import { useEffect } from 'react'
import Link from 'next/link'
 
export default function Error({ error, reset}) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Try again
      </button>
      <Link 
        href="/" 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Return Home
      </Link>
    </div>
  )
}