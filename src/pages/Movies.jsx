import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import getSearchFilm from 'services/getSearchFilm';

export default function Movies() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') ?? '';
  const handleChange = evt => {
    setValue(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    setSearchParams({ query: value });

    evt.target.reset();
  };
  useEffect(() => {
    getSearchFilm(query).then(movie => {
      setMovies(movie.results);
    });
  }, [query]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink to={`${movie.id}`} state={{ from: location }}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
