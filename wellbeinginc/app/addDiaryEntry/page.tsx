import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"

export default async function DiaryEntry() {
    const supabase = createClient();
    const activePage = 'diary'
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    return (
        <>
            <Navbar activePage={activePage}/>
        </>
    )
}