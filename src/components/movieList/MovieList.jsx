import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMovies,
  getAllShows,
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../redux/moviesSlice/moviesSlice';
import MovieCard from '../movieCard/MovieCard';
import './movieList.scss';

const MovieList = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  useEffect(() => {
    dispatch(fetchAsyncMovies('Marvel'));
    dispatch(fetchAsyncShows('Marvel'));
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (term.trim()) {
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncShows(term));
      setTerm('');
    }
  };

  const renderMovies = (movies.Response === 'True' ? (
    <div className="movie-list">
      {movies.Search.map((movie) => (
        <MovieCard key={movie.imdbID} data={movie} />
      ))}
    </div>
  ) : (
    <div className="movies-error">
      {movies.Error || 'No movies found'}
    </div>
  ));

  const renderShows = (shows.Response === 'True' ? (
    <div className="shows-list">
      {shows.Search.map((show) => (
        <MovieCard key={show.imdbID} data={show} />
      ))}
    </div>
  ) : (
    <div className="shows-error">
      {shows.Error || 'No shows found'}
    </div>
  ));

  return (
    <div className="movie-wrapper">
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              id="movie-search"
              name="movie-search"
              type="text"
              placeholder="Movies and Shows"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              aria-label="Search Movies and Shows"
            />
            <button type="submit" aria-label="Search">
              <i className="fa fa-search" />
            </button>
          </div>
        </form>
      </div>

      <div className="movie-list">
        <h1>Movies</h1>
        {renderMovies}
      </div>

      <div className="shows-list">
        <h1>Shows</h1>
        {renderShows}
      </div>
    </div>
  );
};

export default MovieList;
