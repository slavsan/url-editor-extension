const tabs = {}

tabs.getCurrentTab = (callback) => {
  const queryInfo = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(queryInfo, (tabsList) => {
    const tab = tabsList[0]

    if (!tab) {
      return callback(new Error('no current tab found'))
    }

    callback(null, tab)
  })
}

tabs.getCurrentTabUrl = (callback) => {
  tabs.getCurrentTab((error, tab) => {
    if (error) {
      return callback(error)
    }

    const url = tab.url

    if (typeof url !== 'string') {
      return callback(new Error('Invalid URL'))
    }

    callback(null, url)
  })
}

tabs.updateCurrentTabUrl = (newUrl, callback) => {
  tabs.getCurrentTab((error, tab) => {
    if (error) {
      return callback(error)
    }

    chrome.tabs.update(tab.id, { url: newUrl })

    return callback(null)
  })
}

export default tabs
