'use client'
import { useState } from 'react';
import Modal from './CreatePlanModal';
import PlanTemplate from "./PlanTemplate";

const ChangePlanCustom = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    return (
        <>
            <h1 className="planName">CUSTOM PLAN</h1>
            <div>
                <button onClick={openModal}>+</button>
                <Modal isOpen={modalOpen} onClose={closeModal} />
            </div>
            <table className="custPlanTable">
                <tbody>
                    <tr>
                        <td><PlanTemplate name="name1" description="description1"/></td>
                        <td><PlanTemplate name="name2" description="description2"/></td>
                        <td><PlanTemplate name="name3" description="description3"/></td>
                        <td><PlanTemplate name="name4" description="description4"/></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ChangePlanCustom;