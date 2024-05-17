import { useGlobalContext } from "../../../context/global";
import { useEffect, useState } from "react";
import Details from '../../../components/contextDetail/Details.jsx'

const AnimeList = ({ rendered }) => {
  const userLog = window.localStorage.getItem('LOGGED_IN');
  const user = JSON.parse(userLog)

  const { moreAnime, isDetailShow, setIsShowDetails, saveFavorite} = useGlobalContext();
  const [showDetails, setShowDetails] = useState(null)
  useEffect(() => {
    if (showDetails) {
      setIsShowDetails(true)
    }else{
      setIsShowDetails(false)
    }
  }, [showDetails])

  const [displayedPage, setDisplayedPage] = useState(null);

  useEffect(() => {
    setDisplayedPage(moreAnime);
  }, [moreAnime]);

  const handleAddFavorite = async (anime, user) => {
    await saveFavorite(anime, user);
  }
  return !isDetailShow  && !showDetails ? (
    
      <div className="grid-list" id="anime-list">
        {rendered === "anime" ? (
          displayedPage &&
          displayedPage.map((anime, index) => {
            return (
              <div className="card-container" key={index}>
                <img
                  src={anime.images.jpg.large_image_url}
                  className="cover-pic"
                  alt="cover"
                />
                <div className="hidden">
                  <h3 className="title">{anime.title}</h3>
                  <p className="year">{anime.year}</p>
                </div>
                <div className="button-container">
                  <button onClick={() => setShowDetails(anime)}>Details</button>
                  <button onClick={() => handleAddFavorite(anime.mal_id, user.id)}>Add</button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    
  ) : <Details animeData={showDetails} />

};

export default AnimeList;
