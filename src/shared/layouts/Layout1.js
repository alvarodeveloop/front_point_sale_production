import React, { useEffect,useCallback } from 'react'
import PropTypes from 'prop-types'
import LayoutNavbar from './LayoutNavbar'
import LayoutSidenav from './LayoutSidenav'
import LayoutFooter from './LayoutFooter'
import layoutHelpers from './helpers'
import PaymentViewComponent from 'components/PaymentViewComponent'
import { connect } from 'react-redux'

const Layout1 = props => {

  useEffect(() => {
    layoutHelpers.init()
    layoutHelpers.update()
    layoutHelpers.setAutoUpdate(true)
    return () => {
      layoutHelpers.destroy()
    }
  },[])
  
  const closeSidenav = (e) => {
    e.preventDefault()
    layoutHelpers.setCollapsed(true)
  }
  
  const frontChildren = (
    <div className="layout-container">
      <LayoutSidenav {...props} />

      <div className="layout-content">
        <div className="container-fluid flex-grow-1 container-p-y" style={{backgroundColor: 'white'}}>
          {props.children}
        </div>
        <LayoutFooter {...props} />
      </div>
    </div>
  )

  const renderLayout = useCallback(() => {
      if(props.enterpriseSucursal.enterprises.length){
      let enterprise =  props.enterpriseSucursal.enterprises.find(v => v.id === parseFloat(props.enterpriseSucursal.id_enterprise))
      if(enterprise && enterprise.need_payment){
        return (
          <div className="layout-container">
            <div className="layout-content">
              <PaymentViewComponent {...props} />
            </div>
          </div>
        )
      }else{
        return frontChildren
      }
      }else{
        return frontChildren
      } 
    },[props.enterpriseSucursal.id_enterprise])

  return (
    <div className="layout-wrapper layout-1">
      <div className="layout-inner">
        <LayoutNavbar {...props} />
        {renderLayout()}
      </div>
      <div className="layout-overlay" onClick={closeSidenav}></div>
    </div>
  )
}

Layout1.propTypes = {
  enterpriseSucursal: PropTypes.object,
}

function mapStateToProps(state){
  return {
    enterpriseSucursal: state.enterpriseSucursal
  }
}

export default connect(mapStateToProps,{})(Layout1)
