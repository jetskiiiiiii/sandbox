import { Suspense } from "react"

import CreationsDashboardLoad from "./components/load-page"

export default function Create() {
  return (
    <main>
      <h1>Creations</h1>
      
      <Suspense fallback={<p>Loading...</p>}>
        <CreationsDashboardLoad />
      </Suspense>
    </main>
  )
}
