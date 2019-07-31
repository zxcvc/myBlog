<template>
<div>
    <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
        {{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="logout">
                <a href="#" @click="logout" id="logout">注销</a>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</div>
</template>

<script>
export default {
    data() {
        return {
            username: ""
        };
    },
    methods: {
        async logout() {
            await this.$axios.get('/api/logout')
            localStorage.removeItem("user");
            this.$emit("toLogIn");
            this.$router.push('/home')
        },
        async getUser() {
            let ret = await this.$axios.get('/api/recongnize')
            if(ret.data){
              this.username = ret.data
            }else{
              this.$emit('toLogIn')
            }
        }
    },
    created() {
        this.getUser()
    },
    beforeUpdate() {
        this.$nextTick(this.getUser)
    }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>
