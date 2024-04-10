'use client'
import { useState } from 'react';
import Modal from './ProfileModal';
import Image from 'next/image'
import blank from './images/Blank Profile Picture.jpg'
import { createClient } from "@supabase/supabase-js"
import './HomeProfile.css'

type HomeProfileProps = {
  userEmail: string;
  userID: string;
}

const HomeProfile = (props: HomeProfileProps) => {
  const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
  const [userDetails, setUserDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchUserDetails = async () => {
    const { data, error } = await supabase
    .from('TestUserProfile')
    .select('*')
    .eq('EmployeeNo', props.userID);

    if (error) {
      console.log("Error getting queue status");
    } else {
      setUserDetails(data);
    }
  }

  fetchUserDetails();

  return (
      <>
        <div className='container'>
            <div className='profile-photo'>
              <Image src={blank} alt="Blank" width="60"/>
            </div>
            <div className='details'>
              {userDetails.map(details => (
                <div key={details.EmployeeNo}>
                  <h3>{details.FirstName} {details.LastName}</h3> 
                  <p>{props.userEmail}</p>
                  <p>{details.Role}</p>
                </div>
              ))}

            <div>
                <button className='edit-profile' onClick={openModal}>Edit Profile</button>
                <Modal isOpen={modalOpen} onClose={closeModal} />
            </div>
          </div>
            
        </div>
      </>
    )
}

export default HomeProfile;