import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import LandingPage from "./components/LandingPage.jsx";
import CreateDog from "./components/CreateDog.jsx";
import Detail from "./components/Detail.jsx";

//defino las rutas a renderizar y los componentes en cada ruta

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/createDog" component={CreateDog} />
          <Route path="/home/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
