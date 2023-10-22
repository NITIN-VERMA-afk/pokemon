/* eslint-disable react/prop-types */



const Cardthree = (props) => {
 
  const { name,img, attack,defence,type,hp,weight,height } = props.items;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
       
        
      </div>
    </div>
  );
};

export default Cardthree;