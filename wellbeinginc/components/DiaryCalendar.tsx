'use client' 

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

export default function App() {
  const [dateState, setDateState] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setDateState(date);
    setShowCalendar(false); // Hide the calendar after selecting a date
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      <div onClick={toggleCalendar}>
        <p>Selected Date: <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
      </div>
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

