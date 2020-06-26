import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ isAuthticated, loading, component: Component, ...rest }) =>
!isAuthticated && !loading ? (<Redirect to='/login' /> ): <Route {...rest} render={props=> (<Component {...props} />)}></Route>;

const mapStateToProps = (state) => ({
  isAuthticated: state.auth.isAuthticated,
  loading: state.auth.loading,
});

const connectComponent = connect(mapStateToProps);

export default connectComponent(ProtectedRoute);
