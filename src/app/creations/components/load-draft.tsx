import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";

import CreateImagesComponent from "./create";

export async function LoadDraft({ userId }: {userId: string}) {

  return (
    <div>
      <Suspense fallback={"Loading draft..."}>
        <CreateImagesComponent userId={userId}/>
      </Suspense>
    </div>
  )
}
