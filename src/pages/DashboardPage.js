import React from 'react';
import PropTypes from 'prop-types'
import Page from 'components/Page';
import EnterpriseDashboardComponent from 'components/dashboards/EnterpriseDashboardComponent'
import MasterDashboardComponent from 'components/dashboards/MasterDashboardComponent'

import {connect} from 'react-redux'
import {Row,Col,Button,Container} from 'react-bootstrap'

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
      {props.user.id_rol  > 1 ? (
        <React.Fragment>
          {props.id_enterprise ? (
            <React.Fragment>
              {props.id_branch_office ? (
                <React.Fragment>
                  {props.user.id_rol >= 2 ? (
                    <Container fluid>
                      <EnterpriseDashboardComponent {...props} />
                    </Container>
                  ) : ''}
                </React.Fragment>
              ) : (
                <Row className="align-items-center">
                  <Col>
                    <p className="alert alert-info text-center">Escoja una sucursal para trabajar</p>
                  </Col>
                </Row>
              )}
            </React.Fragment>
          ) : (
            <Row className="justify-content-center">
              <Col sm={8} md={6} lg={6} xl={6}>
                <Button type="button" size="sm" onClick={() => redirectRoute("/enterprise/form")} block={true}>Crear Empresa</Button>
              </Col>
            </Row>
          )}
        </React.Fragment>
      ) : (
        <MasterDashboardComponent {...props} />
      )}
    </Page>
  );

}

DashboardPage.propTypes = {
  user: PropTypes.object,
  id_branch_office: PropTypes.string,
  id_enterprise: PropTypes.string,
}

function mapStateToProps(state){
  return {
    user : state.auth.user,
    configGeneral : state.configs.config,
    id_branch_office : state.enterpriseSucursal.id_branch_office,
    id_enterprise : state.enterpriseSucursal.id_enterprise,
  }
}

export default connect(mapStateToProps,{})(DashboardPage);
