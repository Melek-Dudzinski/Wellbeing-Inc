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
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
    }
  }

  if (!load) {
    fetchUserName();
    setLoad(true);
    
  }

  return (
      <>
        <div>
            {loading ? (
              <div>
                <div className='intro'> Hi, <p>Embrace Your Wellness Journey Today </p></div>
                <div className='chatbot-intro'>Need someone to talk to? Connect with our Mental Health Champion for confidential support and guidance.</div>
                <button id="chat-button">CONNECT</button>
              </div>
            ) : (
              <>
                {userName.map(name => (
                    <div key={name.EmployeeNo}>
                    <div className='intro'> Hi {name.FirstName}, <p>Embrace Your Wellness Journey Today </p></div>
                    <div className='chatbot-intro'>Need someone to talk to? Connect with our Mental Health Champion for confidential support and guidance.</div>
                    <button onClick={toggleChatbot} id="chat-button">
                      CONNECT
                    </button>
                    <ChatbotPrototype userID={props.userID} userRole={name.Role} isOpen={isOpen} />
                    {/* <Chatbot userID={props.userID} userRole={name.Role} isOpen={isOpen} /> */}
                    </div>

                ))}
                
               
              
                
              </>
            )}
        </div>
      </>
    )
}

export default HomeProfile;