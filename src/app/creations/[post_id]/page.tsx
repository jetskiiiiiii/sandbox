import { Suspense } from "react"

import CreatePageLoad from "./components/load-page"

export default async function CreatePage({
  params
}: {
  params: Promise<{ creation_id: string }>
}) {
  return (
    <div>
      <Suspense fallback="Loading..">
        <CreatePageLoad params={params}/>
      </Suspense>
    </div>
  )
}
