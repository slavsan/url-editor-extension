import { arrayOf, oneOfType, number, shape, string } from 'prop-types'

const field = shape({
  id: number,
  name: string,
  value: oneOfType([
    string,
    arrayOf(
      shape({
        key: string,
        value: oneOfType([
          string,
          arrayOf(
            string
          )
        ])
      })
    )
  ])
})

export default field
