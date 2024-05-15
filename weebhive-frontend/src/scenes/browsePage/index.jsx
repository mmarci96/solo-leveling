/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../components/header/Header"
import { useGlobalContext } from "../../context/global"
import { Link } from 'react-router-dom'
import './browsePage.css'
import { useEffect, useState } from "react"
import Details from "../../components/contextDetail/Details"

const BrowsePage = () => {
  const { upcomingAnime } = useGlobalContext();
  const { popularAnime } = useGlobalContext();
  const { airingAnime } = useGlobalContext();

  const [favorite, setFavorite] = useState([0]);
  const [animeDetails, setAnimeDetails] = useState(null);
  const [displayList, setDisplayList] = useState(null);

  const showDetails = anime => {
    setAnimeDetails(anime)
  }
  useEffect(()=>{
    setDisplayList(popularAnime)
  },[]);

  useEffect(()=>{
    console.log('hi')
  },[displayList])

  const removeFavorite = favi => {
    const favlist = favorite.filter(fav=>fav !== favi);
    setFavorite(favlist)
  }
  
  return(
  <> <Header/>
    <div id='main'>
      <div>
        {popularAnime && <button onClick={()=>setDisplayList(popularAnime)}>Most popular</button>}
        {upcomingAnime && <button onClick={()=>setDisplayList(upcomingAnime)}>Top Upcoming</button>}
        {airingAnime && <button onClick={()=>setDisplayList(airingAnime)}>Top Airing</button>}
        <input type="search"></input>
      </div>
      {!animeDetails ? 
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
