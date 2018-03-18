import tabs from '../../src/background/tabs'
import listeners from '../../src/background/listeners'

describe('listeners', () => {
  let chromeOriginal

  beforeEach(() => {
    chromeOriginal = global.chrome
    global.chrome = {
      runtime: {
        onMessage: {
          addListener: jest.fn()
        }
      }
    }
  })

  afterEach(() => {
    global.chrome = chromeOriginal
  })

  describe('setup', () => {
    let request
    let sender
    let sendResponse

    beforeEach(() => {
      tabs.getCurrentTabUrl = jest.fn()
      tabs.updateCurrentTabUrl = jest.fn()
    })

    describe('when request is invalid', () => {
      beforeEach(() => {
        global.chrome.runtime.onMessage.addListener.mockImplementation(cb => {
          cb(request, sender, sendResponse)
        })
        listeners.setup()
      })

      it('does not get the current tab', () => {
        expect(tabs.getCurrentTabUrl).not.toBeCalled()
      })

      it('does not get update current tab', () => {
        expect(tabs.updateCurrentTabUrl).not.toBeCalled()
      })
    })

    describe('when the request action is fetchURL', () => {
      beforeEach(() => {
        global.chrome.runtime.onMessage.addListener.mockImplementation(cb => {
          request = { action: 'fetchURL' }
          sendResponse = jest.fn()
          cb(request, sender, sendResponse)
        })
        tabs.getCurrentTabUrl.mockImplementation(cb => {
          cb(null, 'current tab url')
        })
        listeners.setup()
      })

      it('gets the current tab url', () => {
        expect(tabs.getCurrentTabUrl).toBeCalled()
      })

      it('sends the url back in the response', () => {
        expect(sendResponse).toBeCalledWith({ url: 'current tab url' })
      })

      it('does not get update current tab', () => {
        expect(tabs.updateCurrentTabUrl).not.toBeCalled()
      })
    })

    describe('when the request action is updateURL', () => {
      beforeEach(() => {
        global.chrome.runtime.onMessage.addListener.mockImplementation(cb => {
          request = { action: 'updateURL', url: 'new url' }
          sendResponse = jest.fn()
          cb(request, sender, sendResponse)
        })
        listeners.setup()
      })

      it('does not get the current tab url', () => {
        expect(tabs.getCurrentTabUrl).not.toBeCalled()
      })

      it('updates the current tab url', () => {
        expect(tabs.updateCurrentTabUrl).toBeCalledWith('new url', expect.any(Function))
      })
    })
  })
})
