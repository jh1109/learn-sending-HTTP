import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    // fetch(url, [options])
    // options에 아무것도 넘기지 않으면 기본 GET 메서드로 진행됨
    // fetch()를 호출하면 네트워크 요청을 보내고 promise가 반환됨
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        console.log(response);
        return response.json();
        // response의 내장 method: json(). promise를 반환함
        // JSON response 본문을 자바스크립트 형태의 데이터로 바꿔주는 함수
      })
      .then((data) => {
        console.log(data.results);
        // 원하는 값만 가져오기
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        console.log(transformedMovies);
        setMovies(transformedMovies);
      });
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
