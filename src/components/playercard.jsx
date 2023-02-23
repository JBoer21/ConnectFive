import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import './playercard.css';

const RenderCard = (data, show) => {
  if (show === 'false') {
    return (
      <div className="box black-border" style={{ margin: '10px'}}>
        <div className="card" style={{ width: '150px', justifyContent: 'center' }}>
          <div className="card-body">
            <div className="card-title"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="box black-border" style={{ margin: '10px'}}>
        <div className="card" style={{ width: '150px', justifyContent: 'center' }}>
        <img className="img-class" src={data[1]} alt="player" />
          <div className="card-body">
            <br></br>
            <div className="card-title">{data[0]}</div>
          </div>
        </div>
      </div>
    );
  }
};

function PlayerCard({ data, show }) {
  return (
    <Flipper flipKey={show}>
      <Flipped flipId="player-card">
        {RenderCard(data, show)}
      </Flipped>
    </Flipper>
  );
}

export default PlayerCard;