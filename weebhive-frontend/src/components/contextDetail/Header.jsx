import { GlobalContextProvider, useGlobalContext } from "../../context/global"

const HeaderForSorting = (props) => {
  const { getPopularAnime, getAiringAnime, getUpComingAnime} =
    useGlobalContext()
  const handleRenderButton = props.handleRenderButton
  const setRendered = props.setRendered

  return (
    <div className="sorting-elements-container">
      <div className="sorting-buttons">
        <button
          onClick={() => {
            getPopularAnime()
            handleRenderButton('popularity')
          }}
        >
          Most popular
        </button>
        <button
          onClick={() => {
            getUpComingAnime()
            handleRenderButton('upcoming')
          }}
        >
          Top Upcoming
        </button>
        <button
          onClick={() => {
            getAiringAnime()
            handleRenderButton('airing')
          }}
        >
          Top Airing
        </button>
      </div>
      <div className="search-div">
        <input type="search" onChange={(e) => console.log(e.target.value)}></input>
        <button
          className="search-button"
          onClick={() => {
            setRendered('anime')
          }}
        >
          Don.t click!
        </button>
      </div>
    </div>
  )
}

export default HeaderForSorting