/* eslint-disable camelcase */
const {
    user_model,
    article_model,
    message_boader_model,
    img_dir_model,
    img_model
} = require('./db')

async function get_user_byName(username) {
    let ret = await user_model.findOne({
        username: username
    })
    return ret
}

async function add_user(user_obj) {
    let ret = await user_model.create(user_obj)
    return Boolean(ret)
}

async function get_allArticles_count() {
    let ret = await article_model.find().countDocuments()
    return ret
}

async function get_articles_byLimit(page,page_size) {
    let ret = await article_model
    .find({})
    .skip((page-1)*page_size)
    .limit(page_size)
    .sort({'_id' : -1})
    return ret
}

async function get_oneArticle_byId(id) {
    let ret = await article_model.findOne({
        _id: id
    })
    return ret
}

async function add_article(article_obj) {
    let ret = await article_model.create(article_obj)
    return Boolean(ret)
}

async function get_allMessage_count() {
    let ret = await message_boader_model.find().countDocuments()
    return ret
}

async function get_message_byLimit(page,page_size) {
    let ret = await message_boader_model
    .find({})
    .skip((page-1)*page_size)
    .limit(page_size)
    .sort({'_id' : -1})
    return ret
}

async function add_message(message_obj) {
    let ret = message_boader_model.create(message_obj)
    return ret
}

async function get_img_dir(){
    let ret = await img_dir_model.find()
    return ret
}

async function add_img_dir(dir_obj){
    let ret = img_dir_model.create(dir_obj)
    return ret
}

async function get_img_by_dir(dir){
    let ret = await img_model.find({dir:dir})
    return ret
}

async function get_oneImg_by_dir(dir){
    let ret = await img_model.findOne({dir:dir})
    return ret || []
}

async function add_img(img_obj){
    let ret = await img_model.create(img_obj)
    return ret
}

module.exports = {
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
}
