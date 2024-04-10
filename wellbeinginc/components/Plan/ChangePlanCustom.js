'use client'
import { useState, useEffect } from 'react';
import Modal from './CreatePlanModal';
import SupabaseClient from '../Supabase';
import PlanSlot from './PlanSlot';

const ChangePlanCustom = ({user}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [customPlans, setCustomPlans] = useState(null);
    const [changeMsg, setChangeMsg] = useState(null);

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };

    //get the premade plans from db
    const fetchPlans = async () => {
        const {data,error} = await SupabaseClient()
        .from('testPlanTemplate')
        .select()
        .eq('type','Custom')
        .eq('creator',user);
        if (error)
            console.log('Error! There was an error fetching from PlanTemplate!');
        else
            setCustomPlans(data);
    };

    useEffect(()=>{
        fetchPlans();
    },[]);

    // Function to set change message and reset it after a timeout
    const setChangeMsgWithTimeout = (msg) => {
        setChangeMsg(msg);
        // Reset changeMsg after 5 seconds
        setTimeout(() => {
            setChangeMsg(null);
        }, 2000); // 5000 milliseconds = 5 seconds
    };

    return (
        <>
        <h1 className="planName">CUSTOM PLAN</h1>
        <p className="addedPlan">{changeMsg}</p>
        <div className="planFieldContainer">
            {//display plan templates
                customPlans && customPlans.map(plan=>(
                    <PlanSlot key={plan.planID} plan={plan} user={user} setMsg={setChangeMsgWithTimeout}></PlanSlot>
                ))
            }
            <div className='planField'>
                <img style={{ position: 'absolute', zIndex: '-1', width: '258px', height: '400px' }} /> 
                <button className="new" onClick={openModal}>Create New Plan</button>
                <Modal isOpen={modalOpen} onClose={closeModal} user={user} type='Custom'/>
            </div>
        </div>
        </>
    )
}

export default ChangePlanCustom;