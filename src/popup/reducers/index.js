import { combineReducers } from 'redux'
import fields from './fields'
import url from './url'
import filter from './filter'

const app = combineReducers({
  fields,
  url,
  filter
})

export default app
