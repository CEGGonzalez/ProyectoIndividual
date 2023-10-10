import { Route, Switch } from "react-router-dom";

import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import Landing from "./views/Landing/landing";
import Create from "./components/Form/create";
import Update from './components/formUpdate/update';

import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/update/:id" component={Update} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
        
      </Switch>
    </div>
  );
}

export default App;

