'use client'
import { useState } from 'react';
import ChatbotPrototype from "@/components/ChatbotPrototype";
import SupabaseClient from '@/components/Supabase';
import '@/app/protected/protected.css'

type HomeChatbotProps = {
  userID: string;
}

const HomeProfile = (props: HomeChatbotProps) => {
  const [userName, setUserName] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchUserName = async () => {
    const { data, error } = await SupabaseClient()
    .from('TestUserProfile')
    .select('*')
    .eq('EmployeeNo', props.userID);

    if (error) {
      console.log("Error getting queue status");
    } else {
        setUserName(data)
    }
  }

  if (!load) {
    fetchUserName();
    setLoad(true);
  }

  return (
      <>
        <div>
            {userName.map(name => (
                <div key={name.EmployeeNo}>
                    <h1>HELLO {name.FirstName}</h1>
                    <p>Need someone to talk to? Connect with our Mental Health Champion for</p>
                    <p>confidential support and guidance</p>
                    <ChatbotPrototype userID={props.userID} userRole={name.Role}/>
                </div>
            ))}

        </div>
      </>
    )
}

export default HomeProfile;