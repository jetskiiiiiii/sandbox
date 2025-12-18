import CreateImagesComponent from "./create"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function CreateAuth() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect("/")
  }

  return <CreateImagesComponent userId={userData?.user.id}/>
}
