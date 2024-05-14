
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header'
import Registration from '../../components/Registration'

function HomePage() {
  useEffect(()=>{
    const user = window.localStorage.getItem('LOGGED_IN');
    user ?? console.log(user)
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
    <div className='main'>
      {!userState ? <>
        <h2>Welcome</h2>
      <p>Sign in to start browsing!</p>
      <button onClick={signIn}>Sign in</button>
      <button onClick={signUp}>Sign up</button>

      </> : <Registration/>}
      
    </div>
    </>
  )
}

export default HomePage
