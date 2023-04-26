import './App.css';
import "./styles/navbar.css";
import "./styles/app-body.css";

import { Home } from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
