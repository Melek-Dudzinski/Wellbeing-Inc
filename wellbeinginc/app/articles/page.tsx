import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar'
import {ArticlesView} from '@/components/ArticlesArticle';
import Link from 'next/link';
import SupabaseClient from '@/components/Supabase';
import './articles.css';

export default async function Articles() {
  const activePage = 'articles'
  const supabase = createClient();

  /*Validate User */
  const {data: { user },} = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await SupabaseClient()
        .from('TestUserProfile')
        .select('Role')
        .eq('EmployeeNo', user.id);
    
    if (error) {
        console.log("Error getting user role for contact")
    }

  return (
    <>
      <Navbar activePage={activePage}/>
      <div className='title'>Wellness Articles </div>

      <ArticlesView userRole={data[0].Role}/>
      <div className="lines-container">

        <div className="line"> </div>
        <div className="line"> </div>
        <div className="line"> </div>
        <div className="line"> </div>
        <div className="line"> </div>

      </div>
      {data[0].Role !== "Regular" ? (
        <button id = "add-article"><Link href="addArticles">Add New Article</Link></button>
      ):(<p></p>)}      

    </>
  )
}