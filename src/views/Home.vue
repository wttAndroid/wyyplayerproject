<template>
  <div class="home">
    <div class="nav">
      <ul>
        <li class="nav-item-wrap" v-for="(item,index) in routerList" :key="index">
          <router-link :to="item.to" class="nav-item">
            <i class="icon" :class="item.icon"></i>
            {{item.name}}
          </router-link>
        </li>
      </ul>
    </div>
    <router-view id="main" />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      routerList: [
        {
          name: "发现歌单",
          to: "/find",
          icon: "el-icon-orange"
        },
        {
          name: "推荐歌单",
          to: "/recom",
          icon: "el-icon-s-unfold"
        },
        {
          name: "最新音乐",
          to: "/newlist",
          icon: "el-icon-service"
        },
        {
          name: "最新MV",
          to: "/newmy",
          icon: "el-icon-film"
        }
      ]
    };
  },
  components: {},
  watch: {
    $route(to, from) {}
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  .nav {
    flex: 0 0 9rem;
    background-color: #ededed;
    .nav-item-wrap {
      .nav-item {
        display: block;
        height: 2.8rem;
        line-height: 2.8rem;
        text-align: left;
        padding-left: 1.5rem;
        color: inherit;
        .icon {
          margin-right: 0.5rem;
        }
        &:hover {
          background-color: #e7e7e7;
        }
        &.router-link-active {
          color: var(--color-font-active);
          background-color: #e7e7e7;
        }
      }
    }
  }
  #main {
    flex: 1;
    background-color: white;
    padding: 1rem 5rem;
    overflow-y: scroll;
  }
}
</style>
