import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import utils from './utils'

const mapStateToProps = state => {
  return {
    url: state.url,
    fields: state.fields
  }
}

const Toolbar = ({ dispatch, url, fields }) => {
  return (
    <div className="toolbar">
      <Button onClick={() => utils.changeURL(utils.buildURL(url, fields))}>
        Go
      </Button>
    </div>
  )
}

export default connect(mapStateToProps)(Toolbar)
