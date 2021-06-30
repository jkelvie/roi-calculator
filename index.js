const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.get('/', (request, response) => {
  const options = {
    root: path.join(__dirname, './'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  console.info('Dir: ' + __dirname)
  response.sendFile('./calculator.html', options)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})