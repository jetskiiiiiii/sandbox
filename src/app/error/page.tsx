// src/app/error/page.tsx
import Link from 'next/link'

export default function ErrorPage({
  // Next.js automatically passes search parameters as props
  searchParams,
}: {
  searchParams: { message: string }
}) {
  // Use the message from the query parameters, or a default one
  const errorMessage = searchParams.message || 'An unexpected authentication error occurred.'

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '50px auto', textAlign: 'center', border: '1px solid #f00', backgroundColor: '#fff5f5', borderRadius: '8px' }}>
      <h1 style={{ color: 'red' }}>Authentication Error</h1>
      
      <p style={{ fontSize: '1.1em', marginTop: '20px', marginBottom: '30px', color: '#333' }}>
        {errorMessage}
      </p>

      {/* Button to return to the login page */}
      <Link href="/login">
        <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Try Again
        </button>
      </Link>
    </div>
  )
}