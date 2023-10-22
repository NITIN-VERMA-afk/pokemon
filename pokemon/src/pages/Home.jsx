import { useState } from "react";

import Card from "../components/Card";
import httpcommon from "../API/http-common";

const Home = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
    weight: "",
    height: "",
  });
  const searchPokemon = () => {
    setTimeout(() => {
      httpcommon
        .get(`${pokemonName}`)
        .then((response) => {
          setPokemon({
            name: pokemonName,

            img: response.data.id,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
            weight: response.data.weight,
            height: response.data.height,
          });

          console.log(response);
          setPokemonChosen(true);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon data:", error);
        });
    }, 2000);
  };

  return (
    <div className="bg-purple-400">
      <p className="text-3xl text-center bg-violet-500 text-white">
        If youre interested in Pokémon, then Pokepedia is the ideal place for
        you to learn more about your favorite Pokémon. You can search for
        information about your favorite Pokémon here.
      </p>

      <div className="flex  flex-col justify-center items-center mt-4">
        <form action="post">
          <label className="text-white text-3xl" htmlFor="first_name">
            Enter your fav pokemon name:
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
            placeholder="pokemon"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
            required
          />
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={searchPokemon}
          >
            search
          </button>
        </form>
        <div className="m-24">
          {!pokemonChosen ? (
            <h1 className="text-white text-3xl">plz chose a pokemon</h1>
          ) : (
            <>
              <Card
                pokemon={{
                  name: pokemon.name,
                  img: pokemon.img,
                  type: pokemon.type,
                  attack: pokemon.attack,
                  defence: pokemon.defense,
                  hp: pokemon.hp,
                  weight: pokemon.weight,
                  height: pokemon.height,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
