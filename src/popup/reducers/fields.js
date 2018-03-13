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

      console.log('--> state is:', state)

      const field = state.filter(f => f.id === action.id)[0]

      if (!field) {
        return state
      }

      console.log('--> field is:', field)
      console.log('--> action is:', action)

      field.value = action.value

      return state
    }
    default: {
        return state
    }
  }
}

export default fields
