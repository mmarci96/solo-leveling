/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useGlobalContext } from "../../../context/global.jsx";


const PopularAnime = (props) => {
  const rendered = props.rendered;
  
  const { popularAnime } = useGlobalContext();
  
  
  return (
    <div className="grid-list" id="popular-list">
      { rendered === 'popularity' ?
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
        }) : <p>having some trouble here..</p>}
    </div>
  )
  
}

export default PopularAnime