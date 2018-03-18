import { setFields, updateField, updateNestedField } from '../../../src/popup/actions/fields'

describe('fields actions', () => {
  describe('setFields', () => {
    it('returns the SET_FIELDS action', () => {
      expect(setFields({ fields: 'fields' })).toEqual({
        type: 'SET_FIELDS',
        fields: 'fields'
      })
    })
  })

  describe('updateField', () => {
    it('returns the UPDATE_FIELD action', () => {
      expect(updateField({ id: 'id', value: 'value' })).toEqual({
        type: 'UPDATE_FIELD',
        id: 'id',
        value: 'value'
      })
    })
  })

  describe('updateNestedField', () => {
    it('returns the UPDATE_NESTED_FIELD action', () => {
      expect(updateNestedField({ id: 'id', key: 'key', value: 'value' })).toEqual({
        type: 'UPDATE_NESTED_FIELD',
        id: 'id',
        key: 'key',
        value: 'value'
      })
    })
  })
})
