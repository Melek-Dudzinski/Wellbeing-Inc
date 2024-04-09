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
          <div id="miniNav">
            <button id="switchButton"><Link href="changePlan">Switch Plan</Link></button>
            <button >Download Plan</button>
          </div>
          <Suspense fallback='Loading...'>
            <ActivePlan user={user.id}/>
          </Suspense>
      </>
  )
}