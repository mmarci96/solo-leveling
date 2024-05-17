import { useState, useEffect } from 'react'

const ProfilesPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  useEffect(() => {
    if (window.localStorage.getItem('LOGGED_IN')) {
      const user = window.localStorage.getItem('LOGGED_IN')
      user && setLoggedInUser(JSON.parse(user))
      console.log(loggedInUser)
    } else {
      window.location = '/'
    }
  }, [])

  return (
    <div>
      <h2>Profile page</h2>
      {loggedInUser && (
        <div>
          <h3>Your details:</h3>
          <p>Username: {loggedInUser.username}</p>
          <p>Email: {loggedInUser.email}</p>
          <p>
            Favorites:{' '}
            {loggedInUser.favorites.map((fav, index) => (
              <div key={index} >
                <a>{fav.mal_id}</a>
                <br />
              </div>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProfilesPage
