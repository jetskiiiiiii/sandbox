import Link from 'next/link'

export default function MessagePage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '50px auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>Notification</h1>
      <p style={{ fontSize: '1.1em', marginTop: '20px', marginBottom: '30px', color: '#333' }}>
        {searchParams.message}
      </p>
      <Link href="/login">
        <button style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Go to Login
        </button>
      </Link>
    </div>
  )
}