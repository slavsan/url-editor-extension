import tabs from '../../src/background/tabs'

describe('tabs', () => {
  let chromeOriginal

  beforeEach(() => {
    chromeOriginal = global.chrome
    global.chrome = {
      tabs: {
        query: jest.fn(),
        update: jest.fn()
      }
    }
  })

  afterEach(() => {
    global.chrome = chromeOriginal
  })

  describe('getCurrentTab', () => {
    it('queries for the active tab by using the correct criteria', () => {
      tabs.getCurrentTab()
      expect(global.chrome.tabs.query).toBeCalledWith({
        active: true,
        currentWindow: true
      }, expect.any(Function))
    })

    describe('when is not able to fetch the current tab', () => {
      beforeEach(() => {
        global.chrome.tabs.query.mockImplementation((queryInfo, cb) => cb([]))
      })

      it('yields an error', (done) => {
        tabs.getCurrentTab((error) => {
          expect(error).toEqual(new Error('no current tab found'))
          done()
        })
      })
    })

    describe('when is able to fetch the current tab', () => {
      beforeEach(() => {
        global.chrome.tabs.query.mockImplementation((queryInfo, cb) => {
          cb(['current tab'])
        })
      })

      it('yields the current tab', (done) => {
        tabs.getCurrentTab((error, tab) => {
          expect(error).toBeNull()
          expect(tab).toEqual('current tab')
          done()
        })
      })
    })
  })

  describe('getCurrentTabUrl', () => {
    let getCurentTabOriginal

    beforeEach(() => {
      getCurentTabOriginal = tabs.getCurrentTab
      tabs.getCurrentTab = jest.fn()
    })

    afterEach(() => {
      tabs.getCurrentTab = getCurentTabOriginal
    })

    describe('when getting the current tab URL fails', () => {
      describe('because of failing to get the current tab', () => {
        beforeEach(() => {
          tabs.getCurrentTab.mockImplementation(cb => {
            cb(new Error('get tab error'))
          })
        })

        it('yields an error', (done) => {
          tabs.getCurrentTabUrl((error) => {
            expect(error).toEqual(new Error('get tab error'))
            done()
          })
        })
      })

      describe('because the returned tab is invalid', () => {
        beforeEach(() => {
          tabs.getCurrentTab.mockImplementation(cb => {
            cb(null, {})
          })
        })

        it('yields an error', (done) => {
          tabs.getCurrentTabUrl((error) => {
            expect(error).toEqual(new Error('Invalid URL'))
            done()
          })
        })
      })
    })

    describe('when getting the current tab URL succeeds', () => {
      beforeEach(() => {
        tabs.getCurrentTab.mockImplementation(cb => {
          cb(null, { url: 'current tab url' })
        })
      })

      it('yields the current tab URL', (done) => {
        tabs.getCurrentTabUrl((error, url) => {
          expect(error).toBeNull()
          expect(url).toEqual('current tab url')
          done()
        })
      })
    })
  })

  describe('updateCurrentTabUrl', () => {
    let getCurentTabOriginal

    beforeEach(() => {
      getCurentTabOriginal = tabs.getCurrentTab
      tabs.getCurrentTab = jest.fn()
    })

    afterEach(() => {
      tabs.getCurrentTab = getCurentTabOriginal
    })

    describe('when is not able to fetch the current tab', () => {
      beforeEach(() => {
        tabs.getCurrentTab.mockImplementation(cb => {
          cb(new Error('get tab error'))
        })
      })

      it('does not update the tab URL', (done) => {
        tabs.updateCurrentTabUrl('new url', (error) => {
          expect(global.chrome.tabs.update).not.toBeCalled()
          done()
        })
      })
    })

    describe('when able to fetch the current tab', () => {
      beforeEach(() => {
        tabs.getCurrentTab.mockImplementation(cb => {
          cb(null, { id: 1, url: 'old url' })
        })
      })

      it('updates to the tab URL', (done) => {
        tabs.updateCurrentTabUrl('new url', (error) => {
          expect(error).toBeNull()
          expect(global.chrome.tabs.update).toBeCalledWith(1, { url: 'new url' })
          done()
        })
      })
    })
  })
})
