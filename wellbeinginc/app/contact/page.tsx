import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import './contact.css'
import Navbar from '@/components/Navbar'
import ContactFeedback from '@/components/ContactFeedback'
import SupabaseClient from '@/components/Supabase';
import Link from 'next/link';
import Image from 'next/image';
import image1 from '@/components/images/image1.png';

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
            <div className="title">Contact Us</div>
            <Image id= "image1" src={image1} alt="Image 1" />
            <div className="contact">
                <ContactFeedback />
            </div>
            {data[0].Role !== "Regular" ? (
                    <button id = "view-log"><Link href="feedbackLog">View Feedback</Link></button>
                ):(<p></p>)}
        </>
    )
}