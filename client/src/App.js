import { useEffect, useState} from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';

function App() {
  const [user, setUser] = useState({});

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "968615509131-vrni171aq89nmhiqe1umrmk8jsiipi5h.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  },[]);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }

      { user && 
        <div>
          <img src={user.picture} alt={user.name} />
          <h3>{user.name}</h3>
          <h4>{user.email}</h4>
        </div>}
    </div>
  );
}

export default App;
