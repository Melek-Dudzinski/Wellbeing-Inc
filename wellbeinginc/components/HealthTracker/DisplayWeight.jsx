'use client' 
import React from "react";
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./HealthTrackerComponent.css";
import SupabaseClient from '@/components/Supabase';

export default function DisplayWeight({isOpen,onClose,user}){
    //const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
    const [Data,setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try{
            const {data,error} = await SupabaseClient()
            .from('testHealthEntry')
            .select()
            .eq('employeeNo',user);
            if(error){
                throw error;
            }
            else if(data){
                setData(data);
            }}
            catch(error){
                console.log("Error fetching the data: ",error.message);
            }
        };
        getData();
    },[user])
    return(
    <>
    <button id="close-button" onClick={onClose}>X</button>
    <ul>
        {Data.map((record, index) => (
            <li key ={index}>{record.weight} and {record.startWeek.split("-").reverse().join("-")}</li>
        ))}
    </ul>
    </>
    );
}