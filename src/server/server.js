/* eslint-disable camelcase */
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const router = require('./router')
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}))

app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge : 1000 * 10, // 设置 session 的有效时间，单位毫秒
}
}))

// parse application/json
app.use(bodyParser.json({
  limit: '10mb'
}))

app.listen(3000, () => {
  console.log('ok=========')
})



// 配置参数


app.use(router)
