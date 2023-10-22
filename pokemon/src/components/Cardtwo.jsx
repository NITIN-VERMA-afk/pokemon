
function Cardtwo() {



  
  return (
    <>
    <div className="m-12 w-56 rounded overflow-hidden shadow-lg bg-white">
        <img src={newData.sprites.front_default} alt="Pokémon" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{newData.name}</div>

          <div className="mb-4">
            <h3 className="text-gray-700 text-lg font-semibold">General Info</h3>
            <p className="text-gray-700 text-base">Type: {newData.types[0].type.name}</p>
            <p className="text-gray-700 text-base">Height: {newData.height}</p>
            <p className="text-gray-700 text-base">Weight: {newData.weight}</p>
            <p className="text-gray-700 text-base">Ability: {newData.abilities[0].ability.name}</p>
            <p className="text-gray-700 text-base">Base Experience: {newData.base_experience}</p>
            <p className="text-gray-700 text-base">Habitat: {newData.habitat.name}</p>
            <p className="text-gray-700 text-base">Weaknesses: {newData.abilities[1].ability.name}</p>
            <p className="text-gray-700 text-base">Evolves from: {newData.abilities[2].ability.name}</p>
            <p className="text-gray-700 text-base">Egg Group: {newData.abilities[3].ability.name}</p>
            <p className="text-gray-700 text-base">Color: {newData.color.name}</p>
            <p className="text-gray-700 text-base">Catch Rate: {newData.capture_rate}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-700 text-lg font-semibold">Base Stats</h3>
            <ul className="list-disc pl-6">
              <li>HP: {newData.stats[0].base_stat}</li>
              <li>Attack: {newData.stats[1].base_stat}</li>
              <li>Defense: {newData.stats[2].base_stat}</li>
              <li>Special Attack: {newData.stats[3].base_stat}</li>
              <li>Special Defense: {newData.stats[4].base_stat}</li>
              <li>Speed: {newData.stats[5].base_stat}</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-700 text-lg font-semibold">Number and Type</h3>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #{newData.id}
            </span>
            {newData.types.map((type, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  
  );
}

export default Cardtwo;

