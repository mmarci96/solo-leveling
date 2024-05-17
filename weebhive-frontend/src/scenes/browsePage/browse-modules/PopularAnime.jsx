import { useGlobalContext } from '../../../context/global.jsx'
import { useState, useEffect } from 'react'
import Details from '../../../components/contextDetail/Details.jsx'


const PopularAnime = ({ rendered }) => {
  const userLog = window.localStorage.getItem('LOGGED_IN')
  const user = JSON.parse(userLog)
  const { popularAnime, isDetailShow, setIsShowDetails, saveFavorite } = useGlobalContext()
  const [showDetails, setShowDetails] = useState(null)
  useEffect(() => {
    if (showDetails) {
      setIsShowDetails(true)
    } else {
      setIsShowDetails(false)
    }
  }, [showDetails])

  const handleAddFavorite = async (anime, user) => {
    await saveFavorite(anime, user)
  }

  return !isDetailShow && !showDetails ? (
    <div className="grid-list" id="popular-list">
      {rendered === 'popularity' ? (
        popularAnime &&
        popularAnime.map((anime, index) => {
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
        <p>having some trouble here..</p>
      )}
    </div>
  ) : (
    <Details animeData={showDetails} />
  )
}

export default PopularAnime
