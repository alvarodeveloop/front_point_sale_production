import React from 'react'
import PropTypes from 'prop-types'
import { formatNumber } from 'utils/functions'
import InputField from 'components/input/InputComponent'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import {
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Styles = styled.div`
  .tr_cabecera{
    background-color: rgb(218,236,242);
    font-size: 14px;

  }

  .letras_grandes{
    font-size: 14px;
  }

  .div_overflow{
    max-height: 1700px;
    overflow-y: auto;
  }
`
const TableBondsBillComponent = (props) => {

  const onChangeTableBonds = (e,i) => {
    e.persist()
    props.setDetailBonds( oldData => {
      let newData = [...oldData]
      newData[i][e.target.name] = e.target.value
      return newData
    })
  }

  const removeBill = i => {
    let array_copy = [...props.detailBonds]
    array_copy.splice(i,1)
    props.setDetailBonds(array_copy)
  }

  const addPayment = () => {
    let new_object = {
      detail: '',
      amount: '',
      id_type_bond: ''
    }
    props.setDetailBonds([...props.detailBonds,new_object])
  }

  return (
    <Styles>
      <Row className="justify-content-center">
        <Col sm={5} md={5} lg={5} className="text-center">
          <Button size="sm" variant="danger" block={true} onClick={addPayment}>Agregar pago a la boleta <FaPlusCircle /></Button>
        </Col>
      </Row>
      <br/>
      <Row className="">
        <Col sm={12} md={12} lg={12} className="table_responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center tr_cabecera">#</th>
                <th className="text-center tr_cabecera">Detalle</th>
                <th className="text-center tr_cabecera">Monto</th>
                <th className="text-center tr_cabecera">Tipo de Pago</th>
                <th className="text-center tr_cabecera"></th>
              </tr>
            </thead>
            <tbody>
              {props.detailBonds.map((v,i) => (
                <tr key={i}>
                  <td>
                    <br/>
                    {i + 1}
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='text'
                        label=''
                        id={"detalle"+i}
                        name='detail'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailBonds[i].detail}
                        handleChange={(e) => {onChangeTableBonds(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='text'
                        label=''
                        id={"amount"+i}
                        name='amount'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailBonds[i].amount}
                        handleChange={(e) => {onChangeTableBonds(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='select'
                        label=''
                        id={"type_bond"+i}
                        name='id_type_bond'
                        required={false}
                        messageErrors={[

                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailBonds[i].id_type_bond}
                        handleChange={(e) => {onChangeTableBonds(e,i)}}
                      >
                        <option value=''>--Seleccione--</option>
                        {props.typePayments.map((v,i) => (
                          <option value={v.id} key={i}>{v.name}</option>
                        ))}
                      </InputField>
                    </Row>
                  </td>
                  <td>
                    <br/>
                    <Button variant="danger" size="sm" type="button" onClick={() => {removeBill(i)}}><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={4} md={4} lg={4}>
          <Button size="sm" block={true} type="button" onClick={() => props.changeSection(5,false)} variant="secondary">Atrás</Button>
        </Col>
        <Col sm={4} md={4} lg={4}>
        <Button size="sm" block={true} type="button" onClick={() => props.changeSection(7,true)} variant="secondary">siguiente</Button>
        </Col>
      </Row>
    </Styles>
  )
}

TableBondsBillComponent.propTypes = {
  detailBonds : PropTypes.array.isRequired,
  setDetailBonds: PropTypes.func.isRequired,
  typePayments: PropTypes.array.isRequired,
  changeSection: PropTypes.func,
}

TableBondsBillComponent.defaultProps = {
  configStore : JSON.parse(localStorage.getItem('configStore'))
}

export default TableBondsBillComponent
