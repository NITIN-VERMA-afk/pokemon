import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ pokemon }) => {
  const navigate = useNavigate();
  
  const handleKnowMore = () => {
    navigate(`/pokemondata/${pokemon.img}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.img}.png`}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 capitalize mb-4">{pokemon.name}</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-600">HP</p>
            <p className="text-xl font-bold text-green-600">{pokemon.hp}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-600">Attack</p>
            <p className="text-xl font-bold text-red-600">{pokemon.attack}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-600">Defense</p>
            <p className="text-xl font-bold text-blue-600">{pokemon.defense}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-600">Type</p>
            <p className="text-lg font-bold text-purple-600 capitalize">{pokemon.type}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>Weight: {pokemon.weight / 10} kg</span>
          <span>Height: {pokemon.height / 10} m</span>
        </div>
        
        {/* Know More Button */}
        <button
          onClick={handleKnowMore}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          📖 Know More
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAllPokemon, setShowAllPokemon] = useState(false);

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

  
  const pokemonSuggestions = [
    "pikachu", "charizard", "blastoise", "venusaur", "alakazam", "machamp",
    "gengar", "dragonite", "mewtwo", "mew", "typhlosion", "feraligatr",
    "meganium", "lugia", "ho-oh", "celebi", "blaziken", "swampert",
    "sceptile", "rayquaza", "kyogre", "groudon", "garchomp", "lucario",
    "dialga", "palkia", "giratina", "arceus", "serperior", "emboar",
    "samurott", "reshiram", "zekrom", "kyurem", "greninja", "talonflame",
    "goodra", "xerneas", "yveltal", "zygarde", "decidueye", "incineroar",
    "primarina", "solgaleo", "lunala", "necrozma", "dragapult", "corviknight",
    "eevee", "vaporeon", "jolteon", "flareon", "espeon", "umbreon",
    "leafeon", "glaceon", "sylveon", "squirtle", "wartortle", "charmander",
    "charmeleon", "bulbasaur", "ivysaur", "caterpie", "butterfree", "weedle",
    "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate",
    "spearow", "fearow", "ekans", "arbok", "sandshrew", "sandslash",
    "nidoran", "nidoking", "nidoqueen", "clefairy", "clefable", "vulpix",
    "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish",
    "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth",
    "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck",
    "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl",
    "poliwrath", "abra", "kadabra", "machop", "machoke", "bellsprout"
  ];

  useEffect(() => {
    if (pokemonName.length > 0) {
      const filtered = pokemonSuggestions.filter(pokemon =>
        pokemon.toLowerCase().includes(pokemonName.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8)); 
      setShowSuggestions(filtered.length > 0 && pokemonName !== "");
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [pokemonName]);

  const searchPokemon = async (searchName = pokemonName) => {
    if (!searchName.trim()) {
      setError("Please enter a Pokémon name");
      return;
    }

    setIsLoading(true);
    setError("");
    setShowSuggestions(false);

    try {
     
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`);
      
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      
      setPokemon({
        name: data.name,
        img: data.id,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        type: data.types[0].type.name,
        weight: data.weight,
        height: data.height,
      });

      setPokemonChosen(true);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setError("Pokémon not found. Please check the spelling and try again.");
      setPokemonChosen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
    setError("");
    setShowDropdown(false); 
  };

  const handleInputFocus = () => {
    if (pokemonName) {
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowDropdown(true); 
    }
  };

  const handleInputBlur = () => {
   
    setTimeout(() => {
      setShowSuggestions(false);
      setShowDropdown(false);
      setShowAllPokemon(false);
    }, 200);
  };

  const toggleShowAll = () => {
    setShowAllPokemon(!showAllPokemon);
  };

  const handleSuggestionClick = (suggestion) => {
    setPokemonName(suggestion);
    setShowSuggestions(false);
    searchPokemon(suggestion);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
      
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🔍 Poképedia Search
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover detailed information about your favorite Pokémon. Search by name to explore 
            their stats, abilities, and characteristics from the comprehensive Poképedia database.
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="relative">
            <div className="relative">
              <label 
                htmlFor="pokemon-search" 
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Enter Pokémon Name:
              </label>
              <div className="relative">
                <input
                  id="pokemon-search"
                  type="text"
                  value={pokemonName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyPress={(e) => e.key === 'Enter' && searchPokemon()}
                  placeholder="e.g., Pikachu, Charizard, Mewtwo... (click here to see all)"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  disabled={isLoading}
                />
                
              
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />
                  </svg>
                </div>
                
            
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    <div className="px-3 py-2 bg-gray-50 border-b text-sm font-medium text-gray-600">
                      Search Results
                    </div>
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 capitalize flex items-center"
                      >
                        <span className="text-lg mr-2">🔍</span>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

            
                {showDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                    <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b text-sm font-medium text-gray-700">
                      🌟 Popular Pokémon - Click to select
                    </div>
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {(showAllPokemon ? pokemonSuggestions : pokemonSuggestions.slice(0, 20)).map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-2 text-left hover:bg-blue-50 transition-colors duration-150 capitalize rounded-lg flex items-center text-sm"
                        >
                          <span className="text-base mr-2">⚡</span>
                          {suggestion}
                        </button>
                      ))}
                    </div>
                    <div className="border-t bg-gray-50">
                      <button
                        onClick={toggleShowAll}
                        className="w-full px-3 py-3 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors duration-150 flex items-center justify-center"
                      >
                        {showAllPokemon ? (
                          <>
                            <span className="mr-2">🔼</span>
                            Show Less ({pokemonSuggestions.slice(0, 20).length} popular)
                          </>
                        ) : (
                          <>
                            <span className="mr-2">🔽</span>
                            Show More ({pokemonSuggestions.length - 20} more available)
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => searchPokemon()}
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                "🔍 Search Pokémon"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}
        </div>

     
        <div className="text-center">
          {!pokemonChosen && !isLoading && !error && (
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                Ready to Search!
              </h3>
              <p className="text-gray-500">
                Enter a Pokémon name above to discover its stats and information
              </p>
            </div>
          )}

          {pokemonChosen && !isLoading && (
            <div className="animate-fade-in">
              <Card pokemon={pokemon} />
            </div>
          )}
        </div>

     
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🌟 Popular Pokémon
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {pokemonSuggestions.slice(0, 12).map((pokemon, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(pokemon)}
                className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 capitalize text-sm"
              >
                {pokemon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
