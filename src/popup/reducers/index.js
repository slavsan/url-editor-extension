import { combineReducers } from 'redux'
import fields from './fields'
import url from './url'

const app = combineReducers({
	fields,
  url
})

export default app
