/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useGlobalContext } from "../../../context/global";
import {useEffect, useState} from 'react'

const AnimeList = props => {
  const rendered = props.rendered;
  const { moreAnime } = useGlobalContext();
  
  const [displayedPage, setDisplayedPage] = useState(null)
  
  useEffect(() => {
    setDisplayedPage(moreAnime);

  }, [moreAnime]);

  return (<>
    <div className="grid-list" id="anime-list">
      {rendered === 'anime' ?
      displayedPage && displayedPage.map((anime, index) => {
          return (
            <div className="card-container" key={index}>
              <img src={anime.images.jpg.large_image_url} className="cover-pic" alt='cover' />
              <div className="hidden">
                <h3 className='title'>{anime.title}</h3>
                <p className="year">{anime.year}</p>
              </div>
              <div className="button-container">
                <button onClick={() => { } }>Details</button>
                <button onClick={() => { } }>Add</button>
              </div>
            </div>
          );
        }) : <div><p>Loading...</p></div>}
      </div></>
  )
}

export default AnimeList;