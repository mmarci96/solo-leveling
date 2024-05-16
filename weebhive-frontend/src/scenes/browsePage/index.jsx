/* eslint-disable react-hooks/exhaustive-deps */
import { useGlobalContext } from "../../context/global.jsx"
import './browse-modules/styles/BrowsePage.css'
import { useEffect, useState } from "react"
import PopularAnime from "./browse-modules/PopularAnime"
import AiringAnime from "./browse-modules/AiringAnime"
import UpComingAnime from "./browse-modules/UpComingAnime"
import SearchResults from "./browse-modules/SearchResults.jsx"

const BrowsePage = () => {

  const { 
    getPopularAnime,
    getAiringAnime,
    getUpComingAnime,
    popularAnime,
    airingAnime,
    upcomingAnime,
   } = useGlobalContext();
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [rendered, setRendered] = useState('popular');
  
  useEffect(()=>{
    if(searchValue){
      if(rendered==='search'){
        setSearchResults(prev => [...prev, ...popularAnime, ...airingAnime, ...upcomingAnime])
        const results = searchResults.filter(anime => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
      }
      if (rendered.includes('popular')) {
        const results = popularAnime.filter(anime => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
        setRendered('search')
      }else if(rendered.includes('airing')){
        const results = airingAnime.filter(anime => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
        setRendered('search')
      }else if (rendered.includes('upcoming')){
        const results = upcomingAnime.filter(anime => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchResults(results)
        setRendered('search');
      }
    } else {
      setRendered('popular')
    }
  },[searchValue])

  const SwitchComponent = () => {
  switch (rendered) {
    case 'popular':
      return <PopularAnime rendered={rendered} />;
    case 'airing':
      return <AiringAnime rendered={rendered} />;
    case 'upcoming': 
      return <UpComingAnime rendered={rendered}/>;
    case 'search':
      return <SearchResults rendered={rendered} list={searchResults} />
    default:
      return <UpComingAnime rendered={rendered}/>;
    }
  } 

  return (
    <div id='main'>
      <div className="sorting-elements-container">   
        <div className="sorting-buttons">
          <button onClick={()=>{
            setRendered('popular')
            getPopularAnime()}}>Most popular</button>

          <button  onClick={()=>{
            setRendered('upcoming')
            getUpComingAnime()}}>Top Upcoming</button>

          <button onClick={()=>{
            setRendered('airing')
            getAiringAnime()}}>Top Airing</button>
        </div>
        <div className="search-div">
          <input type="search" onChange={e => setSearchValue(e.target.value)}></input>
          <button onClick={()=>{}}>Don.t click!</button>
        </div>
      </div>
      {SwitchComponent()}
    </div>
  )
}

export default BrowsePage
