import { combineReducers } from 'redux'
import fields from './fields'
import url from './url'
import filter from './filter'
import loaded from './loaded'

const app = combineReducers({
  fields,
  url,
  filter,
  loaded
})

export default app
