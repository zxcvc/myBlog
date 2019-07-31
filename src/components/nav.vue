<template>
<nav class="nav">
    <router-link to="/home" tag="li" class='sb'>主页</router-link>
    <router-link to="/allArticles" tag="li" class='sb'>所有文章</router-link>
    <router-link to="/messageboard" tag="li" class='sb'>留言</router-link>
    <router-link to="/albumcard" tag="li" class='sb'>相册</router-link>
    <router-link to="/addArticle" class="add">
        <span class="iconfont icon-write"></span>
    </router-link>
    <a href="#" id="last" class="sb">
        <login @toLogOut="toLogOut" v-if="componentId==='login'" class='sb'></login>
        <logout @toLogIn="toLogIn" v-if="componentId==='logout'" class='sb'></logout>
    </a>
</nav>
<!-- <div class="container-fluid">
      <div id="bs-example-navbar-collapse-1">
        <ul class="nav nav-tabs navbar-default" id="ul">
            <router-link to="/home" tag="li"><a>主页</a></router-link>
            <router-link to="/allArticles" tag="li"><a>所有文章</a></router-link>
            <router-link to="/messageboard" tag="li"><a>留言</a></router-link>
            <router-link to="/albumcard" tag="li"><a>相册</a></router-link>
          <div class="other">
            <router-link to="/addArticle" class="add">
              <span class="glyphicon glyphicon-edit"></span>
            </router-link>
          </div>
          <div class="other">
            <a href="#" id="last">
              <login @toLogOut="toLogOut" v-if="componentId==='login'"></login>
              <logout @toLogIn="toLogIn" v-if="componentId==='logout'"></logout>
            </a>
          </div>
        </ul>
      </div>
    </div> -->
</template>

<script>
import login from "./login.vue";
import logout from "./logout.vue";
export default {
    data() {
        return {
            componentId: "logout"
        };
    },
    components: {
        login,
        logout
    },
    methods: {
        toLogIn() {
            this.componentId = "login";
        },
        toLogOut() {
            this.componentId = "logout";
        }
    }
};
</script>

<style lang="scss" scoped>
// .container-fluid{
//   padding: 0;
//   margin-bottom: 20px;
//   #bs-example-navbar-collapse-1 {
//   width: 100%;
//   padding: 0;
//   #ul {
//     display: flex;
//     align-items: center;
//     width: 100%;
//     padding: 0 2%;
//     li {
//       margin: 0 1%;
//       display: flex;
//       align-items: center;
//       font-size: 16px;
//       #last {
//         padding-top: 0;
//         padding-bottom: 0;
//       };
//     };
//     .other{
//       margin: 0 2%;
//       .add{
//         font-size: 20px;
//         color: rgb(100, 98, 231);
//       }
//     }
//   }
// }
// }
.nav {
    width: 100%;
    height: auto;
    background-color: #333;
    box-shadow: 0px 5px 15px #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #fff;
    padding: 1% 0;
    .add{
      .icon-write{
        color: #fff;
        font-size: 18px;
      }
    }
    .sb {
        cursor: pointer;
        width: 100px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ;
    .active {
        color: grey;
    }
}
</style>
