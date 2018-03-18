import { updateFilter } from '../../../src/popup/actions/filter'

describe('filter actions', () => {
  describe('updateFilter', () => {
    it('returns the UPDATE_FILTER action', () => {
      expect(updateFilter({ value: 'value' })).toEqual({
        type: 'UPDATE_FILTER',
        value: 'value'
      })
    })
  })
})
