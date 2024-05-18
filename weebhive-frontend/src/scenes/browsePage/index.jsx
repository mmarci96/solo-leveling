import { useGlobalContext } from '../../context/global.jsx'
import './browse-modules/styles/BrowsePage.css'
import { useEffect, useState } from 'react'
import PopularAnime from './browse-modules/PopularAnime'
import AiringAnime from './browse-modules/AiringAnime'
import UpComingAnime from './browse-modules/UpComingAnime'
import AnimeList from './browse-modules/AnimeList.jsx'
import HeaderForSorting from '../../components/contextDetail/Header.jsx'

const BrowsePage = () => {
  const { getAnimeList, isDetailShow, setIsShowDetails } = useGlobalContext()
  const [rendered, setRendered] = useState('popularity')
  const [pageIndex, setPageIndex] = useState(1)
  const [originList, setOriginList] = useState('popularity')

  useEffect(() => {
    if (rendered !== 'anime' && rendered !== 'search') {
      setOriginList(rendered)
    }
  }, [rendered])

  useEffect(() => {
    setRendered('anime')
    originList === 'popularity'
      ? getAnimeList(originList, pageIndex)
      : getAnimeList(originList, pageIndex, 'filter', 'top/')
  }, [pageIndex, originList])

  useEffect(() => {
    if (isDetailShow === false) {
      setRendered('popularity')
    }
  }, [isDetailShow])

  const handleNextPage = () => {
    setPageIndex((prev) => (prev < 100 ? prev + 1 : prev))
    setRendered('anime')
  }

  const handlePrevPage = () => {
    setPageIndex((prev) => (prev > 1 ? prev - 1 : 1))
    setRendered('anime')
  }

  const handleRenderButton = (sort) => {
    setRendered(sort)
    setOriginList(sort)
    setPageIndex(1)
  }

  const SwitchComponent = () => {
    switch (rendered) {
      case 'popularity':
        return <PopularAnime rendered={rendered} pageIndex={pageIndex} />
      case 'airing':
        return <AiringAnime rendered={rendered} pageIndex={pageIndex} />
      case 'upcoming':
        return <UpComingAnime rendered={rendered} pageIndex={pageIndex} />
      case 'anime':
        return <AnimeList index={pageIndex} orderBy={originList} rendered={rendered} />
      default:
        return <PopularAnime rendered={rendered} pageIndex={pageIndex} />
    }
  }

  return (
    <div id="main">
      {!isDetailShow ? (
        <>
          <HeaderForSorting handleRenderButton={handleRenderButton} setRendered={setRendered} />
          <div className="turn-page-button">
            <button onClick={handlePrevPage} className="prev-button">
              Previous
            </button>
            <p>{pageIndex} / 100</p>
            <button onClick={handleNextPage} className="next-button">
              Next
            </button>
          </div>
        </>
      ) : (
        <button onClick={() => setIsShowDetails(false)}>Return</button>
      )}
      {SwitchComponent()}
    </div>
  )
}

export default BrowsePage
