import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import getTrending from 'services/getTrending';
export default function Home() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  useEffect(() => {
    getTrending().then(response => setResults(response.results));
  }, []);
  return (
    <div>
      <h2 className="mb-1">Trending today</h2>
      <ul className="list-group">
        {results.map(res => (
          <li
            className="list-group-item list-group-item-action"
            key={res.id}
            aria-current="true"
          >
            <NavLink to={`movies/${res.id}`} state={{ from: location }}>
              {res.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
