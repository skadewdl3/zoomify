import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Landing from './Landing';
import Navbar from './Navbar';

const App = () => {
  const [meetingArr, setMeetingArr] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/refresh-meetings')
      .then(res => setMeetingArr(res.data));
    setTimeout(() => {
      axios
        .get('http://localhost:5000/refresh-meetings')
        .then(res => setMeetingArr(res.data));
    }, 5000);
  }, []);

  return (
    <>
      <Navbar />
      <Landing meetingArr={meetingArr} />
    </>
  );
};

export default App;
