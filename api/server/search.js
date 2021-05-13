const { client, index, type } = require('./connection')

module.exports = {
  /** Query ES index for the provided term */
  queryTerm (term, offset = 0) {

    const body = {

      query: { 
        match: {
          indication: {
            query: term,
            operator: 'and',
            fuzziness: 'auto'
          } 
        } 
      },
      highlight: { fields: { text: {} } }
    }

    return client.search({ index, type, body })
    
  },
}
