"use client";
/*Imports*/
import SupabaseClient from '@/components/Supabase';
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from 'next/link';
import './feedbackLog.css';

export default function FeedbackLog() {
    const[entries,setEntries] = useState(null)

    /*Fetching feedback entries */
    const getFeedback = async () => {
        const {data, error} = await SupabaseClient()
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

    /*Removing selected feedback entry from database */
    const removeFeedback= async (number: any) =>{
        await number
        const {data,error} = await SupabaseClient()
        .from ('testFeedback')
        .delete()
        .eq('issueNo',number)

        if (error){
            return redirect("/feedbackLog?message=Unable to remove feedback. Please try again.");
        }
        else{
            getFeedback()
        }
    }

    useEffect(() => {
        getFeedback();
    },[]);

    return (
        <>
            {/*<Navbar activePage={activePage}/>*/}
            <div className = "log-header">
                <h1>Feedback Log</h1>
                <button id = "back"><Link href = "/contact">Back</Link></button>
            </div>

            {/*Displaying Entries */}
                {entries && (
                <div className = "feedback-log">
                {entries.map((d:any, index:any) => (
                    <div key={index}>
                        <p id = "feedbackNum">Feedback Number: {d.number}</p>
                        <p id="date">Date Issued: {d.date}</p>
                        <p id = "type">Feedback Type: {d.type}</p>
                        <p id = "content">Feedback Content: "{d.content}"</p>
                        <button id = "del" onClick = {()=> removeFeedback(d.number)}>Delete Entry</button>
                    </div>
                ))}
                </div>
                )}
            <footer>End of Feedback.</footer>
        </>
    )
}