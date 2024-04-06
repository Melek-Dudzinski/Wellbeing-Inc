'use client'
import Image from 'next/image'
import blank from './images/Blank Profile Picture.jpg'
import { createClient } from "@supabase/supabase-js"
import { useState, useEffect } from 'react';

export default function ContactChampions() {
    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
    const [championDetails, setChampionDetails] = useState([]);

    const fetchChampionDetails = async () => {
      const { data, error } = await supabase
      .from('TestUserProfile')
      .select()
      .or('Role.eq.Admin Mental Health Champion, Role.eq.Mental Health Champion');
  
      if (error) {
        console.log("Error getting champion details");
      } else {
        setChampionDetails(data)
      }
    }

    useEffect(() => {  
        fetchChampionDetails();
        
        const championChannel = supabase.channel('TestUserProfile').on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
          },
          () => {
            fetchChampionDetails();
            console.log("Fetching")
          }
        ).subscribe()
    
        return () => {
          supabase.removeChannel(championChannel);
        };
      }, []);

    return (
        <>
            <div id="Information">
                <h2>Mental Health Champions</h2>
                    {championDetails.map(champion => (
                        <div key={champion.EmployeeNo} className='Champion'>
                            <Image src={blank} alt="Blank" height="150" width="150"/>
                            <div>
                                <h3>Name: {champion.FirstName}</h3>
                                <p>Email: {champion.Email}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}