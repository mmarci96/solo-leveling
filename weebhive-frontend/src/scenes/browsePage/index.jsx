/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../components/header/Header"
import { useGlobalContext } from "../../context/global"
import { Link } from 'react-router-dom'
import './browse-modules/BrowsePage.css'
import { useEffect, useState } from "react"
import Details from "../../components/contextDetail/Details"
import SwipingGame from "./browse-modules/Swiping"

const BrowsePage = () => {
  const { upcomingAnime } = useGlobalContext();
  const { popularAnime } = useGlobalContext();
  const { airingAnime } = useGlobalContext();

  const [favorite, setFavorite] = useState([0]);
  const [animeDetails, setAnimeDetails] = useState(null);
  const [displayList, setDisplayList] = useState(null);
  const [searchValue, setSearchValue] = useState(null)
  const showDetails = anime => {
    setAnimeDetails(anime)
  }
  useEffect(()=>{
    setLetsDuel(null)
    readySetGo(null)
  },[displayList]);

  useEffect(()=>{
    if(searchValue){
      console.log(searchValue)
      const newList = displayList.filter(anime => {
        anime.title.includes(searchValue)
      })      
    setDisplayList(newList);
    }
  },[searchValue])

  const removeFavorite = favi => {
    const favlist = favorite.filter(fav=>fav !== favi);
    setFavorite(favlist)
  }
  const handleSearch = e => {
    setSearchValue(e.target.value)
  }
  
  const [letsPlay, readySetGo] = useState(null)
  const [letsDuel, setLetsDuel] = useState(null)
  useEffect(()=>{ 
    if (displayList){
      const tournament = [displayList[0], displayList[1],displayList[2], displayList[3]]
      setLetsDuel(tournament)
    }
  },[letsPlay])
  const handleWinner = (e) => {
    console.log(e.target);
  }
  const handleStartSwipe = () => {
    readySetGo(true);
  }
  
  return(
  <> <Header/>
    <div id='main'>
      <div className="sorting-elements-container">   
        <div className="sorting-buttons">
          {popularAnime && <button onClick={()=>setDisplayList(popularAnime)}>Most popular</button>}
          {upcomingAnime && <button onClick={()=>setDisplayList(upcomingAnime)}>Top Upcoming</button>}
          {airingAnime && <button onClick={()=>setDisplayList(airingAnime)}>Top Airing</button>}
        </div>
        <div className="search-div">
          <input type="search" onChange={e => handleSearch(e)}></input>
          <button onClick={()=>{handleStartSwipe()}}>Play</button>
        </div>
        <div>
          
        </div>
      </div>
      {letsPlay && letsDuel && 
          <SwipingGame onClick={handleWinner}myAnimeList={letsDuel}/>}
      {!animeDetails && !letsDuel ? 
      <div className="grid-list">{displayList && displayList.map((anime, index) => {
        return ( 
          <div className="card-container" key={index}>
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <img src={anime.images.jpg.large_image_url} className="cover-pic" alt='cover'/>
            </Link>
            <div className="hidden">
              <h3 className='title'>{anime.title}</h3>
              <p className="year">{anime.year}</p>
            </div>
            <div className="button-container">
              <button onClick={()=>{showDetails(anime)}}>Details</button>
                {favorite.includes(anime.mal_id)
                ? <button onClick={()=>removeFavorite(anime.mal_id)}>Remove</button> :
                <button onClick={() => setFavorite(prev => [...prev,anime.mal_id])}>Add</button>}
            </div>
          </div>)})}
      </div> : 
      animeDetails && 
        <div>
          <button onClick={()=>setAnimeDetails(null)}>Back</button>
          <Details animeData={animeDetails}/>
        </div>}
    </div>
  </>
  )
}

export default BrowsePage
