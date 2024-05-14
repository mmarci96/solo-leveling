
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header'
import Registration from '../../components/Registration'

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(()=>{
    if(window.localStorage.getItem('LOGGED_IN')){
      const user = window.localStorage.getItem('LOGGED_IN');
      setLoggedInUser(JSON.parse(user));
      console.log(user)
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
    <>
    <Header></Header>
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
        <h3>hello {loggedInUser.username}</h3>
      </div>
      )}
    </>
  )
}

export default HomePage
