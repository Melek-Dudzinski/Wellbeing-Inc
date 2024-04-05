"use client"
import React, { useState } from 'react';

export default function DiaryForm() {
    const [date, setDate] = useState('');
    const [sleep, setSleep] = useState('');
    const [diet, setDiet] = useState('');
    const [exercise, setExercise] = useState('');
    const [steps, setSteps] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleAddEntry = () => {
        // add the entry to supabase
        console.log('Date:', date);
        console.log('Sleep:', sleep);
        console.log('Diet:', diet);
        console.log('Exercise:', exercise);
        console.log('Steps:', steps);
    
    };

    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div>
            <h2>Add Diary Entry</h2>
            {showForm ? (
                <div>
                    <div>
                        <label>Date:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Sleep:</label>
                        <input type="text" value={sleep} onChange={(e) => setSleep(e.target.value)} />
                    </div>
                    <div>
                        <label>Diet:</label>
                        <input type="text" value={diet} onChange={(e) => setDiet(e.target.value)} />
                    </div>
                    <div>
                        <label>Exercise:</label>
                        <input type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
                    </div>
                    <div>
                        <label>Steps:</label>
                        <input type="text" value={steps} onChange={(e) => setSteps(e.target.value)} />
                    </div>
                    <button onClick={handleAddEntry}>Add</button>
                    <button onClick={handleCloseForm}>Cancel</button>
                </div>
            ) : (
                <button onClick={handleOpenForm}>Add Entry</button>
            )}
        </div>
    );
}
