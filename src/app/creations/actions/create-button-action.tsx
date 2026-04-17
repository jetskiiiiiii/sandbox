"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/*
 * Action for when user makes new creation.
 * 1. Should create creation_metadata, creation_state row
*/
export async function CreationButtonAction() {
  const supabase = await createClient()
  
  // Initialize metadata 
  const { data: creationId, error: insertMetadataError } = await supabase
    .from("creation_metadata")
    .insert({})
    .select("id")
    .single()
  if (insertMetadataError || !creationId?.id) {
    throw insertMetadataError
  }

  // Initialize state
  const { error: insertStateError } = await supabase
    .from("creation_state")
    .insert({creaion_id: creationId.id})
  if (insertStateError) throw insertStateError
    
  redirect(`/creations/${creationId.id}`)
}
