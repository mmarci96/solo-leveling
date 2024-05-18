import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useGlobalContext } from '../../context/global'

const HeaderForSorting = ({ handleRenderButton, setRendered }) => {
  const { getPopularAnime, getAiringAnime, getUpComingAnime, searchAnime } = useGlobalContext()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      searchAnime(searchQuery)
      setRendered('search')
    }
  }

  return (
    <div className="sorting-elements-container">
      <div className="sorting-buttons">
        <button
          onClick={() => {
            getPopularAnime()
            handleRenderButton('popularity')
          }}
        >
          Most Popular
        </button>
        <button
          onClick={() => {
            getUpComingAnime()
            handleRenderButton('upcoming')
          }}
        >
          Top Upcoming
        </button>
        <button
          onClick={() => {
            getAiringAnime()
            handleRenderButton('airing')
          }}
        >
          Top Airing
        </button>
      </div>
      <div className="search-div">
        <input type="search" value={searchQuery} onChange={handleSearchChange} placeholder="Search anime..." />
        <button className="search-button" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>
    </div>
  )
}

HeaderForSorting.propTypes = {
  handleRenderButton: PropTypes.func.isRequired,
  setRendered: PropTypes.func.isRequired,
}

export default HeaderForSorting
