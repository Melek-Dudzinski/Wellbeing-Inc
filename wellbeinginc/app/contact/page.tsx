import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import './contact.css'
import Navbar from '@/components/Navbar'
import ContactFeedback from '@/components/ContactFeedback'
import ContactChampions from '@/components/ContactChampions'
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

    return (
        <>
            <Navbar activePage={activePage}/>
            <div className="contactBody">
                <ContactFeedback searchParams={{message: ""}} />
                <ContactChampions />
                <button id = "view-log"><Link href="feedbackLog">View Feedback</Link></button>
            </div>
        </>
    )
}