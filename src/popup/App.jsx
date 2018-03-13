import React from 'react'
import { connect } from 'react-redux'
import { oneOfType, number, shape, string } from 'prop-types'
import utils from './utils'
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
      <div className="no-results">The URL has no query string</div>
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

App.propTypes = {
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

export default connect(mapStateToProps)(App)
