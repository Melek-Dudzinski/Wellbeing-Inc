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
      <ArticlesView userRole={data[0].Role}/>
      <div className="more"> More Articles: </div>
      {data[0].Role === "Mental Health Champion" || data[0].Role === "Admin Mental Health Champion" ? (
        <button id = "add-article"><Link href="addArticles">Add New Article</Link></button>
      ):(<p></p>)}  
      
     
      
    </>
  )
}