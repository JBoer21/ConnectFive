import React from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from './timer.jsx';

const Header = () => {
  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>Connect Five</h1>
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CountdownTimer style={{}} />
      </div> */}
    </header>
  );
};

export default Header;