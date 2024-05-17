import { useEffect, useState } from "react";

const LogInForm = () => {
  
  const [checkLog, setCheckLog] = useState(null)
  const [wrongLog, setWrongLog] = useState(false)

  useEffect(()=>{
    const users = async() => {
      const response = await fetch('/api/users');
      const userList = await response.json();
      const authorized = userList.users.find(user => user.username === checkLog.username && user.psw === checkLog.psw)
      if(authorized){
        window.localStorage.setItem('LOGGED_IN', JSON.stringify(authorized));
        window.location = '/'
      } else {
        setWrongLog(true)
      }
    }
    if(checkLog){
      users()
    }
  }, [checkLog])

  const handleLogin = e => {
     e.preventDefault();
     const logs = {username: e.target[0].value, psw:e.target[1].value}
     setCheckLog(logs)
  }
  return(
    <div className="form-container">
      <form onSubmit={handleLogin} className="sign-in-form">
        <label>Username</label>
        <br></br>
        <input type='text'></input>
        <br></br>
        <label htmlFor='pwd'>Password:</label>
        <br></br>
        <input type="password" id="pwd" name="pwd"></input>
        <br></br>
        <button type="submit">Log in</button>
      </form>
      {wrongLog ? <p>You spelled something wrong, please try again...</p> :
       <p>Forgot your password? <a onClick={()=> alert('LOL, just make a new one!')}>Click here</a> for support!</p>}
       <p>Click <a href="/login">here</a> to create a new account!</p>

    </div>
    )
}

export default LogInForm