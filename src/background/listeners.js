import tabs from './tabs'

const listeners = {}

listeners.setup = () => {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (!request || !request.action) {
      return
    }

    if (request.action === 'fetchURL') {
      tabs.getCurrentTabUrl((error, url) => {
        // @todo: send error to UI if any
        sendResponse({ url: url })
      })
    }

    if (request.action === 'updateURL') {
      const newUrl = request.url
      tabs.updateCurrentTabUrl(newUrl, (error) => {
        // @todo: send error to UI if any
      })
    }

    return true
  })
}

export default listeners
