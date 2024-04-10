'use client'
import { useState, useEffect } from 'react';
import Modal from './ProfileModal';
import Image from 'next/image'
import blank from './images/Blank Profile Picture.jpg'
import SupabaseClient from '@/components/Supabase';
import './HomeProfile.css'

type HomeProfileProps = {
  userEmail: string;
  userID: string;
}

const HomeProfile = (props: HomeProfileProps) => {
  const [userDetails, setUserDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    fetchUserDetails();
  }, [])

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
                <Modal isOpen={modalOpen} onClose={closeModal} userID={props.userID}/>
            </div>
          </div>
            
        </div>
      </>
    )
}

export default HomeProfile;