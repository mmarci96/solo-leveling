import React from 'react'
import PropTypes from 'prop-types'
import Details from '../../../components/contextDetail/Details.jsx'
import useDetails from '../../../hooks/useDetails'
import { useGlobalContext } from '../../../context/global.jsx'

const AnimeGridList = ({ animeList, rendered, type, pageIndex, handleNextPage, handlePrevPage }) => {
  const userLog = window.localStorage.getItem('LOGGED_IN')
  const user = userLog ? JSON.parse(userLog) : null
  const [showDetails, setShowDetails] = useDetails()
  const { isDetailShow, saveFavorite } = useGlobalContext()

  const handleAddFavorite = async (anime, user) => {
    try {
      await saveFavorite(anime, user)
    } catch (error) {
      console.error('Failed to add favorite:', error)
    }
  }

  if (!user) {
    return <p>Please log in to view and save your favorite anime.</p>
  }

  return !isDetailShow && !showDetails ? (
    <div>
      <div className="grid-list" id={`${type}-list`}>
        {rendered === type ? (
          animeList.length > 0 ? (
            animeList.map((anime, index) => (
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
            ))
          ) : (
            <p>No {type} anime found.</p>
          )
        ) : (
          <p>Having some trouble here...</p>
        )}
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={pageIndex <= 1}>
          Previous
        </button>
        <span>Page {pageIndex}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  ) : (
    <Details animeData={showDetails} />
  )
}

AnimeGridList.propTypes = {
  animeList: PropTypes.array.isRequired,
  rendered: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  pageIndex: PropTypes.number.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
}

export default AnimeGridList
