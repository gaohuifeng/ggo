### 使用
```js
const GTA = require('@tng/gta')
const gta = new GTA({url:'https://ggo.demo.com/v1/track/', token: '1234567890'})

// send方法 (get)
// @return promise
console.log(yield gta.send('event', { param: 'abc' }))  
// {event: 1}


// 指定 options
const gta = new GTA()
const options = { url: 'https://ggo.demo.com/v1/track/', token: '1234567890'})
console.log(yield gta.send('event', { param: 'abc' }, options))

// get/post方法
const gta = new GTA()
const options = { url: 'https://ggo.demo.com/v1/track/'})
yield gta.get('event', { token: '1234567890', params: 'abc' }, options)
yield gta.post('event', { token: '1234567890', params: 'abc' }, options)
```
