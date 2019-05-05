# upload

Receive upload service

```js
const FormData = require('form-data')
const foraData = new FormData()

formData.append('file', require('fs').createReadStream('./package.json'))

const req = require('http')
  .request({
    host: 'localhost',
    path: '/path',
    headers: {
      ...formData.getHeaders()
    },
    method: 'POST
  }, (res) => {
    console.log(res.toString())
  })

formData.pipe(req)
```

