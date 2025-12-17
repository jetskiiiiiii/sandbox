import { Suspense } from 'react'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'

/**
 * 1. This component handles the "Dynamic" work.
 * It calls 'cookies()' via createClient, so it must be inside Suspense.
 */
async function AccountContent() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <AccountForm user={user} />
}


//2. The main page shell
export default function Account() {
  return (
    <div className="account-container">
      <Suspense fallback={<p className="p-4">Loading account information...</p>}>
        <AccountContent />
      </Suspense>
    </div>
  )
}