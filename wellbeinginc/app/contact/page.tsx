import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import './contact.css'
import Navbar from '@/components/Navbar'
import ContactFeedback from '@/components/ContactFeedback'
import ContactChampions from '@/components/ContactChampions'
import FeedbackLog from "@/components/FeedbackLog";

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
                <ContactFeedback />
                <ContactChampions />
                <FeedbackLog />
            </div>
        </>
    )
}