'use client' 
import React from "react";
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./HealthTrackerComponent.css";
import { Weekdates } from "./AddWeight";
import SupabaseClient from '@/components/Supabase';

export function DisplayWeekWeight({user}){
    //const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
    const[Weight, setWeight] = useState(60.0);
    const[lastWeekWeight, setLastWeekWeight] = useState(60.0);
    const currentDate =  new Date();
    const lastWeekDate = new Date(currentDate);
    lastWeekDate.setDate(currentDate.getDate() - 7);
    const [startofweektext,endofweektext] = Weekdates(currentDate);
    const [startlastweek,endlastweek] = Weekdates(lastWeekDate);
    const [lastWeekAvailable,setLastWeekAvailable] = useState(false);

    useEffect(() => {
        const getWeight = async () => {

            const {data,error} = await SupabaseClient().from('testHealthEntry').select()
            .eq('employeeNo',user)
            .eq("startWeek", startofweektext);
            if(error){
                console.log(error.message);
                throw error;
            }
            else if(data){
                setWeight(data[0].weight);
            }
 
        };
        getWeight();
    },[startofweektext])

    useEffect(() => {
        const getLastWeekWeight = async () => {

            const {data,error} = await SupabaseClient().from('testHealthEntry').select()
            .eq('employeeNo',user)
            .eq("startWeek", startlastweek);
            if(error){
                setLastWeekAvailable(false);
                console.log(error.message);
                throw error;
            }
            else if(data === null || data.length===0){
                setLastWeekAvailable(false);
            }
            else if(data){
                setLastWeekWeight(data[0].weight);
                setLastWeekAvailable(true);
            }
 
        };
        getLastWeekWeight();
    },[])


    const weightDifference = () =>{
        if((Weight - lastWeekWeight) < 0){
            const sentence = "you have lost "+ (lastWeekWeight - Weight).toString() +"kg since last week" ; 
            return sentence;
    }

  
    const sentence = "you have gained "+ (Weight - lastWeekWeight).toString() +"kg since last week" ; 
    return sentence;}

    return(
    <>
    <p>Weight on {startofweektext.split("-").reverse().join("-")} : {Weight}kg</p>
    {lastWeekAvailable ? 
    <p>Weight on {startlastweek.split("-").reverse().join("-")}: {lastWeekWeight}kg</p>
    : null}

    {lastWeekAvailable ?
    <p>{weightDifference()}</p>:null}
    </>
    );
};

export default function TodayWeightComponent({user}){
    //const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
    const[initalWeight, setInitialWeight] = useState(60.0);

    useEffect(() => {
        const getInitialWeight = async () => {
        
            const {data,error} = await SupabaseClient().from('TestUserProfile').select('initialWeight')
            .eq('EmployeeNo',user);
            if(error){
                throw error;
            }
            else if(data){
                setInitialWeight(data[0].initialWeight);
            }
 
        };
        getInitialWeight();
    },[])

    return(<>
    
    <p>Initial weight: {initalWeight}kg</p>
    
    </>);
};