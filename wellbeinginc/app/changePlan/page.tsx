import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import ChangePlanCustom from "@/components/ChangePlanCustom"
import ChangePlanPremade from "@/components/ChangePlanPremade"
import ChangePlanFilter from "@/components/ChangePlanFilter"

export default async function ChangePlan() {
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
            <ChangePlanCustom />
            <ChangePlanPremade />
            <ChangePlanFilter />
        </>
    )
}