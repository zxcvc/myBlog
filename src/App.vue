<template v-cloak>
  <div class="wrap">
    <mynav v-cloak></mynav>
    <div class="main" v-cloak>
      <router-view></router-view>
    </div>
  </div>
</template>  

<script>
import { mapMutations } from "vuex";
import mynav from "../src/components/nav.vue";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["loginregin"])
  },

  components: {
    // home,
    // allArticles,
    // messageboard,
    // album,
    // login,
    // logout,
    mynav,
    // albumcard,

  }
};
</script>
<style lang="scss" scoped>
.wrap {
  .anv {
    margin: 0;
  };
  .main {
    padding-top: 1%;
    // padding-bottom: 6%;
    overflow-x: auto;
  };
  .footer{
    width: 100%;
    background-color:sienna;
    bottom: 0;
    display: block;
    position: fixed;
  }  
}
</style>
