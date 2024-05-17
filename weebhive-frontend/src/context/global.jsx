import { createContext, useContext, useReducer, useState, useEffect } from 'react'


const GlobalContext = createContext()
const baseUrl = 'https://api.jikan.moe/v4'
const LOADING = 'LOADING'
const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME'
const GET_UPCOMING_ANIME = 'GET_UPCOMING_ANIME'
const GET_AIRING_ANIME = 'GET_AIRING_ANIME'
const SEARCH = 'SEARCH'
const GET_PICTURES = 'GET_PICTURES'
const GET_MORE_ANIME = 'GET_MORE_ANIME'

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false }
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false }
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false }
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false }
    case SEARCH:
      return { ...state, search: action.payload, loading: false }
    case GET_MORE_ANIME:
      return { ...state, moreAnime: action.payload, loading: false }
    case DETAILS_SHOW:
      return { ...state, isDetailShow: action.payload, loading: false }
    default:
      return state
  }
}
export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    animeList: [],
    isSearch: false,
    searchResults: [],
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    loading: false,
    isDetailShow: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [search, setSearch] = useState('')
  const [isDetailShow, setIsShowDetails] = useState(false)

  const handleChange = (e) => {
    setSearch(e.target.value)
    e.target.value === '' ? (state.isSearch = false) : (state.isSearch = true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    search ? (state.isSearch = true && searchAnime(search)) : (state.isSearch = false && alert('invalid input'))
  }

  const searchAnime = async (anime) => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`)
      const data = await response.json()
      dispatch({ type: SEARCH, payload: data.data })
    } catch (error) {
      console.error(error)
    }
  }
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`https://api.jikan.moe/v4/characters/${id}/pictures`)
      const data = await response.json()
      dispatch({ type: GET_PICTURES, payload: data.data })
    } catch (error) {
      console.error(error)
    }
  }

  const getPopularAnime = async () => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      dispatch({ type: GET_POPULAR_ANIME, payload: data.data })
    } catch (error) {
      console.error(error)
    }
  }

  const getAiringAnime = async () => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/top/anime?filter=airing`)
      const data = await response.json()
      dispatch({ type: GET_AIRING_ANIME, payload: data.data })
    } catch (error) {
      console.error(error)
    }
  }

  const getUpComingAnime = async () => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`)
      const data = await response.json()
      dispatch({ type: GET_UPCOMING_ANIME, payload: data.data })
    } catch (error) {
      console.log(error)
    }
  }
  const getAnimeList = async (orderBy, pageIndex, top = '') => {
    dispatch({ type: LOADING })
    try {
      const response = await fetch(`${baseUrl}/${top}anime?order_by=${orderBy}&page=${pageIndex}`)
      const data = await response.json()
      dispatch({ type: GET_MORE_ANIME, payload: data.data })
    } catch (error) {
      console.log(error)
    }
  }

  const saveFavorite = async (malId, userId) => {
    const request = {favorites: { mal_id: malId }}
    const httpResponse = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(request),
    })

    const createdFavorite = await httpResponse.json()
    
  }
  

  useEffect(() => {
    getPopularAnime()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        saveFavorite,
        handleChange,
        handleSubmit,
        isDetailShow,
        search,
        getAnimePictures,
        getPopularAnime,
        getAiringAnime,
        getUpComingAnime,
        getAnimeList,
        setIsShowDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
