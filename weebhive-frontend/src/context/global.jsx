import React, { createContext, useContext, useReducer} from "react";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";
const LOADING = "LOADING";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

const reducer = (state, action) => {
  switch(action.type){
    case LOADING: 
      return {...state, loading: true}
    case GET_POPULAR_ANIME:
      return{...state, popularAnime: action.payload, loading: false}
    case GET_AIRING_ANIME:
      return{...state, airingAnime: action.payload, loading: false}
    case GET_UPCOMING_ANIME:
        return{...state, upcomingAnime: action.payload, loading: false}  
    default: return state
  }
}

// eslint-disable-next-line react/prop-types
export const GlobalContextProvider = ({children}) => {
  
  const initialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const getPopularAnime = async () => {
    dispatch({type: LOADING})
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`)
    const data = await response.json();
    dispatch({type: GET_POPULAR_ANIME, payload: data.data})
  }
  

  const getAiringAnime = async () => {
    dispatch({type: LOADING})
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`)
    const data = await response.json();
    dispatch({type: GET_AIRING_ANIME, payload: data.data})
  }
  
  const getUpComingAnime = async () => {
    dispatch({type: LOADING})
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`)
    const data = await response.json();
    dispatch({type: GET_UPCOMING_ANIME, payload: data.data})
  }
  React.useEffect(() => {
    getPopularAnime();
  },[])
  
  return (
    <GlobalContext.Provider value={{
      ...state,
      getPopularAnime,
      getAiringAnime,
      getUpComingAnime,
    }}>
      {children}
    </GlobalContext.Provider>
  )
} 

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
}
