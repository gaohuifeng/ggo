'use strict'
const expect = require('should')
const rewire = require('rewire')
const GTA = rewire('../lib/gta')
const gta = new GTA({url: 'http://gaohuifeng.cn/api', token: '1234567890'})
describe('gta', () => {
  const params = {
    user: 'abc'
  }
  const options = {
    url: 'http://gaohuifeng.cn/api'
  }
  before(() => {
    GTA.__set__('request', function (options) {
      expect(options).properties('method', 'url')
      if (options.method === 'GET') {
        expect(options.url).match(/\?data=/)
        expect(options.url).not.match(/undefined/)
        const base64Data = options.url.split('?data=')[1]
        // eslint-disable-next-line
        const obj = new Buffer.from(base64Data, 'base64').toString()
        expect(JSON.parse(obj)).deepEqual(params)
      } else {
        expect(options).properties('form')
        const base64Data = options.form.data
        // eslint-disable-next-line
        const obj = new Buffer.from(base64Data, 'base64').toString()
        expect(JSON.parse(obj)).deepEqual(params)
      }
      return 'Hello World'
    })
  })

  it('gta get should ok', function * () {
    const data = yield gta.get(params)
    expect(data).eql('Hello World')
  })

  it('gta get should ok', function * () {
    const data = yield gta.get(params, options)
    expect(data).eql('Hello World')
  })

  it('gta post should ok', function * () {
    const data = yield gta.post(params)
    expect(data).eql('Hello World')
  })

  describe('gta send', () => {
    before(() => {
      GTA.__set__('request', function (options) {
        expect(options).properties('method', 'url')
        expect(options.url).match(/\?data=/)
        expect(options.url).not.match(/undefined/)
        const base64Data = options.url.split('?data=')[1]
        // eslint-disable-next-line
        let obj = new Buffer.from(base64Data, 'base64').toString()
        obj = JSON.parse(obj)
        expect(obj).properties('event', 'properties')
        expect(obj.properties).deepEqual({'user': 'abc', 'token': '1234567890'})
        return 'Hello World'
      })
    })

    it('gta send should ok', function * () {
      const data = yield gta.send('event', params)
      expect(data).eql('Hello World')
    })
  })
})
