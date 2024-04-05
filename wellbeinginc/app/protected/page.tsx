/*Page Imports*/

import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar"
import HomeArticle from "@/components/HomeArticle"
import HomePlan from "@/components/HomePlan"
import HomeProfile from "@/components/HomeProfile"
import Chatbot from "@/components/Chatbot";
import SetProfile from '@/components/SetProfileModal';
import './protected.css';


export default async function ProtectedPage() {

  let profileSet = false;
  const activePage = 'home'

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase.from('TestUserProfile').select('*').eq('EmployeeNo', user.id);
  console.log(user.id);
  console.log(data)

  if (error) {
    console.log("Error getting queue status");
  }

  if (data.length > 0) {
    console.log("Profile exists")
    profileSet = true;
  }

  return (
    <>
    {profileSet ? (
      <div>
        <Navbar activePage={activePage}/>
        <div className="homepage-grid">
          <div className ="top-section">
            <div id="home-chatbot-section"></div>
            <h1>HELLO ANNA,</h1>
            <p>Need someone to talk to? Connect with our Mental Health Champion for</p>
            <p>confidential support and guidance</p>
            <button id = "chat-button">CONNECT</button>
          </div>
          <div className='left-section-below-top'>
            <div id="profile-sect"><HomeProfile /></div>
            <div id="plan-sect"><HomePlan /></div>
          </div>
          <div className='right-section-below-top'>
            <HomeArticle />
            <section className='button-article'> 
              <button id='see-more-button'><Link href="/articles">See More</Link></button>
            </section>
          </div>
          <Chatbot userID={user.id}/>
       </div>
    ) : (
      <SetProfile />
    )}
      
    </>
  );
}
