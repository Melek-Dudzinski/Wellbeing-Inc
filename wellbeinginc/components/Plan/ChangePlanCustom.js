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

    return (
        <>
        <h1 className="planName">CUSTOM PLAN</h1>
        <p>{changeMsg}</p>
        <div className="planFieldContainer">
            {//display plan templates
                customPlans && customPlans.map(plan=>(
                    <PlanSlot key={plan.planID} plan={plan} user={user} setMsg={setChangeMsg}></PlanSlot>
                ))
            }
            <div className='planField'>
                <button onClick={openModal}>+</button>
                <Modal isOpen={modalOpen} onClose={closeModal} user={user} type='Custom'/>
            </div>
        </div>
        </>
    )
}

export default ChangePlanCustom;