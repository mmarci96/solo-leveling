import { useState } from 'react';
import './App.css'
import Header from './components/header/Header'
import Registration from './components/Registration'

function App() {
  const [userState, setUserState] = useState(null)
  const signIn = () => {};
  const signUp = () => {};
  return (
    <>
    <Header></Header>
    <div className='main'>
      <h2>Welcome</h2>
      <p>Sign in to start browsing!</p>
      <button onClick={signIn}>Sign in</button>
      <button onClick={signUp}>Sign up</button>

      {userState === 'sign-up' ?? <Registration/>}
    </div>
    </>
  )
}

export default App
