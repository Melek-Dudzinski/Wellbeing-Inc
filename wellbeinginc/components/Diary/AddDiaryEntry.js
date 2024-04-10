import { useState } from "react";
import "./AddDiaryEntry.css";
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';

const AddDiaryEntry = ({isOpen, onDismiss,today,user}) => {

    const [createMessage,setCreateMessage] = useState(null)
    
    const createEntry = async (formData) => {
        const ex = formData.get("exercise");
        const di = formData.get("diet");
        const st = Number(formData.get("steps"));
        const sl = formData.get("sleep");
        console.log(ex)
        console.log(di)
        console.log(st)
        console.log(sl)
        if (!ex || !di || !st || !sl)
        {
            setCreateMessage('Error! Some fields might be empty!');
            return;
        }
        const {error} = await SupabaseClient().from('testDiaryEntry').insert({date:today, employeeID: user, exerciseSection: ex, dietSection: di, stepsSection: st,sleepSection: sl,})
        if (error)
        {
            setCreateMessage('Error! Could not create new entry');
        }
        else redirect("/diary")
    }

    if (!isOpen) return null;
    return(
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <button className="close-button" onClick={onDismiss}>X</button>
                </div>
                <div id="entry-date">
                    <h1>{today.split("-").reverse().join("-")}</h1>
                    <p>{createMessage}</p>
                </div>
                <form method="dialog">
                    <label>Exercise Section</label>
                    <input type="text" name="exercise" required minLength="1" maxLength="300"></input>
                    <label>Diet Section</label>
                    <input type="text" name="diet" required minLength="1" maxLength="300"></input>
                    <label>Steps Section</label>
                    <input type="number" name="steps" required minLength="1" maxLength="7"></input>
                    <label>Sleep Section</label>
                    <input type="text" name="sleep" required minLength="1" maxLength="300"></input>
                    <button type="submit" formAction={createEntry}>Create</button>
                </form>
            </div>
        </div>
    );
};

export default AddDiaryEntry;