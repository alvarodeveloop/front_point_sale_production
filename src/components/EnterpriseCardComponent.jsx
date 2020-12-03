import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Image,
  Dropdown,
  DropdownButton,
  Badge
} from 'react-bootstrap'

const EnterpriseCardComponent = ({enterprise,...props}) => {
  return (
    <React.Fragment>
      <h4 style={{color: 'rgb(180, 55, 33)', textTransform: 'uppercase', fontSize: "12px"}}>{enterprise.bussines_name}</h4>
      <Image src={require('../assets/img/logo/AIDY_01.jpg')} style={{width: '100%'}}/>
      <br/>
      <span className="letras_negras">Estado :</span> {enterprise.is_open ? (<Badge variant="success" className="font_badge">Abierta</Badge>) : (<Badge variant="danger" className="font_badge">Cerrada</Badge>)}
      <br/><br/>
      <DropdownButton size="sm" id={'drop'+enterprise.id} title="Acciones" style={{width: "100%"}}>
        <Dropdown.Item onClick={() => props.modifyRegister(enterprise)}>Modificar</Dropdown.Item>
        <Dropdown.Item onClick={() => props.deleteRegister(enterprise.id)}>Eliminar</Dropdown.Item>
        <Dropdown.Item onClick={() => props.displayDetails(enterprise)}>Ver detalles</Dropdown.Item>
      </DropdownButton>
    </React.Fragment>
  )
}

EnterpriseCardComponent.propTypes = {
  enterprise: PropTypes.object.isRequired,
  modifyRegister: PropTypes.func.isRequired,
  deleteRegister: PropTypes.func.isRequired,
  displayDetails: PropTypes.func.isRequired,
}

export default EnterpriseCardComponent
