<template>
  <div class="recomTjgd">
    <div class="recomtjgd-tab" v-if="tagsList">
      <span class="tab-item" :class="0===tabActive?'active':''" @click="swichTabChange(0)">全部</span>
      <span
        class="tab-item"
        v-for="(item,index) in tagsList"
        :key="item.id"
        :class="index+1===tabActive?'active':''"
        @click="swichTabChange(index+1,item.name)"
      >{{item.name}}</span>
    </div>

    <div class="recomtjgd-list" v-if="playList">
      <div class="grow-list">
        <a
          class="grow-item"
          v-for="(item,index) in playList"
          :key="index"
          @click="clickSongItem(item.id)"
        >
          <div class="item-imgwrap">
            <img :src="item.coverImgUrl" alt />
            <span class="wrap-btn el-icon-caret-right"></span>
            <div class="wrap-text">播放量：{{item.playCount}}</div>
          </div>
          <div class="item-textwrap">{{item.name}}</div>
        </a>
      </div>
    </div>

    <div class="recomtjgd-pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currpage"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getRecomCatelist, getRecomPlaylist } from "@/api";
export default {
  name: "recomTjgd",
  data() {
    return {
      tagsList: [],
      tabActive: 0,
      playList: [],
      total: 0,
      currpage: 1
    };
  },
  async created() {
    const { tags } = await getRecomCatelist();
    this.tagsList = tags;
    this.getRecomPlayData();
  },
  methods: {
    //切换列表的事件
    swichTabChange(index = 0, name = "全部") {
      this.tabActive = index;
      this.$parent.$data.activeTab = name;
      //同时更改页码
      this.currentChange(1, name);
    },
    //更新歌单列表
    async getRecomPlayData(name, offset) {
      const { playlists, total } = await getRecomPlaylist(name, offset);
      this.playList = playlists;
      this.total = total;
    },

    //切换页数
    currentChange(num, name) {
      this.currpage = num;
      name = name ? name : this.$parent.$data.activeTab;
      this.getRecomPlayData(name, num);
    },
    clickSongItem(id) {
      this.$router.push(`/tjgdinfo?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.recomTjgd {
  margin: 1.5rem 0;
  .recomtjgd-tab {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: flex-end;
    color: var(--color-font);
    font-size: 0.7rem;
    .tab-item {
      margin-right: 0.8rem;
      cursor: pointer;
      &.active {
        color: var(--color-font-active);
      }
    }
  }
  .recomtjgd-pagina {
    text-align: center;
  }
}
</style>
