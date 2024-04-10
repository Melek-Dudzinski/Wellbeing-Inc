import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import DiaryEntries from "@/components/Diary/DiaryEntries";
import HealthTrackerComponent from "@/components/HealthTracker/HealthTrackerComponent"
import './diary.css';

export default async function Diary() {
  const activePage = 'diary'

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
              <DiaryEntries user={user.id}></DiaryEntries>
              <div className="healthtracker"><HealthTrackerComponent user={user.id} /></div>
          {/*<button id="HealthTracker-button"><Link href="/healthTracker">HEALTH TRACKER</Link></button>*/}
      </>
  )
}

