import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import CreationsDashboard from "./creations-dashboard";

/*
 * Authenticates and loads the post metadata.
 *
 */
export default async function CreationsDashboardLoad() {
  const supabase = await createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user) {
    redirect("/")
  }

  const { data: postMetadata, error: postMetadataError } = await supabase
    .from("posts_metadata")
    .select()
    .eq("user_id", authData.user.id)

  return (
    <div>
      <Suspense fallback={"Loading creations.."}>
        <CreationsDashboard userId={authData.user.id} postMetadata={postMetadata}/>
      </Suspense>
    </div>
  )
}
