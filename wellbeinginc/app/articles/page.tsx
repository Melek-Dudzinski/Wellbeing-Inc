import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar'
import {ArticlesView} from '@/components/ArticlesArticle';
import Link from 'next/link';

import './articles.css';

export default async function Articles() {
  const activePage = 'articles'
  const supabase = createClient();

  /*Validate User */
  const {data: { user },} = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

 /*Retrieving User Role */
 const{data,error} = await supabase .from('TestUserProfile').select('Role').eq('EmployeeNo',user.id);
 if (error){
  return redirect("/articles?message=Unable to validate your user status.")
 }
 /*if(data.Role != 'Mental Health Champion' || data.Role != 'Admin Mental Health Champion'){
  return redirect("/articles")
 }*/
 

  return (
    <>
      <Navbar activePage={activePage}/>
      <div className='title'>Wellness Articles </div>
      <ArticlesView/>
      <div className="lines-container">
        <div className="line"> </div>
        <div className="line"> </div>
        <div className="line"> </div>
        <div className="line"> </div>
        <div className="line"> </div>
      </div>

      <button id = "add-article"><Link href="addArticles">Add New Article</Link></button>
      
    </>
  )
}