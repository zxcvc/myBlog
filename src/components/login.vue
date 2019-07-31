<template>
  <div class="login">
    <span class="btn btn-success" @click="dialogFormVisible = true">登录</span>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :append-to-body="true">
      <form>
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            type="email"
            class="form-control"
            id="username"
            autocomplete="off"
            v-model="username"
          >
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            @keyup.enter="check"
          >
        </div>
        <h5 class="text-success text-center" v-show="success">登陆成功</h5>
        <h5 class="text-danger text-center" v-show="error">登录失败</h5>
        <h5 class="text-danger text-center" v-show="error">{{tips}}</h5>
      </form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false; error = false">取消</el-button>
        <el-button type="primary" @click="check">登录</el-button>
        <el-button type="warning" @click="toRegister">还没账号 点击注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
  data() {
    return {
      tipShow: false,
      // dialogFormVisible: false,
      success: false,
      error: false,
      timeId: null,
      username: "",
      password: "",
      nick: "",
      tips: "",
      formLabelWidth: "120px"
    };
  },
  computed:{
      dialogFormVisible:{
        get:function(){
          return this.$store.getters.dialogFormVisible
        },
        set:function(newval){
          this.$store.commit('changeDialogFormVisible',newval)
        }
      }
  },
  methods: {
    check() {
      this.asyncCheck()
    },

    async asyncCheck() {
      let userinfo = {
        username: this.username,
        password: this.password,
      };
      let ret = await this.$axios.post(
        "/api/login",
        this.$qs.stringify(userinfo)
      );

      if(!this.username){
        this.tips = '请输入用户名'
        this.error = true
        return
      }

      if(!this.password){
        this.tips = '请输入密码'
        this.error = true
        return
      }

      let data = ret.data
      if (!data.success) {
        this.error = true
        this.tips = data.msg
        return
      }

      localStorage.setItem("user", JSON.stringify({username:data.username}));
      this.success = true
      this.error = false
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.$emit("toLogOut")
        this.dialogFormVisible = false
        this.success = false
        this.error = false
        this.username = ''
        this.password = ''
        this.tips = ''
        this.$router.push('/home')
        clearTimeout(this.timeId);
      }, 1000);
    },

    toRegister() {
      this.username = ''
      this.password = ''
      this.error = false
      this.tips = ''
      this.dialogFormVisible = false;
      this.$router.push("/register");
    }
  },
  created(){
    this.check = this.throttle(this.check,1500)
  }
}
</script>

<style lang="scss" scoped>
  form{
    width: 60%;
    margin: 0 auto;
  }

</style>