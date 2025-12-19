import { BrowserRouter, Navigate, Route,Routes } from "react-router-dom";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import "./styles.css"


function App() {
  const [user,setUser] = useState(null)
  const [showValue, setShowValue] = useState(false)
  console.log(user)
  return (
    <BrowserRouter>
    <div className="app">
      <h1>Chat App</h1>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element ={user?(<Navigate to ="/chat"/>):(<Login setUser={setUser} />)}/>
        <Route path="/register" element ={user ? (<Navigate to ="/chat"/>):(<Register setUser={setUser}/>)}/>
        <Route path="/chat" element={user ? <Chat user={user}/>:(<Navigate to ="login"/>)}/>
        <Route />
      </Routes>
    {/* {!user?(
       <div className="container mt-5 text-center">
          <div className="row">
            {/* <div className="col-md-6">
              <button onClick={(e)=>setShowValue(true)}>{showValue && <Register setUser={setUser} />}</button>
            </div> */}
            {/* <div className="col-md-6">
              <button>{showValue ?<Register setUser={setUser} setShowValue={setShowValue} />: <Login setUser={setUser} setShowValue={setShowValue}/>}</button>
            </div>
          </div>
        </div>
    ):<Chat user={user}/>} */} 

    </div>
    </BrowserRouter>
  );
}

export default App;
