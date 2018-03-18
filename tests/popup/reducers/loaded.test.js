import loaded from '../../../src/popup/reducers/loaded'

describe('loaded reduder', () => {
  it('returns the default state (false) when state is specified', () => {
    expect(loaded()).toBe(false)
  })

  it('returns the current state when no action is specified', () => {
    expect(loaded(true)).toBe(true)
  })

  it('returns the new state when no action of LOADED type', () => {
    expect(loaded(false, { type: 'LOADED' })).toBe(true)
  })
})
