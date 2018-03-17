import utils from '../../src/popup/lib/utils'

describe('utils', () => {
  describe('changeURL', () => {
    it('..', () => {
      expect(true).toEqual(true)
    })
  })

  const tests = [
    {
      test: 'handles one simple field',
      fields: [
        { id: 1, name: 'foo', value: 'bar' }
      ],
      querystring: 'foo=bar'
    },
    {
      test: 'handles multiple simple fields',
      fields: [
        { id: 1, name: 'foo', value: 'bar' },
        { id: 2, name: 'spam', value: 'eggs' },
      ],
      querystring: 'foo=bar&spam=eggs'
    },
    {
      test: 'handles arrays with named keys',
      fields: [{
        id: 1,
        name: 'foo',
        value: [
          { key: '[a]', value: 'b' },
          { key: '[b]', value: 'c' }
        ]
      }],
      querystring: 'foo[a]=b&foo[b]=c'
    },
    {
      test: 'handles arrays with indexed keys',
      fields: [{
        id: 1,
        name: 'foo',
        value: [
          { key: '[0]', value: 'b' },
          { key: '[1]', value: 'c' }
        ]
      }],
      querystring: 'foo[0]=b&foo[1]=c'
    },
    {
      test: 'handles arrays with indexed keys and keeps the original indexes',
      fields: [{
        id: 1,
        name: 'foo',
        value: [
          { key: '[6]', value: 'b' },
          { key: '[19]', value: 'c' }
        ]
      }],
      querystring: 'foo[6]=b&foo[19]=c'
    },
    {
      test: 'handles arrays without named keys and without indexes',
      fields: [{
        id: 1,
        name: 'foo',
        value: [{
          key: '[]',
          value: [ 'b', 'c' ]
        }]
      }],
      querystring: 'foo[]=b&foo[]=c'
    },
    {
      test: 'handles arrays without nested arrays with no indexes',
      fields: [{
        id: 1,
        name: 'nested',
        value: [{
          key: '[0][1][5][]',
          value: [ 'foo', 'bar' ]
        }]
      }],
      querystring: 'nested[0][1][5][]=foo&nested[0][1][5][]=bar'
    }
  ]

  describe('buildQueryString', () => {
    tests.forEach(test => {
      it(test.test, () => {
        expect(utils.buildQueryString(test.fields)).toEqual(test.querystring)
      })
    })
  })

  describe('getFields', () => {
    tests.forEach(test => {
      it(test.test, () => {
        expect(utils.getFields(test.querystring)).toEqual(test.fields)
      })
    })
  })
})
