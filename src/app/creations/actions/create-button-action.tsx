"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function CreationButtonAction() {
  const supabase = await createClient()
  const { data: creationId, error: insertError } = await supabase
    .from("posts_metadata")
    .insert({})
    .select('post_id')
    .single()

  if (insertError || !creationId?.post_id) {
    throw insertError
  }
    
  redirect(`/creations/${creationId.post_id}`)
}
