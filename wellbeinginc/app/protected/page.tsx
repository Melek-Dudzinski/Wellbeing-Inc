import Link from 'next/link';
import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server';
import React, { useState } from 'react';
import Navbar from "@/components/Navbar"
import HomeArticle from "@/components/HomeArticle"
import HomePlan from "@/components/HomePlan"
import HomeProfile from "@/components/HomeProfile"
import SetProfile from '@/components/SetProfileModal';
import HomeChatbot from '@/components/HomeChatbot';
import SupabaseClient from '@/components/Supabase';
import './protected.css';
import Image from 'next/image';
import image41 from '@/components/images/image41.png';


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

  if (!profileSet) {
    const { data, error } = await SupabaseClient()
      .from('TestUserProfile')
      .select('*')
      .eq('EmployeeNo', user.id);

    
    if (error) {
      console.log("Error getting set profile");
    }

    if (data.length > 0) {
      profileSet = true;
    }
  }

  return (
    <>
      {profileSet ? (
        <div>
          <Navbar activePage={activePage}/>
              <div className="left">
              <HomeChatbot userID={user.id} /></div>

              <div id="profile-sect"><HomeProfile  userEmail={user.email} userID={user.id}/></div>
              <Image className = "HomeImg" src={image41} alt="image41" /> 
              
            
          </div>
       ) : (
        <SetProfile userID={user.id} userEmail={user.email}/>
      )} 
    </>
  );
}
