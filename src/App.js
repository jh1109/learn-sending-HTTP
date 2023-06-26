import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // async 함수는 반드시 프라미스를 반환한다.
  async function fetchMoviesHandler() {
    setIsLoading(true);

    // 다른 곳에서 발생할 수도 있는 error 상태 초기화
    setError(null);

    // fetch(url, [options])
    // options에 아무것도 넘기지 않으면 기본 GET 메서드로 진행됨
    // fetch()를 호출하면 네트워크 요청을 보내고 promise가 반환됨

    // await를 만나면 프라미스를 처리할 때 까지 기다림
    // await는 promise.then의 기능을 함
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      // fetch에서는 error가 발생하면 발생했을 때가 아니라,
      // 해당 값을 사용해서 다른 것을 하려고 할 때 오류를 알 수 있다.
      // 따라서 중간 중간 error를 catch 할 수 있도록 직접 코드로 error를 만들어줘야 한다.
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

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
    } catch (error) {
      // 위에서 만들어준 error message
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
