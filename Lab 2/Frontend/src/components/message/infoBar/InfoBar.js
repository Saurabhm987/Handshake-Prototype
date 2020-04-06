import React from 'react';
import onlineIcon from '../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ name }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{name}</h3>
    </div>
  </div>
);

export default InfoBar;