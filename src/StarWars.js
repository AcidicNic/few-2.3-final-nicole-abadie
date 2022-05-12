// StarWars
import { useState, useEffect } from 'react';
import CharacterInfo from './CharacterInfo';

function StarWars() {
  const [starWarsID, setStarWarsID] = useState(0);
  const [isValid, setIsValid] = useState('');
  const [character, setCharacter] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [characterComponents, setCharacterComponents] = useState([]);

  function fetchAPIResults() {
    if (starWarsID !== 0) {
      const isAlreadySaved = characterList.find(obj => {
        return obj.key === starWarsID;
      })
      console.log(isAlreadySaved)
      if (isAlreadySaved) {setCharacter(isAlreadySaved)}
      else {
        fetch(`https://swapi.dev/api/people/${starWarsID}/`)
        .then(res => res.json())
        .then(data => {
          Promise.all(data.films.map(filmUrl => fetch(filmUrl)
            .then(filmRes => filmRes.json())
            .then(filmJson => filmJson.title)
          )).then( filmTitles => {
              fetch(data.homeworld)
              .then(hwRes => hwRes.json())
              .then(hwData => {
              setCharacter({
                key: starWarsID,
                name: data.name,
                height: data.height,
                mass: data.mass,
                hair_color: data.hair_color,
                skin_color: data.skin_color,
                eye_color: data.eye_color,
                birth_year: data.birth_year,
                gender: data.gender,
                homeworld: hwData.name,
                films: filmTitles,
                isSaved: false,
              });
            });
          })
        });
      }
    } else {
      setCharacter(null);
    }
  }

  function handleSubmit(value) {
    const inputVal = Number(value);
    if (!isNaN(inputVal) && inputVal % 1 === 0) {
      if ((inputVal >= 1 && inputVal <= 16) || (inputVal >= 18 && inputVal <= 83)) {
        setStarWarsID(inputVal);
        setIsValid('is-valid');
        fetchAPIResults();
        return;
      }
    }
    setIsValid('is-invalid');
  }
  
  function saveCharacter(char) {
    const isAlreadySaved = characterList.find(obj => {
      return obj.key === char.key;
    })
    console.log(isAlreadySaved)
    if (isAlreadySaved) {
      setCharacterList(
        characterList.filter(obj => {
          return obj.key !== char.key;
        })
      );
    } else {
      setCharacterList([...characterList, {
        key: char.key,
        name: char.name,
        height: char.height,
        mass: char.mass,
        hair_color: char.hair_color,
        skin_color: char.skin_color,
        eye_color: char.eye_color,
        birth_year: char.birth_year,
        gender: char.gender,
        homeworld: char.homeworld,
        films: char.films,
        isSaved: true,
        saveOnclick: saveCharacter,
      }])
    }
  }

  useEffect(() => {
    setCharacterComponents(
      characterList.map((character) => {
        return <CharacterInfo key={character.key} props={character} />
      })
    );
  }, [characterList]);

  return (
    <div className="StarWars">
      <form className="input-group mb-3 w-50 mx-auto">
        <input 
          type="text" className={`form-control ${isValid}`} placeholder="Star Wars Character ID" aria-label="Star Wars Character ID" aria-describedby="submit-btn" 
          onChange={(e) => handleSubmit(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button" id="submit-btn" onClick={() => fetchAPIResults()}>Search</button>
      </form>
      {character && 
        <div className="Character">
          <div className="card">
            <div className="card-body">
              <p><b>Name:</b> {character.name}</p>
              <span><b>Height:</b> {character.height} cm</span><br/>
              <span><b>Mass:</b> {character.mass} kg</span><br/>
              <span><b>Hair Color:</b> {character.hair_color}</span><br/>
              <span><b>Skin Color:</b> {character.skin_color}</span><br/>
              <span><b>Eye Color:</b> {character.eye_color}</span><br/>
              <span><b>Birth Year:</b> {character.birth_year}</span><br/>
              <span><b>Homeworld:</b> {character.homeworld}</span><br/>
              <span><b>Films:</b> {character.films.join(', ')}</span><br/>
              <span><b>Gender:</b> {character.gender}</span><br/><br/>
              {character.isSaved ? <button type="button" className="btn btn-danger"
              onClick={() => {character.isSaved = false; saveCharacter(character);}}
              >Remove</button>: <button type="button" className="btn btn-outline-success"
              onClick={() => {character.isSaved = true; saveCharacter(character);}}
              >Add</button>}
            </div>
          </div>
        </div>
        }

      <hr/>

      <h2>Saved Characters</h2>
      {characterComponents}
    </div>
  );
}

export default StarWars;