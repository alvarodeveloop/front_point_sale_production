import React from 'react';
import PropTypes from 'prop-types'
import Page from 'components/Page';
import DashboardEnterpriseComponent from 'components/dashboard/DashboardEnterpriseComponent'
import {connect} from 'react-redux'

const DashboardPage = props => {

  const redirectRoute = route => {
    props.history.replace(route)
  }

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        {props.user.id_rol == 2 ? (
        <DashboardEnterpriseComponent {...props} />
        ) : ''}
      </Page>
    );

}

DashboardPage.propTypes = {
  user: PropTypes.object,
}

function mapStateToProps(state){
  return {
    user : state.auth.user
  }
}

export default connect(mapStateToProps,{})(DashboardPage);
