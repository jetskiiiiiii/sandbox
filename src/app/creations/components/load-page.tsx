import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import CreationsDashboard from "./creations-dashboard";

/*
 * Authenticates and loads the post metadata.
 *
 */
export default async function CreateLoad() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect("/")
  }

  const { data: postMetadata, error: postMetadataError } = await supabase
    .from("posts_metadata")
    .select()
    .eq("user_id", userData.user.id)

  return (
    <div>
      <Suspense fallback={"Loading creations.."}>
        <CreationsDashboard userId={userData.user.id} postMetadata={postMetadata}/>
      </Suspense>
    </div>
  )
}
