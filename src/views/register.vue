<template lang="">
  <div class="container">
    <form class="row">
      <div class="col-lg-6">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" class="form-control" id="username" autocomplete="off"
            v-model="username" @input="haveusername">
          <strong class="text-danger" v-show="have">用户名已存在</strong>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="form-group">
          <label for="password">请再次输入密码</label>
          <input type="password" class="form-control" id="password" v-model="confPassword">
        </div>
        <el-button type="primary" @click.prevent="register">注册</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confPassword: "",
      have: false,
      success: false
    };
  },
  methods: {
    async register() {
      if (this.have) {
        this.success = false;
        this.open("用户名已存在", "error", 1500);
        return;
      }
      if (this.username === "" || this.password === "") {
        this.open("用户名或密码为空", "error", 1500);
        return;
      }
      if (this.password !== this.confPassword) {
        this.open("两次密码不一致", "error", 1500);
        return;
      }

      let ret = await this.$axios.post(
        "/api/register",
        this.$qs.stringify({
          username: this.username,
          password: this.password,
          nick: this.nick
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (ret.data.success === true) {
        this.success = true;
        this.open("注册成功", "success", 1500);
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
    async haveusername() {
      let ret = await this.$axios.get("/api/haveusername", {
        params: { username: this.username }
      });
      this.have = ret.data.have;
    }
  },
  created(){
    this.register = this.throttle(this.register,1500)
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: center;
  margin: 0!important;
}
</style>