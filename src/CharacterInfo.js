// CharacterInfo
// import { useState } from 'react';

function CharacterInfo(props) {
  props = props.props

  return (
    <div className="Character">
      <div className="card">
        <div className="card-body">
          <p>
            <b>Name:</b> {props.name}<br/>
            <b>ID:</b> {props.key}
          </p>
          <span><b>Height:</b> {props.height} cm</span><br/>
          <span><b>Mass:</b> {props.mass} kg</span><br/>
          <span><b>Hair Color:</b> {props.hair_color}</span><br/>
          <span><b>Skin Color:</b> {props.skin_color}</span><br/>
          <span><b>Eye Color:</b> {props.eye_color}</span><br/>
          <span><b>Birth Year:</b> {props.birth_year}</span><br/>
          <span><b>Gender:</b> {props.gender}</span><br/>
          <span><b>Homeworld:</b> {props.homeworld}</span><br/>
          <span><b>Films:</b> {props.films.join(', ')}</span><br/>
        </div>
      </div>
    </div>
  );
}

export default CharacterInfo;