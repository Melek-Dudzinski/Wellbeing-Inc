'use client'
import { useState } from 'react';
import Modal from './ProfileModal';

const HomeProfile = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    return (
        <>
            <div>
                <button onClick={openModal}>Open Modal</button>
                <Modal isOpen={modalOpen} onClose={closeModal} />
            </div>
        </>
    )
}

export default HomeProfile;