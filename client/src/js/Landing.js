import React, { useState, useEffect } from 'react';

import Meeting from './Meeting';

const Landing = meetingArr => {
  const [arr, setArr] = useState([]);
  const [filter, setFilter] = useState('current');

  useEffect(() => {
    console.log(meetingArr);
    let temp = meetingArr.meetingArr;
    setArr(temp[filter]);
    console.log(temp[filter]);

    document
      .querySelectorAll('.meeting__filter--active')
      .forEach(cur => cur.classList.remove('meeting__filter--active'));
    document
      .querySelector(`.meeting__filter--${filter}`)
      .classList.add('meeting__filter--active');

    document
      .querySelectorAll('.meeting__filters--inactive')
      .forEach(cur => cur.classList.remove('meeting__filters--inactive'));
  }, [filter, meetingArr]);

  return (
    <div className="landing">
      <div className="landing__meetings">
        <div className="landing__meetings__controls">
          <div className="landing__meetings__filters">
            <div
              className="meeting__filter meeting__filter--past"
              onClick={() => setFilter('past')}
            >
              Past
            </div>
            <div
              className="meeting__filter meeting__filter--current"
              onClick={() => setFilter('current')}
            >
              Current
            </div>
            <div
              className="meeting__filter meeting__filter--future"
              onClick={() => setFilter('future')}
            >
              Future
            </div>
          </div>
        </div>
        <div className="landing__meetings__container">
          {arr &&
            arr.map((cur, index) => (
              <Meeting data={cur} index={index} key={index} filter={filter} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
