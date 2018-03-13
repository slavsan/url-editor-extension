import qs from 'qs'
import { setFields } from './actions/fields'
import { setURL } from './actions/url'
import store from './store'

const utils = {}

utils.fetchURL = (cb) => {
  chrome.runtime.sendMessage({action: 'fetchURL'}, (response) => {
    cb(response.url)
  })
}

utils.buildURL = (url, fields) => {
  const transformed = {}
  fields.forEach(f => {
    if (typeof f.value === 'object') {
      const value = {}
      for (let key in f.value) {
        const modifiedKey = key.replace('[', '').replace(']', '')
        value[modifiedKey] = f.value[key]
      }

      transformed[f.name] = value
    } else {
      transformed[f.name] = f.value
    }
  })
  const querystring = qs.stringify(transformed, { encode: false, encodeValuesOnly: true })
  return url + '?' + querystring
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
  })
}

utils.getFields = (querystring) => {
  let id = 1
  const fields = []
  const parsedFields = qs.parse(querystring, { depth: 0, plainObjects: false })
  for (const name in parsedFields) {
    fields.push({
      id: id,
      name: name,
      value: parsedFields[name]
    })
    id += 1
  }
  return fields
}

export default utils
