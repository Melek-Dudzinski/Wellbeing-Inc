import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar"
import HomeArticle from "@/components/HomeArticle"
import HomePlan from "@/components/HomePlan"
import HomeProfile from "@/components/HomeProfile"
import SetProfile from '@/components/SetProfileModal';
import HomeChatbot from '@/components/HomeChatbot';
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
  
  
  const { data, error } = await supabase
    .from('TestUserProfile')
    .select('*')
    .eq('EmployeeNo', user.id);

  if (error) {
    console.log("Error getting queue status");
  }

  if (data.length > 0) {
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
              <HomeChatbot userID={user.id} />
            </div>
            <div className='left-section-below-top'>
              <div id="profile-sect"><HomeProfile  userEmail={user.email} userID={user.id}/></div>
              <div id="plan-sect"><HomePlan /></div>
            </div>
            <div className='right-section-below-top'>
              <HomeArticle />
              <section className='button-article'> 
                <button id='see-more-button'><Link href="/articles">See More</Link></button>
              </section>
            </div>
          </div>
        </div>
       ) : (
        <SetProfile userID={user.id} userEmail={user.email}/>
      )} 
    </>
  );
}
