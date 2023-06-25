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
  console.log(picture);
  useEffect(() => {
    getMovieDetails(movieId).then(movie => {
      setPicture(movie.poster_path);
      setTitle(movie.title);
      setDate(movie.release_date.slice(0, 4));
      setAverage((movie.vote_average * 10).toFixed(0));
      setDescription(movie.overview);
      setGenres(movie.genres.map(genre => genre.name));
    });
  }, [movieId]);
  return (
    <div>
      <NavLink to={backLink.current}>⬅️Go back</NavLink>
      <div>
        <img src={picture} alt={title} width={500} height={500} />
      </div>
      <div>
        <h1>
          {title}({date})
        </h1>
        <p>User score: {average}%</p>
        <h2>Overview</h2>
        <p>{description}</p>
        <h3>Genres</h3>
        <p>{genres}</p>
      </div>
      <div>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
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
