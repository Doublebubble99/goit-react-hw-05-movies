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
        {actors.length !== 0 ? (
          actors.map((actor, index) => (
            <li className="list-group-item" key={index}>
              <img
                src={
                  actor.profile_path !== null
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : `https://placehold.co/150x250/orange/white?text=There+no+image`
                }
                alt={actor.name}
                width={150}
                height={250}
              />
              <h2>{actor.name}</h2>
              <h3>Character: {actor.character}</h3>
            </li>
          ))
        ) : (
          <div>There are not actors</div>
        )}
      </ul>
    </div>
  );
}
