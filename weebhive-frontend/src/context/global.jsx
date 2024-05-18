import { createContext, useContext, useReducer, useState, useEffect } from 'react'

const GlobalContext = createContext()
const baseUrl = 'https://api.jikan.moe/v4'
const LOADING = 'LOADING'
const SET_ANIME_DATA = 'SET_ANIME_DATA'
const SET_DETAIL_SHOW = 'SET_DETAIL_SHOW'
const SEARCH_ANIME = 'SEARCH_ANIME'

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case SET_ANIME_DATA:
      return { ...state, [action.payload.type]: action.payload.data, loading: false }
    case SET_DETAIL_SHOW:
      return { ...state, isDetailShow: action.payload }
    case SEARCH_ANIME:
      return { ...state, searchResults: action.payload, loading: false }
    default:
      return state
  }
}

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    popularAnime: [],
    airingAnime: [],
    upcomingAnime: [],
    searchResults: [],
    moreAnime: [],
    loading: false,
    isDetailShow: false,
    pageIndex: 1,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async (type, endpoint) => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`)
      const data = await response.json()
      dispatch({ type: SET_ANIME_DATA, payload: { type, data: data.data } })
    } catch (error) {
      console.error(error)
    }
  }

  const searchAnime = async (query) => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/anime?q=${query}&order_by=popularity&sort=asc&sfw`)
      const data = await response.json()
      dispatch({ type: SEARCH_ANIME, payload: data.data })
    } catch (error) {
      console.error(error)
    }
  }

  const saveFavorite = async (malId, userId) => {
    const request = { favorites: { mal_id: malId } }
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })
      await response.json()
    } catch (error) {
      console.error('Failed to save favorite:', error)
    }
  }

  const getAnimeList = async (type, orderBy, pageIndex) => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/${type}/anime?order_by=${orderBy}&page=${pageIndex}`)
      const data = await response.json()
      dispatch({ type: SET_ANIME_DATA, payload: { type: 'moreAnime', data: data.data } })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData('popularAnime', 'top/anime?filter=bypopularity')
    fetchData('airingAnime', 'top/anime?filter=airing')
    fetchData('upcomingAnime', 'top/anime?filter=upcoming')
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        fetchData,
        searchAnime,
        saveFavorite,
        getAnimeList,
        setIsShowDetails: (show) => dispatch({ type: SET_DETAIL_SHOW, payload: show }),
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
