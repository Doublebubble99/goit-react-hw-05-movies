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
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-auto">
          <input
            type="text"
            value={value}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Search
          </button>
        </div>
      </form>
      <ul className="list-group">
        {movies.map(movie => (
          <li
            key={movie.id}
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            <NavLink to={`${movie.id}`} state={{ from: location }}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
