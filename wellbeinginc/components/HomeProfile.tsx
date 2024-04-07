'use client'
import { useState } from 'react';
import Modal from './ProfileModal';
import Image from 'next/image'
import blank from './images/Blank Profile Picture.jpg'
import { createClient } from "@supabase/supabase-js"
import SupabaseClient from '@/components/Supabase';
import './HomeProfile.css'

type HomeProfileProps = {
  userEmail: string;
  userID: string;
}

const HomeProfile = (props: HomeProfileProps) => {
  // const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
  const [userDetails, setUserDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchUserDetails = async () => {
    const { data, error } = await SupabaseClient()
    .from('TestUserProfile')
    .select('*')
    .eq('EmployeeNo', props.userID);

    if (error) {
      console.log("Error getting queue status");
    } else {
      setUserDetails(data);
    }
  }

  if (!loading) {
    fetchUserDetails();
    setLoading(true);
  }

  return (
      <>
        <div className='container'>
          <div className='profile-photo'>
              <Image src={blank} alt="Blank" height="100" width="100"/>
            </div>
            <div className='details'>
              {userDetails.map(details => (
                <div key={details.EmployeeNo}>
                  <h3>Name: {details.FirstName}</h3>
                  <p>Email: {props.userEmail}</p>
                  <p>Status: {details.Role}</p>
                </div>
              ))}
            </div>
            <div className='edit-profile'>
                <button onClick={openModal}>Edit Profile</button>
                <Modal isOpen={modalOpen} onClose={closeModal} />
            </div>
        </div>
      </>
    )
}

export default HomeProfile;