/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/global.jsx";


const PopularAnime = (props) => {
  const rendered = props.rendered;
  
  const { popularAnime, getMorePages, moreAnime } = useGlobalContext();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const handleNext = () => {
    setCurrentPageIndex(prev => prev + 1)
  }
  useEffect(()=>{
    const loadNextPage = async () => {
      console.log(currentPageIndex)
       getMorePages(currentPageIndex, 'bypopularity')
       moreAnime;
    }
    loadNextPage();
    console.log(moreAnime);
  }, [currentPageIndex])



  return (
    <div className="grid-list" id="popular-list">
      {rendered === 'popular' ?
      popularAnime && popularAnime.map((anime, index) => {
        return ( 
          <div className="card-container" key={index}>
            <img src={anime.images.jpg.large_image_url} className="cover-pic" alt='cover'/>
            <div className="hidden">
              <h3 className='title'>{anime.title}</h3>
              <p className="year">{anime.year}</p>
            </div>
            <div className="button-container">
              <button onClick={() => {}}>Details</button>
              <button onClick={() => {}}>Add</button>
            </div>
          </div>
          )
        }) : 
      <p>Not quite right ? . -.+ . ! </p>}
      <div>
        <p>{currentPageIndex}</p>
        <button className="next" onClick={()=>handleNext()} >Next</button>
      </div>
    </div>
  )
  
}

export default PopularAnime