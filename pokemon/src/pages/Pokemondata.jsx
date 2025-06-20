import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PokemonData = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokemon data: ${response.status}`);
        }
        const data = await response.json();

        setPokemonData(data);
      } catch (err) {
        console.error("Error fetching Pokemon data:", err);
        setError(err.message || "Failed to load Pokemon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  const handlePrevious = () => {
    const currentId = parseInt(id);
    if (currentId > 1) {
      navigate(`/pokemondata/${currentId - 1}`);
    }
  };

  const handleNext = () => {
    const currentId = parseInt(id);
    navigate(`/pokemondata/${currentId + 1}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          </div>
          <p className="text-lg font-medium text-gray-700">
            Loading Pokemon data...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">!</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Error Loading Pokemon
            </h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">No Pokemon data found</p>
      </div>
    );
  }

  const abilities =
    pokemonData.abilities?.map((ability) => ability.ability.name) || [];
  const stats = pokemonData.stats || [];
  const types = pokemonData.types?.map((type) => type.type.name) || [];

  const formatStatName = (statName) => {
    return statName.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-200",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-green-400",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };
    return typeColors[type] || "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {pokemonData.name?.charAt(0).toUpperCase() +
              pokemonData.name?.slice(1)}
          </h1>
          <p className="text-lg text-gray-600">Pokemon #{pokemonData.id}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
              <div className="relative">
                <img
                  className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-lg"
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
                  alt={`${pokemonData.name} sprite`}
                  onError={(e) => {
                    e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                  }}
                />
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(
                        type
                      )}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">
                    Height
                  </h4>
                  <p className="text-xl font-semibold text-gray-800">
                    {pokemonData.height / 10} m
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">
                    Weight
                  </h4>
                  <p className="text-xl font-semibold text-gray-800">
                    {pokemonData.weight / 10} kg
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {abilities.map((ability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-medium"
                    >
                      {ability.charAt(0).toUpperCase() +
                        ability.slice(1).replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Base Stats
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {formatStatName(stat.stat.name)}
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          (stat.base_stat / 200) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={parseInt(id) <= 1}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
