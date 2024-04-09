'use client' 

import { useState,useEffect } from "react";
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';

export default function HomeArticle() {
    const[homeArticles,setHomeArticles] = useState(null)

    /*Fetching 2 articles */
    const getArticles = async () => {
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
                imgs: a.image_url,
                
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
                                <div className="home-img-and-title">
                                    <img src={a.imgs} style={{ maxWidth: '10rem', maxHeight: '10rem'}} />
                                    <p id = "home-article-title">{a.title}</p>
                                </div>
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



