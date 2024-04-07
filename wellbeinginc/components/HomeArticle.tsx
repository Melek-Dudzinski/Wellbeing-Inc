'use client' 

import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';

export default function HomeArticle() {
    const[homeArticles,setHomeArticles] = useState(null)

    /*Fetching 2 articles */
    const getArticles = async () => {
        // const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
        const {data, error} = await SupabaseClient() 
            .from('ArticleEntries') 
            .select ()
            .range(0,1)

        if (error){
            return redirect("/articles?message=Unable to load articles. Please try again.");
        }
        /*Assigning articles to constant*/
        if (data){
            const articlesPrev = data.map(a=>({
                title: a.title,
                summary: a.summary,
                
            }))
            setHomeArticles(articlesPrev)
        }
    }

    useEffect(() => {
        getArticles();
    },[]);
    
    return (
        <>
            {/*Displaying 2 articles from database */}
            <div className='home-article'>
                    {homeArticles && (
                        <div className = "Article-column">
                        {homeArticles.map((a:any, index:any) => (
                            <div key={index}>
                                <button className='home-article-container'>
                                    
                                        <p className = "home-article-title">{a.title}</p>
                                        <p className = "home-article-body">{a.summary}</p>
                                    
                                </button>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
        </>
    )
}



