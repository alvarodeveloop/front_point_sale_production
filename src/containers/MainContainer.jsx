import React,{ useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AuthPage from 'pages/AuthPage'
import  'styles/AuthStyle.css'
import { login,logout } from 'actions/auth'
import { resetCart } from 'actions/cart'
import { MainLayout } from 'components/Layout'
import Layout1 from 'shared/layouts/Layout1'
import { setMenu, removeMenu } from 'actions/menu'
import { API_URL } from 'utils/constants'
import { ToastContainer, toast } from 'react-toastify'
import { setAuthorizationToken } from 'utils/functions'
import axios from 'axios'

const MainContainer = props => {

    useEffect( () => {
      if(props.isLogin){

        if(props.menu.length === 0){
          axios.get(API_URL+'menu_user').then(result => {
            props.setMenu(result.data)
          }).catch(err => {
            const { response } = err
            if(response){
              toast.error(response.data.message,'Error')
            }else{
              toast.error('No se pudo cargar el menú, contacte con soporte')
            }
          })
        }

        let promises = [
          axios.get(API_URL+'config_general'),
          axios.get(API_URL+'config_store'),
        ]

        Promise.all(promises).then(result => {
          localStorage.setItem('configGeneral',JSON.stringify(result[0].data))
          localStorage.setItem('configStore',JSON.stringify(result[1].data))
        }).catch(err => {
         	 if(err.response){
             toast.error(err.response.data.message)
           }else{
             toast.error('Error,contacte con soporte')
           }
        })

      }else if(!props.isLogin){
        let userLocal = JSON.parse(localStorage.getItem('user'))
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('configStore')
        localStorage.removeItem('configGeneral')
        localStorage.removeItem('id_sucursal')
        localStorage.removeItem('id_enterprise')
        localStorage.removeItem('token_facturacion')
        localStorage.removeItem('cash_register')
        setAuthorizationToken(null);
        props.removeMenu()
      }

    },[props.isLogin])

    const handleLogoutUser = async () => {
      let userLocal = JSON.parse(localStorage.getItem('user'))
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('id_sucursal')
      localStorage.removeItem('configStore')
      localStorage.removeItem('configGeneral')
      localStorage.removeItem('id_enterprise')
      localStorage.removeItem('token_facturacion')
      localStorage.removeItem('cash_register')
      setAuthorizationToken(null);
      props.removeMenu()
      props.resetCart()
      props.logout()
    }

    const logoutUserByTokenExpired = err => {
      if(err.response){
        toast.error(err.response.data.message)
        if(err.status === 400){
          setTimeout(() => {
            handleLogoutUser()
          },1500)
        }
      }else{
        console.log(err);
        toast.error('Error contacte con soporte')
      }
    }

    if(props.isLogin){

      return(

        <Layout1 {...props} menuUser={props.menu} logoutUser={handleLogoutUser} logoutByToken={logoutUserByTokenExpired}>
            {props.children}
            <ToastContainer/>
        </Layout1>

      )
    }else{
      return(
        <Redirect to="/" />
      )
    }
}

MainContainer.propTypes = {
    isLogin : PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    resetCart: PropTypes.func.isRequired,
    setMenu: PropTypes.func.isRequired,
    removeMenu: PropTypes.func.isRequired,
    menu: PropTypes.array.isRequired,
}

function mapStateToProps(state){
  return {
    isLogin : state.auth.isAuthenticated,
    menu: state.menu.modules
  }
}

function mapDispatchToProps(){
    return {
      login,
      logout,
      resetCart,
      setMenu,
      removeMenu
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(MainContainer);
