import { useGlobalContext } from '../../context/global.jsx'
import './browse-modules/styles/BrowsePage.css'
import { useEffect, useState } from 'react'
import PopularAnime from './browse-modules/PopularAnime'
import AiringAnime from './browse-modules/AiringAnime'
import UpComingAnime from './browse-modules/UpComingAnime'
import AnimeList from './browse-modules/AnimeList.jsx'
import HeaderForSorting from '../../components/contextDetail/Header.jsx'

const BrowsePage = () => {
  const { getAnimeList, getPopularAnime, getAiringAnime, getUpComingAnime, isDetailShow, setIsShowDetails } =
    useGlobalContext()
  const [rendered, setRendered] = useState('popularity')
  const [pageIndex, setPageIndex] = useState(1)
  const [originList, setOriginList] = useState('popularity')
  useEffect(() => {
    ;(rendered !== 'anime' && rendered !== 'search') ?? setOriginList(rendered)
  }, [rendered])

  useEffect(() => {
  }, [pageIndex])

  useEffect(() => {
    if (isDetailShow === false) {
      setRendered('popularity')
    }
  }, [isDetailShow])

  const SwitchComponent = () => {
    switch (rendered) {
      case 'popularity':
        return <PopularAnime rendered={rendered} />
      case 'airing':
        return <AiringAnime rendered={rendered} />
      case 'upcoming':
        return <UpComingAnime rendered={rendered} />
      case 'anime':
        return <AnimeList index={pageIndex} orderBy={originList} rendered={rendered} />
      default:
        return <PopularAnime rendered={rendered} />
    }
  }

  const handleClickNext = (direction) => {
    if (!direction) {
      setPageIndex((prev) => prev - 1)
      setRendered('anime')
    }    
    if (pageIndex < 100 && direction) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1)
      setRendered('anime')
    } else {
      direction ?? alert('Get some help')
    }
  }

  useEffect(() => {
    setRendered('anime')
    originList === 'popularity'
      ? getAnimeList(originList, pageIndex)
      : getAnimeList(originList, pageIndex, 'filter', 'top/')
  }, [pageIndex])

  const handleRenderButton = (sort) => {
    setRendered(sort)
    setOriginList(sort)
    setPageIndex(1)
  }

  return (
    <div id="main">
      {!isDetailShow ? (
        <>
          <HeaderForSorting handleRenderButton={handleRenderButton} setRendered={setRendered} />
            <div className="turn-page-button">
              <button onClick={()=>handleClickNext(false)} className="prev-button">
                Previous
              </button>
              <p>{pageIndex} / 100</p>
              <button onClick={()=>handleClickNext('next')} className="next-button">
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
