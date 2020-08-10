import { AnnouncementCard, TodosCard } from 'components/Card';
import Page from 'components/Page';
import React from 'react';
import {
  FaStoreAlt,
  FaCogs,
  FaUserFriends
} from 'react-icons/fa';
import {
  Row,
  Col,
  Button,
  Container
} from 'react-bootstrap'

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
        <Container>
          <Row className="containerDiv">
            <Col sm={4} md={4} lg={4}>
              <Button size="sm" size="sm" onClick={ () => redirectRoute('/config/config_general') } variant="secondary" block={true}>Configuración General <FaCogs /></Button>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <Button size="sm" size="sm" onClick={  () => redirectRoute('/config/config_store')  } variant="secondary" block={true}>Configuración Tienda <FaStoreAlt /></Button>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <Button size="sm" size="sm" onClick={  () => redirectRoute('/user/list')  } variant="secondary" block={true}>Usuarios <FaUserFriends /></Button>
            </Col>
          </Row>
        </Container>
      </Page>
    );

}
export default DashboardPage;
