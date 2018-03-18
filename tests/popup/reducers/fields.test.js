import fields from '../../../src/popup/reducers/fields'

describe('fields reducer', () => {
  it('returns default state when action is not specified', () => {
    expect(fields('default state')).toEqual('default state')
  })

  it('returns default state when action type is not specified', () => {
    expect(fields('default state', {})).toEqual('default state')
  })

  it('returns default state when an unknown action type is specified', () => {
    expect(fields('default state', { type: 'UNKNOWN' })).toEqual('default state')
  })

  describe('SET_FIELDS', () => {
    it('returns default state when no fields are specified', () => {
      expect(fields('default state', { type: 'SET_FIELDS' })).toEqual('default state')
    })

    it('returns default state when fields are invalid', () => {
      expect(fields('default state', { type: 'SET_FIELDS', fields: null })).toEqual('default state')
    })

    it('returns new state when fields are specified and valid', () => {
      expect(fields('default state', { type: 'SET_FIELDS', fields: 'new state' })).toEqual('new state')
    })
  })

  describe('UPDATE_FIELD', () => {
    it('returns default state when no field id specified', () => {
      expect(fields('default state', { type: 'UPDATE_FIELD' })).toEqual('default state')
    })

    it('returns default state when field id is specified but invalid', () => {
      expect(fields('default state', { type: 'UPDATE_FIELD', id: null })).toEqual('default state')
    })

    it('returns default state when field value is not specified', () => {
      expect(fields('default state', { type: 'UPDATE_FIELD', id: 1 })).toEqual('default state')
    })

    it('returns default state when field value is not valid', () => {
      expect(fields('default state', { type: 'UPDATE_FIELD', id: 1, value: null })).toEqual('default state')
    })

    it('returns default state when field is not found', () => {
      const defaultState = [{ id: 2, value: 'current value' }]
      expect(fields(defaultState, { type: 'UPDATE_FIELD', id: 1, value: 'new value' })).toEqual([{ id: 2, value: 'current value' }])
    })

    it('returns new state with updated field when field is found', () => {
      const defaultState = [{ id: 1, value: 'current value' }]
      expect(fields(defaultState, { type: 'UPDATE_FIELD', id: 1, value: 'new value' })).toEqual([{ id: 1, value: 'new value' }])
    })
  })

  describe('UPDATE_NESTED_FIELD', () => {
    it('returns default state when id is not specified', () => {
      expect(fields('default state', { type: 'UPDATE_NESTED_FIELD' })).toEqual('default state')
    })

    it('returns default state when key is not specified', () => {
      expect(fields('default state', { type: 'UPDATE_NESTED_FIELD', id: 1 })).toEqual('default state')
    })

    it('returns default state when value is not specified', () => {
      expect(fields('default state', { type: 'UPDATE_NESTED_FIELD', id: 1, key: 'key' })).toEqual('default state')
    })

    it('returns default state when field is not found', () => {
      const defaultState = [{ id: 2, value: 'current value' }]
      expect(fields(defaultState, { type: 'UPDATE_NESTED_FIELD', id: 1, key: 'key', value: 'new value' })).toEqual(defaultState)
    })

    it('returns default state when nested field is not found', () => {
      const defaultState = [{
        id: 1,
        value: [{
          key: 'key'
        }]
      }]
      expect(fields(defaultState, { type: 'UPDATE_NESTED_FIELD', id: 1, key: 'unknown key', value: 'new value' })).toEqual(defaultState)
    })

    it('returns new state with updated nested field when nested field is found', () => {
      const defaultState = [{
        id: 1,
        value: [{
          key: 'key',
          value: 'current value'
        }]
      }]
      expect(fields(defaultState, { type: 'UPDATE_NESTED_FIELD', id: 1, key: 'key', value: 'new value' })).toEqual([{
        id: 1,
        value: [{
          key: 'key',
          value: 'new value'
        }]
      }])
    })
  })
})
