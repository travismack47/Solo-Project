import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import PraporInfo from './Pages/APITest';
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
import AboutPage from './Pages/AboutPage/AboutPage';
import UserPage from './Pages/UserPage/UserPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import Footer from './Shared/Footer/Footer';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import Prapor from './Pages/Prapor/Prapor';
import Therapist from './Pages/Therapist/Therapist';
import Skier from './Pages/Skier/Skier';
import Jaeger from './Pages/Jaeger/Jaeger';
import Peacekeeper from './Pages/Peacekeeper/Peacekeeper';
import Mechanic from './Pages/Mechanic/Mechanic';
import Ragman from './Pages/Ragman/Ragman';
import Notes from './Pages/Notes/Notes';
import './App.css';
import Nav from './Shared/Nav/Nav';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.id && <Nav />}
        <Switch>
          <Redirect exact from="/" to="/home" />


          <ProtectedRoute
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?

              <Redirect to="/user" />
              :
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?

              <Redirect to="/user" />
              :
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?

              <Redirect to="/user" />
              :
              <LandingPage />
            }
          </Route>

          <ProtectedRoute exact path='/prapor'>
            <Prapor />
          </ProtectedRoute>

          <ProtectedRoute exact path='/therapist'>
            <Therapist />
          </ProtectedRoute>


          <ProtectedRoute exact path='/skier'>
            <Skier />
          </ProtectedRoute>

          <ProtectedRoute exact path='/jaeger'>
            <Jaeger />
          </ProtectedRoute>

          <ProtectedRoute exact path='/peacekeeper'>
            <Peacekeeper />
          </ProtectedRoute>

          <ProtectedRoute exact path='/mechanic'>
            <Mechanic />
          </ProtectedRoute>

          <ProtectedRoute exact path='/ragman'>
            <Ragman />
          </ProtectedRoute>

          <Route exact path='/about'>
            <AboutPage />
          </Route>


          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
