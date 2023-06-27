import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
// Importing component pages to set up routes for and for general access inside of this app.jsx file //
import AboutPage from './Pages/AboutPage/AboutPage';
import UserPage from './Pages/UserPage/UserPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
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
import Footer from './Shared/Footer/Footer';
// End component imports //
function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
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
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <ProtectedRoute exact path='/prapor'>
            <Prapor />
          </ProtectedRoute>

          <ProtectedRoute exact path='/therapist'>
            <Therapist />
          </ProtectedRoute>

          <ProtectedRoute exact path='/notes'>
            <Notes />
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

          <ProtectedRoute exact path='/about'>
            <AboutPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
