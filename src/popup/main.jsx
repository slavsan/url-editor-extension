import React from 'react'
import { render } from 'react-dom'
import Root from './Root'
import utils from './lib/utils'

document.addEventListener('DOMContentLoaded', () => {
  utils.fetchUrlAndQueryStringFields()
  render(<Root />, document.getElementById('app'))
})
