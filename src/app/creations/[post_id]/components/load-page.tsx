import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import CreationTile from "./creation-tile"
import CreationDisplay from "./creation-display"
import CreationCanvas from "./creation-canvas"
import { CreationStateType } from "@/utils/types/interface"

export default async function CreatePageLoad({
  params
}: {
  params: Promise<{ creation_id: string }>
}) {
  // Authenticate page
  const supabase = await createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user) {
    redirect("/")
  }

  const { creation_id } = await params

  // Grab metadata to check for status
  const { data: creationMetadata, error: creationMetadataError } = await supabase
    .from("creations_metadata")
    .select("updated_at, status, title, date_published")    // Currently these are the only relevant columns
    .eq("id", creation_id)
    .single()
  if (creationMetadataError || !creationMetadata?.status) throw creationMetadataError 

  const currentStatus = creationMetadata.status

  // If creation is published, grab tile info and state
  let creationState: CreationStateType | null = null
  if (currentStatus === "published") {
    // Grab creation state (tile ids and positions)
    const { data, error: creationStateError } = await supabase
      .from("creation_state")
      .select("tile+_positions")
      .eq("creation_id", creation_id)
      .single()
    if (creationStateError || !data) {
      throw creationStateError
    } else {
      creationState = data
    }
      
  }

  // Temp values
  const tile_ids = [1]
  const tile_positions = [""]

  return (
    <div>
      {currentStatus === "draft" ? (
        <CreationCanvas
          user_id={authData.user.id}
          creation_id={creation_id}
          updated_at={creationMetadata.updated_at}
          status={currentStatus}
          creation_title={creationMetadata.title}
          tile_ids={tile_ids}
          tile_positions={tile_positions}/>) : (
        <CreationDisplay 
          user_id={authData.user.id}
          creation_id={creation_id}
          updated_at={creationMetadata.updated_at}
          status={currentStatus}
          creation_title={creationMetadata.title}
          date_published={creationMetadata.date_published}
          tile_ids={tile_ids}
          tile_positions={tile_positions}/>
      )}
    </div>

  )
}
