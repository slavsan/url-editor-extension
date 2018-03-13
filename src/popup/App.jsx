import React from 'react'
import { connect } from 'react-redux'
import { ControlLabel, FormControl, Table, Button } from 'react-bootstrap'
import store from './store'
import utils from './utils'
import { updateField } from './actions/fields'
import FieldsList from './FieldsList'
import Toolbar from './Toolbar'

utils.fetchUrlAndQueryStringFields()

const mapStateToProps = state => {
  return {
    fields: state.fields
  }
}

const App = ({ fields }) => {
  if (!fields || !fields.length) {
    return (
      <div className="no-querystring">The URL has no query string</div>
    )
  }

  return (
    <div>
      <div className="fields-list">
        <Toolbar />
        <FieldsList />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(App)
