'use client' 
import TodayWeightComponent from "@/components/HealthTracker/TodayWeightComponent";
import { DisplayWeekWeight } from "@/components/HealthTracker/TodayWeightComponent";
import AddWeight from "@/components/HealthTracker/AddWeight";
import DisplayWeight from "@/components/HealthTracker/DisplayWeight"
import { createClient } from "@supabase/supabase-js";
import "./HealthTrackerComponent.css";
import { useState,useEffect } from "react";
import { Weekdates } from "@/components/HealthTracker/AddWeight";
import SupabaseClient from '@/components/Supabase';

export default function HealthTrackerComponent({user}){
    //const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
    const [isEntry,setIsEntry] = useState(false);
    const [Data,setData] = useState([]);
    const[ValidEntry,setValidEntry] = useState(false);
    const currentDate = new Date();
    const [startofweektext,endofweektext] = Weekdates(currentDate);
    const [isDisplay,setIsDisplay] = useState(false);
    


    useEffect(() => {
        const getData = async () => {

            const {data,error} = await SupabaseClient()
            .from('testHealthEntry').select()
            .eq('employeeNo',user)
            .eq("startWeek", startofweektext);
            if(error){
                setValidEntry(false);
                console.log(error.message);
                throw error;
            }
            else if(data === null || data.length===0){
                setValidEntry(false);
            }
            else{
                console.log("Data fetched successfully",data);
                setValidEntry(true);
                setData(data);
            }
 
        };
        getData();
    },)

    const openAddEntry = () => {
        setIsEntry(true);
    }

    const closeAddEntry = () => {
        setIsEntry(false);
      };

    const openIsDisplay = () =>{
        setIsDisplay(true);
    };

    const closeIsDisplay = () =>{
        setIsDisplay(false);
    }



      return (
        
        <div id="HealthTracker">
            {!ValidEntry ? (
                <>
                    <TodayWeightComponent user={user} />
                    <p>Have not put an entry for this week</p>
                    <button onClick={openAddEntry}>Add entry</button> 
                    <button onClick={openIsDisplay}>See All weeks weight</button>
                </>
            ) : (   
                <>
                    <TodayWeightComponent user={user} />
                    <DisplayWeekWeight user={user} />
                    <button onClick={openIsDisplay} >See All weeks weight</button>
                    
                </>
            )}
            {isEntry && (
                <>
                <AddWeight isOpen={isEntry} onClose={closeAddEntry} user={user}/>
                </>
            )}
            {isDisplay&&(
                <>
                <DisplayWeight isOpen={isDisplay} onClose={closeIsDisplay} user={user}/>
                </>
            )}
        </div>
        
    );

}