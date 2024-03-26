import './Navbar.css'; 
import Image from 'next/image';
import logo from './images/logo.png';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo"> <Image src={logo} alt="logo"/> </div>
            <ul className="nav-links">
                <li><a href="/protected">HOME</a></li>
                <li><a href="/plan">PLAN</a></li>
                <li><a href="/diary">DIARY</a></li>
                <li><a href="/articles">ARTICLES</a></li>
                <li><a href="/contact">CONTACT US</a></li>
                <li><a href="/login">LOGOUT</a></li>
            </ul>
        </nav>
    );
}