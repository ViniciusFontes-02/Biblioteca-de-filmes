import "./MoviesGrid.css";

import { useState, useEffect } from "react";

import MovieCard from "../components/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);

    // transformando dados em array de objetos JavaScript
    const data = await res.json();

    // pegando os dados dos filmes
    setTopMovies(data.results);
  };

  // executa apenas quando a pagina é carregada
  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>

      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}

        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
