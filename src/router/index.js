import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import axios from 'axios'
import store from '../../store/store'
import home from '../views/home.vue'
import allArticles from '../views/allArticles.vue'
import messageboard from '../views/message_board.vue'
import albumcard from '../views/albumcard.vue'
import addArticle from '../views/addArticle.vue'
export default new Router({
  mode: "history",
  linkActiveClass: 'active',
  base: 'blog',
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/allArticles',
      component: allArticles
    },
    {
      path: '/messageboard',
      component: messageboard
    },
    {
      path: '/albumcard',
      component: albumcard
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
      component: addArticle,
      beforeEnter: async (to, from, next) => {
        let ret = await axios.get('/api/recongnize')
        let username = ret.data
        if (!username) {
          await axios.get('/logout')
          let logout_el = document.getElementById('logout')
          logout_el && logout_el.click()
          store.commit('changeDialogFormVisible', true)
        } else {
          next()
        }
      }
    }
  ]
})
