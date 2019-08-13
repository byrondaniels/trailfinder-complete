import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'
import './App.css';
import NavBar from "./components/layout/NavBar"
import Landing from "./components/layout/Landing"
import UnknownRoute from './components/layout/UnknownRoute'
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Alert from "./components/layout/Alert"
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddHike from './components/profile-forms/AddHike'
import AddCourse from './components/profile-forms/AddCourse'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import PostForm from './components/posts/PostForm'
import MapSearch from './components/trails-map/MapSearch'


import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="container" >
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-hike" component={AddHike} />
            <PrivateRoute exact path="/add-course" component={AddCourse} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/make-post" component={PostForm} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
            <Route exact path="/trails-map" component={MapSearch} />
            <Route component={UnknownRoute} />
          </Switch>
          <Alert />
        </div>

      </Router>

    </Provider >


  )
}
export default App;
