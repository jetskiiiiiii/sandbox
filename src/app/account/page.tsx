import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import { Suspense } from 'react'
import { AccountAuth } from './components/AccountAuth'

export default async function Account() {
  return (
    <main>
    <h1>Account</h1>
    <Suspense fallback={<p>Loading..</p>}>
      <AccountAuth />
    </Suspense>
    </main>
  )
}
