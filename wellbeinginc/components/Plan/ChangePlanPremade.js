'use client'
import { useState, useEffect } from 'react';
import SupabaseClient from '../Supabase';
import PlanSlot from './PlanSlot';
import Modal from './CreatePlanModal';

function ChangePlanPremade({ user, role }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [premadePlans, setPremadePlans] = useState(null);
    const [changeMsg, setChangeMsg] = useState(null);

    // Function to open modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Function to check if the user is an admin
    const isAdmin = () => {
        return role[0].Role.match(/Admin.*/);
    };

    // Function to fetch premade plans from the database
    const fetchPlans = async () => {
        const { data, error } = await SupabaseClient()
            .from('testPlanTemplate')
            .select()
            .eq('type', 'Premade');
        if (error) {
            console.log('Error! There was an error fetching from PlanTemplate!');
        } else {
            setPremadePlans(data);
        }
    };

    // Effect hook to fetch plans once on component mount
    useEffect(() => {
        fetchPlans();
    }, []);

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
            <div className="PremadeName">My Health Fitness Programs</div>
            <p className="addedPlan">{changeMsg}</p>

            
            <div className="planFieldContainer">
                {premadePlans &&
                    premadePlans.map((plan) => (
                        <PlanSlot key={plan.planID} plan={plan} user={user} setMsg={setChangeMsgWithTimeout} showEdit={isAdmin()}/>
                    ))}

                {isAdmin() && (
                    <div className="planField">
                        <button className="new" onClick={openModal}>
                            Create New Premade Plan
                        </button>
                        <Modal isOpen={modalOpen} onClose={closeModal} user={user} type="Premade" />
                    </div>
                )}
            </div>
        </>
    );
}

export default ChangePlanPremade;
