/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useGlobalContext } from '../../context/global.jsx'
import './browse-modules/styles/BrowsePage.css'
import { useEffect, useState } from 'react'
import PopularAnime from './browse-modules/PopularAnime'
import AiringAnime from './browse-modules/AiringAnime'
import UpComingAnime from './browse-modules/UpComingAnime'
import SearchResults from './browse-modules/SearchResults.jsx'
import AnimeList from './browse-modules/AnimeList.jsx'

const BrowsePage = () => {
  const {
    getAnimeList,
    moreAnime,
    getPopularAnime,
    getAiringAnime,
    getUpComingAnime,
    popularAnime,
    airingAnime,
    upcomingAnime,
    isDetailShow,
    setIsShowDetails,
  } = useGlobalContext()
  const [searchValue, setSearchValue] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
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

  useEffect(() => {
    if (searchValue) {
      if (rendered === 'search') {
        setSearchResults((prev) => [
          ...prev,
          ...popularAnime,
          ...airingAnime,
          ...upcomingAnime,
          ...(moreAnime ?? moreAnime),
        ])
        const results = searchResults.filter((anime) => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
      }
      if (rendered.includes('popularity')) {
        const results = popularAnime.filter((anime) => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
        setRendered('search')
      } else if (rendered.includes('airing')) {
        const results = airingAnime.filter((anime) => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
        setRendered('search')
      } else if (rendered.includes('upcoming')) {
        const results = upcomingAnime.filter((anime) => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
        setRendered('search')
      }
    } else {
      setRendered('popularity')
      setPageIndex(1)
    }
  }, [searchValue, searchResults])

  const SwitchComponent = () => {
    switch (rendered) {
      case 'popularity':
        return <PopularAnime rendered={rendered} />
      case 'airing':
        return <AiringAnime rendered={rendered} />
      case 'upcoming':
        return <UpComingAnime rendered={rendered} />
      case 'search':
        return <SearchResults rendered={rendered} list={searchResults} />
      case 'anime':
        return <AnimeList index={pageIndex} orderBy={'popularity'} rendered={rendered} />
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
    originList === 'popularity' ? getAnimeList(originList, pageIndex) : getAnimeList(originList, pageIndex, 'top/')
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
                  setPageIndex(1)
                  getPopularAnime()
                }}
              >
                Most popular
              </button>

              <button
                onClick={() => {
                  setRendered('upcoming')
                  setPageIndex(1)
                  getUpComingAnime()
                }}
              >
                Top Upcoming
              </button>

              <button
                onClick={() => {
                  setRendered('airing')
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
                className='search-button'
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
