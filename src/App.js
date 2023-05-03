import './App.css';
import "./styles/navbar.css";

import { Home } from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Explore } from './screens/Explore';
import { Profile } from './screens/Profile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/explore" exact element={<Explore />} />
        <Route path="/profile/:user" exact element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
