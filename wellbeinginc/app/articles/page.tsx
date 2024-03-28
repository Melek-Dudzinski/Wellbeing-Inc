import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar'
import {ArticlesView} from '@/components/ArticlesArticle';
import './articles.css';

export default async function Articles() {
  const activePage = 'articles'

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
          <div className='title'>Wellness Articles </div>
          <ArticlesView/>
          <div className="lines-container">
              <div className="line"> </div>
              <div className="line"> </div>
              <div className="line"> </div>
              <div className="line"> </div>
              <div className="line"> </div>
          </div>
      </>
  )
}