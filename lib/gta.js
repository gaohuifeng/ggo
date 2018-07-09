const request = require('request-promise')

class GTA {
  // static myProp = 42;
  constructor (options = {}) {
    this.url = options.url
    this.token = options.token
  }

  verbFunc (method) {
    return (obj, options = {}) => {
      const params = {
        method,
        url: this.url
      }
      Object.assign(params, options)
      const data = Buffer.from(JSON.stringify(obj)).toString('base64')
      if (method === 'POST') {
        params.form = { data }
      } else {
        params.url = `${params.url}?data=${data}`
      }
      return request(params)
    }
  }

  get get () {
    return this.verbFunc('GET')
  }

  get post () {
    return this.verbFunc('POST')
  }

  send (event, data, options) {
    data.token = this.token
    const obj = {
      event,
      properties: data
    }
    return this.get(obj, options)
  }
}

module.exports = GTA
