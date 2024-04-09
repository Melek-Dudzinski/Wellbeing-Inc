import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import ActivePlan from "@/components/Plan/ActivePlan"
import Link from 'next/link'
import { Suspense } from "react";
import './plan.css'

export default async function Plan() {
  const activePage = 'plan'

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
          <div className="miniNav">
            <button className = "planButton"><Link href="changePlan">SWITCH PLAN</Link></button>
            <button className = "planButton">DOWNLOAD PLAN</button>
          </div>
          <Suspense fallback='Loading...'>
            <ActivePlan user={user.id}/>
          </Suspense>
      </>
  )
}