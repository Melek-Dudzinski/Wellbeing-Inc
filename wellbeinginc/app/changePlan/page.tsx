import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import './changePlan.css'
import Navbar from "@/components/Navbar"
import ChangePlanCustom from "@/components/ChangePlanCustom"
import ChangePlanPremade from "@/components/ChangePlanPremade"
import ChangePlanFilter from "@/components/ChangePlanFilter"
import CreateFoodItemButton from "@/components/CreateFoodItemButton";
import SupabaseClient from '@/components/Supabase';

export default async function ChangePlan() {
  
  const activePage = 'plan'

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: dataRole, error } = await SupabaseClient()
      .from('TestUserProfile')
      .select('Role')
      .eq('EmployeeNo', user.id);
  
  if (error) {
      console.log("Error getting user role for create food item")
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
          <CreateFoodItemButton userID = {user.id} userRole={dataRole[0].Role}/>
      </>
  )
}