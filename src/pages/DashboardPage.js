import React from 'react';
import PropTypes from 'prop-types'
import Page from 'components/Page';
import EnterpriseDashboardComponent from 'components/dashboards/EnterpriseDashboardComponent'
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
        {props.user.id_rol >= 2 ? (
          <EnterpriseDashboardComponent {...props} />
        ) : ''}
      </Page>
    );

}

DashboardPage.propTypes = {
  user: PropTypes.object,
  id_branch_office: PropTypes.string.isRequired,
}

function mapStateToProps(state){
  return {
    user : state.auth.user,
    configGeneral : state.configs.config,
    id_branch_office : state.enterpriseSucursal.id_branch_office,
  }
}

export default connect(mapStateToProps,{})(DashboardPage);
