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
      <h1>Trending today</h1>
      <ul>
        {results.map(res => (
          <li key={res.id}>
            <NavLink to={`movies/${res.id}`} state={{ from: location }}>
              {res.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
