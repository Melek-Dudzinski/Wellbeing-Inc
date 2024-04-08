'use client' 
//import Image from 'next/image';
import { useState, useEffect } from "react";
//import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';

type ArticleViewProps ={
    userRole: string;
}

export const ArticlesView = (props: ArticleViewProps) => {
    const [articles, setArticles] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(0); // Default to the first article
    // const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');

    /*Fetching articles */
    const getArticles = async () => {
        const {data, error} = await SupabaseClient() 
            .from('ArticleEntries') 
            .select ()

        if (error) {
            return redirect("/articles?message=Unable to load articles. Please try again.");
        }
        /*Assigning articles to state */
        if (data) {
            // Format date before setting the articles state
            const formattedArticles = data.map(article => ({
                ...article,
                date: new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }));
            setArticles(formattedArticles);
        }
    }

    useEffect(() => {
        getArticles();
    },[]);

    const handleArticleClick = (index) => {
        setSelectedArticle(index);
    };

    /*Removing selected feedback entry from database */
    const removeArticle= async (title: any) =>{
        await title
        const {data,error} = await SupabaseClient()
        .from ('ArticleEntries')
        .delete()
        .eq('title',title)

        if (error){
            return redirect("/feedbackLog?message=Unable to remove feedback. Please try again.");
        }
        else{
            getArticles()
        }
    }

    
    
    return (
    <>
        {/* Displaying articles from database */}
        {articles && (
            <div>
                {articles.map((article, index) => (
                    <div key={index} className='article-wrapper'>
                        <div className='article-bar'>
                            <div className='articleView-content'>
                                <img src={article.image_url} style={{ maxWidth: '80px', maxHeight: '80px', position: 'absolute', left: '3%', }} />
                                <div className="articleView-title" onClick={() => handleArticleClick(index)}>{article.title}</div>
                                <div className="articleView-date">{article.date}</div>
                            </div>
                        </div>
                        {selectedArticle === index && (
                            <div className="article-container">
                                <div className='article-content'>
                                    <img src={article.image_url} style={{ maxWidth: '290px', maxHeight: '290px', left: '3%', }} /> 
                                    <div className="article-title" >{article.title}</div>
                                    <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
                                    {props.userRole !== "Regular" ? (
                                        <button id = "del" onClick = {()=> removeArticle(article.title)}>Delete Entry</button>
                                    ):(<p></p>)} 
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}
    </>
);
}

