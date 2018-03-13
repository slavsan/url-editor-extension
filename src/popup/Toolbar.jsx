import React from 'react'
import { connect } from 'react-redux'
import { func, oneOfType, number, shape, string } from 'prop-types'
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import { updateFilter } from './actions/filter'
import utils from './utils'

const mapStateToProps = state => {
  return {
    url: state.url,
    fields: state.fields,
    filter: state.filter
  }
}

const Toolbar = ({ dispatch, filter, url, fields }) => {
  return (
    <div className="toolbar">
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Filter fields .."
            value={filter}
            onChange={e => dispatch(updateFilter({ value: e.target.value }))}
          />
          <InputGroup.Button
            onClick={() => utils.changeURL(utils.buildURL(url, fields))}
          >
            <Button >Go</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </div>
  )
}

Toolbar.propTypes = {
  dispatch: func,
  filter: string,
  url: string,
  fields: shape({
    id: number,
    name: string,
    value: oneOfType(
      string,
      shape({
        key: string,
        value: string
      })
    )
  })
}

export default connect(mapStateToProps)(Toolbar)
