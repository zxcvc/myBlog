<template>
<div class="wrap">
    <el-card class="box-card" v-for="item in articles" :key="item._id">
        <div slot="header" class="clearfix">
            <h3 class="titel">
                <router-link :to="{name:'detile', query:{id:item._id}}">{{ item.title }}</router-link>
            </h3>
        </div>
        <div class="describe">{{ item.describe }}</div>
        <hr>
        <span class="author">{{ item.author }}</span> &nbsp;&nbsp;
        <i class="time" v-cloak>{{ item.time | fmTime }}</i>
    </el-card>
    <el-pagination :page-size="5" :pager-count="11" layout="prev, pager, next" :total="articlesCount" class="page" @current-change='page_change' v-show="articles" :current-page="page">
    </el-pagination>
</div>
</template>

<script>
export default {
    data() {
        return {
            articles: null,
            articlesCount: null
        };
    },
    computed:{
        page(){
            return this.$store.state.homePageNumber
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
                    page,
                    page_size
                }
            })
            this.articles = ret.data
        },
        page_change(page) {
            this.$store.commit('change_homePageNumber',page)
            this.getArticles(this.page, 5)
        }
    },
    created() {
        this.getArticlesCount()
        this.getArticles(this.page, 5)
    }
};
</script>

<style lang="scss" scoped>
.wrap {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

.box-card {
    width: 60%;
    margin-top: 1rem;
}
</style>
