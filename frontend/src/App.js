import {BrowserRouter as Router,Route} from "react-router-dom";

import Landing from './pages/Landing';
import Home from './pages/Home';

import './App.css';


function App() {

  return (
   
    <Router>
        {/* Landing Page */}
        <Route exact path="/" component={Landing} />     
        {/* Game Starts on this route */}
        <Route exact path="/:level" component={Home} />                    
    </Router>
  );
}

export default App;
