import React, { useContext, useEffect, useState } from "react";
import UserContext from '../utils/UserContext'
import CharacterCreateBtn from "../components/CreateCharacterBtn";
import { useHistory } from "react-router-dom";
import characterAPI from "../utils/characterAPI";
import CharacterContext from '../utils/CharacterContext'


const getThatCharacter = (e) => {
// const characterContext = useContext(CharacterContext)
  console.log("FUNCTION FIRED")
  console.log(e.target)
  characterAPI.getCharacter(e.target.value)
    .then(res => {
      console.log(res)

      const parsedChar = JSON.parse(res.data.characterData)
      console.log(parsedChar)



      // history.push("/charactersheet")
    })
}


function Card({ character, onClick }) {



  const history = useHistory()
  const parsedChars = JSON.parse(character.characterData)

  return (
    <div>
      <img
        value={character._id}
        src={"images/download.png"}>
      </img>
      <button className="btn-primary rosterCharBtn" value={character._id} onClick={onClick}>
        {parsedChars.c_name}, the {parsedChars.race} {parsedChars.characterClass}

      </button>
    </div>
  );
}


// Add the createCharBtn to Roster
function Roster() {



  const { update, _id } = useContext(UserContext);
  // console.log(_id)
  const history = useHistory()

  // characterAPI.getCharacters(_id)
  //   .then(data => {
  //     console.log(data)
  //     var characters = data.data.characters;

  //     characters = characters.map(e => {
  //       return JSON.parse(e.characterData)
  //     })
  //     console.log(characters)

  //   })

  // characterAPI.createCharacter(_id, newCharacter)
  // .then(data => {
  //   console.log(data)
  // })
  const [charList, setCharList] = useState([])
  useEffect(() => {
    if (!_id) {
      //reroute to home page
      history.push("/");
    }
    //else, get users character roster


    characterAPI.getCharacters(_id)
      .then(res => {
        setCharList(res.data.characters)
      })

  }, [])

  return (
    <div>
      <div className="row my-3">
        <CharacterCreateBtn />
      </div>
      <div className="container">
        <div className="row">
          {charList.map((char) => (
            <div className="rosterSpot col-xs-12 col-sm-6 col-md-4 text-center">
              <Card
                character={char}
                onClick={getThatCharacter}
              />
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default Roster;
