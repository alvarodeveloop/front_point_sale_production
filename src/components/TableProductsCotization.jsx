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

const Styles = styled.div`
  .tr_cabecera{
    background-color: rgb(218,236,242);
    font-size: 14px;

  }

  .letras_grandes{
    font-size: 14px;
  }

  .div_overflow{
    max-height: 400px;
    overflow-y: auto;
  }
`
const TableProductsCotization = (props) => {

  const onChangeTableProduct = (e,i) => {
    e.persist()
    props.setDetailProducts( oldData => {
      let newData = [...oldData]
      newData[i][e.target.name] = e.target.value
      return newData
    })
  }

  const removeProduct = i => {
    let array_copy = [...props.detailProducts]
    array_copy.splice(i,1)
    props.setDetailProducts(array_copy)
  }

  const displayTotal = productData => {
    let product = Object.assign({},productData)
    let configStore = props.configStore

    if(product.is_neto){
      product.price = product.discount ? ( parseFloat(product.price) - (( parseFloat(product.price) *  product.discount) / 100 ) ) : product.price
    }else{
      if(props.isShowIva){
        product.price = product.discount ? ( parseFloat(product.price) - (( parseFloat(product.price) *  product.discount) / 100 ) ) : product.price
      }else{
        product.price = product.discount ? ( parseFloat(product.price) - (( parseFloat(product.price) *  product.discount) / 100 ) ) : product.price
        product.price = parseFloat( (product.price * props.configStore.tax) / 100) + parseFloat(product.price) // linea para sumar el iva

      }
    }
    return formatNumber(parseFloat(product.price) * product.quantity,2,',','.')
  }

  return (
    <Styles>
      <Row className="div_overflow">
        <Col sm={12} md={12} lg={12} className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center tr_cabecera">#</th>
                <th className="text-center tr_cabecera">Categoría</th>
                <th className="text-center tr_cabecera">Nombre</th>
                <th className="text-center tr_cabecera">Descripción</th>
                <th className="text-center tr_cabecera">Cantidad</th>
                <th className="text-center tr_cabecera">Precio</th>
                <th className="text-center tr_cabecera">Descuento %</th>
                <th className="text-center tr_cabecera">Metodo de Venta</th>
                <th className="text-center tr_cabecera">Total Neto</th>
                <th className="text-center tr_cabecera"></th>
              </tr>
            </thead>
            <tbody>
              {props.detailProducts.map((v,i) => (
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
                        id={"category_product"+i}
                        name='category'
                        required={false}
                        messageErrors={[

                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailProducts[i].category}
                        handleChange={(e) => {onChangeTableProduct(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='text'
                        label=''
                        id={"name_product"+i}
                        name='name_product'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailProducts[i].name_product}
                        handleChange={(e) => {onChangeTableProduct(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='text'
                        label=''
                        id={"description_product"+i}
                        name='description'
                        required={false}
                        messageErrors={[

                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailProducts[i].description}
                        handleChange={(e) => {onChangeTableProduct(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='number'
                        label=''
                        id={"quantity_product"+i}
                        name='quantity'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailProducts[i].quantity}
                        handleChange={(e) => {onChangeTableProduct(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='text'
                        label=''
                        id={"price_product"+i}
                        name='price'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailProducts[i].price}
                        handleChange={(e) => {onChangeTableProduct(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='number'
                        label=''
                        id={"discount_product"+i}
                        name='discount'
                        required={false}
                        messageErrors={[
                          '*'
                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailProducts[i].discount}
                        handleChange={(e) => {onChangeTableProduct(e,i)}}
                        />
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='select'
                        label=''
                        id={"method_product"+i}
                        name='method_sale'
                        required={true}
                        messageErrors={[
                          'Requerido*'
                        ]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={props.detailProducts[i].method_sale}
                        handleChange={(e) => {onChangeTableProduct(e,i)}}
                        >
                        <option value="">--Seleccione--</option>
                        <option value={1}>Unidad</option>
                        <option value={2}>Mayorista</option>
                        <option value={3}>(Kilos, Litros, Gramos, Etc...)</option>
                      </InputField>
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <InputField
                        className="letras_grandes"
                        type='text'
                        label=''
                        id={"total_product"+i}
                        name='total'
                        required={false}
                        readonly={true}
                        messageErrors={[]}
                        cols='col-md-12 col-lg-12 col-sm-12'
                        value={displayTotal(v)}
                        handleChange={() => {}}
                        />
                    </Row>
                  </td>
                  <td>
                    <br/>
                    <Button variant="danger" size="sm" type="button" onClick={() => {removeProduct(i)}}><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Styles>
  )
}

TableProductsCotization.propTypes = {
  detailProducts : PropTypes.array.isRequired,
  setDetailProducts: PropTypes.func.isRequired,
  isShowIva: PropTypes.bool,
}

TableProductsCotization.defaultProps = {
  configStore : JSON.parse(localStorage.getItem('configStore'))
}

export default TableProductsCotization
