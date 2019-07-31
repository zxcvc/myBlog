import Vue from 'vue'
import Router from 'vue-router'
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
            beforeEnter: (to,from,next) => {
                if (!localStorage.getItem('user')) {
                    store.commit('changeDialogFormVisible', true)
                }else{
                    next()
                }
            }
        }
    ]
})
