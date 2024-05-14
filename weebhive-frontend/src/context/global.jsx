/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer} from "react";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

export const GlobalContextProvider = ({children}) => {
  const LOADING = "LOADING";
  const SEARCH = "SEARCH";
  const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
  const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
  const GET_AIRING_ANIME = "GET_AIRING_ANIME";
  const GET_PICTURES = "GET_PICTURES";

  const reducer = (state, action) => {
    switch(action.type){
      case LOADING: 
        return {...state, loading: true}
      case GET_POPULAR_ANIME:
        return{...state, popularAnime: action.payload, loading: false}
      default: return state
    }
  }
  const initialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const getPopularAnime = async () => {
    dispatch({type: LOADING})
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`)
    const data = await response.json();
    dispatch({type: GET_POPULAR_ANIME, payload: data.data})
  }
  useEffect(() => {
    getPopularAnime();
  },[])

  return (
    <GlobalContext.Provider value={{
      ...state,
    }}>
      {children}
    </GlobalContext.Provider>
  )
} 

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}