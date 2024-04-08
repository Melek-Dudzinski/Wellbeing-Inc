'use client'
import { useState, useEffect } from 'react';
import Modal from './CreatePlanModal';
import PlanTemplate from "../PlanTemplate";
import SupabaseClient from '../Supabase';
import PlanSlot from './PlanSlot';

const ChangePlanCustom = ({user}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [customPlans, setCustomPlans] = useState(null);
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
            {//display plan templates
                customPlans && customPlans.map(plan=>(
                    <PlanSlot plan={plan} user={user}></PlanSlot>
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