'use client' 

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

export default function App({dateState, setDateState}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setDateState(date);
    setShowCalendar(false); // Hide the calendar after selecting a date
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const nullifyDate = () => {
    setDateState(null);
  };

  return (
    <div className='calendar-view'>
      <div className='calendar-buttons'>
        <button onClick={toggleCalendar}>
          {
            !dateState ? 
              <p>Select Specific Entry</p>
            : 
            <p>Selected Date: <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
          }
        </button>
        {dateState && <button onClick={nullifyDate}>Deselect Date</button>}
      </div>
      <></>
      {showCalendar && (
        <div className="calendar-modal">
          <div className="calendar-container">
            <Calendar 
              value={dateState}
              onChange={handleDateChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

