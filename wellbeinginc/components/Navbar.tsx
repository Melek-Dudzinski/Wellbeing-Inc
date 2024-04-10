import './Navbar.css'; 
import Image from 'next/image';
import logo from './images/logo.png';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';

type NavbarProps = {
    activePage: string;
}

export default async function Navbar(props : NavbarProps) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    const signOut = async () => {
      "use server";
  
      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo"> <Image src={logo} alt="logo"/> </div>
            <ul className="nav-links">
            <li className={props.activePage === 'home' ? 'active' : ''}><Link href="/protected">Home</Link></li>
                <li className={props.activePage === 'plan' ? 'active' : ''}><Link href="/plan">Plan</Link></li>
                <li className={props.activePage === 'diary' ? 'active' : ''}><Link href="/diary">Diary</Link></li>
                <li className={props.activePage === 'articles' ? 'active' : ''}><Link href="/articles">Articles</Link></li>
                <li className={props.activePage === 'contact' ? 'active' : ''}><Link href="/contact">Contact Us</Link></li>
                <form action={signOut}>
                    <li className={props.activePage === 'login' ? 'active' : ''}><button>Logout</button></li>
                </form>
            </ul>
        </nav>
    );
}