import { useState } from 'react';

import './App.css';
import Login from './User/Login';
import Register from './User/Register';
import ListUser from "./ListUser";


function App() {

  let [redirectTo, setRedirectTo] =useState((localStorage.getItem("user_id"))?"listUser":"login");
  
  let initialPage;
  if(redirectTo === "listUser")
    initialPage = <ListUser/>
  else if(redirectTo === "login")
    initialPage = <Login redirectToProp={setRedirectTo}/>
  else if(redirectTo === "register")
    initialPage = <Register redirectToProp={setRedirectTo}/>
  else
    console.log("could not found page");
  
  return (
    <div className="App">
          <div className="nav-wrapper">
            <div className="container">
              { (redirectTo === "login") ? <button className='float-right' onClick={(e) => setRedirectTo("register")}>Signup</button> : ""}
              { (redirectTo === "register") ?  <button className='float-right' onClick={(e) => setRedirectTo("login") }>login</button> : ""}
              { (redirectTo === "listUser") ?  <button className='float-right' onClick={(e) => {setRedirectTo("register"); localStorage.clear() } }>Logout</button> : ""}
            </div>
          </div>
        <div className="container">
           {initialPage}
        </div>

    </div>
  );
}
export default App;
