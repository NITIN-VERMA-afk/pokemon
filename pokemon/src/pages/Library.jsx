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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {loading ? (
        <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
          Loading...
        </button>
      ) : (
        <>
          {data.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-amber-500 p-4 text-white text-center font-bold text-2xl uppercase">
                {item.id}
              </div>
              <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`} alt={item.name} className="w-32 mx-auto mt-4" />
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-lg font-bold mb-3">Pokemon</p>
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
      <div className="flex justify-center items-center w-full mt-4 mb-6">
        {prevUrl && (
          <button
            onClick={() => {
              setData([]);
              setUrl(prevUrl);
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
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
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Library;

