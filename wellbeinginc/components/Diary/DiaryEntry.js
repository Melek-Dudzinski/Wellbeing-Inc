import Image from 'next/image';
import { redirect } from "next/navigation";
import image17 from '../images/image17.png';
import image18 from '../images/image18.png';
import image19 from '../images/image19.png';
import image20 from '../images/image20.png';
import { useState,useEffect } from "react";
import { createClient } from "@supabase/supabase-js";


export default function DiaryEntry({date,exerciseData, dietData, stepsData, sleepData,user}) {

    const [exerciseContent,setExerciseContent] = useState(exerciseData)
    const [dietContent,setDietContent] = useState(dietData)
    const [stepsContent,setStepsContent] = useState(stepsData)
    const [sleepContent,setSleepContent] = useState(sleepData)
    const [EditMessage, setEditMessage] = useState(null)
    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');


    //update an entry
    const updateEntry = async () => {

        if (!exerciseContent || !dietContent || !stepsContent || !sleepContent)
        {
            console.log("error, no input type")
        }
        //UPDATE exerciseSection, dietSection, stepsSection, sleepSection FROM DiaryEntry WHERE DATE = date AND EmployeeID = user;
        const {data, error} = await supabase.from('testDiaryEntry')
        .update({exerciseSection: exerciseContent, dietSection: dietContent, stepsSection: stepsContent,sleepSection: sleepContent})
        .eq('date', date).eq('employeeID', user)
        .select()
        if (error)
        {
            setEditMessage('Update Error!')
            
        }
        else if (data)
        {
            setEditMessage('Succesfully updated entry!')
        }
    }

    return (
        <div className="diary">
            <div className="date">{date}</div>
            <p className="Edit-Message"> {EditMessage}</p>
            <div className="diary-container">
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                        <Image src={image17} alt="Image 25" />
                    </div>
                    <textarea className="ex-content" onChange={(ev) => setExerciseContent(ev.target.value)}>{exerciseData}</textarea>
                </div>
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                    <Image src={image20} alt="Image 25" />
                    </div>
                    <textarea className="di-content" onChange={(ev) => setDietContent(ev.target.value)}>{dietData}</textarea>
                </div>
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                    <Image src={image18} alt="Image 25" />
                    </div>
                    <textarea className="st-content" onChange={(ev) => setStepsContent(Number(ev.target.value))}>{stepsData.toString()}</textarea>
                </div>
                <div className="diary-entry">
                    <div style={{ width: '40px', height: 'auto' }}>
                    <Image src={image19} alt="Image 25" />
                    </div>
                    <textarea className="sl-content" onChange={(ev) => setSleepContent(ev.target.value)}>{sleepData}</textarea>
                </div>
                <div className="edit-container">
                    <button className="edit-button" onClick={() => updateEntry()}>Submit changes</button>
                </div>
            </div>
        </div>
    );
}
