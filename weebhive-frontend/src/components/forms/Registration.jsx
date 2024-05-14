import { useEffect, useState } from "react";

const Registration = () => {
  const [newUserData, setNewUserData] = useState(null)
  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target)
    const newUser = {username: e.target[0].value, email:e.target[1].value, psw:e.target[2].value}
    setNewUserData(newUser)
    console.log(newUser);
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
      
    } 
  },[newUserData])

  return(
    <div className="form-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label>Username</label>
        <br></br>
        <input type='text'></input>
        <br></br>
        <label>Email</label>
        <br></br>
        <input type='email'></input>
        <br></br>
        <label>Password</label>
        <br></br>
        <input type='psw'></input>
        <br></br>
        <button type="submit">Sign up</button>
      </form>
    </div>
    )
}

export default Registration;