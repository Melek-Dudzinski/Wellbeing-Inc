'use client'
import { useState} from 'react';
import Modal from './CreateMenuModal';

const CreateMenuButton = (Role) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            {role[0].Role.match(/Admin.*/) ? (
                <div className='create-Menu'>
                    <button onClick={openModal}>Add New Menu</button>
                    <Modal isOpen={modalOpen} onClose={closeModal}/>
                </div>
            ):(<p></p>)}
        </>
    );
};

export default CreateMenuButton;