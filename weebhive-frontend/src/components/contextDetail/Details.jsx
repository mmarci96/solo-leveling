/* eslint-disable react/prop-types */
const Details = ({animeData}) => {
  const {
    title,
    title_english,
    title_japanese,
    aired,
    episodes,
    score,
    members,
    favorites,
    genres,
    synopsis,
    images,
    trailer,
    url
} = animeData;

return (
    <div className="anime-details">
        <h1>{title} ({title_english || title_japanese})</h1>
        <img src={images.jpg.image_url} alt={`Cover for ${title}`} />
        <p><strong>Aired:</strong> {aired.string}</p>
        <p><strong>Episodes:</strong> {episodes}</p>
        <p><strong>Score:</strong> {score}</p>
        <p><strong>Members:</strong> {members}</p>
        <p><strong>Favorites:</strong> {favorites}</p>
        <div><strong>Genres:</strong> {genres.map(genre => <span key={genre.mal_id}>{genre.name} </span>)}</div>
        <p>{synopsis}</p>
        <a href={trailer.url} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
        <a href={url} target="_blank" rel="noopener noreferrer">More Details</a>
    </div>
);
}

export default Details;