'use client'
import { useState } from 'react';
import Modal from './CreatePlanModal';
import PlanTemplate from "../PlanTemplate";

const ChangePlanCustom = ({user}) => {
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

         {/*
            <table className="custPlanTable">
                <tbody>
                    <tr>
                        <button className="customPlanField"><td><PlanTemplate name="name1" description="description1"/></td></button>
                        <button className="customPlanField"><td><PlanTemplate name="name2" description="description2"/></td></button>
                        <button className="customPlanField"><td><PlanTemplate name="name3" description="description3"/></td></button>
                        <button className="customPlanField"><td><PlanTemplate name="name4" description="description4"/></td></button>
                        <button className="customPlalnField"><td><PlanTemplate name="name5" description="description5"/></td></button>
                        <div className='customPlanField'>
                            <button onClick={openModal}>+</button>
                            <Modal isOpen={modalOpen} onClose={closeModal} />
                        </div>
                    </tr>
                </tbody>
            </table>
         */}
        <div className="planFieldContainer">
            <div className='planField'>
                <button>
                    <p></p>
                </button>
            </div>
            <div className='planField'>
                <button>
                    <p></p>
                </button>
            </div>
            <div className='planField'>
                <button>
                    <p></p>
                </button>
            </div>
            <div className='planField'>
                <button>
                    <p></p>
                </button>
            </div>
            <div className='planField'>
                <button>
                    <p></p>
                </button>
            </div>
            <div className='planField'>
                <button onClick={openModal}>+</button>
                <Modal isOpen={modalOpen} onClose={closeModal} user={user} type='Custom'/>
            </div>
        </div>
        </>
    )
}

export default ChangePlanCustom;