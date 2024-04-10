'use client' 
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';
import "./HealthTrackerComponent.css";


export function Weekdates(newdate){
    const currentDate = new Date(newdate);
    const startofweek = new Date(currentDate);
    
    
    //calculates start of week (monday) if 0 (sunday) does -6 to get to monday else adds 1 to get to this week
    startofweek.setDate(startofweek.getDate() - startofweek.getDay() + (startofweek.getDay() === 0 ? -6 : 1));

      // Calculate the end of the week (Sunday)
    const endofweek = new Date(startofweek);
    endofweek.setDate(endofweek.getDate() + 6);

    const startofweektext = new Date(startofweek).toISOString().split('T')[0];
    const endofweektext = new Date(endofweek).toISOString().split('T')[0];

    return [startofweektext,endofweektext];
}


export default function AddWeight({isOpen,onClose,user}){
    const currentdate = new Date();
    const [startofweektext,endofweektext] = Weekdates(currentdate);
    

    const InsertWeight = async (Formdata) => {
        const weeklyweight = Formdata.get("weight");
        try {
            // check for exisitng row inside the database
            const { data: existingData, error: existingError } = await SupabaseClient()
                .from('testHealthEntry')
                .select()
                .eq('employeeNo', user)
                .eq('startWeek', startofweektext)
                .single();
    
            if (existingData) {
                console.log("A row with the same composite primary key already exists. Cannot insert.");
                return;
            }
    
            // no row found entering the data into the database
            const { data, error } = await SupabaseClient().from('testHealthEntry').insert([
                {
                    employeeNo: user,
                    weight: weeklyweight,
                    date: currentdate,
                    startWeek: startofweektext
                },
            ]);
    
            if (error) {
                throw error;
            }
    
            console.log("Data inserted successfully", data);
        } catch (error) {
            console.log("Error when inserting the data", error.message);
        }
        redirect("/diary");
    }
    
 
    
    return(
        <div id="addweight-overlay">
            <div id="addweight-contianer">
                <form method="dialog">
                    <button id="close-button" onClick={onClose}>X</button>
                    <div id="addweightcenter">
                        <label>Please enter your weight for this week between</label>
                        <label>{startofweektext.split("-").reverse().join("-")} - {endofweektext.split("-").reverse().join("-")} in kg:</label>
                        <input type="number" name="weight" min={30} max={800} required/>
                        <button id="addweightbutton" type="submit" formAction={InsertWeight} >Save</button>
                    </div>

                </form>
            </div>
        </div>
    );

}


