import React, { useState, useEffect } from 'react';
import moment from 'moment';
import timeConvert from 'humanize-duration';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Meeting = ({ data, index, filter }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="meeting"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="meeting__left">
        <div className="meeting__index">{index + 1}.</div>
        <div className="meeting__date">
          {moment(data.date, 'DD-MM-YYYY').format('Do MMMM, YYYY')}
        </div>
      </div>
      <div className="meeting__center">
        <div className="meeting__time">
          {moment(data.time, 'hh:mm:ss').format('h:mm a')}
        </div>
        <div className="meeting__fromnow">
          {moment(data.time, 'hh:mm:ss').fromNow()}
        </div>
      </div>
      <div className="meeting__right">
        <div
          className={`meeting__duration ${
            hovered ? 'meeting__duration--hovered' : ''
          }`}
        >
          {timeConvert(
            moment.duration(data.duration, 'minutes').asMilliseconds()
          )}
        </div>
        <div className="meeting__controls">
          <div
            className="meeting__controls__btn"
            onClick={() => {
              axios.get(`http://localhost:5000/delete/${filter}/${index}`);
            }}
          >
            <DeleteOutlined />
          </div>
          <div className="meeting__controls__btn">
            <EditOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
