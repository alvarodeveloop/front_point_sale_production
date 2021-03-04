import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Image, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { setEnterprises, setBranchOffices, setIdEnterprise, setIdBranchOffice} from 'actions/enterpriseSucursal'
import { setMenu } from 'actions/menu'
import layoutHelpers from './helpers'
import InputField from 'components/input/InputComponent'
import axios from 'axios'
import {API_URL} from 'utils/constants'
import styled from 'styled-components'
import { setConfigStore, setConfig } from 'actions/configs'
import { setAuthorizationToken } from 'utils/functions'
import {FaUser} from 'react-icons/fa'

const Styles = styled.div`
  .border_success{
    border: 1px solid rgb(76, 138, 233);
    box-shadow: 0px 0px 5px 5px rgb(76, 138, 233);
    color: white;
  }

  .imageRotateHorizontal{
    -moz-animation: spinHorizontal 13s infinite linear;
    -o-animation: spinHorizontal 13s infinite linear;    
    -webkit-animation: spinHorizontal 13s infinite linear;
    animation: spinHorizontal 13s infinite linear;
  }

  @keyframes spinHorizontal {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
  }
`

const LayoutNavbar = (props) => {


  const [isRTL,setIsRTL] = useState(document.documentElement.getAttribute('dir') === 'rtl')
  const [objectMessage, setObjectMessage] = useState({
    displayMessage: false,
    borderSuccess: false
  })

  useEffect(() => {
    if(props.displayMessageNav){
      setObjectMessage({
        displayMessage : true,
        borderSuccess : true
      })
    }else{
      setObjectMessage({
        displayMessage : false,
        borderSuccess : false
      })
    }
  },[props.displayMessageNav])
  const toggleSidenav = e => {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  const handleSelectEnterpriseBranch = async (e,type) => {
    e.persist()
    let val = e.target.value ? e.target.value : false
    setObjectMessage({...objectMessage, displayMessage : true})
    try {
      if(type === "enterprise"){
        let branch = await axios.get(API_URL+'enterprises_branch_office/'+val)
        props.setBranchOffices(branch.data.branchOffices)
        props.setIdBranchOffice("")
        if(branch.data.menu){
          props.setMenu(branch.data.menu)
        }
        localStorage.setItem('id_enterprise',val)
        if(val){
          localStorage.setItem('configGeneral',JSON.stringify(branch.data.config))
          props.setConfig(branch.data.config)
        }else{
          localStorage.removeItem('configGeneral')
          props.setConfig({})
        }
        props.setIdEnterprise(val)
        if(branch.data.token){
          localStorage.setItem('token',branch.data.token)
          setAuthorizationToken(branch.data.token)
        }
        setObjectMessage({displayMessage : false,borderSuccess: true})
        setTimeout(function () {
          setObjectMessage({...objectMessage, borderSuccess: false})
        }, 1000);
      }else{
        let branch = await axios.get(API_URL+'enterprises_branch_office/'+null+'/'+val+'/'+1)
        localStorage.setItem('id_branch_office',val)
        if(val){
          localStorage.setItem('configStore',JSON.stringify(branch.data.config))
          props.setConfigStore(branch.data.config)
        }else{
          localStorage.removeItem('configStore')
          props.setConfigStore({})
        }
        props.setIdBranchOffice(val)
        setObjectMessage({displayMessage : false,borderSuccess: true})
        setTimeout(function () {
          setObjectMessage({...objectMessage, borderSuccess: false})
        }, 1000);
      }
    } catch (e) {
      setObjectMessage({...objectMessage, displayMessage: false})
      props.logoutByToken(e)
      console.log(e);
      //toast.error('Error, si este error persiste contacte con soporte')
    }
  }

  return (
    <Styles>
      <Navbar bg={props.navbarBg} expand="md" className={`layout-navbar align-items-lg-center container-p-x ${!objectMessage.borderSuccess ? "" : "border_success"}`} style={{height: "80px"}}>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" className="imageRotateHorizontal">
          <Image src={require('../../assets/img/logo/AIDY_01.jpg')}
            width="80"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        {/* Sidenav toggle */}
        {props.sidenavToggle && (
          <Nav className="align-items-lg-center mr-auto mr-lg-4">
            <Nav.Item as="a" className="nav-item nav-link px-0 ml-2 ml-lg-0" href="#toggle" onClick={toggleSidenav}>
              <i className="ion ion-md-menu text-large align-middle"></i>
            </Nav.Item>
          </Nav>
        )}

        {/* Navbar toggle */}
        <Navbar.Toggle />

        <Navbar.Collapse>
          {
            objectMessage.displayMessage ? (
              <Nav>
                <Nav.Item>
                  <p style={{color: "rgb(200, 67, 28)"}}>Actualizando el sistema, espere por favor... <Image src={require('../../assets/img/loading.gif')} style={{width: '10px'}} /></p>
                </Nav.Item>
              </Nav>
            ) : ''
          }
          <Nav className="align-items-lg-center ml-auto">
            <div className="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div>
            {
              props.userConnect  && (props.userConnect.id_rol == 2 || props.userConnect.id_rol == 9) ? (
                <React.Fragment>
                  <Nav.Item className="nav-item nav-link px-0 ml-2 ml-lg-0" style={{width: '200px'}}>
                    <InputField
                      type='select'
                      label={<span style={{color: "rgb(198, 69, 41)"}}>Empresas</span>}
                      name='enterprise'
                      required={false}
                      value={props.enterpriseSucursal.id_enterprise}
                      messageErrors={[

                      ]}
                      cols='col-md-12 col-lg-12 col-sm-12'
                      handleChange={(e) => handleSelectEnterpriseBranch(e,'enterprise')}
                      >
                      {props.enterpriseSucursal.enterprises.map((v,i) => (
                        <option key={i} value={v.id}>{v.bussines_name}</option>
                      ))}
                    </InputField>
                  </Nav.Item>
                  <Nav.Item className="nav-item nav-link px-0 ml-2 ml-lg-0" style={{width: '200px'}}>
                    <InputField
                      type='select'
                      label={<span style={{color: "rgb(198, 69, 41)"}}>Sucursales</span>}
                      name='branch_office'
                      required={false}
                      value={props.enterpriseSucursal.id_branch_office}
                      messageErrors={[

                      ]}
                      cols='col-md-12 col-lg-12 col-sm-12'
                      handleChange={(e) => handleSelectEnterpriseBranch(e,'branch_office')}
                      >
                      <option value={""}>--Seleccione--</option>
                      {props.enterpriseSucursal.branchOffices.map((v,i) => (
                        <option key={i} value={v.id}>{v.name}</option>
                      ))}
                    </InputField>
                  </Nav.Item>
                </React.Fragment>
              ) : ''
            }

            <Dropdown as={Nav.Item} className="demo-navbar-user" alignRight={isRTL}>
              <Dropdown.Toggle as={Nav.Link}>
                <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                  <img src={`${process.env.PUBLIC_URL}/add_client.png`} className="d-block ui-w-30 rounded-circle" alt="User" />
                  <span className="px-1 mr-lg-2 ml-2 ml-lg-0">{props.userConnect.email}</span>
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item hred="#" onClick={() => props.history.replace('/profile')}><FaUser className="text-primary" /> &nbsp; Perfil</Dropdown.Item>
                <Dropdown.Item hred="#" onClick={props.logoutUser} ><i className="ion ion-ios-log-out text-danger"></i> &nbsp; Salir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  )
}

LayoutNavbar.propTypes = {
  sidenavToggle: PropTypes.bool,
  setEnterprises: PropTypes.func.isRequired,
  setBranchOffices: PropTypes.func.isRequired,
  setIdEnterprise: PropTypes.func.isRequired,
  setIdBranchOffice: PropTypes.func.isRequired,
  setConfig : PropTypes.func.isRequired,
  setConfigStore : PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired
}

LayoutNavbar.defaultProps = {
  sidenavToggle: true
}

function mapDispatchToProps() {
  return {
    setEnterprises,
    setBranchOffices,
    setIdEnterprise,
    setIdBranchOffice,
    setConfig,
    setConfigStore,
    setMenu
  }
}

export default connect(store => ({
  navbarBg: store.theme.navbarBg,
  userConnect: store.auth.user,
  enterpriseSucursal: store.enterpriseSucursal,
  displayMessageNav: store.menu.displayMessageNav
}),mapDispatchToProps())(LayoutNavbar)
