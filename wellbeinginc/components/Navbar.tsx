import './Navbar.css'; 
import Image from 'next/image';
import logo from './images/logo.png';


export default function Navbar({ activePage }) {
    return (
        <nav className="navbar">
            <div className="logo"> <Image src={logo} alt="logo"/> </div>
            <ul className="nav-links">
                <li className={activePage === 'home' ? 'active' : ''}><a href="/protected">HOME</a></li>
                <li className={activePage === 'plan' ? 'active' : ''}><a href="/plan">PLAN</a></li>
                <li className={activePage === 'diary' ? 'active' : ''}><a href="/diary">DIARY</a></li>
                <li className={activePage === 'articles' ? 'active' : ''}><a href="/articles">ARTICLES</a></li>
                <li className={activePage === 'contact' ? 'active' : ''}><a href="/contact">CONTACT US</a></li>
                <li className={activePage === 'login' ? 'active' : ''}><a href="/login">LOGOUT</a></li>
            </ul>
        </nav>
    );
}