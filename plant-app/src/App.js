import "./App.css";
import Signup from "./components/Signup.js";
import AddPlant from "./components/AddPlant";
import Login from "./components/Login.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProtectedPage } from "./components/ProtectedPage";
import EditPlant from "./components/EditPlant";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Add-plant" component={AddPlant} />
          <Route path="/Edit-plant/:id" render={props=>(
            <EditPlant {...props} /> )}/>
          <ProtectedRoute exact path="/My-plants" component={ProtectedPage} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
