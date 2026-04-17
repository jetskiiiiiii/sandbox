import { Tables } from "./supabase"

/*
  * Note: Specify null if, on Supabase,
  * column is nullable.
  */

// Naming all types with [NAME]Type
// supabase types
export type ProfilesType = Tables<'profiles'>
export type ImageType = Tables<'images'>
export type PostMetadataType = Tables<'posts_metadata'>

export interface UploadedImageType {
  url: string;
  name: string;
  size: number;
  file: File;
  status: string;
}

// For use in CreatePageLoad
export interface CreationStateType {
  tile_positions: string[] | null
}

// For use in CreationCanvas (to be created)
// Tile ids and positions are currently optional
// because putting them in means re-editing a draft
// which we have not built functionality for yet
export interface CreationCanvasPropType {
  user_id: string;
  creation_id: string;
  updated_at: string;
  status: string;
  creation_title: string;
  tile_ids?: number[];
  tile_positions?: string[];
}

// For use in CreationTile
export interface CreationTilePropType {
  user_id: string;
  creation_id: string;
  updated_at: string;
  tile_title: string;
  type: string;
  item_ids?: number[];
}

// For use in CreateImagesComponent
// Should only need item ids to load draft.
export interface CreateImagesComponentPropType {
  user_id: string;
  creation_id: string;
  item_ids?: number[];
}

// For use in CreationDisplay
// Currently, tile_ids and positions are optional
// because they havent been integrated
export interface CreationDisplayPropType {
  user_id: string;
  creation_id: string;
  updated_at: string;
  status: string;
  creation_title: string;
  date_published: string;
  tile_ids?: number[];
  tile_positions?: string[];
}
