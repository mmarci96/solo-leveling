import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../../../context/global.jsx'
import AnimeGridList from './AnimeGridList'

const PopularAnime = ({ rendered }) => {
  const { popularAnime, getAnimeList, pageIndex } = useGlobalContext()
  const [currentPage, setCurrentPage] = useState(pageIndex)

  useEffect(() => {
    getAnimeList('popularAnime', 'bypopularity', currentPage)
  }, [currentPage, getAnimeList])

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <AnimeGridList
      animeList={popularAnime}
      rendered={rendered}
      type="popularity"
      pageIndex={currentPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
    />
  )
}

PopularAnime.propTypes = {
  rendered: PropTypes.string.isRequired,
}

export default PopularAnime
