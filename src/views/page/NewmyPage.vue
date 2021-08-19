<template>
  <div class="newmv">
    <newmvTabr :currConfig="currConfig" />

    <div class="findmv-row" v-if="mvList">
      <a
        class="findmv-row-item"
        v-for="item in mvList"
        :key="item.id"
        @click="clickmvItem(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.cover" alt />
          <div class="img-number">
            <i class="el-icon-caret-right"></i>
            {{parseInt(item.playCount)>10000?Math.trunc(parseInt(item.playCount)/10000)+'万':parseInt(item.playCount)}}
          </div>
          <span class="wrap-btn">
            <i class="el-icon-caret-right"></i>
          </span>
        </div>
        <div class="text-wrap">
          <div class="text-name">{{item.name}}</div>
          <div class="text-zuoz">{{item.artistName}}</div>
        </div>
      </a>
      <div v-if="mvList.length>4&mvList.length%4>0" class="findmv-row-item-bw"></div>
    </div>

    <div class="newmv-pagin">
      <el-pagination
        background
        :page-count="total"
        :current-page="currPage"
        @current-change="currentChange"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import newmvTabr from "@/components/newmvpage/newmvTabr";
import { getNewmvList } from "@/api";
export default {
  name: "NewmyPage",
  components: {
    newmvTabr
  },
  data() {
    return {
      currConfig: [
        {
          name: "地区",
          value: "全部",
          list: ["全部", "内地", "港台", "欧美", "日本", "韩国"]
        },
        {
          name: "类型",
          value: "全部",
          list: ["全部", "官方版", "原生", "现场版", "网易出品"]
        },
        {
          name: "排序",
          value: "上升最快",
          list: ["上升最快", "最热", "最新"]
        }
      ],
      mvList: [],
      total: 0,
      currPage: 1
    };
  },
  watch: {
    currConfig: {
      handler(newvalue, orl) {
        this.currPage = 1;
        this.getMyList();
      },
      deep: true
    }
  },
  created() {
    this.currPage = 1;
    this.getMyList();
  },
  methods: {
    async getMyList() {
      let { count, data } = await getNewmvList(
        this.currConfig[0].value,
        this.currConfig[1].value,
        this.currConfig[2].value,
        this.currPage
      );
      if (this.currPage == 1) {
        this.total = count / 8; //总页数
        // this.total = count; //总条数
      }
      this.mvList = data;
    },
    currentChange(num) {
      this.currPage = num;
      console.log(num);
      this.getMyList();
    },
    clickmvItem(id) {
      this.$router.push(`/tjmvinfo?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.newmv {
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
  .newmv-pagin {
    text-align: center;
  }
}
</style>
