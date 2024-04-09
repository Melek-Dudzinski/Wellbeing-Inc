'use client'
import { useState } from 'react';
import Chatbot from "@/components/Chatbot";
import ChatbotPrototype from "@/components/ChatbotPrototype";
import SupabaseClient from '@/components/Supabase';
import '@/app/protected/protected.css'

type HomeChatbotProps = {
  userID: string;
}

const HomeProfile = (props: HomeChatbotProps) => {
  const [userName, setUserName] = useState([]);
  const [load, setLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

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
                    {/* <Chatbot userID={props.userID} userRole={name.Role}/> */}
                    <button onClick={toggleChatbot} id="chat-button">
                      Toggle Chatbot
                    </button>
                    <ChatbotPrototype userID={props.userID} userRole={name.Role} isOpen={isOpen} />
                </div>
            ))}

        </div>
      </>
    )
}

export default HomeProfile;