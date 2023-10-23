import { useState, useEffect } from "react";
import httpcommon from "../API/http-common";

import {  useParams } from "react-router-dom";


const Pokemondata = () => {

  const [newData, setNewData] = useState("");
  const {id}=useParams();
  const abilities=newData.abilities?newData.abilities.map((ability)=>ability.ability.name):[];
  const move =newData.moves?newData.moves.map((item)=>item.move.name):[]
  const srMove = move.slice(0, 5);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpcommon.get(`/${id}`);
        setNewData(response.data);
        console.log(newData);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    fetchData();
  }, [id]);

  if (!newData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="m-12 bg-lime-300 rounded overflow-hidden shadow-lg flex justify-center items-center">
        <img
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${newData.id}.svg`}
          alt="Pokémon"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{newData.name}</div>

          <div className="mb-4">
            <h3 className="text-gray-700 text-lg font-semibold">
              General Info
            </h3>
            <p className=" text-base">Type: {}</p>
            <p className=" text-base">Height: {newData.height}</p>
            <p className=" text-base">Weight: {newData.weight}</p>
            <p className=" text-base">order: {newData.order}</p>
            <p className=" text-base">Ability: {abilities}</p>
            <p className=" text-base">move: {move}</p>
            <p className=" text-base">srMove: {srMove}</p>
            <p className=" text-base">rarity: {newData.rarity}</p>

            <p className=" text-base">Base Experience: {newData.base_experience}</p>
            <p className="text-base">Habitat: {}</p>
            <p className=" text-base">Weaknesses: {}</p>
            <p className=" text-base">Evolves from: {}</p>
            <p className=" text-base">Egg Group: {}</p>
            <p className=" text-base">Color: {}</p>
            <p className="text-base">Catch Rate: {}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-700 text-lg font-semibold">Base Stats</h3>
            <ul className="list-disc pl-6">
              <li>HP: {}</li>
              <li>Attack: {}</li>
              <li>Defense: {}</li>
              <li>Special Attack: {}</li>
              <li>Special Defense: {}</li>
              <li>Speed: {}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemondata;
