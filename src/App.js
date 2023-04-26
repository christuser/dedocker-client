import './App.css';
import "./styles/navbar.css";
import "./styles/app-body.css";

import { Home } from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Explore } from './screens/Explore';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/explore" exact element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;
