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
import { setConfigStore, setConfig, removeConfig } from 'actions/configs'

import { setEnterprises, setBranchOffices, removeData, setIdEnterprise, setIdBranchOffice} from 'actions/enterpriseSucursal'
import { API_URL } from 'utils/constants'
import { ToastContainer, toast } from 'react-toastify'
import { setAuthorizationToken } from 'utils/functions'
import axios from 'axios'

const MainContainer = props => {

    useEffect(() => {
      let function_async = async () => {
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

            let promises = [
              axios.get(API_URL+'config_general'),
              axios.get(API_URL+'config_store'),
            ]

            if( parseInt(JSON.parse(localStorage.getItem('user')).id_rol,10) === 2 || parseInt(JSON.parse(localStorage.getItem('user')).id_rol,10) === 8){
              promises.push(
                axios.get(API_URL+'enterprises_branch_office') // petición para traer las empresas y las sucursales a los dueños de empresas
              )
            }

            try {

              let response = await Promise.all(promises)

              localStorage.setItem('configGeneral',JSON.stringify(response[0].data))
              localStorage.setItem('configStore',JSON.stringify(response[1].data))
              props.setConfig(response[0].data)
              props.setConfigStore(response[1].data)
              if(localStorage.getItem('id_enterprise')){
                props.setIdEnterprise(localStorage.getItem('id_enterprise'))
              }

              if(localStorage.getItem('id_branch_office')){
                props.setIdBranchOffice(localStorage.getItem('id_branch_office'))
              }

              if(response.length > 2){
                props.setEnterprises(response[2].data.enterprises)
                props.setBranchOffices(response[2].data.branchOffices)
              }

            } catch (e) {
              console.log(e,e.response);
              toast.error('Error, contacte con soporte si este error persiste')
            }

          }

        }
      }
    function_async()
  },[])

    useEffect(() => {

      if(!props.isLogin){
        let userLocal = JSON.parse(localStorage.getItem('user'))
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('configStore')
        localStorage.removeItem('configGeneral')
        localStorage.removeItem('cash_register')
        localStorage.removeItem('id_enterprise')
        localStorage.removeItem('id_branch_office')
        setAuthorizationToken(null);
        props.removeMenu()
        props.removeData()
        props.removeConfig()
      }

    },[props.isLogin])

    const handleLogoutUser = async () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('configStore')
      localStorage.removeItem('configGeneral')
      localStorage.removeItem('cash_register')
      localStorage.removeItem('id_enterprise')
      localStorage.removeItem('id_branch_office')
      setAuthorizationToken(null);
      props.removeMenu()
      props.resetCart()
      props.removeData()
      props.removeConfig()
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
            {React.cloneElement(props.children,{tokenExpired: logoutUserByTokenExpired})}
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
    setEnterprises: PropTypes.func.isRequired,
    setBranchOffices: PropTypes.func.isRequired,
    removeData: PropTypes.func.isRequired,
    setIdEnterprise: PropTypes.func.isRequired,
    setIdBranchOffice: PropTypes.func.isRequired,
    setConfigStore: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
    removeConfig: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    isLogin : state.auth.isAuthenticated,
    menu: state.menu.modules,
    configs: state.configs,
    enterpriseSucursal: state.enterpriseSucursal
  }
}

function mapDispatchToProps(){
    return {
      login,
      logout,
      resetCart,
      setMenu,
      removeMenu,
      setEnterprises,
      setBranchOffices,
      removeData,
      setIdEnterprise,
      setIdBranchOffice,
      setConfigStore, setConfig, removeConfig
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(MainContainer);
