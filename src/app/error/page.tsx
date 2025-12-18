// src/app/error/page.tsx
import Link from 'next/link'
import { Suspense } from 'react'
import ClientError from './client-error'

export default async function ErrorPage({
  // Next.js automatically passes search parameters as props
  searchParams,
}: {
  searchParams: Promise<{ message?: string | undefined }>
}) {
  
  return (
    
    <div style={{ padding: '40px', maxWidth: '500px', margin: '50px auto', textAlign: 'center', border: '1px solid #f00', backgroundColor: '#fff5f5', borderRadius: '8px' }}>
      <h1 style={{ color: 'red' }}>Authentication Error</h1>
      
      <div style={{ fontSize: '1.1em', marginTop: '20px', marginBottom: '30px', color: '#333' }}>
        <Suspense fallback={'Loading...'}>
          <ClientError search={searchParams}/>
        </Suspense>
      </div>
      {/* Button to return to the login page */}
      <Link href="/login">
        <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Try Again
        </button>
      </Link>
      
    </div>
  )
}