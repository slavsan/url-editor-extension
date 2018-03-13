import React from 'react'
import { connect } from 'react-redux'
import { func, oneOfType, number, shape, string } from 'prop-types'
import { ControlLabel, FormGroup, FormControl, Table } from 'react-bootstrap'
import { updateField, updateNestedField } from './actions/fields'

const mapStateToProps = state => {
  return {
    fields: state.fields,
    visibleFields: state.fields.filter(f => {
      return f.name.includes(state.filter)
    })
  }
}

const FieldsList = ({ dispatch, fields, visibleFields }) => {
  return (
    <div>
      <Table>
        <tbody>
          {visibleFields.length === 0 && (
            <div className="no-results">No fields match this search</div>
          )}
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
    </div>
  )
}

FieldsList.propTypes = {
  dispatch: func,
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
  }),
  visibleFields: shape({
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

export default connect(mapStateToProps)(FieldsList)
