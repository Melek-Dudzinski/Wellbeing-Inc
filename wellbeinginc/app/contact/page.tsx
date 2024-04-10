import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import './contact.css'
import Navbar from '@/components/Navbar'
import ContactFeedback from '@/components/ContactFeedback'
import ContactChampions from '@/components/ContactChampions'
import SupabaseClient from '@/components/Supabase';
import Link from 'next/link';

export default async function contact() {
    const activePage = 'contact'

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data, error } = await SupabaseClient()
        .from('TestUserProfile')
        .select('Role')
        .eq('EmployeeNo', user.id);
    
    if (error) {
        console.log("Error getting user role for contact")
    }

    return (
        <>
            <Navbar activePage={activePage}/>
            <div className="contactBody">
                <ContactFeedback />
                <ContactChampions />
                {data[0].Role !== "Regular" ? (
                    <button id = "view-log"><Link href="feedbackLog">View Feedback</Link></button>
                ):(<p></p>)}
            </div>
        </>
    )
}