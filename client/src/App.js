import React, { Fragment, useEffect } from 'react';
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
<<<<<<< HEAD
import AddHike from './components/profile-forms/AddHike'
import AddCourse from './components/profile-forms/AddCourse'
=======
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
>>>>>>> 8ed282e71425a9873233f885dc2b5c417bfc710e
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import PostForm from './components/posts/PostForm'
<<<<<<< HEAD
import MapSearch from './components/trails-map/MapSearch'
=======

import ImageChoice from './components/profile-forms/ImageChoice'
>>>>>>> 8ed282e71425a9873233f885dc2b5c417bfc710e


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
        <Fragment>
          <NavBar />
<<<<<<< HEAD
          <Switch>
            <Route exact path='/' component={Landing} />
            <div className="container">
              <Alert />
              <Switch>
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
            </div>
          </Switch>
=======
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />

              <Route path="/images" component={ImageChoice} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/make-post" component={PostForm} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
              <Route component={UnknownRoute} />
            </Switch>

          </section>
>>>>>>> 8ed282e71425a9873233f885dc2b5c417bfc710e
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
