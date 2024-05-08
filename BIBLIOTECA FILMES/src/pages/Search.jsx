import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);

    // transformando dados em array de objetos JavaScript
    const data = await res.json();

    // pegando os dados dos filmes
    setMovies(data.results);
  };

  // executa apenas quando muda o query(item pesquisado)
  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;

    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        {/* query -> texto que o usuario esta buscando */}
        Resultados para: <span className="query-text">{query}</span>
      </h2>

      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}

        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
