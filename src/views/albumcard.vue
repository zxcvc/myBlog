<template>
<div class="wrap">
    <ul class="list">
        <li class="item" v-for="item in album_list" :key="item._id">
            <div class="body">
                <router-link :to="{path:'/album',query:{id:item.dir}}" tag="div">
                    <img v-lazy="item.url||'https://cc-1259403476.cos.ap-chengdu.myqcloud.com/timg.jpg'">
                </router-link>
            </div>
            <strong class="title">{{item.dir}}</strong>
        </li>
        <li class="item add" v-show="album_list">
            <add>
                <template v-if="tag">
                    <el-input v-model="dir" placeholder="请输入相册名称" class="elinput"></el-input>
                    <div class="btnwrap">
                        <el-button type="success" icon="el-icon-check" circle @click="submit"></el-button>
                        <el-button type="info" icon="el-icon-close" circle @click="change(false)">
                        </el-button>
                    </div>
                </template>
                <template v-else>
                    <span class="el-icon-plus" @click="change(true)"></span>
                </template>
            </add>
        </li>
    </ul>
</div>
</template>

<script>
import { cos_promise, BUCKET, REGION } from '../js/cos.js'
import album from "./album.vue";
import add from '../components/add.vue'
export default {
    data() {
        return {
            album_list: null,
            dir: '',
            tag: false
        };
    },
    methods: {
        async submit() {
            let ret = await this.$axios.get('/api/addImgDir', {
                params: {
                    dir: this.dir
                }
            })
            this.get_album_list()
            this.change(false)
        },
        async get_album_list() {
            let ret = await this.$axios.get('/api/getImgDir')
            this.album_list = ret.data
        },
        change(tag) {
            this.tag = tag
        },
    },
    components: {
        album,
        add
    },
    created() {
        this.get_album_list()
    }
};
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    padding: 0 auto;
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .add {
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 200px;
            color: rgb(227, 235, 243);
        }
        .item {
            position: relative;
            display: flex;
            width: 300px;
            height: 300px;
            margin: 1% 1%;
            flex-direction: column;
            justify-content: flex-start;
            box-shadow: 2px 2px 2px rgb(212, 208, 208);
            .title {
                flex: 2;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            ;
            .body {
                flex: 8;
                // height: 80%;
                div {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}

</style>
