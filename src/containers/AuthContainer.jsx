import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AuthPage from 'pages/AuthPage'
import AuthPageTemplate from 'pages/AuthPageTemplate'
import  'styles/AuthStyle.css'
import { login } from 'actions/auth'

class AuthContainer extends React.Component {

  render () {
    const  { isLogin } = this.props
    return (
      <div >
        {isLogin ? (
            <Redirect to="/dashboard" />
        ) : (
          <AuthPageTemplate isLogin={isLogin} loginDispatch={this.props.login} {...this.props} />
        )}
      </div>
    )
  }
}

AuthContainer.propTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps())(AuthContainer);
