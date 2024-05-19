import { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../context/global.jsx'
import Details from '../../../components/contextDetail/Details.jsx'

const UpComingAnime = ({ rendered }) => {
  const userLog = window.localStorage.getItem('LOGGED_IN')
  const user = JSON.parse(userLog)
  const { upcomingAnime, isDetailShow, setIsShowDetails, saveFavorite } = useGlobalContext()
  const [showDetails, setShowDetails] = useState(null)
  useEffect(() => {
    if (showDetails) {
      setIsShowDetails(true)
    } else {
      setIsShowDetails(false)
    }
  }, [showDetails])

  const handleAddFavorite = async (anime, user) => {
    console.log(user, anime)
    await saveFavorite(anime, user)
  }

  return !isDetailShow && !showDetails ? (
    <div className="grid-list" id="airing-list">
      {rendered === 'upcoming' ? (
        upcomingAnime &&
        upcomingAnime.map((anime, index) => {
          return (
            <div className="card-container" key={index}>
              <img src={anime.images.jpg.large_image_url} className="cover-pic" alt="cover" />
              <div className="hidden">
                <h3 className="title">{anime.title}</h3>
                <p className="year">{anime.year}</p>
              </div>
              <div className="button-container">
                <button onClick={() => setShowDetails(anime)}>Details</button>
                <button onClick={() => handleAddFavorite(anime.mal_id, user.id)}>Add</button>
              </div>
            </div>
          )
        })
      ) : (
        <p>Not quite right ? .xd -.+ . ! </p>
      )}
    </div>
  ) : (
    <Details animeData={showDetails} />
  )
}

export default UpComingAnime
