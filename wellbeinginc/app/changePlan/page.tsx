import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import './changePlan.css'
import Navbar from "@/components/Navbar"
import ChangePlanCustom from "@/components/ChangePlanCustom"
import ChangePlanPremade from "@/components/ChangePlanPremade"
import ChangePlanFilter from "@/components/ChangePlanFilter"

export default async function ChangePlan() {
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
          <div className="backToPlan">
            <button><Link href="/plan">Back</Link></button>
          </div>
          <div className="changePlanContainer">
            <ChangePlanPremade />
            <ChangePlanCustom />
            <ChangePlanFilter />
          </div>
      </>
  )
}