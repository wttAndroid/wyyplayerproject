<template>
  <div class="searchinfo" v-if="value">
    <div class="search-head">
      {{value}}
      <span>{{len}}</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="song">
        <table align="left">
          <thead>
            <tr>
              <th width="10"></th>
              <th width="50">音乐标题</th>
              <th width="30">歌手</th>
              <th width="40">专辑</th>
              <th width="25">时长</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in songs" :key="item.id" @click="clickitem(item.id)">
              <td width="10">{{index+1}}</td>
              <td width="50">
                {{item.name}}
                <div class="item-names" v-if="item.alias.length">{{item.alias&&item.alias[0]}}</div>
              </td>
              <td width="30">{{item.artists&&item.artists[0].name}}</td>
              <td width="40">{{item.album.name}}</td>
              <td width="25">{{item.duration}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="songs">
        <div class="grow-list">
          <a
            class="grow-item"
            v-for="item in playlists"
            :key="item.id"
            @click="clickTjgditemEvent(item.id)"
          >
            <div class="item-imgwrap">
              <img :src="item.coverImgUrl" alt />
              <span class="wrap-btn el-icon-caret-right"></span>
              <div class="wrap-text">播放量：{{item.playCount}}</div>
            </div>
            <p class="item-textwrap">{{item.name}}</p>
          </a>
        </div>
      </el-tab-pane>

      <!-- MV -->
      <el-tab-pane label="MV" name="mvs">
        <div class="findmv-row">
          <div
            class="findmv-row-item"
            v-for="item in mvs"
            :key="item.id"
            @click="clickToRouter(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <div class="img-number">
                <i class="el-icon-caret-right"></i>
                {{item.playCount}}
              </div>
              <span class="wrap-btn">
                <i class="el-icon-caret-right"></i>
              </span>
            </div>
            <div class="text-wrap">
              <div class="text-name">{{item.name}}</div>
              <div class="text-zuoz">{{item.artistName}}</div>
            </div>
          </div>
          <div v-if="len>4&len%4>0" class="findmv-row-item-bw"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="search-pagina">
      <el-pagination
        style="text-align: center;"
        background
        layout="prev, pager, next"
        :current-page="currpage"
        :page-count="pagecount"
        @current-change="clickPagi"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getSeacth, getSong } from "@/api";
import { mapActions } from "vuex";
export default {
  name: "searchinfo",
  data() {
    return {
      activeName: "song",
      songs: [],
      len: 0,
      currpage: 1, //当前页数
      pagecount: 0, //总页数
      playlists: [],
      mvs: []
    };
  },
  computed: {
    value() {
      return this.$route.query && this.$route.query.q;
    },
    type() {
      // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频,
      let i = 1;
      switch (this.activeName) {
        case "song": //单曲
          i = 1;
          break;
        case "songs": //歌单
          i = 1000;
          break;
        case "mvs": //mv
          i = 1004;
          break;
      }
      return i;
    }
  },

  watch: {
    value: {
      handler() {
        this.initData();
      },
      immediate: true
    },
    activeName() {
      this.initData();
    },
    currpage() {
      this.initData();
    }
  },
  methods: {
    ...mapActions["setcurrentSongA"],
    async initData() {
      const { result } = await getSeacth(this.value, this.type, this.currpage);

      switch (this.type) {
        case 1:
          this.len = result.songCount;
          this.pagecount = Math.ceil(result.songCount / 10);
          this.songs = result.songs.map(item => {
            item.duration = this.fordate(item.duration);
            return item;
          });
          break;
        case 1000:
          this.len = result.playlistCount;
          this.playlists = result.playlists;
          this.pagecount = Math.ceil(result.playlistCount / 10);
          this.playlists = result.playlists.map(item => {
            item.playCount =
              Number(item.playCount) > 10000
                ? Math.floor(item.playCount / 10000) + "万"
                : item.playCount;
            return item;
          });
          break;
        case 1004:
          this.len = result.mvCount;
          this.mvs = result.mvs;
          this.pagecount = Math.ceil(result.mvCount / 10);
          // this.songs = result.songs;
          break;
      }
    },
    fordate(duration) {
      let s = duration / 1000;
      let m = Math.floor(s / 60);
      s = Math.floor(s % 60);
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    },
    clickPagi(num) {
      this.currpage = num;
    },
    async clickitem(id) {
      let { data } = await getSong(id);
      let song = data && data[0];
      this.$store.dispatch("setcurrentSongA", song);
    },
    handleClick() {
      this.currpage = 1;
    },
    clickTjgditemEvent(id) {
      this.$router.push(`/tjgdinfo?id=${id}`);
    },
    clickToRouter(id) {
      this.$router.push(`/tjmvinfo?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchinfo {
  .search-head {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    span {
      font-weight: normal;
      font-size: 0.8rem;

      color: #cccccc;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    color: var(--color-font);
    th {
      font-weight: normal;
      color: #909399;
      font-size: 0.7rem;
    }
    td,
    th {
      padding: 0.8rem 0;
    }

    tr:nth-child(2n-1) {
      background-color: #fff;
    }
    tr:nth-child(2n) {
      background-color: #fafafa;
    }
    tr {
      &:hover {
        background-color: #f5f7fa;
      }
    }
    td {
      .item-names {
        margin-top: 1rem;
        color: #bebebe;
        font-size: 0.6rem;
      }
    }
  }
  .findmv-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .findmv-row-item {
      width: 22%;
      min-width: 10rem;
      margin-bottom: 1rem;
      .img-wrap {
        position: relative;
        display: flex;
        align-items: center;
        &:hover {
          .wrap-btn {
            opacity: 1;
          }
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.3rem;
        }
        .img-number {
          position: absolute;
          top: 0.3rem;
          right: 0.3rem;
          color: white;
          font-size: 0.6rem;
        }
        .wrap-btn {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 25% auto;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          font-size: 1.5rem;
          border-radius: 50%;
          color: var(--color-font-active);
          background-color: rgba($color: #ffffff, $alpha: 0.7);
          transition: all 0.8s;
          opacity: 0;
        }
      }
      .text-wrap {
        .text-name {
          font-size: 0.7rem;
          color: var(--color-font);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .text-zuoz {
          font-size: 0.6rem;
          color: #dddd;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    .findmv-row-item-bw {
      width: 22%;
      min-width: 10rem;
      overflow: hidden;
    }
  }
  .search-pagina {
    margin-top: 2rem;
  }
}
</style>
