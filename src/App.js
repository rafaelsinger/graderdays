import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import Rating from './Rating'

function App() {
const [value, onChange] = useState(new Date());

  return (
    <div className="App">
      {/* <Calendar onChange={onChange} value={value} defaultView={'day'}/> */}
      <Rating />
    </div>
  );
}

export default App;
