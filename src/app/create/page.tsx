import { Suspense } from "react"
import { CreateAuth } from "./components/CreateAuth"

export default async function Create() {
  return (
    <main>
      <h1>Create</h1>
      
      <Suspense fallback={<p>Loading...</p>}>
        <CreateAuth />
      </Suspense>
    </main>
  )
}
