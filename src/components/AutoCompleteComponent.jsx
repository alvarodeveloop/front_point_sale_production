import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete'
import { FaSearch } from 'react-icons/fa'
import 'styles/components/autoComplete.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const AutoCompleteComponent = (props) => {

  const [value, setValue] = useState('')

  return (
    <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled">{props.titleTooltip ? props.titleTooltip : ''}</Tooltip>}>
      <div className="input-search">
        <FaSearch />
        <Autocomplete
          getItemValue={(item) => item[props.keyName]}
          items={props.items}
          shouldItemRender={(item, value) =>{
            return !item[props.keyName].toLowerCase().indexOf(value.toLowerCase())
          } }

          renderItem={ (item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item[props.keyName]} >
              { item[props.keyName] }
            </div>
          }
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if(e.target.value === ""){
              props.showAllCategories()
            }
          }}
          onSelect={(val) =>{
            setValue(val)
            props.returnValue(val)
          }}
        />
      </div>
    </OverlayTrigger>
  )
}

AutoCompleteComponent.propTypes = {
  items: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  returnValue: PropTypes.func.isRequired,
  showAllCategories: PropTypes.func
}

export default AutoCompleteComponent
