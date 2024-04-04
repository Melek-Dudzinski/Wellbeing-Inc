import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import DiaryCalendar from "@/components/DiaryCalendar"
import DiaryEntry from "@/components/Diary/DiaryEntry"
import DiaryEntries from "@/components/Diary/DiaryEntries";
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
          <DiaryCalendar/>
          <DiaryEntries user={user.id}></DiaryEntries>
      </>
  )
}

