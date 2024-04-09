'use client'
import Image from 'next/image'
import blank from './images/Blank Profile Picture.jpg'
import { useState, useEffect } from 'react';
import SupabaseClient from '@/components/Supabase';

export default function ContactChampions() {
    const [championDetails, setChampionDetails] = useState([]);

    const fetchChampionDetails = async () => {
      const { data, error } = await SupabaseClient()
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
        
        const championChannel = SupabaseClient().channel('TestUserProfile').on(
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
          SupabaseClient().removeChannel(championChannel);
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