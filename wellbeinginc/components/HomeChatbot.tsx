'use client'
import { useState } from 'react';
import { createClient } from "@supabase/supabase-js"
import Chatbot from "@/components/Chatbot";
import SupabaseClient from '@/components/Supabase';
import '@/app/protected/protected.css'

type HomeChatbotProps = {
  userID: string;
}

const HomeProfile = (props: HomeChatbotProps) => {
  // const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
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
                    {/* <button id = "chat-button">CONNECT</button> */}
                    <Chatbot userID={props.userID} userRole={name.Role}/>
                </div>
            ))}

        </div>
      </>
    )
}

export default HomeProfile;