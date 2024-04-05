/*Page Imports*/
//import AuthButton from "@/components/AuthButton";
import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import HomeArticle from "@/components/HomeArticle"
import HomePlan from "@/components/HomePlan"
import HomeProfile from "@/components/HomeProfile"

import './protected.css';
//testing again, will delete later
// testing 
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
        <div id ="top-bit-container">
          <div id="home-chatbot-section"></div>
          <h1>HELLO ANNA,</h1>
          <p>Need someone to talk to? Connect with our Mental Health Champion for</p>
          <p>confidential support and guidance</p>
          <button id = "chat-button">CONNECT</button>
        </div>
        <div id="articles-sect">
          <HomeArticle />
          <button id='see-more-button'><Link href="/articles">See More</Link></button>
        </div>
      </div>
    </>
  );
}
