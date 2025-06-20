/* eslint-disable react/prop-types */

const Cardthree = (props) => {
  const { name, img, attack, defence, type, hp, weight, height } = props.items;


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

 
  const stats = [
    { label: 'HP', value: hp, icon: '❤️', color: 'text-red-600' },
    { label: 'Attack', value: attack, icon: '⚔️', color: 'text-orange-600' },
    { label: 'Defence', value: defence, icon: '🛡️', color: 'text-blue-600' }
  ];

  const physicalStats = [
    { label: 'Height', value: formatHeight(height), icon: '📏' },
    { label: 'Weight', value: formatWeight(weight), icon: '⚖️' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-sm mx-auto">
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
      </div>

     
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="text-center">
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${img}.svg`}
            alt={`${capitalize(name)} sprite`}
            className="w-32 h-32 mx-auto object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.src = '/placeholder-pokemon.png';
            }}
          />
        </div>
      </div>

    
      <div className="p-6 space-y-6">
      
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-xl mr-2">⚡</span>
            Battle Stats
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors duration-200">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                  {stat.label}
                </div>
                <div className={`text-lg font-bold ${stat.color}`}>
                  {stat.value || 0}
                </div>
              </div>
            ))}
          </div>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-xl mr-2">📊</span>
            Physical Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {physicalStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-2xl opacity-70">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-800">{hp || 0}</div>
              <div className="text-gray-600">HP</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{attack || 0}</div>
              <div className="text-gray-600">ATK</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{defence || 0}</div>
              <div className="text-gray-600">DEF</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{type || 'Unknown'}</div>
              <div className="text-gray-600">TYPE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardthree;