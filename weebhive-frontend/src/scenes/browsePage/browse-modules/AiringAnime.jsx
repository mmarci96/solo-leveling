import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../../../context/global.jsx'
import AnimeGridList from './AnimeGridList'

const AiringAnime = ({ rendered }) => {
  const { airingAnime, getAnimeList, pageIndex } = useGlobalContext()
  const [currentPage, setCurrentPage] = useState(pageIndex)

  useEffect(() => {
    getAnimeList('airingAnime', 'airing', currentPage)
  }, [currentPage, getAnimeList])

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <AnimeGridList
      animeList={airingAnime}
      rendered={rendered}
      type="airing"
      pageIndex={currentPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
    />
  )
}

AiringAnime.propTypes = {
  rendered: PropTypes.string.isRequired,
}

export default AiringAnime
