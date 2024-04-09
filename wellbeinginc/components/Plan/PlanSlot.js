import { getDateDBFormat } from "../Diary/DiaryEntries";
import SupabaseClient from '../Supabase';
import { redirect } from "next/navigation";

function PlanSlot({plan, user}){

    //alter a current plan occurence if it exists
    const updateActivePlan = async (plan) => {
        const {error} = await SupabaseClient()
        .from('testPlanOccurence')
        .update({planID:plan,employeeID:user,planStartDate:getDateDBFormat(new Date())})
        .eq('employeeID',user);
        if (error)
            console.log('Error! There was an error inserting data into PlanOccurence')
    };
    //create new plan occurence if there is no entry in the table
    const addNewActivePlan = async (plan) => {
        const {error} = await SupabaseClient()
        .from('testPlanOccurence')
        .insert({planID:plan,employeeID:user,planStartDate:getDateDBFormat(new Date())})
        .eq('employeeID',user);
        if (error)
            console.log('Error! There was an error inserting data into PlanOccurence')
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
                addNewActivePlan(plan);
            else updateActivePlan(plan);
        }
    };

    //handleOnButton
    const handleSwitch = (id) => {
        fetchActivePlan(id);
        redirect('/plan');
    };

    return(
        <div className="planField" id={plan.planID}>
            <button className = "selectButton" onClick={() => handleSwitch(plan.planID)}>
                <p>{plan.name}</p>
                <p>{plan.difficulty}</p>
            </button>
        </div>
    );
}

export default PlanSlot;