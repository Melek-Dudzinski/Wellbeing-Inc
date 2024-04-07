'use client';
import PlanTemplate from "../PlanTemplate"
import Modal from '../CreatePlanModal';
import { useState,useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

function ChangePlanPremade({user,role}) {
    const [modalOpen, setModalOpen] = useState(false);
    const isAdmin = () => {
            return (role[0].Role.match(/Admin.*/))};
    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
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
                {isAdmin() ? 
                    (<div className='planField'>
                        <button onClick={openModal}>+</button>
                        <Modal isOpen={modalOpen} onClose={closeModal} />
                    </div>)
                :
                    (<div></div>) 
                }
            </div>

        </>
    )
}

export default ChangePlanPremade;