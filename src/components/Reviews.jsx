import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getReviews from 'services/getReviews';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(movieId).then(response => setReviews(response.results));
  }, [movieId]);
  return (
    <div>
      <ul>
        {reviews ? (
          reviews.map((review, index) => (
            <li key={index}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <div>There are not reviews</div>
        )}
      </ul>
    </div>
  );
}
