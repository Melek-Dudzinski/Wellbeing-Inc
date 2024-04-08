import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import './changePlan.css'
import Navbar from "@/components/Navbar"
import ChangePlanCustom from "@/components/Plan/ChangePlanCustom"
import ChangePlanPremade from "@/components/Plan/ChangePlanPremade"
import ChangePlanFilter from "@/components/ChangePlanFilter"

export default async function ChangePlan() {
  const activePage = 'plan'
  let role;
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
  .from('TestUserProfile')
  .select('Role')
  .eq('EmployeeNo', user.id);
  if (error) {
    console.log("Error!, a fetching error has occured!");
  }

  return (
      <>
          <Navbar activePage={activePage}/>
          <div className="miniNav">
            <button><Link href="/plan">Back</Link></button>
          </div>
          <div className="changePlanContainer">
            {data && <ChangePlanPremade user={user.id} role={data}/>}
            <ChangePlanCustom user={user.id}/>
            <ChangePlanFilter />
          </div>
      </>
  )
}