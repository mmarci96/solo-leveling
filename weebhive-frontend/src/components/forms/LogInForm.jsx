import { useEffect, useState } from "react";

const LogInForm = () => {
  
  const [checkLog, setCheckLog] = useState(null)

  useEffect(()=>{
    const users = async() => {
      const response = await fetch('/api/users');
      const userList = await response.json();
      const authorized = userList.users.find(user => user.username === checkLog.username && user.psw === checkLog.psw)
      
      console.log('Logged in as:', authorized)
      window.localStorage.setItem('LOGGED_IN', JSON.stringify(authorized));
      window.location = '/'
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
        <label>Password</label>
        <br></br>
        <input type='psw'></input>
        <br></br>
        <button type="submit">Log in</button>
      </form>
    </div>
    )
}

export default LogInForm