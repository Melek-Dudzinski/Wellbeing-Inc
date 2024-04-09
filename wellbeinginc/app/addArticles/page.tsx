import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import Navbar from '@/components/Navbar'
import Link from 'next/link';
import SupabaseClient from '@/components/Supabase';
import './addArticles.css'

export default function  ArticlesForm ({searchParams,}:{searchParams:{message:string};}) {
    const activePage = 'articles'
    /*Validating submitted form info"*/
    const articleSubmit = async (formData: FormData) =>{
        "use server";

        {/*Extracting form data*/}
        const title = formData.get("Title") as string;
        const summary = formData.get("Summary") as string;
        const content = formData.get("Content") as string;
        const firstName = formData.get("FName") as string;
        const lastName = formData.get("LName") as string;
        const image_url = formData.get("image_url") as string;
        if (!title || !summary || !content || !firstName || !lastName || !image_url){
            return redirect("/articles?message=Please ensure all sections are filled.");
        }
        
        {/*Sending form data*/}
        // const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko')
        const {error} = await SupabaseClient() 
            .from('ArticleEntries') 
            .insert ({title: title, summary: summary, content: content, firstName: firstName, lastName: lastName, image_url: image_url})
        if (error){
            return redirect("/articles?message=Unable to add article. Please try again.");
        }
        else{
            return redirect("/articles?message=Article added.");
        }
    };
        
    return(
        <>
            <Navbar activePage={activePage}/>
            {/* Articles Form */}
            <div id="article-form">
                <form>
                    <legend>Add New Article</legend>
                    <label>Article Title:</label>
                        <textarea name="Title"></textarea>
                    <label>Article Summary:</label>
                        <textarea id = "summary" name="Summary"></textarea>
                    <label>Article Content:</label>
                        <textarea id = "content" name="Content"></textarea>
                    <label>Author First Name:</label>
                        <textarea name="FName"></textarea>
                    <label>Author Last Name:</label>
                        <textarea name="LName"></textarea>
                    <label>Image URL:</label>
                        <textarea name="image_url"></textarea>

                    <div id = "buttons">
                        <SubmitButton className="submit-button" formAction={articleSubmit} pendingText="Sending...">Add Article</SubmitButton>
                        {searchParams?.message && (<p id ="message">{searchParams.message}</p>)}
                        <input id = "clear" type="reset" value = "Clear Form"/>
                    </div>
                </form>
            </div>
            <button id = "back"><Link href = "/articles">Back</Link></button>
        </>
    )
}

