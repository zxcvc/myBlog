<template>
    <div class="wrap">
        <header>
            <h2>{{article.title}}</h2>
            <div class="right">
                <p>{{article.author}}</p>
                <i>{{article.time | fmTime}}</i>
            </div>
        </header>
        <div class="content" v-html="article.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: {}
        };
    },
    methods: {
        async getDetile() {
            let ret = await this.$axios.get('/api/detile', {
                params: { id: this.$route.query.id }
            })
            this.article = ret.data
        }
    },
    created() {
        this.getDetile()

    }
};
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 4%;
    header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: baseline;
        h2 {
            flex: 3;
            text-align: center;
        }
        .right {
            flex: 1;
            width: 30%;
            display: flex;
            justify-content: space-evenly;
        }
    }
    .content{
        width: 100%;
        padding: 0 auto
    }

}

</style>
