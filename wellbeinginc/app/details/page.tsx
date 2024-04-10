import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar'
import ContactChampions from '@/components/ContactChampions'
import Image from "next/image";
import image52 from '@/components/images/image52.png'
import './details.css';

export default async function Articles() {
  const activePage = 'details'
  const supabase = createClient();

  const {data: { user },} = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
 

  return (
    <>
      <Navbar activePage={activePage}/>
      <Image id= "Image52" src={image52} alt="Image 52" />
      <div className="title">Meet Our Mental Health Champions And Ambassadors</div>
      <ContactChampions />
    </>
  )
}