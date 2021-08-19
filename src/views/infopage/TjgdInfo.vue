<template>
  <div class="tjgdinfo" v-if="id">
    <div class="top-wrap" v-if="playlist">
      <div class="left-wrap">
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="right-wrap">
        <p>{{playlist.name}}</p>
        <div class="right-info">
          <img :src="playlist.creator&&playlist.creator.avatarUrl" />
          <span class="info-name">{{playlist.creator&&playlist.creator.nickname}}</span>
          <span class="info-date">{{$utils.formatDate(playlist.createTime)}}</span>
        </div>
        <div class="right-btn">
          <i class="el-icon-video-play"></i>
          <span>播放全部</span>
        </div>
        <div class="right-item">
          <span class="item-name">标签：</span>
          <ul class="item-list">
            <li v-for="(item,index) in tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="right-item">
          <span class="item-name">简介：</span>
          <span class="item-info">{{playlist.description}}</span>
        </div>
      </div>
    </div>
    <div class="main-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="song">
          <newRow :tableData="tableData" />
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <comments v-if="isCommenlength" :dataList="hotComments">{{`精彩评论(${isCommenlength})`}}</comments>
          <comments :dataList="comments">{{`最新评论(${total})`}}</comments>
          <div class="wrap-pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-count="totalnumber"
              @current-change="currentchange"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { createSong } from "@/utils/base";
import { getplaylist, getSongDefalt, getCommentList } from "@/api";
import newRow from "@/components/newlistpage/newRow";
import comments from "@/components/infopage/comments";
export default {
  name: "TjgdInfo",
  components: {
    newRow,
    comments
  },
  data() {
    return {
      playlist: {}, //歌单详情
      activeName: "song",
      tableData: [],
      comments: [], //评论
      hotComments: [], //热门评论
      total: 0,
      currpage: 1,
      totalnumber: 0
    };
  },
  computed: {
    id() {
      return this.$route.query && this.$route.query.id;
    },
    tags() {
      return this.playlist.tags;
    },
    isCommenlength() {
      return this.hotComments.length;
    }
  },
  watch: {
    id: {
      handler() {
        this.initTable();
        this.initCommentList();
      },
      immediate: true //立即执行
    },
    currpage: {
      handler() {
        this.initCommentList();
      },
      immediate: true
    }
  },
  created() {
    // console.log(this.$route.query.id);
    // console.log(this.$route.params.id);
    // console.log(this.id);
    // await getplaylist();
  },
  methods: {
    async initTable() {
      const { playlist } = await getplaylist(this.id);
      this.playlist = playlist;
      let trackIds = playlist.trackIds.map(({ id }) => id); //过滤所有的id
      let { songs } = await getSongDefalt(trackIds.slice(0, 50)); //获取批量的歌单详情

      //进行数据的格式化
      const tableData = songs.map(({ al, ar, name, id, dt, mv }) =>
        createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          mvId: mv,
          album: al
        })
      );
      this.tableData = tableData;
    },
    async initCommentList() {
      const { comments, hotComments, total } = await getCommentList(
        this.id,
        this.currpage
      );
      this.comments = comments;
      this.hotComments = hotComments ? hotComments : [];
      // this.total = total;
      // this.total ? console.log("总数已经确定") : ();
      //总条数
      this.total = total; //总条数
      this.totalnumber = Math.ceil((total - this.isCommenlength) / 20);
    },
    currentchange(num) {
      this.currpage = num;
    }
  }
};
</script>

<style lang="scss" scoped>
.tjgdinfo {
  .top-wrap {
    display: flex;
    font-size: 0.7rem;
    .left-wrap {
      // flex: 0 0 10rem;
      img {
        width: 11rem;
        height: 11rem;
      }
    }
    .right-wrap {
      flex: 1;
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        width: 20rem;
        margin: 0;
        padding: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .right-info {
        width: 30rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        img {
          width: 1.5rem;
          height: 1.5rem;
          vertical-align: middle;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        .info-name {
          margin-right: 0.5rem;
        }
      }
      .right-btn {
        width: 5rem;
        padding: 0.3rem;
        border-radius: 0.2rem;
        background: linear-gradient(90deg, #e85e4d, #c6483c);
        font-size: 0.7rem;
        color: white;
        text-align: center;
        span {
          margin-left: 0.3rem;
        }
      }
      .right-item {
        display: flex;
        .item-name {
          flex: 0 0 2.5rem;
        }
        .item-list {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          li + li {
            margin-left: 0.3rem;
          }
        }
        .item-info {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .main-wrap {
    .wrap-pagination {
      text-align: center;
    }
  }
}
</style>
