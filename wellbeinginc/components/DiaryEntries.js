'use client';
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import DiaryEntry from "./DiaryEntry";
import { redirect } from "next/navigation";

function DiaryEntries ({user}) {
    const [entries, setEntries] = useState(null)
    const [fetchError, setFetchError] = useState(null)
    
    //use effect hook, async
    useEffect(() => {
        const fetchEntries = async () => {
            const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
            const{data, error} = await supabase.from('testDiaryEntry').select()
            .eq('employeeID', user)
            if (error){
                setFetchError('could not retrieve entry data')
                setEntries(null)
                console.log(fetchError)
            }
            else if(data){
                setFetchError('')
                setEntries(data)
            }
        }
        if (user) fetchEntries()
    }, [])

    return(
        <>
        <p>{user}</p>
        {entries && entries.map((entry,id) => (
            <div key={id}>
                <DiaryEntry date={entry.date} exerciseData = {entry.exerciseSection} dietData = {entry.dietSection} stepsData={entry.stepsSection} sleepData={entry.sleepSection}></DiaryEntry>
            </div>
        ))}
        </>
    )
}

export default DiaryEntries;

