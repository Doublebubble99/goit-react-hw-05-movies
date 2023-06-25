import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import getMovieDetails from 'services/getMovieDetails';

export default function MovieDetails() {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [average, setAverage] = useState(0);
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState('');
  const [picture, setPicture] = useState('');
  const { movieId } = useParams();
  useEffect(() => {
    getMovieDetails(movieId).then(movie => {
      setPicture(movie.poster_path);
      setTitle(movie.title);
      setDate(movie.release_date.slice(0, 4));
      setAverage((movie.vote_average * 10).toFixed(0));
      setDescription(movie.overview);
      setGenres(movie.genres.map(genre => genre.name).join(', '));
    });
  }, [movieId]);
  return (
    <div>
      <NavLink to={backLink.current}>⬅️Go back</NavLink>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/original${picture}`}
              alt={title}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">
                {title}({date})
              </h2>
              <p className="card-text">User score: {average}%</p>
              <h2 className="card-title">Overview</h2>
              <p className="card-text">{description}</p>
              <h2 className="card-title">Genres</h2>
              <p className="card-text">{genres}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="card-title">Additional information</h2>
        <ul className="list-group nav">
          <li
            className="list-group-item nav-item list-group-item-action"
            aria-current="true"
          >
            <NavLink
              to={`/movies/${movieId}/cast`}
              className="nav-link"
              aria-current="page"
            >
              Cast
            </NavLink>
          </li>
          <li
            className="list-group-item nav-item list-group-item-action"
            aria-current="true"
          >
            <NavLink
              to={`/movies/${movieId}/reviews`}
              className="nav-link"
              aria-current="page"
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
