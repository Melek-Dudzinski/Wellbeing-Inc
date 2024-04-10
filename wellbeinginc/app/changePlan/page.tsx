import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import './changePlan.css';
import Navbar from "@/components/Navbar";
import CreateMenuButton from "@/components/Plan/CreateMenuButton";
import ChangePlanCustom from "@/components/Plan/ChangePlanCustom";
import ChangePlanPremade from "@/components/Plan/ChangePlanPremade";
import CreateFoodItemButton from "@/components/CreateFoodItemButton";


export default async function ChangePlan() {
  
  const activePage = 'plan'
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
          <div className="back-button">
            <button><Link href="/plan">Back</Link></button>
          </div>
          <div className="changePlanContainer">
            {data && <ChangePlanPremade user={user.id} role={data}/>}
          </div>
          <div className="changePlanContainer2">
            <ChangePlanCustom user={user.id}/>
          </div>
          <div id="planFlex">
            {data && <CreateFoodItemButton userID = {user.id} userRole={data[0].Role}/>}
            {data && <CreateMenuButton Role={data}></CreateMenuButton>}
          </div>
      </>
  )
}