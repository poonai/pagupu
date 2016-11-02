# pagupu
simple analytics middleware for express.Logs will be available at [pagupu website](http://pagupu.in)
# Why 
I got 500$ aws credits I don't know how to spend so that I made small request statistic app
# Enhancement
If any enhancement needed please open issue
#example
``` javascript
const pagupu=require('pagupu')
const express=require('express')
const app=express()
app.use(pagupu('api key that you will get from pagupu website'))
app.get('/', (req, res) => {
  res.json({
  status:trues
  })
})
app.listen(2000)
```
