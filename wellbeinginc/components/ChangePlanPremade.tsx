'use client'
import PlanTemplate from "./PlanTemplate"
import Modal from './CreatePlanModal';
import { useState } from 'react';

export default function ChangePlanPremade() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    return (
        <>
            <h1 className="planName">PREMADE PLAN</h1>
            {/*
            <table className="prePlanTable">
                <tbody>
                    <tr>
                        <button className="premadePlanField"><td><PlanTemplate name="name1" description="description1"/></td></button>
                        <button className="premadePlanField"><td><PlanTemplate name="name2" description="description2"/></td></button>
                        <button className="premadePlanField"><td><PlanTemplate name="name3" description="description3"/></td></button>
                        <button className="premadePlanField"><td><PlanTemplate name="name4" description="description4"/></td></button>
                        <button className="premadePlalnField"><td><PlanTemplate name="name5" description="description5"/></td></button>
                        <button className="premadePlanField"><td><PlanTemplate name="name6" description="description6"/></td></button>
                    </tr>
                </tbody>
            </table>
             */}
            <div className="planFieldContainer">
                <div className="planField">
                    <button>
                        <p></p>
                    </button>
                </div>
                <div className="planField">
                    <button>
                        <p></p>
                    </button>
                </div>
                <div className="planField">
                    <button>
                        <p></p>
                    </button>
                </div>
                <div className="planField">
                    <button>
                        <p></p>
                    </button>
                </div>
                <div className="planField">
                    <button>
                        <p></p>
                    </button>
                </div>
                <div className="planField">
                    <button>
                        <p></p>
                    </button>
                </div>
                <div className='planField'>
                    <button onClick={openModal}>+</button>
                    <Modal isOpen={modalOpen} onClose={closeModal} />
                </div>
            </div>

        </>
    )
}