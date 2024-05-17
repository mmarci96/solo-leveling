/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useGlobalContext } from '../../context/global.jsx'
import './browse-modules/styles/BrowsePage.css'
import { useEffect, useState } from 'react'
import PopularAnime from './browse-modules/PopularAnime'
import AiringAnime from './browse-modules/AiringAnime'
import UpComingAnime from './browse-modules/UpComingAnime'
import AnimeList from './browse-modules/AnimeList.jsx'

const BrowsePage = () => {
  const {
    getAnimeList,
    getPopularAnime,
    getAiringAnime,
    getUpComingAnime,
    isDetailShow,
    setIsShowDetails,
  } = useGlobalContext()
  const [rendered, setRendered] = useState('popularity')
  const [pageIndex, setPageIndex] = useState(1)
  const [originList, setOriginList] = useState('popularity')
  useEffect(() => {
    ;(rendered !== 'anime' && rendered !== 'search') ?? setOriginList(rendered)
  }, [rendered])

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
  const handleClickPrev = () => {
    if (pageIndex > 1) {
        setPageIndex((prev) => prev - 1)
        setRendered('anime')
    } else {
      alert('Get some help')
    }
  }
  const handleClickNext = () => {
    if (pageIndex < 100) {
        setPageIndex((prevPageIndex) => prevPageIndex + 1)
        setRendered('anime')
    } else {
      alert('EEnough... just choose from top10')
    }
  }

  useEffect(() => {
    originList === 'popularity'
      ? getAnimeList(originList, pageIndex)
      : getAnimeList(originList, pageIndex, 'filter', 'top/')
  }, [pageIndex])

  return (
    <div id="main">
      {!isDetailShow ? (
        <>
          <div className="sorting-elements-container">
            <div className="sorting-buttons">
              <button
                onClick={() => {
                  setRendered('popularity')
                  setOriginList('popularity')
                  setPageIndex(1)
                  getPopularAnime()
                }}
              >
                Most popular
              </button>

              <button
                onClick={() => {
                  setRendered('upcoming')
                  setOriginList('upcoming')
                  setPageIndex(1)
                  getUpComingAnime()
                }}
              >
                Top Upcoming
              </button>

              <button
                onClick={() => {
                  setRendered('airing')
                  setOriginList('airing')
                  setPageIndex(1)
                  getAiringAnime()
                }}
              >
                Top Airing
              </button>
            </div>
            <div className="search-div">
              <input type="search" onChange={(e) => setSearchValue(e.target.value)}></input>
              <button
                className="search-button"
                onClick={() => {
                  setRendered('anime')
                }}
              >
                Don.t click!
              </button>
            </div>
          </div>
          <>
            <div className="turn-page-button">
              <button onClick={handleClickPrev} className="prev-button">
                Previous
              </button>
              <p>{pageIndex} / 100</p>
              <button onClick={handleClickNext} className="next-button">
                Next
              </button>
            </div>{' '}
          </>
        </>
      ) : (
        <button onClick={() => setIsShowDetails(false)}>Return</button>
      )}

      {SwitchComponent()}
    </div>
  )
}

export default BrowsePage
