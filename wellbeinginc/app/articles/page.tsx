import Navbar from '@/components/Navbar'
import {ArticlesView} from '@/components/ArticlesArticle';
import './articles.css';

export default function Articles() {
    return (
        <>
            <Navbar/>
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