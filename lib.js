const finishListener = require('on-finished')
const request = require('request')

const authCheck = function (key, cb) {
  var option = {
    method: 'POST',
    url: 'http://pagupu.in/test',
    headers: {
      Authorization: key
    }
  }
  request(option, function (err, res, body) {
    if (err) {
      throw err
    }
    cb(JSON.parse(body).status)
  })
}

const emitter = function (data, key) {
  var option = {
    method: 'POST',
    url: 'http://pagupu.in/event',
    headers: {
      Authorization: key
    },
    json: data
  }
  request(option, function (err, res, body) {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = function (key) {
  authCheck(key, function (status) {
    if (status === false) {
      throw new Error('invalid pagupu api key')
    }
  })
  return function (req, res, next) {
    var startAt = Date.now()
    finishListener(res, function (err, res) {
      if (err) {
        console.log(err)
      }
      var path = res.req.originalUrl.split('?')[0]
      var data = {
        'path': path,
        'method': res.req.method,
        'responsetime': Date.now() - startAt,
        'status': res.statusCode
      }
      emitter(data, key)
    })
    next()
  }
}
