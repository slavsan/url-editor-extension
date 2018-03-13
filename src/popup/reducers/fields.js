const fields = (state = [], action) => {
  if (!action) return state
  switch (action.type) {
    case 'SET_FIELDS': {
      if (action.fields) {
        return action.fields
      }
      return state
    }
    case 'UPDATE_FIELD': {
      if (!action.id) {
        return state
      }

      if (!action.value && action.value !== '') {
        return state
      }

      state = [].concat(state)

      const field = state.filter(f => f.id === action.id)[0]

      if (!field) {
        return state
      }

      field.value = action.value

      return state
    }
    case 'UPDATE_NESTED_FIELD': {
      if (!action.id) {
        return state
      }

      if (!action.key) {
        return state
      }

      if (!action.value && action.value !== '') {
        return state
      }

      state = [].concat(state)

      const field = state.filter(f => f.id === action.id)[0]

      if (!field) {
        return state
      }

      const nestedField = field.value.filter(f => f.key === action.key)[0]

      if (!nestedField) {
        return state
      }

      nestedField.value = action.value

      return state
    }
    default: {
        return state
    }
  }
}

export default fields
