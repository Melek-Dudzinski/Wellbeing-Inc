'use client'
/*Imports*/
import { SubmitButton } from "@/app/login/submit-button";
import { useState } from "react";
import SupabaseClient from '@/components/Supabase';

export default function ContactFeedback() {
    const[feedbackStatus, setFeedbackStatus] = useState("")
    /*Validating submitted form info"*/
    const feedbackSubmit = async (formData: FormData) =>{
        
        {/*Extracting form data*/}
        const type = formData.get("Type") as string;
        const content = formData.get("Content") as string;
        if (!type || !content){
            setFeedbackStatus("Feedback not sent. Please fill all sections before attempting to send.")
            return
        }
        
        {/*Sending form data*/}
        const {error} = await SupabaseClient() 
            .from('testFeedback') 
            .insert ({content: content, type: type})
        {/*Returning status of feedback entered*/}    
        if (error){
            setFeedbackStatus("Error sending feedback. Plese try again.")
            return
        }
        else{
            setFeedbackStatus("Feedback sent successfully.")
            return 
        }
    };

    return (
        <>
            {/*Feedback Form*/}
            <div id="Feedback">
                <form>
                    <legend>Provide Feedback</legend>
                    <select name="Type">
                        <option value="" disabled selected>Select Feedback Topic</option>
                        <option value = "Home">Home</option>
                        <option value = "Plan">Plan</option>
                        <option value = "Diary">Diary</option>
                        <option value = "Health Tracker">Health Tracker</option>
                        <option value = "Articles">Articles</option>
                        <option value = "Contact Us">Contact Us</option>
                        <option value = "Other">Other</option>
                    </select>
                    <textarea name="Content" rows="10"></textarea>

                    <div className = "buttons">
                        <SubmitButton className="submit-button" formAction={feedbackSubmit} pendingText="Sending...">Submit</SubmitButton>
                        <input id = "clear" type="reset" value = "Clear Form"/>
                    </div>

                    <p id ="message">{feedbackStatus}</p>
                </form>
            </div>
        </>
    )
}