import React, { Component } from 'react'
import { connect } from 'react-redux'
import {FaRegCopyright} from 'react-icons/fa'

class LayoutFooter extends Component {
  render() {
    return (
      <nav className={`layout-footer footer bg-${this.props.footerBg}`}>
        <div className="container-fluid container-p-x pb-3 text-center">
          Aidy-2020 <FaRegCopyright />Copyright
        </div>
      </nav>
    )
  }
}

export default connect(store => ({
  footerBg: store.theme.footerBg
}))(LayoutFooter)
