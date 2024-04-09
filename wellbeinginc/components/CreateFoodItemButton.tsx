'use client'
import { useState, useEffect } from 'react';
import Modal from '@/components/CreateFoodItemModal';

type CreateFoodItemButtonProps = {
    userID: string;
    userRole: string;
  }

const CreateFoodItemButton = (props: CreateFoodItemButtonProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            {props.userRole !== "Regular" ? (
                <div className='edit-profile'>
                    <button onClick={openModal}>Add new food item</button>
                    <Modal isOpen={modalOpen} onClose={closeModal} userID = {props.userID}/>
                </div>
            ):(<p></p>)}
        </>
    );
};

export default CreateFoodItemButton;