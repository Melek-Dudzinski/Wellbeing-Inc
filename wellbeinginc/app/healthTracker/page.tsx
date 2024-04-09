import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import HealthTrackerComponent from "@/components/HealthTracker/TodayWeightComponent";
import AddWeight from "@/components/HealthTracker/AddWeight";
import { DisplayWeekWeight } from "@/components/HealthTracker/TodayWeightComponent";

export default async function HealthTracker() {
  const activePage = 'health'

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
          {/*<HealthTrackerComponent user={user.id}/>
          <DisplayWeekWeight user={user.id}/>
          <AddWeight user={user.id}/>*/}
      </>
  )
}