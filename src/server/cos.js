const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')
const cos = new COS({
  SecretId: 'AKIDxnncB2EhlZ7PTHpGhwznMj9KFuKUOG2Y',
  SecretKey: 'QbWCzav1rSimumQoxqvkJdhW4Rv97pI5'
})
cos.getService(function (err, data) {
    // console.log(data && data.Buckets);
    let buck = data && data.Buckets[0]
    let Bucket = buck.Name,
        Region = buck.Location
    cos.putObject({
        Bucket:Bucket,
        Region:Region,
        Key:'./1.png',
        Body:fs.createReadStream('./1.png')
    },(err,data)=>{
        // console.log(err || data);
    })

    cos.getBucket({
        Bucket: Bucket,
        Region: Region,
        // Prefix: 'xc/', // 这里传入列出的文件前缀
    }, function (err, data) {
        console.log(err || data.Contents);
    });

});

// cos.putObject({
//     Bucket: 'examplebucket-1250000000',
//     Region: 'ap-beijing',
//     Key: './1.png',
//     Body: fs.createReadStream('./picture.jpg'), // 这里传入前缀
// }, function (err, data) {
//     console.log(err || data);
// });
