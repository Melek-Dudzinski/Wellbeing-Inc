import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import PlanPlan from "@/components/PlanPlan"

export default async function Plan() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    return (
        <>
            <Navbar />
            <PlanPlan />
        </>
    )
}