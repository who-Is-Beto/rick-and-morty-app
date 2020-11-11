import React from 'react'


export default function CharacterCard(props) {
  const { character } = props
  return (
    <div className="CharacterCard" style={{ backgroundImage: `url(${character.image})` }}>
      <div className="CharacterCard__name-container" >
        {character.name}
      </div>
    </div>
  )
}