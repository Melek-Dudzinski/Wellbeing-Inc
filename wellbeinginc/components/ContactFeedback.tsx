import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import SupabaseClient from '@/components/Supabase';

export default function ContactFeedback({searchParams,}:{searchParams:{message:string};}) {
    
    /*Validating submitted form info"*/
    const feedbackSubmit = async (formData: FormData) =>{
        "use server";

        {/*Extracting form data*/}
        const type = formData.get("Type") as string;
        const content = formData.get("Content") as string;
        if (!type || !content){
            return redirect("/contact?message=Please ensure both sections are filled.");
        }
        
        {/*Sending form data*/}
        // const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko')
        const {error} = await SupabaseClient() 
            .from('testFeedback') 
            .insert ({content: content, type: type})
        if (error){
            return redirect("/contact?message=Unable to send feedback. Please try again.");
        }
        else{
            return redirect("/contact");
        }
    };

    return (
        <>
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
                    <SubmitButton className="submit-button" formAction={feedbackSubmit} pendingText="Sending...">Submit</SubmitButton>
                    {searchParams?.message && (<p id ="message">{searchParams.message}</p>)}
                </form>
            </div>
        </>
    )
}