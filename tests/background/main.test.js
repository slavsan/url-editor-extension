jest.mock('../../src/background/listeners')

import listeners from '../../src/background/listeners'
import main from '../../src/background/main'

describe('main', () => {
  it('sets listeners upon initialisation', () => {
    expect(listeners.setup).toBeCalled()
  })
})
