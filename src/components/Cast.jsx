import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getCredits from 'services/getCredits';

export default function Cast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getCredits(movieId).then(response => {
      setActors(response.cast);
    });
  }, [movieId]);
  return (
    <div>
      <ul>
        {actors.map((actor, index) => (
          <li key={index}>
            <img src={actor.profile_path} alt={actor.name} />
            <h2>{actor.name}</h2>
            <h3>{actor.character}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
