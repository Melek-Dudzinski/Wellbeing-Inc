import { useState } from "react";
import SupabaseClient from '@/components/Supabase';


export default function DiaryEntry({date,exerciseData, dietData, stepsData, sleepData,user, canEditStyle}) {

    const [exerciseContent,setExerciseContent] = useState(exerciseData)
    const [dietContent,setDietContent] = useState(dietData)
    const [stepsContent,setStepsContent] = useState(stepsData)
    const [sleepContent,setSleepContent] = useState(sleepData)
    const [EditMessage, setEditMessage] = useState(null)

    //update an entry
    const updateEntry = async () => {
        //error message if wrong numerical input

        if (!exerciseContent || !dietContent || !stepsContent || !sleepContent)
        {
            setEditMessage('Error! One of the fields may be empty or have a wrong input type!')
            return;
        }
        //UPDATE exerciseSection, dietSection, stepsSection, sleepSection FROM DiaryEntry WHERE DATE = date AND EmployeeID = user;
        const {data, error} = await SupabaseClient().from('testDiaryEntry')
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

    const changeStepsValue = (ev) =>{
        if (!Number(ev.target.value))
            setEditMessage("Error! The step count contains non numerical inputs!")
        else{
            setStepsContent(Number(ev.target.value))
            setEditMessage(null)
        }
            
    }

    return (
        <div className="diary">
            <div className="date">{date.split("-").reverse().join("-")}</div>
            <p className="Edit-Message"> {EditMessage}</p>
            <div className="diary-container">
                <div className="diary-entry">
                    <div className='diary-title'>
                        Exercise
                    </div>
                    <textarea readOnly={canEditStyle.textAreaReadOnly} minLength="1" maxLength="300" className="content" onChange={(ev) => setExerciseContent(ev.target.value)}>{exerciseData}</textarea>
                </div>
                <div className="diary-entry">
                <div className='diary-title'>
                        Diet
                    </div>
                    <textarea readOnly={canEditStyle.textAreaReadOnly} minLength="1" maxLength="300" className="content" onChange={(ev) => setDietContent(ev.target.value)}>{dietData}</textarea>
                </div>
                <div className="diary-entry">
                <div className='diary-title'>
                        Steps
                    </div>
                    <textarea readOnly={canEditStyle.textAreaReadOnly} minLength="1" maxLength="7" className="content" onChange={(ev) => changeStepsValue(ev)}>{stepsData.toString()}</textarea>
                </div>
                <div className="diary-entry">
                <div className='diary-title'>
                        Sleep
                    </div>
                    <textarea readOnly={canEditStyle.textAreaReadOnly} minLength="1" maxLength="300" className="content" onChange={(ev) => setSleepContent(ev.target.value)}>{sleepData}</textarea>
                </div>
                <div className="edit-container">
                    <button className={canEditStyle.button} onClick={() => updateEntry()}>Submit changes</button>
                </div>
            </div>
        </div>
    );
}
