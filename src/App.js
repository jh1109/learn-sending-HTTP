import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  // async 함수는 반드시 프라미스를 반환한다.
  async function fetchMoviesHandler() {
    // fetch(url, [options])
    // options에 아무것도 넘기지 않으면 기본 GET 메서드로 진행됨
    // fetch()를 호출하면 네트워크 요청을 보내고 promise가 반환됨

    // await를 만나면 프라미스를 처리할 때 까지 기다림
    // await는 promise.then의 기능을 함
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
