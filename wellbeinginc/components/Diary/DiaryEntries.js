'use client';
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import DiaryEntry from "./DiaryEntry";
import AddDiaryEntry from "./AddDiaryEntry";
import DiaryCalendar from "./DiaryCalendar"
import React from "react";
import SupabaseClient from '@/components/Supabase';


export function getDateDBFormat(dateF){
    const yyyy = dateF.toLocaleDateString([], {year:'numeric'})
    const mm = dateF.toLocaleDateString([], {month:'2-digit'})
    const dd = dateF.toLocaleDateString([], {day:'2-digit'})
    return[yyyy,mm,dd].join('-')
};

function DiaryEntries ({user}) {
    const [entries, setEntries] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const today = getDateDBFormat(new Date());
    const [canCreate, setCanCreate] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
    const [turnEdit, setTurnEdit] = useState({button :"edit-button-disabled", textAreaReadOnly:true});
    const [selectDate, setSelectDate] = useState(null)

    //modal window for creating a new entry
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal  = () =>{
        setModalOpen(false)
    }

    function toggleEdit() {
        if (turnEdit.button == "edit-button")
            setTurnEdit({button : "edit-button-disabled", textAreaReadOnly: true})
        else setTurnEdit({button :"edit-button", textAreaReadOnly: false})
    }

    function getSelectEntry(sDate) {
        const result =  entries.filter(e => (e.date==getDateDBFormat(sDate)))
        if (result.length){
            const e = result[0]
            return ((<div>
                <DiaryEntry date={e.date} exerciseData = {e.exerciseData} dietData = {e.dietData} stepsData={e.stepsData} sleepData={e.sleepData} user={user} canEditStyle={turnEdit}></DiaryEntry>
                </div>));
        }
        else
            return <p className="not-found">There is no entry on this day!</p>
    }

    //use effect hook, async
    useEffect(() => {
        //fetch entry data from db
        const fetchEntries = async () => {
            //SELECT * FROM DiaryEntry;
            const{data, error} = await supabase.from('testDiaryEntry').select()
            .eq('employeeID', user)
            .order('date', {ascending:false});
            //LOG ERROR MESSAGE IN CONSOLE, OTHERWISE SHOW DATA
            if (error){
                setFetchError('could not retrieve entry data');
                setEntries(null);
                console.log(fetchError);
            }
            else if(data){
                setFetchError('');
                setEntries(data.map((entry) => ({date: entry.date, exerciseData : entry.exerciseSection, dietData : entry.dietSection, stepsData:entry.stepsSection, sleepData:entry.sleepSection})));
                //check if the user has made an entry today
                console.log(entries)
                if (data[0] && data[0].date == today) {
                    setCanCreate(false);
                }
            }
        }
        if (user) fetchEntries();
        if (!entries && !fetchError) setCanCreate(true);
    }, []);

    return(
        <>
        <DiaryCalendar dateState={selectDate} setDateState={setSelectDate}></DiaryCalendar>
        <div className="buttons-container">
            <button className="turn-edit" onClick={toggleEdit}> Edit </button>
            {
            canCreate===true ? 
                <div>
                    <button className="add-DiaryEntry" onClick={() => openModal()}>Add Entry</button> 
                    <AddDiaryEntry isOpen={modalOpen} onDismiss={() => closeModal()} today={today} user={user}></AddDiaryEntry>
                </div>
            : 
                <p className="add-DiaryEntry"> You're all done for today !</p>
            }
        </div>
        {entries && 
        (selectDate ? 
            //entries.map(e=> {if (e.date==getDateDBFormat(selectDate))

            //console.log(getSelectEntry(selectDate))
            getSelectEntry(selectDate)
        :
            entries.map((entry,id) => (
                <div key={id}>
                    <DiaryEntry date={entry.date} exerciseData = {entry.exerciseData} dietData = {entry.dietData} stepsData={entry.stepsData} sleepData={entry.sleepData} user={user} canEditStyle={turnEdit}></DiaryEntry>
                </div>
        ))
        )}
        </>
    );
}

export default DiaryEntries;

