export const setFields = ({ fields }) => {
  return {
    type: 'SET_FIELDS',
    fields
  }
}

export const updateField = ({ id, value }) => {
  return {
    type: 'UPDATE_FIELD',
    id,
    value
  }
}
