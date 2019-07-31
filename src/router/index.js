import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
Vue.use(Router)
import store from '../../store/store'
export default new Router({
    mode:"history",
    linkActiveClass:'active',
    base:'blog',
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: ()=> import('../views/home.vue')
        },
        {
            path: '/allArticles',
            component: () => import('../views/allArticles.vue')
        },
        {
            path: '/messageboard',
            component: () => import('../views/message_board.vue')
        },
        {
            path: '/albumcard',
            component: () => import('../views/albumcard.vue')
        },
        {
            path: '/album',
            component: () => import('../views/album.vue')
        },
        {
            path: '/article',
            name: 'detile',
            component: () => import('../views/detile.vue')
        },
        {
            path: '/register',
            component: () => import('../views/register.vue')
        },
        {
            path: '/addArticle',
            component: () => import('../views/addArticle.vue'),
            beforeEnter: async (to,from,next) => {
                let ret = await axios.get('/api/recongnize')
                let username = ret.data
                if (!username) {
                    await axios.get('/logout')
                    document.getElementById('logout') && document.getElementById('logout').click()
                    store.commit('changeDialogFormVisible', true)
                }else{
                    next()
                }
            }
        }
    ]
})
