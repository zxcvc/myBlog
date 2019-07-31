<template>
<div class="container-fluid">
    <form action>
        <form class="row">
            <div class="col-lg-6">
                <div class="form-group">
                    <label for="title">标题</label>
                    <input type="text" class="form-control" id="title" autocomplete="off" v-model="title">
                </div>
                <div class="form-group">
                    <label for="describe">描述</label>
                    <textarea name id cols="20" rows="3" class="form-control" v-model="describe"></textarea>
                </div>
                <div class="form-group" ref="content">
                    <label for="content">内容</label>
                    <!-- <textarea name id cols="30" rows="15" class="form-control" v-model="content"></textarea> -->
                    <!-- <quill-editor class="quill" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                    </quill-editor> -->
                    <vue-html5-editor :content="content" :height="500" @change="change"></vue-html5-editor>
                </div>
                <button type="submit" class="btn btn-success" @click.prevent="addArticle">发表</button>
            </div>
        </form>
    </form>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    data() {
        return {
            title: '',
            describe: '',
            // content: '',
            author: '',
            success: false,
            tips: '',
            content: '<h2>I am Example</h2>',
            // editorOption: {
            //     //  theme: 'bubble',
            // }
        };
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        change(content){
            this.content = content
        },
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        },
        check() {
            if (!this.title) {
                this.tips = '请输入文章标题'
                return
            }
            if (!this.describe) {
                this.tips = '请输入文章描述'
                return
            }
            if (!this.content) {
                this.tips = '请输入文章内容'
                return
            }

        },
        getAuthor() {
            this.author = JSON.parse(localStorage.getItem("user")).username;
        },

        async addArticle() {
            if (!this.title || !this.describe || !this.content) {
                this.check()
                this.open(this.tips, 'error', 1500)
                return
            }
            let ret = await this.$axios.post(
                "/api/addArticle",
                this.$qs.stringify({
                    title: this.title,
                    describe: this.describe,
                    content: this.content,
                    author: this.author,
                    time: new Date()
                })
            );
            if (ret.status === 200) {
                this.success = ret.data.success
                this.tips = ret.data.tips
                this.open(this.tips, 'success', 1500)
            }
        },
        open(msg, typ, duration) {
            this.$Message({
                message: msg,
                type: typ,
                duration: duration,
                center: true,
                onClose: () => {
                    if (!this.success) return;
                    this.$router.push("/home");
                }
            });
        },
    },
    created() {
        this.getAuthor()
        this.addArticle = this.throttle(this.addArticle, 1500)
    },
    mounted(){
        // this.$refs.content.style.background = 'white'
        // this.$refs.content.requestFullscreen()
    },

    components: {
        quillEditor
    }
};
</script>

<style lang="scss" scoped>
.row {
    display: flex;
    justify-content: center;
    margin: 0 !important;
}

.quill {
    min-height: 200px;
}

</style>
