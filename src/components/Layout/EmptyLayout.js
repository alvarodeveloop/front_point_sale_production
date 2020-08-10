import { Content } from 'components/Layout';
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from 'actions/auth'
import  'styles/AuthStyle.css'
import AuthPage from 'pages/AuthPage'
const EmptyLayout = ({ children, isLogin, login, ...restProps }) => {
  if(isLogin){
    return(<Redirect to="dashboard" />)
  }else{
    return(<AuthPage loginDispatch={login} />)
  }
}

EmptyLayout.propTypes = {
    isLogin : PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    isLogin : state.auth.isAuthenticated
  }
}

function mapDispatchToProps(){
    return {
      login
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(EmptyLayout);
