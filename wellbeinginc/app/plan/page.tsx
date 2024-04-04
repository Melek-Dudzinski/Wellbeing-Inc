import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import PlanPlan from "@/components/PlanPlan"

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
<<<<<<< Updated upstream
=======
          <div className="miniNav">
            <button className="planButton"><Link href="changePlan">SWITCH PLAN</Link></button>
            <button className="planButton">DOWNLOAD PLAN</button>
          </div>
>>>>>>> Stashed changes
          <PlanPlan />
      </>
  )
}