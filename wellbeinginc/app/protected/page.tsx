import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import HomeArticle from "@/components/HomeArticle"
import HomePlan from "@/components/HomePlan"
import HomeProfile from "@/components/HomeProfile"

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <Navbar />
      <AuthButton />
      <HomeArticle />
      <HomePlan />
      <HomeProfile />
    </>
  );
}
