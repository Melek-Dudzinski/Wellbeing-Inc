//import { Article,Article1,Article2,Article3,Article4,Article5 } from "./ArticlesArticle"
import Image from 'next/image';
import image30 from './images/image30.png';
import image26 from './images/image26.png';
import image25 from './images/image25.png';
import image27 from './images/image27.png';
import image28 from './images/image28.png';
import image31 from './images/image31.png';
export default function HomeArticle() {
    return (
        <>
            <div className='home-article'>
                <div className='Article-column'>
                    <Article />
                    <Article1 />
                </div>
            </div>
        </>
    )
}

export function Article(){ 
    return(
     <button className='home-article-container'>
            <div className='home-article-content'>
            <div className='img-container'><Image src={image30} alt="Image 30" className='home-img'/></div>
                <div className='home-article-title'>5 benefits of warm water for the face.</div>
                <div className='home-article-body'><p>The benefits of warm water for the face might not be widely known. However, warm water doesn't just provide a relaxing sensation; it also has advantages for facial skin. Nevertheless, there are a few things to consider when using warm water for the face.</p>    
                </div>
            </div>
        </button>
        );
}

export function Article1(){
    return (
    <button className='home-article-container'>
            <div className='home-article-content'>
            <div className='img-container'><Image src={image26} alt="Image 26" className='home-img'/></div>
                <div className='home-article-title'>Good habits developed today will remain a lifetime.</div>
                <div className='home-article-body'> <p>I’ve been obsessed with building habits for as long as I can remember. And it’s no surprise why. I grew up in a strict, disciplined household my entire childhood, dictated by my mother.</p>
                </div>
            </div>
    </button>);
}

export function Article2(){
    return (
    <button className='home-article-container'>
            <div className='home-article-content'>
                <div className='img-container'><Image src={image27} alt="Image 26" className='home-img'/></div>
                <div className='home-article-title'>How good attitude is needed for success?</div>
                <div className='home-article-body'> 
                <p>A positive attitude is the cornerstone of success in any endeavor. While skills, knowledge, and hard work are undoubtedly essential, it's often the attitude we bring to our pursuits that determines the outcome. A good attitude can propel us forward, overcoming obstacles, and turning setbacks into opportunities for growth.</p>
                </div>
            </div>
    </button>);
}

export function Article3(){
    return (
    <button className='home-article-container'>
            <div className='home-article-content'>
            <div className='img-container'><Image src={image28} alt="Image 26" className='home-img'/></div>
                <div className='home-article-title'>How to be kind to yourself. </div>
                <div className='home-article-body'> 
                <p>Being kind to yourself is indispensable for maintaining mental and emotional well-being amidst life's demands. In today's fast-paced world, self-criticism can easily lead to stress and burnout. However, practicing self-compassion and kindness is crucial, fostering resilience, improving self-esteem, and enhancing overall quality of life.</p>
                </div>
            </div>
    </button>);
}

