import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import { load_user } from './store/actions/auth';
import store from './store/store';

import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar.component';
import Landing from './components/layout/Landing.component';
import Register from './components/auth/register.componen';
import Login from './components/auth/login.component';
import Alert from './components/common/alert.component';
import Dashboard from './components/dashboard/dashboard';
import ProtectedRoute from './components/common/protected.component';
import CreaeProfile from './components/profile/profile.component';
import EditProfile from './components/profile/edit-profile.component';
import AddExperience from './components/profile/addExperience.component';
import AddEducation from './components/profile/addEducation.component';
import Profiles from './components/profiles/profiles.component';
import ViewProfile from './components/profile/viewProfile.component';
import PostsCompnent from './components/posts/posts.component';
import ViewPost from './components/post/viewPost.component';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(load_user());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <BrowserRouter>
          <Navbar></Navbar>
          <Route path='/' exact component={Landing} />

          <section className='container'>
            <Alert />
            <Switch>
              <Route path='/register' component={Register}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/profiles' component={Profiles}></Route>
              <Route path='/profile/:id' component={ViewProfile}></Route>

              <ProtectedRoute path='/dashboard' component={Dashboard}></ProtectedRoute>
              <ProtectedRoute path='/create-profile' component={CreaeProfile}></ProtectedRoute>
              <ProtectedRoute path='/edit-profile' component={EditProfile}></ProtectedRoute>
              <ProtectedRoute path='/add-experience' component={AddExperience}></ProtectedRoute>
              <ProtectedRoute path='/add-education' component={AddEducation}></ProtectedRoute>
              <ProtectedRoute exact path='/posts' component={PostsCompnent}></ProtectedRoute>
              <ProtectedRoute exact path='/posts/:id' component={ViewPost}></ProtectedRoute>
            </Switch>
          </section>
        </BrowserRouter>
      </Fragment>
    </Provider>
  );
};

export default App;
