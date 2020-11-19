import "./App.css";
import Signup from "./components/Signup.js";
import AddPlant from "./components/AddPlant";
import AddPlantNew from "./components/AddPlantNew";
import Login from "./components/Login.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProtectedPage } from "./components/ProtectedPage";
import history from "./components/history";
import EditPlant from "./components/EditPlant";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Login" component={Login} />
          <Route path="/Add-plant-new" component={AddPlantNew} />
          <Route path="/Add-plant" component={AddPlant} />
          <Route path="/Edit-plant" component={EditPlant}/>
          <ProtectedRoute exact path="/My-plants" component={ProtectedPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
