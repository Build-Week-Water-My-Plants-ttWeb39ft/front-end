import "./App.css";
import Signup from "./components/Signup.js";
import AddPlant from './components/AddPlant';
import Login from "./components/Login.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home.js";


function App() {
  return (

    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Login" component={Login}></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
