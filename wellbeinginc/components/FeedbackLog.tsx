"use client";
/*Imports*/
import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import './FeedbackLog.css';

export default function FeedbackLog() {
    const[entries,setEntries] = useState(null)

    /*Fetching feedback entries */
    const getFeedback = async () => {
        const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
        const {data, error} = await supabase 
            .from('testFeedback') 
            .select ()

        if (error){
            return redirect("/contact?message=Unable to load feedback. Please try again.");
        }
        /*Assigning entries to constant*/
        if (data){
            const feedbackEntries = data.map(d=>({
                number: d.issueNo, 
                date: d.date, 
                type: d.type, 
                content: d.content,
            }))
            setEntries(feedbackEntries)
        }
    }

    useEffect(() => {
        getFeedback();
    },[]);

    return (
        <>
        {/*Displaying Entries */}
            {entries && (
            <div className = "feedback-log">
            {entries.map((d:any, index:any) => (
                <div key={index}>
                    <p id = "feedbackNum">Feedback Number: {d.number}</p>
                    <p id="date">Date Issued: {d.date}</p>
                    <p id = "type">Feedback Type: {d.type}</p>
                    <p id = "content">Feedback Content: "{d.content}"</p>
                    <button id = "del">Delete Entry</button>
                </div>
            ))}
            </div>
            )}
        </>
    )
}