<template>
<div class='warp'>
    <ul class="content">
        <li v-for="item in articles" :key="item.id" class="article">
            <router-link :to="{path:'/article',query:{id:item._id}}">{{item.title}}</router-link>
            <div class="right">
                <p>{{item.author}}</p>
                <!-- <i>{{item.time | fmTime}}</i> -->
            </div>
        </li>

    </ul>
    <div class="page" v-show="articles">
        <el-pagination :page-size="10" :pager-count="11" layout="prev, pager, next" :total="articlesCount" @current-change='page_change' :current-page="page">
        </el-pagination>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            articlesCount:null,
            articles: null,
            cos:null
        }
    },
    computed:{
        page(){
            return this.$store.state.allArticlPageNumber
        }
    },
    methods: {
        async getArticlesCount() {
            let ret = await this.$axios.get('/api/getArticlesCount')
            this.articlesCount = parseInt(ret.data)
        },
        async getArticles(page, page_size) {
            let ret = await this.$axios.get('/api/articles', {
                params: {
                    page: page,
                    page_size: page_size
                }
            })
            this.articles = ret.data
        },
        page_change(page) {
            this.$store.commit('change_allArticlPageNumber',page)
            this.getArticles(this.page, 10)
        },
    },
    async created() {
        this.getArticlesCount()
        this.getArticles(this.page, 10)
    }
};
</script>

<style lang="scss" scoped>
.warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    .content {
        width: 80%;
        box-sizing: border-box; // 
        height: 500px;
        display: flex;
        flex-direction: column; // justify-content: space-around;
        li {
            margin-top: 16px;
            display: flex;
            justify-content: space-between;
            .right {
                margin-right: 20px;
                display: flex;
                justify-content: space-between;
                width: 30%;
                p {
                    margin: 0;
                }
                i {
                    width: 200px;
                }
            }
        }
    }
    .page {
        align-self: center;
    }
}
</style>