import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LayoutNavbar from './LayoutNavbar'
import LayoutSidenav from './LayoutSidenav'
import LayoutFooter from './LayoutFooter'
import layoutHelpers from './helpers'
import PaymentViewComponent from 'components/PaymentViewComponent'
import { connect } from 'react-redux'

class Layout1 extends Component {

  
  closeSidenav(e) {
    e.preventDefault()
    layoutHelpers.setCollapsed(true)
  }

  componentDidMount() {
    layoutHelpers.init()
    layoutHelpers.update()
    layoutHelpers.setAutoUpdate(true)
  }

  componentWillUnmount() {
    layoutHelpers.destroy()
  }

  frontChildren(){
    return(
      <div className="layout-container">
        <LayoutSidenav {...this.props} />

        <div className="layout-content">
          <div className="container-fluid flex-grow-1 container-p-y" style={{backgroundColor: 'white'}}>
            {this.props.children}
          </div>
          <LayoutFooter {...this.props} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="layout-wrapper layout-1">
        <div className="layout-inner">
          <LayoutNavbar {...this.props} />
          {this.props.enterpriseSucursal.enterprises.length ? this.props.enterpriseSucursal.enterprises.find(v => v.id === parseFloat(this.props.enterpriseSucursal.id_enterprise)).need_payment ? (
            <div className="layout-container">
              <div className="layout-content">
                <PaymentViewComponent {...this.props} />
              </div>
            </div>
          ) : (
            <>
              {this.frontChildren()}
            </>
          ) : (
            <>
              {this.frontChildren()}
            </>
          )}
        </div>
        <div className="layout-overlay" onClick={this.closeSidenav}></div>
      </div>
    )
  }
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
