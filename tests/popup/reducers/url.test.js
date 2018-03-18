import url from '../../../src/popup/reducers/url'

describe('url reducer', () => {
  it('returns default state when no actions is specified', () => {
    expect(url('default state')).toEqual('default state')
  })

  it('returns default state when no action type is specified', () => {
    expect(url('default state', {})).toEqual('default state')
  })

  it('returns default state when an unknown action type is specified', () => {
    expect(url('default state', { type: 'UNKNOWN' })).toEqual('default state')
  })

  it('returns default state when action type is SET_URL but no url is specified or url is invalid', () => {
    expect(url('default state', { type: 'SET_URL' })).toEqual('default state')
  })

  it('returns new state when action type is SET_URL and url is specified', () => {
    expect(url('default state', { type: 'SET_URL', url: 'new state' })).toEqual('new state')
  })
})
