'use client';
import { getDateDBFormat } from "../Diary/DiaryEntries";
import SupabaseClient from '../Supabase';
import Modal from './UpdatePlanModal';
import {useState} from 'react';
import { redirect } from "next/navigation";
import Image from 'next/image';
import image42 from '@/components/images/image42.png';
import image43 from '@/components/images/image43.png';
import image44 from '@/components/images/image44.png';

function PlanSlot({plan, user, setMsg,showEdit}){

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

    //alter a current plan occurence if it exists
    const updateActivePlan = async (plan) => {
        const {error} = await SupabaseClient()
        .from('testPlanOccurence')
        .update({planID:plan,employeeID:user,planStartDate:getDateDBFormat(new Date())})
        .eq('employeeID',user);
        if (error)
            console.log('Error! There was an error updating data into PlanOccurence')
        else setMsg('Plan sucessfully selected')
    };
    //create new plan occurence if there is no entry in the table
    const addNewActivePlan = async (plan) => {
        const {error} = await SupabaseClient()
        .from('testPlanOccurence')
        .insert({planID:plan,employeeID:user,planStartDate:getDateDBFormat(new Date())})
        .eq('employeeID',user);
        if (error)
            console.log('Error! There was an error inserting data into PlanOccurence')
        else setMsg('Plan sucessfully selected')
    };

    //check if the user has an active plan
    const fetchActivePlan = async (plan) => {
        const {data, error} = await SupabaseClient()
        .from('testPlanOccurence')
        .select()
        .eq('employeeID',user);
        if (error)
            console.log('Error! There was an error fetching from PlanOccurence!');
        else {
            (console.log(data))
            if (data.length == 0)
                addNewActivePlan(plan)
            else updateActivePlan(plan)
        }
    };

    //handleOnButton
    const handleSwitch = (id) => {
        fetchActivePlan(id);
    };

    return(
        <div className="planField" id={plan.planID}>
            <button className = "selectButton" >
            <img src={plan.img_url} style={{ position: 'absolute', zIndex: '-1', width: '258px', height: '400px' }} /> 
            <div className = 'bottom-style'> 
                <div className='plan-title'>{plan.name}</div>
                <div className='plan-duration'> <p> {plan.difficulty}</p></div>
                <div className="button-container">
                    <div className='select-plan' onClick={() => handleSwitch(plan.planID)}> Select Plan</div>
                    {showEdit && (                    
                        <div className='update-plan'>
                            <button onClick={openModal}>Update Plan</button> 
                            <Modal isOpen={modalOpen} onClose={closeModal} planID={plan.planID}/>
                        </div>)}
                </div>
            </div>
            </button>
        </div>
    );
}

export default PlanSlot;