/*Page Imports*/
//import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import HomeArticle from "@/components/HomeArticle"
import HomePlan from "@/components/HomePlan"
import HomeProfile from "@/components/HomeProfile"
import './protected.css';

export default async function ProtectedPage() {
  const activePage = 'home'

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <Navbar activePage={activePage}/>
      <div className="homepage-grid">
        <div className="profile-sect"><HomeProfile /></div>
        <div id="plan-sect"><HomePlan /></div>
        <button id = "chat-button">REQUEST CONNECTION TO CHATBOT</button>
        <div id="articles-sect">
          <HomeArticle />
        </div>
      </div>
    </>
  );
}
