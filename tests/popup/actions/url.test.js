import { setURL } from '../../../src/popup/actions/url'

describe('url actions', () => {
  describe('setURL', () => {
    it('returns the SET_URL action', () => {
      expect(setURL({ url: 'url' })).toEqual({
        type: 'SET_URL',
        url: 'url'
      })
    })
  })
})
