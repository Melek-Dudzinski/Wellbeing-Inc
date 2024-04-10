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
            <div className="PremadeName">My Health Fitness Programs</div>
            <p>{changeMsg}</p>
           
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