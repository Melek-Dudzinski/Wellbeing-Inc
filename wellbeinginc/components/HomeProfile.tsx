'use client'
import { useState } from 'react';
import Modal from './ProfileModal';
import Image from 'next/image'
import blank from './images/Blank Profile Picture.jpg'
import HomeProifleDetails from '@/components/HomeProfileDetails';
import './HomeProfile.css'

type HomeProfileProps = {
  userName: string;
  userEmail: string;
  userRole: string;
}

const HomeProfile = (props: HomeProfileProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    return (
        <>
          <div className='container'>
            <div className='profile-photo'>
                <Image src={blank} alt="Blank" height="100" width="100"/>
              </div>
              <div className='details'>
                  <HomeProifleDetails userName={props.userName} userEmail={props.userEmail} userRole={props.userRole}/>
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