import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'
import Movie from './SinglePage'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route> 

        <Route path="/movies/:id" >
          <Movie />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
