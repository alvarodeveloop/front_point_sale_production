import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import Table from 'components/Table'
import { flowCashAccountModal, flowCashCenterModal } from 'utils/columns/flowCash'
import * as moment from 'moment-timezone'
import {
  FaCloudDownloadAlt
} from 'react-icons/fa'
import FileSaver from 'file-saver'
import { API_URL } from 'utils/constants'
import {
  Button
} from 'react-bootstrap'
import { formatNumber } from 'utils/functions'
import axios from 'axios'
import { toast } from 'react-toastify'

let columns_table = []
const TableEarningExpensiveComponent = props => {

  useEffect(() => {
    return () => {
      columns_table = []
    }
  },[])

  useMemo(() => {
    columns_table = [
      {
        Header: 'Nombre',
        accessor: 'name'
      },
      {
        Header: 'Descripción',
        accessor: 'description'
      },
      {
        Header: 'Monto',
        accessor: props1 => [formatNumber(props1.amount,2,',','.')],
      },
      {
        Header: props.isAccount ? 'Centro de Costros' : 'Cuenta',
        accessor: props1 => {
          if(props.isReport){
            if(props.isAccount){
              return [props1.center_coste]
            }else{
              return [props1.account_name]
            }
          }else{
            if(props.isAccount){
              return [props1.centerCoste.name]
            }else{
              return [props1.account.account_name]
            }
          }
        }
      },
      {
        Header: 'Fecha de Ejecución',
        accessor: props1 => props1.date_execution ? [moment(props1.date_execution).format('DD-MM-YYYY')] : ['No posee']
      },
      {
        Header: 'Es recurrente',
        accessor: props1 => [props1.is_recurrent ? 'Si' : 'No']
      },
      {
        Header: 'Documento1',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.document_1){
            return (
              <Button size="sm" variant="link" onClick={() => downloadDocument(original.document_1) }>Descargar <FaCloudDownloadAlt /> </Button>
            )
          }else{
            return 'No posee'
          }
        }
      },
      {
        Header: 'Documento2',
        Cell: props1 => {
          const { original } = props1.cell.row
          if(original.document_2){
            return (
              <Button size="sm" variant="link" onClick={() => downloadDocument(original.document_2) }>Descargar <FaCloudDownloadAlt /> </Button>
            )
          }else{
            return 'No posee'
          }
        }
      },
    ]
  },[])

  const downloadDocument = doc => {
    axios.get(API_URL+'flow_cash_doc_download/'+doc,{
      responseType: 'blob'
    }).then(result => {
      FileSaver.saveAs(result.data,doc);
    }).catch(err => {
      if(err.response){
        toast.error(err.response.data.message)
      }else{
        toast.error('Error, contacte con soporte')
      }
    })
  }

  return (
    <Table data={props.data} columns={columns_table} />
  )
}

TableEarningExpensiveComponent.propTypes = {
  isAccount : PropTypes.bool.isRequired,
  isReport: PropTypes.bool,
  data : PropTypes.array.isRequired
}

export default TableEarningExpensiveComponent
