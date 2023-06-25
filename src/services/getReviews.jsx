export default async function getReviews(movieId) {
  const API_KEY = 'c4db8ccc58a0592251aa55d706d65408';
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    ).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
