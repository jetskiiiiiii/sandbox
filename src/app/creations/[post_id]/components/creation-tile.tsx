import { CreationTilePropType } from "@/utils/types/interface"
import CreateImagesComponent from "./create-images"

/*
 * The tile is the basic building block for all posts.
 * It will have the ability to modify videos/text/images.
*/
export default async function CreationTile({
  user_id,
  creation_id,
  updated_at,
  tile_title,
  type,
  item_ids,
}: CreationTilePropType) {

  return (
    <div>
      <p>My post: {creation_id}</p>
      <CreateImagesComponent user_id={user_id} creation_id={creation_id} item_ids={item_ids}/>
    </div>
  )
}
