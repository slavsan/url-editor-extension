import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, bool, oneOfType, number, shape, string } from 'prop-types'
import FieldsList from './FieldsList'
import Toolbar from './Toolbar'

const mapStateToProps = state => {
  return {
    loaded: state.loaded,
    fields: state.fields
  }
}

const App = ({ loaded, fields }) => {
  if (!loaded) {
    return (
      <div className="no-results">Loading ..</div>
    )
  }

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
  loaded: bool,
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
