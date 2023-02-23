import React from 'react';

const StartButtons = (soccerClick, nbaClick) => {
    return (
      <div>
        <main>
        <button onClick = {soccerClick}>Soccer</button>
        <button onClick = {nbaClick}>NBA</button>
        <button >NFL</button>
        </main>
      </div>
    );
  }
  
  export default StartButtons;