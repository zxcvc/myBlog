import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        dialogFormVisible: false,
        show: false,
        allArticlPageNumber:1,
        homePageNumber:1,
        message_pageNumber:1
    },
    getters: {
        getAlbum (state) {
            return state.album
        },
        dialogFormVisible (state) {
            return state.dialogFormVisible
        }
    },
    mutations: {
        loginregin (state) {
            state.show = !state.show
        },
        changeDialogFormVisible (state, val) {
            state.dialogFormVisible = val
        },
        change_allArticlPageNumber(state,val){
            state.allArticlPageNumber = val
        },
        change_homePageNumber(state,val){
            state.homePageNumber = val
        },
        change_message_pageNumber(state,val){
            state.message_pageNumber = val
        }
    }
})
export default store
