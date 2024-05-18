import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../context/global.jsx'
import AnimeGridList from './AnimeGridList'

const UpComingAnime = ({ rendered }) => {
  const { upcomingAnime, getAnimeList, pageIndex } = useGlobalContext()

  const [currentPage, setCurrentPage] = useState(pageIndex)
  useEffect(() => {
    getAnimeList('upcomingAnime', 'upcoming', currentPage)
  }, [currentPage, getAnimeList])

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <AnimeGridList
      animeList={upcomingAnime}
      rendered={rendered}
      type="upcoming"
      pageIndex={currentPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
    />
  )
}

UpComingAnime.propTypes = {
  rendered: PropTypes.string.isRequired,
}

export default UpComingAnime
