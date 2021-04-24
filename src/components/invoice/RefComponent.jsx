import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Accordion,
  Button,
  Card
} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {FaPlusCircle,FaTrash,FaBook} from 'react-icons/fa'
import InputField from 'components/input/InputComponent'

const RefComponent = (props) => {
  return (
    <React.Fragment>
      {!props.isNotAccordeon ? (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2" className="header_card">
            <b>Referencias </b> <FaBook /> ( hacer click para desplegar los campos )
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Row>
                  <Col sm={12} md={12} lg={12} className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center tr_cabecera">#</th>
                          <th className="text-center tr_cabecera">Tipo Documento</th>
                          <th className="text-center tr_cabecera">Ind</th>
                          <th className="text-center tr_cabecera">Folio</th>
                          <th className="text-center tr_cabecera">Fecha Ref</th>
                          <th className="text-center tr_cabecera">Razón Ref</th>
                          <th className="text-center tr_cabecera">Tipo de Código</th>
                          <th className="text-center tr_cabecera"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.refCotizacion.map((v,i) => (
                          <tr key={i}>
                            <td>
                              <br/>
                              {i + 1}
                            </td>
                            <td>
                              <Row>
                                <InputField
                                  className="letras_grandes"
                                  type='select'
                                  label=''
                                  id={"type_document_ref"+i}
                                  name='type_document'
                                  required={i === 0 ? true : false}
                                  messageErrors={[
                                    'Requerido*'
                                  ]}
                                  cols='col-md-12 col-lg-12 col-sm-12'
                                  value={props.refCotizacion[i].type_document}
                                  handleChange={(e) => {props.onChangeTableRef(e,i)}}
                                  >
                                  <option value="">--Seleccione--</option>
                                  <option value={"HES"}>Hoja Entrada de Servicio</option>
                                </InputField>
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <InputField
                                  className="letras_grandes"
                                  type='text'
                                  label=''
                                  id={"ind_ref"+i}
                                  name='ind'
                                  required={i === 0 ? true : false}
                                  messageErrors={[
                                    'Requerido*'
                                  ]}
                                  cols='col-md-12 col-lg-12 col-sm-12'
                                  value={props.refCotizacion[i].ind}
                                  handleChange={(e) => {props.onChangeTableRef(e,i)}}
                                  />
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <InputField
                                  className="letras_grandes"
                                  type='text'
                                  label=''
                                  id={"ref_cotizacion_ref"+i}
                                  name='ref_cotizacion'
                                  required={i === 0 ? true : false}
                                  messageErrors={[
                                    'Requerido*'
                                  ]}
                                  cols='col-md-12 col-lg-12 col-sm-12'
                                  value={props.refCotizacion[i].ref_cotizacion}
                                  handleChange={(e) => {props.onChangeTableRef(e,i)}}
                                  />
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <InputField
                                  className="letras_grandes"
                                  type='date'
                                  label=''
                                  id={"date_ref_ref"+i}
                                  name='date_ref'
                                  required={i === 0 ? true : false}
                                  messageErrors={[
                                    'Requerido*'
                                  ]}
                                  cols='col-md-12 col-lg-12 col-sm-12'
                                  value={props.refCotizacion[i].date_ref}
                                  handleChange={(e) => {props.onChangeTableRef(e,i)}}
                                  />
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <InputField
                                  className="letras_grandes"
                                  type='text'
                                  label=''
                                  id={"reason_ref_ref"+i}
                                  name='reason_ref'
                                  required={i === 0 ? true : false}
                                  messageErrors={[
                                    'Requerido*'
                                  ]}
                                  cols='col-md-12 col-lg-12 col-sm-12'
                                  value={props.refCotizacion[i].reason_ref}
                                  handleChange={(e) => {props.onChangeTableRef(e,i)}}
                                  />
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <InputField
                                  className="letras_grandes"
                                  type='text'
                                  label=''
                                  id={"type_code_ref"+i}
                                  name='type_code'
                                  required={false}
                                  messageErrors={[

                                  ]}
                                  cols='col-md-12 col-lg-12 col-sm-12'
                                  value={props.refCotizacion[i].type_code}
                                  handleChange={(e) => {props.onChangeTableRef(e,i)}}
                                  />
                              </Row>
                            </td>
                            <td>
                              <br/>
                              <Button variant="danger" size="sm" type="button" onClick={() => {props.removeProductRef(i)}}><FaTrash /></Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col sm={1} md={1} lg={1}>
                    <OverlayTrigger placement={'right'} overlay={<Tooltip id="tooltip-disabled2">Agregar Referencia</Tooltip>}>
                      <Button className="button_product_base" variant="danger" block={true} type="button" onClick={props.addRef}><FaPlusCircle /></Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
      ) : (
        <React.Fragment>
          <Row className="justify-content-center">
            <Col sm={4} md={4} lg={4}>
              <Button variant="danger" block={true} type="button" size="sm" onClick={props.addRef}>Agregar Referencia <FaPlusCircle /></Button>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={12} md={12} lg={12} className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center tr_cabecera">#</th>
                    <th className="text-center tr_cabecera">Tipo Documento</th>
                    <th className="text-center tr_cabecera">Ind</th>
                    <th className="text-center tr_cabecera">Folio</th>
                    <th className="text-center tr_cabecera">Fecha Ref</th>
                    <th className="text-center tr_cabecera">Razón Ref</th>
                    <th className="text-center tr_cabecera">Tipo de Código</th>
                    <th className="text-center tr_cabecera"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.refCotizacion.map((v,i) => (
                    <tr key={i}>
                      <td>
                        <br/>
                        {i + 1}
                      </td>
                      <td>
                        <Row>
                          <InputField
                            className="letras_grandes"
                            type='select'
                            label=''
                            id={"type_document_ref"+i}
                            name='type_document'
                            required={i === 0 ? true : false}
                            messageErrors={[
                              'Requerido*'
                            ]}
                            cols='col-md-12 col-lg-12 col-sm-12'
                            value={props.refCotizacion[i].type_document}
                            handleChange={(e) => {props.onChangeTableRef(e,i)}}
                            >
                            <option value="">--Seleccione--</option>
                            <option value={"Hoja Entrada de Servicio"}>Hoja Entrada de Servicio</option>
                          </InputField>
                        </Row>
                      </td>
                      <td>
                        <Row>
                          <InputField
                            className="letras_grandes"
                            type='text'
                            label=''
                            id={"ind_ref"+i}
                            name='ind'
                            required={i === 0 ? true : false}
                            messageErrors={[
                              'Requerido*'
                            ]}
                            cols='col-md-12 col-lg-12 col-sm-12'
                            value={props.refCotizacion[i].ind}
                            handleChange={(e) => {props.onChangeTableRef(e,i)}}
                            />
                        </Row>
                      </td>
                      <td>
                        <Row>
                          <InputField
                            className="letras_grandes"
                            type='text'
                            label=''
                            id={"ref_cotizacion_ref"+i}
                            name='ref_cotizacion'
                            required={i === 0 ? true : false}
                            messageErrors={[
                              'Requerido*'
                            ]}
                            cols='col-md-12 col-lg-12 col-sm-12'
                            value={props.refCotizacion[i].ref_cotizacion}
                            handleChange={(e) => {props.onChangeTableRef(e,i)}}
                            />
                        </Row>
                      </td>
                      <td>
                        <Row>
                          <InputField
                            className="letras_grandes"
                            type='date'
                            label=''
                            id={"date_ref_ref"+i}
                            name='date_ref'
                            required={i === 0 ? true : false}
                            messageErrors={[
                              'Requerido*'
                            ]}
                            cols='col-md-12 col-lg-12 col-sm-12'
                            value={props.refCotizacion[i].date_ref}
                            handleChange={(e) => {props.onChangeTableRef(e,i)}}
                            />
                        </Row>
                      </td>
                      <td>
                        <Row>
                          <InputField
                            className="letras_grandes"
                            type='text'
                            label=''
                            id={"reason_ref_ref"+i}
                            name='reason_ref'
                            required={i === 0 ? true : false}
                            messageErrors={[
                              'Requerido*'
                            ]}
                            cols='col-md-12 col-lg-12 col-sm-12'
                            value={props.refCotizacion[i].reason_ref}
                            handleChange={(e) => {props.onChangeTableRef(e,i)}}
                            />
                        </Row>
                      </td>
                      <td>
                        <Row>
                          <InputField
                            className="letras_grandes"
                            type='text'
                            label=''
                            id={"type_code_ref"+i}
                            name='type_code'
                            required={false}
                            messageErrors={[

                            ]}
                            cols='col-md-12 col-lg-12 col-sm-12'
                            value={props.refCotizacion[i].type_code}
                            handleChange={(e) => {props.onChangeTableRef(e,i)}}
                            />
                        </Row>
                      </td>
                      <td>
                        <br/>
                        <Button variant="danger" size="sm" type="button" onClick={() => {props.removeProductRef(i)}}><FaTrash /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}


RefComponent.propTypes = {
  refCotizacion : PropTypes.array.isRequired,
  onChangeTableRef : PropTypes.func.isRequired,
  removeProductRef: PropTypes.func.isRequired,
  isNotAccordeon: PropTypes.bool,
}
export default RefComponent
