import { useState, useEffect } from "react";
import axios from "axios";

const Library = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setLoading(false);
      getPokemon(response.data.results);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const getPokemon = async (results) => {
    try {
      const pokemonData = await Promise.all(
        results.map(async (item) => {
          const result = await axios.get(item.url);
          return result.data;
        })
      );

      setData(pokemonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-amber-500 p-4 text-white text-center font-bold text-2xl uppercase">
                {item.id}
              </div>
              <img
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`}
                alt={item.name}
                className="w-32 mx-auto mt-4"
              />

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-lg font-bold mb-3">pokemon</p>
                    <p>{item.name}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-lg font-bold mb-3">Weight</p>
                    <p>{item.weight}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-lg font-bold mb-3">Height</p>
                    <p>{item.height}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <div className="flex justify-center items-center mx-96">
        {prevUrl && (
          <button
            onClick={() => {
              setData([]);
              setUrl(prevUrl);
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-12"
          >
            Prev
          </button>
        )}
        {nextUrl && (
          <button
            onClick={() => {
              setData([]);
              setUrl(nextUrl);
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-12"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Library;
