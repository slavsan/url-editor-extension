import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, func, string } from 'prop-types'
import { ControlLabel, FormGroup, FormControl, Table } from 'react-bootstrap'
import { updateField, updateNestedField } from '../actions/fields'
import utils from '../lib/utils'
import field from '../types/field'

const mapStateToProps = state => {
  return {
    url: state.url,
    fields: state.fields,
    visibleFields: state.fields.filter(f => {
      return f.name.includes(state.filter)
    })
  }
}

const FieldsList = ({ dispatch, url, fields, visibleFields }) => {
  return (
    <div>
      {visibleFields.length === 0 && (
        <div className="no-results">No fields match this search</div>
      )}
      {visibleFields.length > 0 && (
        <Table>
          <tbody>
            {visibleFields.map(field => (
              <tr key={field.id}>
                <td>
                  <ControlLabel>{field.name}</ControlLabel>
                </td>
                <td>
                  {typeof field.value === 'object' ? (
                    <div>
                      {field.value.map(f => (
                        <FormGroup key={f.key}>
                          <ControlLabel>{f.key}</ControlLabel>
                          <FormControl
                            type="text"
                            value={f.value}
                            spellCheck={false}
                            onKeyUp={(e) => {
                              if (e.keyCode === 13) {
                                utils.changeURL(utils.buildURL(url, fields))
                              }
                            }}
                            onChange={e => {
                              dispatch(updateNestedField({
                                id: field.id,
                                key: f.key,
                                value: e.target.value
                              }))
                            }}
                          />
                        </FormGroup>
                      ))}
                    </div>
                  ) : (
                    <FormControl
                      type="text"
                      value={field.value}
                      spellCheck={false}
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                          utils.changeURL(utils.buildURL(url, fields))
                        }
                      }}
                      onChange={e => {
                        dispatch(updateField({
                          id: field.id,
                          value: e.target.value
                        }))
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

FieldsList.propTypes = {
  dispatch: func,
  url: string,
  fields: arrayOf(
    field
  ),
  visibleFields: arrayOf(
    field
  )
}

export default connect(mapStateToProps)(FieldsList)
