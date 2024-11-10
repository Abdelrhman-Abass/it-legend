// This will be specific to your locale routes
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server';

export default function NotFound({ params: { locale } }) {
  setRequestLocale(locale);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">404 </h2>
      <p className="mb-4">The requested language is not supported</p>
      <Link 
        href="/" 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Return Home
      </Link>
    </div>
  )
}