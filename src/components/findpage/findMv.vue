<template>
  <div class="findmv" v-if="mvList">
    <h3>推荐MV</h3>
    <div class="findmv-row">
      <div
        class="findmv-row-item"
        v-for="item in mvList"
        :key="item.id"
        @click="clickToRouter(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.picUrl" alt />
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
  </div>
</template>

<script>
import { getFindMy } from "@/api";
export default {
  name: "findMv",
  data() {
    return {
      len: 4,
      mvList: []
    };
  },
  async created() {
    const { result } = await getFindMy();
    this.mvList = result;
    this.len = result.length;
  },
  methods: {
    clickToRouter(id) {
      this.$router.push(`/tjmvinfo?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.findmv {
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
}
</style>
