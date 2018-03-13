const filter = (state = '', action) => {
  if (!action) return state
  switch (action.type) {
    case 'UPDATE_FILTER': {
      if (action.value || action.value === '') {
        return action.value
      }
      return state
    }
    default: {
      return state
    }
  }
}

export default filter
