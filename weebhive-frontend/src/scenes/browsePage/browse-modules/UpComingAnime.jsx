import { useGlobalContext } from "../../../context/Global";

// eslint-disable-next-line react/prop-types
const UpComingAnime = ( { rendered } ) => {
  
  const { upcomingAnime } = useGlobalContext()

  const conditionalRendering = () => {
    rendered === 'upcoming' ?
    upcomingAnime.map((anime, index) => {
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
      <p>Not quite right ? . -.+ . ! </p>
  }
  return (
    <div className="grid-list" id="upcoming-list">
      {conditionalRendering()}
    </div>
  )
  
}

export default UpComingAnime