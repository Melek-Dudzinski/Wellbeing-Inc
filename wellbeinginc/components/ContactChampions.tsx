'use client'
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
              <div className="championsContainer">
                  {championDetails.map(champion => (
                      <div key={champion.EmployeeNo} className="champion">
                          <img src={champion.ProfilePicture} style={{width: '230px', height: '150px' }} /> 
                          <div className='info'>
                              <h3>{champion.FirstName} {champion.LastName}</h3>
                              <p>{champion.Email}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </>
    )
}