
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const Card = (props) => {
  const navigate = useNavigate();
  const { name, img, attack, defence, type, hp, weight, height } = props.pokemon;

  
  const typeColors = {
    normal: 'from-gray-400 to-gray-500',
    fire: 'from-red-400 to-red-600',
    water: 'from-blue-400 to-blue-600',
    electric: 'from-yellow-400 to-yellow-500',
    grass: 'from-green-400 to-green-600',
    ice: 'from-blue-300 to-cyan-400',
    fighting: 'from-red-600 to-red-800',
    poison: 'from-purple-400 to-purple-600',
    ground: 'from-yellow-600 to-amber-700',
    flying: 'from-indigo-400 to-purple-500',
    psychic: 'from-pink-400 to-purple-500',
    bug: 'from-green-400 to-lime-500',
    rock: 'from-yellow-800 to-amber-900',
    ghost: 'from-purple-700 to-indigo-800',
    dragon: 'from-indigo-700 to-purple-800',
    dark: 'from-gray-800 to-black',
    steel: 'from-gray-500 to-gray-600',
    fairy: 'from-pink-300 to-pink-400'
  };

  
  const getTypeGradient = (pokemonType) => {
    const normalizedType = pokemonType?.toLowerCase();
    return typeColors[normalizedType] || 'from-amber-400 to-amber-600';
  };


  const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1) || '';
  const formatHeight = (h) => h ? `${(h / 10).toFixed(1)} m` : '0 m';
  const formatWeight = (w) => w ? `${(w / 10).toFixed(1)} kg` : '0 kg';


  const handleKnowMore = () => {
    try {
      navigate(`/pokemondata/${img}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 max-w-sm mx-auto cursor-pointer">
      {/* Header with Pokemon Name */}
      <div className={`bg-gradient-to-r ${getTypeGradient(type)} p-6 text-white text-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-wide drop-shadow-md">
            {capitalize(name)}
          </h2>
          <div className="mt-2">
            <span className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {type}
            </span>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
      </div>

    
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="text-center">
          <div className="relative">
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${img}.svg`}
              alt={`${capitalize(name)} sprite`}
              className="w-32 h-32 mx-auto object-contain drop-shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl"
              onError={(e) => {
                e.target.src = '/placeholder-pokemon.png';
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

     
      <div className="p-6 space-y-6">
       
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 text-center border border-red-200">
            <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">HP</div>
            <div className="text-lg font-bold text-red-700">{hp || 0}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 text-center border border-orange-200">
            <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">Attack</div>
            <div className="text-lg font-bold text-orange-700">{attack || 0}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center border border-blue-200">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Defence</div>
            <div className="text-lg font-bold text-blue-700">{defence || 0}</div>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">Height</div>
                <div className="text-sm font-bold text-indigo-800">{formatHeight(height)}</div>
              </div>
              <div className="text-2xl">📏</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">Weight</div>
                <div className="text-sm font-bold text-purple-800">{formatWeight(weight)}</div>
              </div>
              <div className="text-2xl">⚖️</div>
            </div>
          </div>
        </div>

       
        <div className="pt-4">
          <button
            onClick={handleKnowMore}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg hover:shadow-xl group"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Learn More</span>
              <AiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </button>
        </div>

       
        <div className="bg-gray-50 rounded-lg p-3 border-t-4 border-indigo-500">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <div className="text-center">
              <div className="font-bold text-gray-800">{capitalize(type)}</div>
              <div>Type</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-800">{((hp + attack + defence) / 3).toFixed(0)}</div>
              <div>Avg Stats</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-800">#{img}</div>
              <div>ID</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
