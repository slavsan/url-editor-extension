import React from 'react'
import { connect } from 'react-redux'
import { ControlLabel, FormControl, Table } from 'react-bootstrap'
import { updateField } from './actions/fields'

const mapStateToProps = state => {
  return {
    fields: state.fields
  }
}

const FieldsList = ({ dispatch, fields }) => {
  return (
    <div>
      <Table>
        <tbody>
        {fields.map(field => (
          <tr key={field.id}>
            <td>
              <ControlLabel>{field.name}</ControlLabel>
            </td>
            <td>
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
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default connect(mapStateToProps)(FieldsList)
