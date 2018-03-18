import filter from '../../../src/popup/reducers/filter'

describe('filter reducer', () => {
  it('returns default state when no action is specified', () => {
    expect(filter('default state')).toEqual('default state')
  })

  it('returns default state when no action is specified', () => {
    expect(filter('default state', {})).toEqual('default state')
  })

  it('returns default state when an UNKNOWN action type', () => {
    expect(filter('default state', { type: 'UNKNOWN' })).toEqual('default state')
  })

  it('returns default state when no value is specified', () => {
    expect(filter('default state', { type: 'UPDATE_FILTER' })).toEqual('default state')
  })

  it('returns default state when value is specified but is not a string', () => {
    expect(filter('default state', { type: 'UPDATE_FILTER', value: null })).toEqual('default state')
  })

  it('returns the new state when value is specified', () => {
    expect(filter('default state', { type: 'UPDATE_FILTER', value: 'new state' })).toEqual('new state')
  })
})
