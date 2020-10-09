import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete'
import { FaSearch } from 'react-icons/fa'
import 'styles/components/autoComplete.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const AutoCompleteClientComponent = (props) => {

  const [value, setValue] = useState('')

  useEffect(() => {
    if(props.resetValue){
      setValue('')
      props.handleResetValueClient()
    }
  },[props.resetValue])

  return (
    <div style={{width: '100%',position: 'relative', zIndex: '1000'}}>
      <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled3">Buscar Cliente</Tooltip>}>
        <div className="input-search">
          <FaSearch />
          <Autocomplete
            getItemValue={(item) => item.name_client+'/'+item.data_document}
            items={props.items}
            shouldItemRender={(item, value) =>{
              return !item.name_client.toLowerCase().indexOf(value.toString().toLowerCase()) || !item.data_document.toLowerCase().indexOf(value.toString().toLowerCase())
            }}

            renderItem={ (item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.name_client+"-"+item.data_document} >
                { item.name_client }
              </div>
            }
            value={value}

            onChange={(e) =>setValue(e.target.value) }

            onClick={(val) =>{
              console.log('aqui perro');
              setValue(val)
              props.returnValue(val)
            }}

            onSelect={(val) =>{
              setValue(val)
              props.returnValue(val)
            }}
            />
        </div>
      </OverlayTrigger>
    </div>
  )
}

AutoCompleteClientComponent.propTypes = {
  items: PropTypes.array.isRequired,
  returnValue: PropTypes.func.isRequired,
  resetValue: PropTypes.bool.isRequired,
  handleResetValueClient: PropTypes.func.isRequired
}

export default AutoCompleteClientComponent
