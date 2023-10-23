/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";




const Card = (props) => {
  const Navigate =useNavigate();
  const { name,img, attack,defence,type,hp,weight,height} = props.pokemon;

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
       
        <button onClick={() => Navigate(`/pokemondata/${img}`)} type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Know More <AiOutlineArrowRight/></button>
      </div>
    </div>
  );
};

export default Card;
