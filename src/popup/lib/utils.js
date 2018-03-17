/* globals chrome */
import qs from 'qs'
import { setFields } from '../actions/fields'
import { setURL } from '../actions/url'
import store from '../store'

const utils = {}

utils.fetchURL = (cb) => {
  chrome.runtime.sendMessage({ action: 'fetchURL' }, (response) => {
    cb(response.url)
  })
}

utils.buildURL = (url, fields) => {
  const querystring = utils.buildQueryString(fields)
  return url + '?' + querystring
}

utils.buildQueryString = (fields) => {
  fields = JSON.parse(JSON.stringify(fields))
  const transformed = {}
  fields.forEach(f => {
    if (Array.isArray(f.value)) {
      let value = {}

      const nested = f.value[0]
      if (typeof nested === 'object') {
        if (nested.key.substr(-2) === '[]') {
          f.name = f.name + nested.key.substr(0, nested.key.length - 2)
          value = nested.value
        } else {
          f.value.forEach(a => {
            const key = a.key.replace('[', '').replace(']', '')
            value[key] = a.value
          })
        }
      } else {
        value = f.value
      }

      transformed[f.name] = value
    } else {
      transformed[f.name] = f.value
    }
  })

  return qs.stringify(transformed, {
    encode: false,
    arrayFormat: 'brackets',
    encodeValuesOnly: true
  })
}

utils.changeURL = (url) => {
  const message = {
    action: 'updateURL',
    url
  }
  chrome.runtime.sendMessage(message)
}

utils.fetchUrlAndQueryStringFields = () => {
  utils.fetchURL(url => {
    const [domainAndPath, querystring] = url.split('?')
    const fields = utils.getFields(querystring)
    store.dispatch(setURL({ url: domainAndPath }))
    store.dispatch(setFields({ fields }))
    store.dispatch({ type: 'LOADED' })
  })
}

utils.getFields = (querystring) => {
  let id = 1
  const fields = []
  const parsedFields = qs.parse(querystring, { depth: 0, plainObjects: false })
  for (const name in parsedFields) {
    let value = parsedFields[name]

    if (typeof value === 'object') {
      const arr = []
      for (let f in value) {
        arr.push({
          key: f,
          value: value[f]
        })
      }

      value = arr
    }
    fields.push({
      id: id,
      name: name,
      value: value
    })
    id += 1
  }
  return fields
}

export default utils
