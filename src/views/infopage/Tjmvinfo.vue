<template>
  <div class="tjmvinfo">
    <div class="tjmvinfo-row">
      <div class="tjmv-left" v-if="data">
        <div class="tjmv-info">
          <h3>MV详情</h3>
          <div class="video-wrap">
            <video controls="controls" :src="urlobj.url"></video>
          </div>
          <div class="info-wrap">
            <div class="info-user">
              <div class="img-wrap">
                <img :src="data.cover" alt />
              </div>
              <span>{{data.artistName}}</span>
            </div>
            <div class="info-text">
              <h2>{{data.name}}</h2>
              <span>发布：{{data.publishTime}}</span>
              <span>播放:{{data.playCount}}次</span>
              <p>{{data.desc}}</p>
            </div>
          </div>
        </div>
        <div class="tjmv-comment">
          <comments v-if="iscomm" :dataList="hotcommentList">{{`精彩评论(${iscomm})`}}</comments>
          <comments :dataList="commentList">{{`最新评论(${totals})`}}</comments>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="total"
            @current-change="currentchange"
          ></el-pagination>
        </div>
      </div>
      <div class="tjmv-right">
        <h3>相关推荐</h3>
        <div class="xgtj-wrap">
          <div class="xgtj-item" v-for="item in mvs" :key="item.id" @click="clickXgtjitem(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="wrap-btn el-icon-caret-right"></span>
            </div>
            <div class="item-text">
              <span>{{item.name}}</span>
              <p>{{item.artistName}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfomv, getInfomvurl, getInfomvComent, getSimimvList } from "@/api";
import comments from "@/components/infopage/comments";
export default {
  name: "Tjmvinfo",
  data() {
    return {
      urlobj: {},
      data: {},
      commentList: [],
      hotcommentList: [],
      currpage: 1,
      total: 0,
      totals: 0,
      mvs: []
    };
  },
  components: {
    comments
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    iscomm() {
      return this.hotcommentList && this.hotcommentList.length;
    }
  },
  watch: {
    id: {
      handler() {
        this.initData();
        console.log("重新获取id数据");
      },
      immediate: true
    },
    currpage: {
      handler() {
        this.initData();
      },
      immediate: true
    }
  },
  methods: {
    async initData() {
      const { data } = await getInfomv(this.id); //获取mv
      const urlobj = await getInfomvurl(this.id); //获取mv地址
      const { mvs } = await getSimimvList(this.id);
      this.mvs = mvs;
      this.data = data;
      this.urlobj = urlobj.data;
      this.initComment();
    },
    async initComment() {
      const { comments, hotComments, total } = await getInfomvComent(
        this.id,
        this.currpage
      );
      this.commentList = comments;
      this.totals = total;
      this.total = Math.ceil(total / 10); //一共多少页
      this.hotcommentList = hotComments ? hotComments : [];
    },
    currentchange(num) {
      this.currpage = num;
    },
    clickXgtjitem(id) {
      // this.$router.push();
      this.$router.replace(`/tjmvinfo?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.tjmvinfo {
  .tjmvinfo-row {
    display: flex;
    overflow: hidden;
    font-size: 0.7rem;
    .tjmv-left {
      flex: 2;
      .tjmv-info {
        .video-wrap {
          width: 100%;
          height: 18rem;
          video {
            width: 100%;
            height: 100%;
            outline: none;
            border-radius: 0.5rem;
            object-fit: fill;
          }
        }
        .info-wrap {
          margin: 2rem 0;
          .info-user {
            display: flex;
            align-items: center;
            .img-wrap {
              width: 3rem;
              height: 3rem;
              overflow: hidden;
              border-radius: 50%;
              margin-right: 0.5rem;
              img {
                height: 100%;
              }
            }
            span {
              // flex: 0 0 10rem;
              width: 10rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .info-text {
            h2 {
            }
            span {
              font-size: 0.6rem;
              color: #bebebe;
            }
            span + span {
              margin-left: 1rem;
            }
            p {
              display: -webkit-box;
              -webkit-line-clamp: 10;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .tjmv-right {
      flex: 1;
      margin-left: 2rem;
      .xgtj-wrap {
        .xgtj-item {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          transition: all 0.8s;
          .img-wrap {
            width: 8rem;
            position: relative;
            overflow: hidden;
            border-radius: 0.3rem;
            margin-right: 0.8rem;
            img {
              width: 100%;
              height: 100%;
              vertical-align: middle;
            }
            .wrap-btn {
              cursor: pointer;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              background-color: rgba(255, 255, 255, 0.8);
              width: 1.5rem;
              height: 1.5rem;
              font-size: 1.3rem;
              color: var(--color-font-active);
              line-height: 1.5rem;
              text-align: center;
              border-radius: 50%;
              opacity: 0;
              transition: all 0.8s;
            }
          }
          .item-text {
            flex: 1;
            overflow: hidden;
            span {
              color: black;
              font-weight: 400;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p {
              padding: 0;
              margin: 0;
              color: #bebebe;
              display: -webkit-box;
              font-size: 0.7rem;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          &:hover {
            background-color: #f5f5f5;
            .img-wrap {
              .wrap-btn {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
