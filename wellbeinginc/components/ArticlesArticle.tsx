'use client' 
import Image from 'next/image';
import image30 from './images/image30.png';
import image26 from './images/image26.png';
import image25 from './images/image25.png';
import image27 from './images/image27.png';
import image28 from './images/image28.png';
import image31 from './images/image31.png';
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const ArticlesView = () => {
    const[articles,setArticles] = useState(null)
    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');

    /*Fetching articles */
    const getArticles = async () => {
        const {data, error} = await supabase 
            .from('ArticleEntries') 
            .select ()

        if (error){
            return redirect("/articles?message=Unable to load articles. Please try again.");
        }
        /*Assigning articles to constant*/
        if (data){
            const articleEntries = data.map(a=>({
                number: a.articleNo, 
                title: a.title,
                content: a.content,
                date: a.date, 
                fName: a.firstName,
                lName: a.lastName,
                
            }))
            setArticles(articleEntries)
        }
    }

    useEffect(() => {
        getArticles();
    },[]);

    /*Removing selected feedback entry from database */
    const removeArticle= async (title: any) =>{
        await title
        const {data,error} = await supabase
        .from ('ArticleEntries')
        .delete()
        .eq('title',title)

        if (error){
            return redirect("/feedbackLog?message=Unable to remove feedback. Please try again.");
        }
        if (data){
            return getArticles();
        }
    }

    const [showArticle, setShowArticle] = useState(true);
    const [showArticle1, setShowArticle1] = useState(false);
    const [showArticle2, setShowArticle2] = useState(false);
    const [showArticle3, setShowArticle3] = useState(false);
    const [showArticle4, setShowArticle4] = useState(false);
    const [showArticle5, setShowArticle5] = useState(false);

    const toggleArticle = () => {
        setShowArticle(!showArticle);
        if (!showArticle1 && !showArticle2 && !showArticle3 && !showArticle4 && !showArticle5) {
            setShowArticle(true);
        }
        setShowArticle1(false);
        setShowArticle2(false);
        setShowArticle3(false);
        setShowArticle4(false);
        setShowArticle5(false);
    };

    const toggleArticle1 = () => {
        setShowArticle1(!showArticle1);
        if (!showArticle && !showArticle2 && !showArticle3 && !showArticle4 && !showArticle5) {
            setShowArticle1(true);
        }
        setShowArticle(false);
        setShowArticle2(false);
        setShowArticle3(false);
        setShowArticle4(false);
        setShowArticle5(false);
    };

    const toggleArticle2 = () => {
        setShowArticle2(!showArticle2);
        if (!showArticle && !showArticle1 && !showArticle3 && !showArticle4 && !showArticle5) {
            setShowArticle2(true);
        }
        setShowArticle(false);
        setShowArticle1(false);
        setShowArticle3(false);
        setShowArticle4(false);
        setShowArticle5(false);
    };

    const toggleArticle3 = () => {
        setShowArticle3(!showArticle3);
        if (!showArticle && !showArticle1 && !showArticle2 && !showArticle4 && !showArticle5) {
            setShowArticle3(true);
        }
        setShowArticle(false);
        setShowArticle1(false);
        setShowArticle2(false);
        setShowArticle4(false);
        setShowArticle5(false);
    };

    const toggleArticle4 = () => {
        setShowArticle4(!showArticle4);
        if (!showArticle && !showArticle1 && !showArticle3 && !showArticle2 && !showArticle5) {
            setShowArticle4(true);
        }
        setShowArticle(false);
        setShowArticle1(false);
        setShowArticle2(false);
        setShowArticle3(false);
        setShowArticle5(false);
    };

    const toggleArticle5 = () => {
        setShowArticle5(!showArticle5);
        if (!showArticle && !showArticle1 && !showArticle3 && !showArticle4 && !showArticle2) {
            setShowArticle5(true);
        }
        setShowArticle(false);
        setShowArticle1(false);
        setShowArticle2(false);
        setShowArticle3(false);
        setShowArticle4(false);
    };
    
    return (
        <>
            {/*Displaying articles from database */}
            {articles && (
            <div>
            {articles.map((a:any, index:any) => (
                <div key={index}>
                    <div className = "article-container">
                        <p className = "articleView-title">{a.title}</p>
                        <p className = "article-body">{a.content}</p>
                        <p className ="articleView-date">{a.date}</p>
                        <p id = "author">Author: {a.fName} {a.lName}</p>
                        <button id = "del" onClick = {()=> removeArticle(a.title)}>Delete Entry</button>
                    </div>
                </div>
            ))}
            </div>
            )}
        {/* Commented out for now
            <div className='article-bar'>

            <div className='articleView-container'>
                <div className='articleView-image'>
                    <Image src={image30} alt="Image 30" width={65} layout="fixed" />
                </div>
                <div className='articleView-content'>
                <button className='articleView-title' onClick={toggleArticle}>5 benefits of warm water for the face.</button>
                    <div className='articleView-date'>March 22, 2024</div>
                </div>
            </div>

            {showArticle && <Article />}

            <div className='articleView-container1'>
            <div className='articleView-image'>
                <Image src={image26} alt="Image 26" width={65} layout="fixed" />
            </div>
            <div className='articleView-content'>
                <button className='articleView-title' onClick={toggleArticle1} >Good habits developed today will remain a lifetime.</button>
                <div className='articleView-date'>March 20, 2024</div>
            </div>
            </div>

            {showArticle1 && <Article1 />}

            <div className='articleView-container2'>
                <div className='articleView-image'>
                    <Image src={image27} alt="Image27 " width={65} layout="fixed" />
                </div>
                <div className='articleView-content'>
                    <button className='articleView-title' onClick={toggleArticle2} >How good attitude is needed for success?</button>
                    <div className='articleView-date'>March 19, 2024</div>
                </div>
            </div>

            {showArticle2 && <Article2 />}

            <div className='articleView-container3'>
                <div className='articleView-image'>
                    <Image src={image28} alt="Image 28" width={65} layout="fixed" />
                </div>
                <div className='articleView-content'>
                    <button className='articleView-title' onClick={toggleArticle3}> How to be kind to yourself. </button>
                    <div className='articleView-date'>March 16, 2024</div>
                </div>
            </div>

            {showArticle3 && <Article3 />}

            <div className='articleView-container4'>
                <div className='articleView-image'>
                    <Image src={image25} alt="Image 25" width={65} layout="fixed" />
                </div>
                <div className='articleView-content'>
                    <button className='articleView-title' onClick={toggleArticle4}> How loneliness alters your brain.</button>
                    <div className='articleView-date'>March 10, 2024</div>
                </div>
            </div>

            {showArticle4 && <Article4 />}

            <div className='articleView-container5'>
                <div className='articleView-image'>
                    <Image src={image31} alt="Image 31" width={65} layout="fixed" />
                </div>
                <div className='articleView-content'>
                    <button className='articleView-title' onClick={toggleArticle5}>6 rarely known benefits of papaya seeds. </button>
                    <div className='articleView-date'>March 5, 2024</div>
                </div>
            </div>

            {showArticle5 && <Article5 />}
            
            </div>
            */}
        </>
    );
}

function Article(){
    return <div className='article-container'>
            <div className='article-content'>
            <Image src={image30} alt="Image 30"/>
                <div className='article-title'>5 benefits of warm water for the face.</div>
                <div className='article-body'><p>The benefits of warm water for the face might not be widely known. However, warm water doesn't just provide a relaxing sensation; it also has advantages for facial skin. Nevertheless, there are a few things to consider when using warm water for the face.</p>
                    <p>It's essential to find the right balance in water temperature, as water that is too hot can strip the skin of its natural oils, leading to dryness and potential irritation. Opt for lukewarm water, which is gentle on the skin and effectively opens up pores without causing harm.</p>
                    <p>Furthermore, it's recommended to limit the duration of exposure to warm water. Prolonged contact may compromise the skin's protective barrier, resulting in moisture loss. Keep your warm water sessions brief, especially if you have sensitive or dry skin, to avoid any adverse effects.</p>
                    <p>Incorporating a mild, hydrating cleanser during your warm water routine can enhance the cleansing process without causing undue dryness. Choose products that suit your skin type and do not contain harsh chemicals that could exacerbate skin issues.</p>
                    <p>For individuals with specific skin conditions or concerns, such as rosacea or eczema, it is advisable to consult with a dermatologist before incorporating warm water into their skincare routine. Certain conditions may require tailored approaches to avoid triggering or worsening symptoms.</p>
                    <p>Remember that the benefits of warm water for the face are maximized when followed by a proper skincare regimen. After patting your face dry, apply a suitable moisturizer to lock in the hydration and support the skin's natural barrier function.</p>
                    <p>In conclusion, the advantages of warm water for the face are manifold, from promoting blood circulation and gentle cleansing to enhancing the absorption of skincare products. By being mindful of water temperature, duration, and individual skin needs, you can harness the benefits of warm water to maintain a healthy, radiant complexion. Integrate this simple yet effective practice into your Skincare routine, and you'll likely notice positive changes in the overall health and appearance of your facial skin.</p>
                </div>
            </div>
        </div>;
}

function Article1(){
    return <div className='article-container'>
            <div className='article-content'>
            <Image src={image26} alt="Image 26"/>
                <div className='article-title'>Good habits developed today will remain a lifetime.</div>
                <div className='article-body'> <p>I’ve been obsessed with building habits for as long as I can remember. And it’s no surprise why. I grew up in a strict, disciplined household my entire childhood, dictated by my mother.</p>
                <p>My brother and I would wake up early, every day, regardless of it was a weekend / holiday. We’d make our bed, do yoga, pray, read / study / do homework, go to school and ace classes and take part in extracurricular activities, and then back home, more homework, prayer, eat dinner, and chill for a bit. Hard curfew and it was onto the next day.</p>
                <p>Everything was structured and orderly. And that brought a sense of peace but also fulfillment and contentment in my life, in hindsight. I never felt like I was “missing out” or that I needed to be doing something more. Now of course, the tradeoff was that I didn’t get the chance to live life as much as I could’ve early on, and certainly felt deprived of certain opportunities. But looking at where I am today, I’m grateful for that discipline. </p>
                <p>Here are a few key pointers that go into making lifelong changes: </p>
                <p>Focus on identity: Aim to embody the traits of the person you want to become rather than just achieving specific goals.</p>
                <p>Start small: Begin with tiny habits that align with your desired identity, using the 2-minute rule to ensure ease of initiation.</p>
                <p>Track your habits: Utilize simple tools like spreadsheets to monitor progress and maintain accountability.</p>
                <p>Set up systems: Establish clear processes for habit implementation, focusing on cues and duration.</p>
                <p>Prioritize core habits: Start with a few fundamental habits that have a significant impact, gradually adding more over time. </p>
                <p>Trusting the process, even with minimal actions like reading for two minutes daily, yielded substantial long-term results. Each small choice contributes to shaping our desired identity, illustrating the power of tiny changes. </p>
                </div>
            </div>
        </div>;
}

function Article2(){
    return <div className='article-container'>
            <div className='article-content'>
            <Image src={image27} alt="Image 26"/>
                <div className='article-title'>How good attitude is needed for success?</div>
                <div className='article-body'> 
                <p>A positive attitude is the cornerstone of success in any endeavor. While skills, knowledge, and hard work are undoubtedly essential, it's often the attitude we bring to our pursuits that determines the outcome. A good attitude can propel us forward, overcoming obstacles, and turning setbacks into opportunities for growth.</p>
                <p>One of the key aspects of a positive attitude is resilience. In the face of challenges or failures, those with a positive mindset view them as temporary setbacks rather than insurmountable barriers. They approach difficulties with optimism, believing in their ability to find solutions and learn from their experiences. This resilience enables them to bounce back stronger and more determined than ever, ultimately leading to success.</p>
                <p>Moreover, a good attitude fosters a growth mindset, the belief that abilities and intelligence can be developed through dedication and effort. Individuals with this mindset embrace challenges, persevere in the face of setbacks, and see criticism as constructive feedback rather than a personal attack. As a result, they are more likely to take risks, step out of their comfort zones, and ultimately achieve their goals.</p>
                <p>Furthermore, a positive attitude is contagious and fosters positive relationships and collaboration. People are naturally drawn to those who exude optimism and enthusiasm, making it easier to network, build connections, and garner support. In professional settings, a good attitude can enhance teamwork, creativity, and productivity, leading to collective success.</p>
                <p>Importantly, maintaining a positive attitude requires mindfulness and self-awareness. It involves acknowledging negative thoughts and emotions but choosing to focus on the positive aspects of a situation instead. Cultivating gratitude, practicing mindfulness, and surrounding oneself with supportive individuals can help maintain a positive outlook even in challenging circumstances.</p>
                <p>In conclusion, a good attitude is indispensable for success in any endeavor. It fuels resilience, fosters a growth mindset, enhances relationships, and promotes overall well-being. While skills and knowledge are undoubtedly valuable, it's the attitude we bring to our pursuits that ultimately determines our success. As the saying goes, "Attitude is a little thing that makes a big difference."</p>
                </div>
            </div>
        </div>;
}

function Article3(){
    return <div className='article-container'>
            <div className='article-content'>
            <Image src={image28} alt="Image 26"/>
                <div className='article-title'>How to be kind to yourself. </div>
                <div className='article-body'> 
                <p>Being kind to yourself is indispensable for maintaining mental and emotional well-being amidst life's demands. In today's fast-paced world, self-criticism can easily lead to stress and burnout. However, practicing self-compassion and kindness is crucial, fostering resilience, improving self-esteem, and enhancing overall quality of life.</p>
                <p>A fundamental step in being kind to yourself is cultivating self-awareness. Take time to reflect on thoughts, feelings, and behaviors without judgment, recognizing patterns of self-criticism and fostering a compassionate mindset.</p>
                <p>Treat yourself with empathy, as you would a friend in need. Replace negative self-talk with encouragement, reminding yourself of your worth and capabilities, especially during tough times.</p>
                <p>Prioritize self-care to nurture your mind, body, and soul. Dedicate time to activities that bring joy and relaxation, such as exercise, hobbies, or quiet reflection.</p>
                <p>Forgive yourself for mistakes and setbacks, understanding they're part of the human experience. Embrace imperfections with acceptance and grace, letting go of the pursuit of perfection.</p>
                <p>Surround yourself with supportive influences. Seek relationships and communities that offer kindness and encouragement, leaning on them for support during challenges.</p>
                <p>In conclusion, being kind to yourself is vital for well-being and resilience. By cultivating self-awareness, practicing self-compassion, prioritizing self-care, forgiving yourself, and surrounding yourself with support, you can foster greater kindness towards yourself. Treating yourself with love and compassion isn't just beneficial—it's essential for a fulfilling life.</p>       
                </div>
            </div>
        </div>;
}

function Article4(){
    return <div className='article-container'>
            <div className='article-content'>
            <Image src={image25} alt="Image 26"/>
                <div className='article-title'>How loneliness alters your brain.</div>
                <div className='article-body'> 
                <p>Loneliness isn't just a feeling; it can significantly impact your brain and overall health. Research shows that prolonged loneliness can alter brain structure and function, leading to various cognitive and emotional changes.</p>
                <p>Firstly, loneliness can affect the structure of the brain. Studies have found that individuals who experience chronic loneliness often have reduced gray matter in areas associated with social perception and self-awareness, such as the prefrontal cortex. This structural change may contribute to difficulties in interpreting social cues and regulating emotions, leading to heightened feelings of isolation and distress.</p>
                <p>Moreover, loneliness can influence brain function. Functional magnetic resonance imaging (fMRI) studies have shown that lonely individuals exhibit heightened activity in brain regions associated with threat detection and stress response, such as the amygdala. This heightened sensitivity to social threats may lead to hypervigilance and increased feelings of anxiety and fear in social situations.</p>
                <p>Furthermore, loneliness can impact neurotransmitter activity in the brain. Research suggests that lonely individuals may have dysregulated levels of neurotransmitters such as dopamine and serotonin, which play crucial roles in mood regulation and reward processing. These imbalances may contribute to symptoms of depression and anhedonia commonly experienced by those who feel chronically lonely.</p>
                <p>Additionally, loneliness can affect neural connectivity within the brain. Studies have found altered connectivity patterns in lonely individuals, particularly in networks involved in social cognition and emotion regulation. These changes may impair one's ability to form and maintain meaningful social relationships, exacerbating feelings of loneliness and isolation.</p>
                <p>In conclusion, loneliness can have profound effects on the brain, altering its structure, function, neurotransmitter activity, and neural connectivity. Understanding these neural changes is crucial for developing interventions to mitigate the negative impact of loneliness on mental health and well-being. By addressing loneliness at both a social and neural level, we can work towards creating a more connected and supportive society.</p>
                </div>
            </div>
        </div>;
}

function Article5(){
    return <div className='article-container'>
            <div className='article-content'>
            <Image src={image31} alt="Image 26"/>
                <div className='article-title'>6 rarely known benefits of papaya seeds.</div>
                <div className='article-body'> <p>Papaya seeds are often overlooked, but they offer a plethora of health benefits that many people may not be aware of. From improving digestion to boosting immunity, here are six rarely known benefits of papaya seeds.</p>
                <p>Firstly, papaya seeds are rich in digestive enzymes like papain, which can aid in the breakdown of proteins and improve digestion. Consuming papaya seeds regularly may help alleviate digestive issues such as bloating, gas, and constipation.</p>
                <p>Moreover, papaya seeds possess powerful antibacterial and anti-parasitic properties. Studies have shown that papaya seeds extract can effectively combat harmful bacteria and parasites in the digestive tract, helping to maintain a healthy gut microbiome and prevent infections.</p>
                <p>Additionally, papaya seeds are a rich source of antioxidants, including flavonoids, phenolic compounds, and vitamin C. These antioxidants help neutralize free radicals in the body, reducing oxidative stress and inflammation, and lowering the risk of chronic diseases such as heart disease and cancer.</p>
                <p>Furthermore, papaya seeds have been found to support liver health. Research suggests that papaya seeds extract can help protect the liver from damage caused by toxins and oxidative stress, as well as improve liver function and promote detoxification.</p>
                <p>Another lesser-known benefit of papaya seeds is their potential to support healthy skin. The high levels of vitamin C and antioxidants in papaya seeds can help promote collagen production, improve skin elasticity, and prevent premature aging. Additionally, the antibacterial properties of papaya seeds may help treat acne and other skin infections.</p>
                <p>In conclusion, papaya seeds offer a range of health benefits, from improving digestion and boosting immunity to supporting liver health and promoting healthy skin. Incorporating papaya seeds into your diet can be a simple and effective way to enhance overall health and well-being.</p>
                </div>
            </div>
        </div>;
}
