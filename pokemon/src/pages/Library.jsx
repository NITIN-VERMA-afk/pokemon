import { useState, useEffect, useCallback } from "react";

const Library = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

 
  const fetchPokemonData = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setTotalCount(data.count);
      
     
      const detailedPokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          try {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) {
              throw new Error(`Failed to fetch ${pokemon.name}`);
            }
            return await pokemonResponse.json();
          } catch (err) {
            console.error(`Error fetching ${pokemon.name}:`, err);
            return null;
          }
        })
      );
      
   
      const validPokemonData = detailedPokemonData.filter(pokemon => pokemon !== null);
      setPokemonData(validPokemonData);
      setFilteredData(validPokemonData);
      
    } catch (err) {
      console.error("Error fetching Pokemon data:", err);
      setError(err.message || "Failed to fetch Pokemon data");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    const filtered = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm, pokemonData]);

  useEffect(() => {
    fetchPokemonData(currentUrl);
  }, [currentUrl, fetchPokemonData]);

  
  const handlePrevious = () => {
    if (prevUrl) {
      setCurrentUrl(prevUrl);
      setCurrentPage(prev => prev - 1);
      setPokemonData([]);
    }
  };

  const handleNext = () => {
    if (nextUrl) {
      setCurrentUrl(nextUrl);
      setCurrentPage(prev => prev + 1);
      setPokemonData([]);
    }
  };

 
  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-400 text-white',
      fire: 'bg-red-500 text-white',
      water: 'bg-blue-500 text-white',
      electric: 'bg-yellow-400 text-black',
      grass: 'bg-green-500 text-white',
      ice: 'bg-blue-200 text-black',
      fighting: 'bg-red-700 text-white',
      poison: 'bg-purple-500 text-white',
      ground: 'bg-yellow-600 text-white',
      flying: 'bg-indigo-400 text-white',
      psychic: 'bg-pink-500 text-white',
      bug: 'bg-green-400 text-black',
      rock: 'bg-yellow-800 text-white',
      ghost: 'bg-purple-700 text-white',
      dragon: 'bg-indigo-700 text-white',
      dark: 'bg-gray-800 text-white',
      steel: 'bg-gray-500 text-white',
      fairy: 'bg-pink-300 text-black'
    };
    return typeColors[type] || 'bg-gray-400 text-white';
  };

 
  const LoadingGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div className="bg-gray-200 h-8"></div>
          <div className="p-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );


  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchPokemonData(currentUrl)}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Poképedia</h1>
              <p className="text-gray-600">
                Showing {filteredData.length} of {totalCount} Pokémon
                {searchTerm && ` (filtered by "${searchTerm}")`}
              </p>
            </div>
            
          
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-80 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingGrid />
        ) : (
          <>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredData.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                 
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">
                        #{pokemon.id.toString().padStart(3, '0')}
                      </span>
                      <div className="flex space-x-1">
                        {pokemon.types?.slice(0, 2).map((type, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type.type.name)}`}
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

               
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                    <div className="relative">
                      <img
                        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        alt={pokemon.name}
                        className="w-32 h-32 mx-auto object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                        }}
                      />
                    </div>
                  </div>

              
                  <div className="p-6 pt-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize text-center">
                      {pokemon.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-xs font-medium text-blue-600 mb-1">Height</p>
                        <p className="text-lg font-bold text-blue-800">
                          {(pokemon.height / 10).toFixed(1)}m
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-xs font-medium text-green-600 mb-1">Weight</p>
                        <p className="text-lg font-bold text-green-800">
                          {(pokemon.weight / 10).toFixed(1)}kg
                        </p>
                      </div>
                    </div>

                 
                    <div className="mt-4">
                      <p className="text-xs font-medium text-gray-600 mb-2">Abilities</p>
                      <div className="flex flex-wrap gap-1">
                        {pokemon.abilities?.slice(0, 2).map((ability, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs capitalize"
                          >
                            {ability.ability.name.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

        
            {filteredData.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pokémon found</h3>
                <p className="text-gray-600">Try adjusting your search term</p>
              </div>
            )}

        
            {!searchTerm && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-lg p-6">
                <div className="text-sm text-gray-600">
                  Page {currentPage} • Showing {pokemonData.length} Pokémon
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handlePrevious}
                    disabled={!prevUrl || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!nextUrl || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;
