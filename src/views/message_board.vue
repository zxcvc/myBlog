<template>
<div class="container">
    <div class="editor">
        <div class="row">
            <div class="col-lg-7">
                <textarea class="form-control" rows="7" maxlength="200" placeholder="最多200字" v-model="msg"></textarea>
            </div>
        </div>
        <button class="btn btn-info" @click="publish">留言</button>
    </div>
    <ul class="board">
        <li v-for="item in messages" :key="item._id">
            <dl v-cloak>
                <dt>{{item.message}}</dt><br>
                <dd>{{item.username}}</dd>
                <dd><i>{{item.time | fmTime}}</i></dd>
            </dl>
        </li>
    </ul>
    <el-pagination :page-size="5" :pager-count="11" layout="prev, pager, next" :total="messagesCount" class="page" @current-change='page_change' v-show="messages" :current-page="page">
    </el-pagination>
</div>
</template>

<script>
export default {
    data() {
        return {
            messagesCount:null,
            msg: "",
            username: "",
            messages: null
        };
    },
    computed:{
        page(){
            return this.$store.state.message_pageNumber
        }
    },
    methods: {
        async getMessagesCount() {
            let ret = await this.$axios.get('/api/getMessagesCount')
            this.messagesCount = parseInt(ret.data)
        },
        open(msg, typ, duration) {
            this.$Message({
                message: msg,
                type: typ,
                duration: duration,
                center: true,
                onClose: this.get_message
            })
        },
        async publish() {
            let user = localStorage.getItem("user") || JSON.stringify({ username: '匿名' })
            this.username = JSON.parse(user).username;
            if (!this.msg) {
                this.open('请输入内容', 'error', 1500)
                return
            }
            let message_info = {
                message: this.msg,
                time: new Date(),
                username: this.username
            }
            let ret = await this.$axios.post('/api/addMessage', this.$qs.stringify(message_info))
            if (ret) {
                this.username = ''
                this.msg = ''
                this.open('留言成功', 'success', 1500)
                this.get_message(1, 5)
            } else {
                this.open('留言失败 请稍后重试', 'error', 1500)
            }
        },
        async get_message(page, page_size) {
            let ret = await this.$axios.get('/api/getMessage', {
                params: {
                    page: page,
                    page_size: page_size
                }
            })
            this.messages = ret.data
        },
        page_change(page) {
            this.$store.commit('change_message_pageNumber',page)
            this.get_message(this.page, 5)
        }
    },
    created() {
        this.getMessagesCount()
        this.get_message(this.page, 5)
        this.publish = this.throttle(this.publish, 1500)
    }
};
</script>

<style lang="scss" scoped>
.col-lg-7 {
    margin-bottom: 2%;
}

.container {
    .editor {
        margin-bottom: 5%;
    }
    .board {
        width: 75%;
        padding-left: 0;
        li {
            margin-bottom: 8%;
        }
        p {
            word-break: break-all;
        }
    }
}
</style>
