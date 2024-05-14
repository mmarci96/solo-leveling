import './Header.css'
import NavButtons from './NavButtons'
import { useState } from 'react'

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const clickOptions = () => {
    showOptions ? setShowOptions(false) : setShowOptions(true)
  }

  return (
    <div id='header'>
      <div id='logo-container'><img id='icon' src='../icon.png'></img><h1 id='logo-title'>WeebHive</h1></div>

      <div id='nav-bar-container'>
        <button id='options' onClick={()=> clickOptions()}>Options</button>
        {showOptions ? <NavButtons/> : <></>}
      </div>

    </div>
  )
}

export default Header;
