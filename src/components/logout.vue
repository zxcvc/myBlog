<template>
  <div>
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        {{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="logout">
          <a href="#" @click="logout">注销</a>
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
    logout() {
      localStorage.removeItem("user");
      this.$emit("toLogIn");
      this.$router.push('/home')
    },
    getUser() {
      if (localStorage.getItem("user")) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.username = user.username;
      } else {
        this.$emit("toLogIn");
      }
    }
  },
  created() {
    this.$nextTick(this.getUser());
  },
  beforeUpdate() {
    this.$nextTick(this.getUser());
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
