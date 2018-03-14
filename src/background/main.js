/* globals chrome */
function getCurrentTab (callback) {
  const queryInfo = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(queryInfo, (tabs) => {
    const tab = tabs[0]

    if (!tab) {
      return callback(new Error('no current tab found'))
    }

    callback(null, tab)
  })
}

function getCurrentTabUrl(callback) {
  getCurrentTab((error, tab) => {
    if (error) {
      return
    }

    let url = tab.url || ''
    console.assert(typeof url == 'string', 'tab.url should be a string') // eslint-disable-line no-console

    callback(url)
  })
}

function updateCurrentTabUrl (newUrl) {
  getCurrentTab((error, tab) => {
    if (error) {
      return
    }

    chrome.tabs.update(tab.id, { url: newUrl })
  })
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!request && !request.action) {
    return
  }

  if (request.action === 'fetchURL') {
    getCurrentTabUrl((url) => {
      sendResponse({ url: url })
    })
  }

  if (request.action === 'updateURL') {
    const newUrl = request.url
    updateCurrentTabUrl(newUrl)
  }

  return true
})
