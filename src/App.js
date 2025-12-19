import { BrowserRouter, Navigate, Route,Routes } from "react-router-dom";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import "./styles.css"


function App() {
  const [user,setUser] = useState(null)
  console.log(user)
  return (
    <BrowserRouter>
    <div className="app">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/chat" /> : <Login setUser={setUser} />}/>
        <Route path="/login" element ={user?(<Navigate to ="/chat"/>):(<Login setUser={setUser} />)}/>
        <Route path="/register" element ={user ? (<Navigate to ="/chat"/>):(<Register setUser={setUser}/>)}/>
        <Route path="/chat" element={user ? <Chat user={user} setUser={setUser}/>:(<Navigate to ="/login"/>)}/>
        <Route />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
