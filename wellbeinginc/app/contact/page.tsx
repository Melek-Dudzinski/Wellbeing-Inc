import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import './contact.css'
import Navbar from '@/components/Navbar'
import ContactFeedback from '@/components/ContactFeedback'
import ContactChampions from '@/components/ContactChampions'

export default async function contact() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    return (
        <>
            <div id="Navbar">
                <Navbar />
            </div>
            <div id="Feedback">
                <ContactFeedback />
            </div>
            <div id="Information">
                <ContactChampions />
            </div>
        </>
    )
}