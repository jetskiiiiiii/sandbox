"use client"

import { CreationCanvasPropType } from "@/utils/types/interface"
import CreationTile from "./creation-tile"

export default function CreationCanvas({
  user_id,
  creation_id,
  updated_at,
  status,
  creation_title,
  tile_ids,
  tile_positions,
}: CreationCanvasPropType) {

  // Temp values
  const tile_title = "" 
  const tile_type = ""
  const item_ids = [1]

  return (
    <div>
      <CreationTile
        user_id={user_id}
        creation_id={creation_id}
        updated_at={updated_at}
        tile_title={tile_title}
        type={tile_type}
        item_ids={item_ids}/>
    </div>
  )
}
