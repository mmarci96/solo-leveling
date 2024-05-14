const NavButtons = props => {
  const handleAnimeButton = e => {
    console.log(e);
    window.location = '/browse'
  }
  return(
    <div id='nav-button-container'>
      <button onClick={()=>handleAnimeButton}>Anime</button>
      <button>Forum</button>
      <button>My profile</button>
    </div>
  )
}