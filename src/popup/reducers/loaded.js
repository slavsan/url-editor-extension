const loaded = (state = false, action) => {
  if (!action) return state
  switch (action.type) {
    case 'LOADED': return true
    default: return state
  }
}

export default loaded
