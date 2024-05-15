/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import AnimeCard from "./AnimeCard";
import { useEffect } from "react";

const SwipingGame = props => {
  const list = [...props.myAnimeList];
  useEffect(()=>{
    return
  },[list])
  return(
      list ? <AnimeCard props={[...list]}/> : <p>Loading...</p>
  )
  
}

export default SwipingGame