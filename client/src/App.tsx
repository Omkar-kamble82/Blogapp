import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Blog from "./pages/Blog";
import Account from "./pages/Account";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/AuthContext";
import Notfound from "./pages/notfound";

function App() {
  const {user,setUser} = useContext(UserContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.username === "" ? <Login /> : <Navigate to="/home" />}/>
        <Route path="/home" element={user?.username !== "" ? <Home /> : <Navigate to="/" />}/>
        <Route path="/form" element={user?.username !== "" ? <Form /> : <Navigate to="/" />}/>
        <Route path="/:id" element={user?.username !== "" ? <Blog /> : <Navigate to="/" />}/>
        <Route path={`/${user.username}blogs`} element={user?.username !== "" ? <Account /> : <Navigate to="/" />}/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
