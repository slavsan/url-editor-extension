import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, oneOfType, number, shape, string } from 'prop-types'
import utils from '../lib/utils'
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
  fields: arrayOf(
    shape({
      id: number,
      name: string,
      value: oneOfType([
        string,
        arrayOf(
          shape({
            key: string,
            value: string
          })
        )
      ])
    })
  )
}

export default connect(mapStateToProps)(App)
