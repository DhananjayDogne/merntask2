import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Nav from './Component/Navbar/Nav';
import Home from './Component/Home/Home';
import Login from './Component/Authentication/Login.js';
import Signup from './Component/Authentication/Signup';
import AddPost from './Component/AddPost/AddPost';
import './App.css';

import PostState from './Context/PostState';

function App() {
  return (
    <div className="App">
    <PostState> 
      <Router>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/addpost" element={<AddPost />} ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </Router>
    
      </PostState>
    </div>
  );
}

export default App;
