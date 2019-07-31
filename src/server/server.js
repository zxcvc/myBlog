/* eslint-disable camelcase */
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const STS = require('qcloud-cos-sts')
const app = express()
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}))

const {
  get_user_byName,
  add_user,
  add_article,
  get_allArticles_count,
  get_oneArticle_byId,
  get_articles_byLimit,
  get_allMessage_count,
  get_message_byLimit,
  add_message,
  get_img_dir,
  add_img_dir,
  get_img_by_dir,
  get_oneImg_by_dir,
  add_img
} = require('./tools')

// parse application/json
app.use(bodyParser.json({
  limit: '10mb'
}))

app.listen(3000, () => {
  console.log('ok=========')
})

app.get('/haveusername', async (req, res) => {
  let ret = await get_user_byName(req.query.username)
  return res.send({
    have: ret
  })
})

app.post('/register', async (req, res) => {
  let ret = await add_user(req.body)
  if (ret) {
    return res.send({
      success: true
    })
  }
})

app.post('/login', async (req, res) => {
  let success = false
  let msg = 'ok'
  let ret = await get_user_byName(req.body.username)
  if (!ret) {
    msg = '用户不存在'
    return res.send({
      success: success,
      msg: msg
    })
    return
  }
  if (ret.password !== req.body.password) {
    msg = '用户名或密码错误'
    return res.send({
      success: success,
      msg: msg
    })
    return
  }
  success = true
  return res.send({
    success: success,
    msg: msg,
    username: ret.username
  })
})

app.get('/articles', async (req, res) => {
  let {
    page,
    page_size
  } = req.query
  let ret = await get_articles_byLimit(parseInt(page), parseInt(page_size))
  return res.send(ret)
})

app.get('/getArticlesCount', async (req, res) => {
  let ret = await get_allArticles_count()
  return res.send(ret.toString())
})

app.get('/detile', async (req, res) => {
  let id = req.query.id
  let ret = await get_oneArticle_byId(id)
  return res.send(ret)
})

app.post('/addArticle', async (req, res) => {
  let article = req.body
  let ret = await add_article(article)
  if (ret) {
    return res.send({
      tips: '发表成功',
      success: true
    })
  } else {
    return res.send({
      tips: '发表失败 请重试',
      success: false
    })
  }
})

app.get('/getMessage', async (req, res) => {
  let {
    page,
    page_size
  } = req.query
  let ret = await get_message_byLimit(parseInt(page), parseInt(page_size))
  return res.send(ret)
})

app.get('/getMessagesCount', async (req, res) => {
  let ret = await get_allMessage_count()
  return res.send(ret.toString())
})

app.post('/addMessage', async (req, res) => {
  try {
    let ret = await add_message(req.body)
    return res.send(ret)
  } catch (e) {
    console.log(e)
  }
})

app.get('/getImgDir', async (req, res) => {
  let dir = await get_img_dir()
  let data = dir.map(async item=>{
    let ret = await get_oneImg_by_dir(item.dir)
   return ret
})

  Promise.all(data).then(list => {
    let obj = dir.map((item, index) => {
      return {
        url: list[index].url,
        _id:item._id,
        dir:item.dir
      }
    })
    return res.send(obj)
  })
})

app.get('/addImgDir', async (req, res) => {
  let dir = req.query
  let ret = await add_img_dir(dir)
  return res.send(ret)
})

app.get('/getImgByDir', async (req, res) => {
  let dir = req.query.dir
  let ret = await get_img_by_dir(dir)
  return res.send(ret)
})

app.post('/addImg', async (req, res) => {
  let ret = await add_img(req.body)
  return res.send(ret)
})


// 配置参数

const config = {
  secretId: 'AKIDxnncB2EhlZ7PTHpGhwznMj9KFuKUOG2Y',
  secretKey: 'QbWCzav1rSimumQoxqvkJdhW4Rv97pI5',
  proxy: '',
  durationSeconds: 1800,

  // 放行判断相关参数
  bucket: 'cc-1259403476',
  region: 'ap-chengdu',
  allowPrefix: '*',
  // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
  allowActions: [
    // 简单上传
    'name/cos:PutObject',
    'name/cos:PostObject',
    // 分片上传
    'name/cos:InitiateMultipartUpload',
    'name/cos:ListMultipartUploads',
    'name/cos:ListParts',
    'name/cos:UploadPart',
    'name/cos:CompleteMultipartUpload'
  ],
};

// 临时密钥接口
app.get('/sts', function (req, res, next) {
  // TODO 这里根据自己业务需要做好放行判断

  // 获取临时密钥
  let shortBucketName = config.bucket.substr(0, config.bucket.lastIndexOf('-'));
  let appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'));
  // let policy = {
  //     'version': '2.0',
  //     'statement': [{
  //         'action': config.allowActions,
  //         'effect': 'allow',
  //         'principal': {'qcs': ['*']},
  //         'resource': [
  //             'qcs::cos:' + config.region + ':uid/' + appId + ':prefix//' + appId + '/' + shortBucketName + '/' + config.allowPrefix,
  //         ],
  //     }],
  // };

  let policy = {
    "version": "2.0",
    statement: [{
      "principal": {
        "qcs": [
          "qcs::cam::anyone:anyone"
        ]
      },
      "effect": "Allow",
      "action": [
        "name/cos:*"
      ],
      "resource": [
        "qcs::cos:ap-chengdu:uid/1259403476:cc-1259403476/*"
      ]
    }],
  }

  STS.getCredential({
    secretId: config.secretId,
    secretKey: config.secretKey,
    proxy: config.proxy,
    durationSeconds: config.durationSeconds,
    policy: policy,
  }, function (err, tempKeys) {
    let result = JSON.stringify(err || tempKeys) || '';
    return res.send(result);
  });
});

// app.all('*', function (req, res, next) {
//   res.writeHead(404);
//   return res.send({
//     code: 404,
//     codeDesc: 'PageNotFound',
//     message: '404 page not found'
//   });
// });
