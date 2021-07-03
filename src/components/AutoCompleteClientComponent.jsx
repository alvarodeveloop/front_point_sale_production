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
    if (props.resetValue) {
      setValue('')
      props.handleResetValueClient()
    }
  }, [props.resetValue])

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: '1000' }}>
      <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled3">Buscar Cliente</Tooltip>}>
        <div className="input-search">
          <FaSearch />
          <Autocomplete
            getItemValue={(item) => {
              let string = item.name_client;
              string = item.data_document ? string + "/" + item.data_document : string;
              string = item.dv ? string + "-" + item.dv : string;
              return string;
            }}
            items={props.items}
            shouldItemRender={(item, value) => {
              return item.name_client ? !item.name_client.toLowerCase().indexOf(value.toString().toLowerCase()) : item.data_document ? !item.data_document.toLowerCase().indexOf(value.toString().toLowerCase()) : item.dv ? !item.dv.toString().toLowerCase().indexOf(value.toString().toLowerCase()) : "";
            }}

            renderItem={(item, isHighlighted) => {
              if (item.data_document && item.dv) {
                return (
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.name_client + "-" + item.id} >
                    {item.name_client + "/" + item.data_document + "-" + item.dv}
                  </div>
                )
              } else if (item.data_document) {
                return (

                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.name_client + "-" + item.id} >
                    {item.name_client + "/" + item.data_document}
                  </div>
                )
              } else {
                return (

                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.name_client + "-" + item.id} >
                    {item.name_client}
                  </div>
                )
              }

            }}
            value={value}

            onChange={(e) => setValue(e.target.value)}

            onClick={(val) => {
              setValue(val)
              props.returnValue(val)
            }}

            onSelect={(val) => {
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
