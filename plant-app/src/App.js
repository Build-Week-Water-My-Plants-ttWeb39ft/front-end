import "./App.css";
import Signup from "./components/Signup.js";
// import AddPlant from './components/AddPlant';
import Login from "./components/Login.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import ProtectedRoute from './components/ProtectedRoute';
import { ProtectedPage } from "./components/ProtectedPage";
import history from './components/history'


function App() {
  return (


    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Login" component={Login}></Route>
          <Route path="/Add-plant" component={AddPlant} />
          <ProtectedRoute exact path = "/My-plants" component={ProtectedPage} />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
