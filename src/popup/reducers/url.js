const url = (state = '', action) => {
  if (!action) return state
  switch (action.type) {
    case 'SET_URL': {
      if (action.url) {
        return action.url
      }
      return state
    }
    default: {
        return state
    }
  }
}

export default url
