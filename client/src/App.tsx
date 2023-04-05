import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Blog from "./pages/Blog";
import Account from "./pages/Account";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/form" element={<Form />}/>
        <Route path="/Blog" element={<Blog />}/>
        <Route path="/account" element={<Account />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
