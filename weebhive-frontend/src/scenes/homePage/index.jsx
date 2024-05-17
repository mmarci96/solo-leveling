
import { useEffect, useState } from 'react';
import Registration from '../../components/forms/Registration'
import './styles/home.css'

function HomePage() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(()=>{
    if(window.localStorage.getItem('LOGGED_IN')){
      const user = window.localStorage.getItem('LOGGED_IN');
      user && setLoggedInUser(JSON.parse(user));
    }
    
  },[])
  const [userState, setUserState] = useState(false)
  const signIn = () => {
    window.location = '/login'
  };
  const signUp = () => {
    setUserState(true)
  };
  return (
    <div className='main'>
    {!loggedInUser && <div className='welcome'>
        {!userState ? <>
          <h2>Welcome</h2>
        <p>Sign in to start browsing!</p>
        <button onClick={signIn}>Sign in</button>
        <button onClick={signUp}>Sign up</button>

        </> : <Registration/>}
        
      </div>}
      {loggedInUser && (
      <div className='after-login'>
        <h3>hello {loggedInUser.username ? loggedInUser.username : 'stranger'}</h3>
      </div>
      )}
    </div>
  )
}

export default HomePage
