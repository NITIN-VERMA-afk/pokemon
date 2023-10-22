/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";


const Card = (props) => {
  const navigate =useNavigate();
  const { name,img, attack,defence,type,hp,weight,height } = props.pokemon;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
      <div className="bg-amber-500 p-4 text-white text-center font-bold text-2xl">
        {name}
      </div>
      
      <img
        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${img}.svg`}
        alt={name}
        className="w-32 mx-auto mt-4"
      />
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-lg font-bold m-3">Type</p>
            <p>{type}</p>
          </div>
          <div>
            <p className="text-lg font-bold m-3">Attack</p>
            <p>{ attack}</p>
          </div>
          <div>
            <p className="text-lg font-bold m-3">Defence</p>
            <p>{defence}</p>
          </div>
        </div>
        
        <div className="flex justify-between" >
        <div className="mt-4">
          <p className="text-lg font-bold">HP</p>
          <p>{hp}</p>
       
        </div>
        <div className="mt-4">
          <p className="text-lg font-bold">weight</p>
          <p>{weight}</p>

        </div>
        <div className="mt-4">
          <p className="text-lg font-bold">height</p>
          <p>{height}</p>
        </div>

        </div>
       
        <button onClick={()=>navigate('/Pokemondata')} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 m-5">Know More</button>
      </div>
    </div>
  );
};

export default Card;
