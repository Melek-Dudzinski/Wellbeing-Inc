'use client' 
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';

type ArticleViewProps ={
    userRole: string;
}

export const ArticlesView = (props: ArticleViewProps) => {
    const [articles, setArticles] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(0); // Default to the first article

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
            {articles && (
                <div>
                    {articles.map((article, index) => (
                        <div key={index} className='article-wrapper'style={{ marginBottom: '-32rem', marginTop: '34rem' }}>
                            <div className='article-bar'>
                                <div className='articleView-content'>
                                    <img src={article.image_url} style={{ maxWidth: '80px', maxHeight: '80px', position: 'absolute', right: '20%', }} />
                                    <div className="articleView-title" onClick={() => handleArticleClick(index)}>{article.title}</div>
                                    <div className="articleView-date">{article.date}</div>
                                </div>
                            </div>
                            {selectedArticle === index && (
                    <div> 
                    
                    <img className="article-img" src={article.image_url} style={{maxWidth: '110rem', width: '93.5rem', height: '40rem', objectFit: 'cover'}} />                            
                    <div className="article-container">
                        <div className='article-content'>
                            <div className="article-title" >{article.title}</div>
                            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
                            {props.userRole === "Mental Health Champion" || props.userRole === "Admin Mental Health Champion" ? (
                                <button id = "del" onClick = {()=> removeArticle(article.title)}>Delete Entry</button>
                            ):(<p></p>)} 
                        </div>
                    </div>
                    </div>
                )}
            </div>
        ))}
            </div>
        )}
    </>
)}


