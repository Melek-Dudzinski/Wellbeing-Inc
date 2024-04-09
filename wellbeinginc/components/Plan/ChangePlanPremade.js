'use client';
import PlanTemplate from "../PlanTemplate"
import Modal from './CreatePlanModal';
import { useState,useEffect } from 'react';
import SupabaseClient from '../Supabase';
import PlanSlot from './PlanSlot';

//switching view to premade plans
function ChangePlanPremade({user,role}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [premadePlans, setPremadePlans] = useState(null);
    const [changeMsg, setChangeMsg] = useState(null);
    //only display the create option to admins
    const isAdmin = () => {
            return (role[0].Role.match(/Admin.*/))};

    //for the create plan modal window
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
        .eq('type','Premade');
        if (error)
            console.log('Error! There was an error fetching from PlanTemplate!');
        else
            setPremadePlans(data);
    };

    //fetch from database once
    useEffect(()=>{
        fetchPlans();
    },[]);

    return (
        <>
            <h1 className="planName">PREMADE PLAN</h1>
            <p>{changeMsg}</p>
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
                {//display plan templates
                    premadePlans && premadePlans.map(plan=>(
                        <PlanSlot key={plan.planID} plan={plan} user={user} setMsg={setChangeMsg}></PlanSlot>
                    ))
                }

                {isAdmin() ? 
                    (<div className='planField'>
                        <button onClick={openModal}>+</button>
                        <Modal isOpen={modalOpen} onClose={closeModal} user={user} type='Premade'/>
                    </div>)
                :
                    (<div></div>) 
                }
            </div>

        </>
    )
}

export default ChangePlanPremade;