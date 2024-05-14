
const Registration = () => {

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target)
    const newUser = {username: e.target[0].value, email:e.target[1].value, psw:e.target[2].value}
    console.log(newUser);
  }  

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