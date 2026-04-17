import { Suspense } from "react"

import CreateLoad from "./components/load-page"

export default function Create() {
  return (
    <main>
      <h1>Creations</h1>
      
      <Suspense fallback={<p>Loading...</p>}>
        <CreateLoad />
      </Suspense>
    </main>
  )
}
