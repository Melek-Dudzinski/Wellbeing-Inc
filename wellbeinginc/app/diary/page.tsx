import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
<<<<<<< HEAD
import DiaryEntries from "@/components/Diary/DiaryEntries";
=======
import DiaryCalendar from "@/components/DiaryCalendar"
import DiaryEntry from "@/components/DiaryEntry"
import DiaryForm from "@/components/DiaryForm";
>>>>>>> main
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
<<<<<<< HEAD
          <DiaryEntries user={user.id}></DiaryEntries>
=======
          <DiaryCalendar/>
          <DiaryEntry/>
          <DiaryEntry/>
          <DiaryEntry/>
          <DiaryForm />
>>>>>>> main
      </>
  )
}

