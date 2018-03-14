import React from 'react'
import { render } from 'react-dom'
import Root from './Root'

document.addEventListener('DOMContentLoaded', () => {
	render(<Root />, document.getElementById('app'))
})
