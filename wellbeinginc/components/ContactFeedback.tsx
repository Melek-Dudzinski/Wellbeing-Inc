import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import SupabaseClient from '@/components/Supabase';
import Link from 'next/link';

export default function ContactFeedback({searchParams,}:{searchParams:{message:string};}) {
    /*Validating submitted form info"*/
    const feedbackSubmit = async (formData: FormData) =>{
        "use server";

        {/*Extracting form data*/}
        const type = formData.get("Type") as string;
        const content = formData.get("Content") as string;
        if (!type || !content){
            return redirect("/contact?message=Unable_to_send_feedback._Please_ensure_both_sections_are_filled.");
        }
        
        {/*Sending form data*/}
        const {error} = await SupabaseClient() 
            .from('testFeedback') 
            .insert ({content: content, type: type})
        {/*Returning status of feedback entered*/}    
        if (error){
            return redirect("/contact?message=Unable_to_send_feedback._Please_try_again.");
        }
        else{
            return redirect("/contact?message=Feedback_sent.");
        }
    };

    return (
        <>
            {/*Feedback Form*/}
            <div id="Feedback">
                <form>
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
                    <textarea name="Content" rows="13"></textarea>
                    <SubmitButton className="submit-button" formAction={feedbackSubmit} pendingText="Sending...">Submit</SubmitButton>
                    {searchParams?.message && (<p id ="message">{searchParams.message}</p>)}
                    <button id = "view-details"><Link href="details">View contact information for our Mental Health Champions and Ambassidors</Link></button>
                </form>
            </div>
        </>
    )
}