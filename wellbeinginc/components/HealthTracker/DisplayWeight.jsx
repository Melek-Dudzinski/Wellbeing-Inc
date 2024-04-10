'use client' 
import React from "react";
import { useState,useEffect } from "react";
import "./HealthTrackerComponent.css";
import SupabaseClient from '@/components/Supabase';

export default function DisplayWeight({isOpen,onClose,user}){
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
                //for sorting out the dates into the correct dates
                data.forEach(record => {
                    record.startWeekDate = new Date(record.startWeek);
                });
                data.sort((a,b) => a.startWeekDate - b.startWeekDate);
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
    <div id="addweight-overlay">
        <div id="weight-width">
        <button id="close-button" onClick={onClose}>X</button>
        <ul>
            {Data.map((record, index) => (
                <li className="list-items" key ={index}>{record.startWeek.split("-").reverse().join("-")} : {record.weight}kg</li>
            ))}
        </ul>
        </div>
    </div>
    </>
    );
}