<template>
<div class="wrap">
    <div class="listwrap">
        <ul class="list">
            <li v-for="item in imgSrc" :key="item._id" class="item">
                <img v-lazy="item.url" :preview="preview" preview-text="描述文字" class="img">
            </li>
            <li class="item">
                <el-upload class="upload" :limit=8 :multiple=true :on-exceed="tip" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-change="change">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                </el-upload>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { cos_promise, BUCKET, REGION } from '../js/cos.js'
export default {
    data() {
        return {
            imgSrc: [],
            preview: this.$route.query.id,
            dialogImageUrl: '',
            dialogVisible: false,
            reconginize: null,
            cos: null,
            fileList: []
        };
    },

    methods: {
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

        tip() {
            this.open('一次最多上传8张图片', 'error', 1500)
        },

        async get_img() {
            let ret = await this.$axios.get('/api/getImgByDir', {
                params: {
                    dir: this.$route.query.id
                }
            })
            this.imgSrc = ret.data
            this.$previewRefresh()
        },

        async upload(bucket, region, file) {
            let cos = await cos_promise
            this.cos.putObject({
                Bucket: bucket,
                Region: region,
                Key: this.$route.query.id + '/' + file.name,
                Body: file
            }, (err, data) => {
                console.log(err || data);
            })
        },

        submitUpload() {
            this.fileList.forEach((item) => {
                this.cos.putObject({
                    Bucket: BUCKET,
                    Region: REGION,
                    Key: `${this.$route.query.id}/${item.name}`,
                    Body: item
                }, async (err, data) => {
                    let ret = await this.$axios.post('/api/addImg', this.$qs.stringify({
                        dir: this.$route.query.id,
                        url: 'http://' + data.Location
                    }))
                    console.log(ret)
                    console.log(data.Location)
                    this.imgSrc.push({
                        _id: Math.random().toString(),
                        url: 'http://' + data.Location,
                        dir: this.$route.query.id
                    })
                    this.$previewRefresh()
                })
            })
            this.fileList = []
        },

        handleRemove(file, fileList) {
            this.fileList = fileList
        },

        handlePreview(file) {
            console.log(file);
        },

        change(file, filelist) {
            this.fileList = filelist.map(item => item.raw)
        },
    },

    watch: {
        file(newval) {
            console.log(newval)
        }
    },

    components: {},

    async created() {
        this.cos = await cos_promise
        this.get_img()
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
    align-items: center; // position: relative;
    .listwrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .list {
            width: 1200px; // height: 900px;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            .item {
                width: 300px;
                height: 300px;
                padding: 0 !important;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

.img {
    width: 300px;
    height: 300px;
}
</style>
