function Cardtwo({ pokemonData }) {
 
  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300'
  };

  // Safe data access with fallbacks
  const safeData = pokemonData || {};
  const name = safeData.name || 'Unknown';
  const id = safeData.id || 0;
  const image = safeData.sprites?.front_default || '/placeholder-pokemon.png';
  const types = safeData.types || [];
  const stats = safeData.stats || [];
  const abilities = safeData.abilities || [];
  const height = safeData.height || 0;
  const weight = safeData.weight || 0;
  const baseExperience = safeData.base_experience || 0;


  const formatHeight = (height) => `${(height / 10).toFixed(1)} m`;
  const formatWeight = (weight) => `${(weight / 10).toFixed(1)} kg`;


  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
     
      <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
        <div className="text-center">
          <img 
            src={image} 
            alt={`${capitalize(name)} sprite`}
            className="w-32 h-32 mx-auto object-contain drop-shadow-lg"
            onError={(e) => {
              e.target.src = '/placeholder-pokemon.png';
            }}
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
            {capitalize(name)}
          </h2>
          <div className="flex justify-center items-center space-x-2">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              #{String(id).padStart(3, '0')}
            </span>
            {types.map((type, index) => (
              <span
                key={index}
                className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white px-3 py-1 rounded-full text-sm font-semibold capitalize`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

    
      <div className="p-6 space-y-6">
       
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Basic Info
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-600">Height</span>
              <p className="text-gray-800 font-semibold">{formatHeight(height)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-600">Weight</span>
              <p className="text-gray-800 font-semibold">{formatWeight(weight)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg col-span-2">
              <span className="font-medium text-gray-600">Base Experience</span>
              <p className="text-gray-800 font-semibold">{baseExperience}</p>
            </div>
          </div>
        </div>

        {/* Abilities */}
        {abilities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Abilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {abilities.map((ability, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                >
                  {ability.ability.name.replace('-', ' ')}
                  {ability.is_hidden && (
                    <span className="ml-1 text-xs opacity-75">(Hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

 
        {stats.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Base Stats
            </h3>
            <div className="space-y-3">
              {stats.map((stat, index) => {
                const statName = stat.stat.name.replace('-', ' ').toUpperCase();
                const statValue = stat.base_stat;
                const percentage = Math.min((statValue / 200) * 100, 100);
                
                return (
                  <div key={index} className="flex items-center">
                    <div className="w-20 text-xs font-medium text-gray-600 uppercase">
                      {statName}
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-10 text-sm font-semibold text-gray-800 text-right">
                      {statValue}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cardtwo;

