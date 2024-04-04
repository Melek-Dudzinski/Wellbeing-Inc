'use client';
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import DiaryEntry from "./DiaryEntry";
import AddDiaryEntry from "./AddDiaryEntry";
import Link from 'next/link';
import { redirect } from "next/navigation";

function DiaryEntries ({user}) {
    const [entries, setEntries] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const today = getTodayDate(new Date());
    const [canCreate, setCanCreate] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal  = () =>{
        setModalOpen(false)
    }

    function getTodayDate(dateF = new Date()){
        const yyyy = dateF.toLocaleDateString([], {year:'numeric'})
        const mm = dateF.toLocaleDateString([], {month:'2-digit'})
        const dd = dateF.toLocaleDateString([], {day:'2-digit'})
        return[yyyy,mm,dd].join('-')
    };

    //use effect hook, async
    useEffect(() => {
        const fetchEntries = async () => {
            const{data, error} = await supabase.from('testDiaryEntry').select()
            .eq('employeeID', user)
            .order('date', {ascending:false})
            if (error){
                setFetchError('could not retrieve entry data')
                setEntries(null)
                console.log(fetchError)
            }
            else if(data){
                setFetchError('')
                setEntries(data)
                //check if the user has made an entry today
                if (data[0] && data[0].date == today) {
                    setCanCreate(false)
                }      
            }
        }
        if (user) fetchEntries()

    }, []);

    return(
        <>
        <p>{today} {entries && entries[0].date} {}</p>
        {
        canCreate===true ? 
            <div>
                <button className="add-DiaryEntry" onClick={() => openModal()}>Add Entry</button> 
                <AddDiaryEntry isOpen={modalOpen} onDismiss={() => closeModal()} today={today} user={user}></AddDiaryEntry>
            </div>
        : 
            <div className="add-DiaryEntry"> You're all done for today !</div>
        }
        {entries && entries.map((entry,id) => (
            <div key={id}>
                <DiaryEntry date={entry.date} exerciseData = {entry.exerciseSection} dietData = {entry.dietSection} stepsData={entry.stepsSection} sleepData={entry.sleepSection} user={user}></DiaryEntry>
            </div>
        ))}
        </>
    );
}

export default DiaryEntries;

