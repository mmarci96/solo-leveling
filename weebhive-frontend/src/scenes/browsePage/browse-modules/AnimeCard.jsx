import { useEffect, useState } from "react"

const AnimeCard = (props) => {
  const [showData, setShowData] = useState(null)
  useEffect(()=>{
    const animeList = props.props
    setShowData(animeList)
    console.log('ez?',animeList)
  },[])
  

    return (
      
      showData ?
      <div id='anime-card' className="grid-list">  
      {showData.map((anime, index) =>{ 
        index % 2 === 0
        return (
        <div key={index} className="card-container">
          <img src={anime.images.jpg.image_url} className="cover-pic" alt='cover'/>
        <div className="hidden">
          <h3 className='title'>{anime.title}</h3>
          <p className="year">{anime.year}</p>
        </div>
        </div>)})}</div> :

    <p1>Loading...</p1>
  )
}

export default AnimeCard