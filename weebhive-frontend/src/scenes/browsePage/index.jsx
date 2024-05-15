import { useGlobalContext } from "../../context/Global"
import Header from "../../components/header/Header"
import './browse-modules/BrowsePage.css'
import { useState } from "react"
import PopularAnime from "./browse-modules/PopularAnime"
import AnimeListAll from "./browse-modules/AnimeListAll"
import AiringAnime from "./browse-modules/AiringAnime"
import UpComingAnime from "./browse-modules/UpComingAnime"

const BrowsePage = () => {
  // const [animeDetails, setAnimeDetails] = useState(null);
  // const showDetails = anime => {
  //   setAnimeDetails(anime)
  // }

  // const [favorite, setFavorite] = useState([0]);
  // const removeFavorite = favi => {
  //   const favlist = favorite.filter(fav=>fav !== favi);
  //   setFavorite(favlist)
  // }
  
  const { 
    getPopularAnime,
    getAiringAnime,
    getUpComingAnime,
   } = useGlobalContext();
   const [rendered, setRendered] = useState('popular');
   const switchComponent = () => {
    switch (rendered) {
      case 'popular':
        return <PopularAnime rendered={rendered} />;
      case 'airing':
        return <AiringAnime rendered={rendered} />
      case 'upcoming': 
        return <UpComingAnime rendered={rendered}/>;
      default:
        return <AnimeListAll rendered={rendered} />;
    }
  }

  const handleSearch = e => {
    console.log(e.target.value)
  }

  const handleClick = e => {
    console.log(e)
    setRendered('upcoming')
    console.log(
      getPopularAnime,
      getAiringAnime,
      getUpComingAnime,)
  }

  return (
    <><Header/>
      <div id='main'>
        <div className="sorting-elements-container">   
          <div className="sorting-buttons">
            <button onClick={(event)=>handleClick(event)}>Most popular</button>
            <button onClick={(event)=>handleClick(event)}>Top Upcoming</button>
            <button onClick={(event)=>handleClick(event)}>Top Airing</button>
          </div>
          <div className="search-div">
            <input type="search" onChange={e => handleSearch(e)}></input>
            <button onClick={()=>{}}>Don.t click!</button>
          </div>
        </div>
        {switchComponent()}
      </div>
    </>
  )
}

export default BrowsePage
