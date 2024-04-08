import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./AddDiaryEntry.css";
import { redirect } from "next/navigation";

const AddDiaryEntry = ({isOpen, onDismiss,today,user}) => {

    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');
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
        const {error} = await supabase.from('testDiaryEntry').insert({date:today, employeeID: user, exerciseSection: ex, dietSection: di, stepsSection: st,sleepSection: sl,})
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
                    <h1>{today}</h1>
                    <p>{createMessage}</p>
                </div>
                <form method="dialog">
                    <div className="diary-entry">
                        <label>Exercise Section</label>
                        <input type="text" name="exercise" required minLength="1" maxLength="300"></input>
                    </div>
                    <div className="diary-entry">
                        <label>Diet Section</label>
                        <input type="text" name="diet" required minLength="1" maxLength="300"></input>
                    </div>
                    <div className="diary-entry">
                        <label>Steps Section</label>
                        <input type="number" name="steps" required minLength="1" maxLength="7"></input>
                    </div>
                    <div className="diary-entry">
                        <label>Sleep Section</label>
                        <input type="text" name="sleep" required minLength="1" maxLength="300"></input>
                    </div>
                    <div id="diary-save-button">
                        <button type="submit" formAction={createEntry}>Create Entry</button>
                    </div>
                
                </form>
            </div>
        </div>
    );
};

export default AddDiaryEntry;