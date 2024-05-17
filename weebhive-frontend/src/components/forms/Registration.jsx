import { useEffect, useState } from "react";

const Registration = () => {
  const [newUserData, setNewUserData] = useState(null)
  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {username: e.target[0].value, email:e.target[1].value, psw:e.target[2].value}
    setNewUserData(newUser)
  }
  useEffect(()=>{
    const saveUser = async() => {
      const httpResponse = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
      });
      const newUser = await httpResponse.json();
      return newUser;
    }
    if(newUserData){
      saveUser(newUserData);
      alert(`Welcome in the hive ${newUserData.username}. Sign in and start browsing`)
      window.location.href = '/login';
    } 
  },[newUserData])

  return(
    <div className="form-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label htmlFor="username">Username:</label>
        <br></br>
        <input type='text' id={"username"} name="username"></input>
        <br></br>
        <label htmlFor="email">Email</label>
        <br></br>
        <input type='email' id="email" name="email"></input>
        <br></br>
        <label>Password</label>
        <br></br>
        <input type="password" id="pwd" name="pwd"></input>
        <br></br>
        <button type="submit">Sign up</button>
        <p>Already have an account? <a href="/login" >Sign in</a></p>
      </form>
    </div>
    )
}

export default Registration;