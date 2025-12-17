import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AccountForm from "../account-form";

export async function AccountAuth() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) {
    //TODO: Error handling
    redirect("/")
  }

  return <AccountForm user={userData.user} />
}
