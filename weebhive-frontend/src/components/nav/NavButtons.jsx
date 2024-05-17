const NavButtons = () => {
  const handleAnimeButton = (e) => {
    window.location = '/browse'
  }
  return (
    <div id="nav-button-container">
      <button onClick={() => handleAnimeButton()}>Anime</button>
      <button>Forum</button>
      <button onClick={() => (window.location = '/profile')}>My profile</button>
      <button
        onClick={() => {
          window.localStorage.clear()
          window.location.reload()
        }}
        className="sign-out"
      >
        Sign Out
      </button>
    </div>
  )
}

export default NavButtons
