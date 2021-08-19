<template>
  <div class="tjgd" v-if="gedanList">
    <h3>推荐歌单</h3>
    <div class="grow-list">
      <a
        class="grow-item"
        v-for="item in gedanList"
        :key="item.id"
        @click="clickTjgditemEvent(item.id)"
      >
        <div class="item-imgwrap">
          <img :src="item.picUrl" alt />
          <span class="wrap-btn el-icon-caret-right"></span>
          <div class="wrap-text">{{item.copywriter}}</div>
        </div>
        <p class="item-textwrap">{{item.name}}</p>
      </a>
    </div>
  </div>
</template>

<script>
import { getPersonalized } from "@/api";
export default {
  name: "findTjgd",
  data() {
    return {
      gedanList: []
    };
  },
  async created() {
    const { result } = await getPersonalized();
    this.gedanList = result;
  },
  methods: {
    clickTjgditemEvent(id) {
      console.log(id);
      this.$router.push(`/tjgdinfo?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.tjgd {
  h3 {
  }
  // .tjgd-row {
  //   display: flex;
  //   flex-wrap: wrap;

  //   .tjgd-row-item {
  //     width: 9rem;
  //     margin: 0 1rem 1rem 0;
  //     position: relative;
  //     overflow: hidden;

  //     .img-wrap {
  //       position: relative;
  //       color: white;
  //       font-size: 0.6rem;
  //       img {
  //         width: 100%;
  //         border-radius: 0.3rem;
  //       }
  //       .wrap-btn {
  //         cursor: pointer;
  //         position: absolute;
  //         bottom: 0.5rem;
  //         right: 0.5rem;
  //         background-color: rgba($color: #ffff, $alpha: 0.8);
  //         width: 2rem;
  //         height: 2rem;
  //         font-size: 1.5rem;
  //         color: var(--color-font-active);
  //         line-height: 2rem;
  //         text-align: center;
  //         border-radius: 50%;
  //         opacity: 0;
  //         transition: all 0.5s;
  //       }
  //       .wrap-text {
  //         box-sizing: border-box;
  //         width: 100%;
  //         position: absolute;
  //         top: 0;
  //         padding: 0.3rem;
  //         background-color: rgba($color: #000000, $alpha: 0.4);
  //         // overflow: hidden;
  //         // text-overflow: ellipsis;
  //         // display: -webkit-box;
  //         // -webkit-line-clamp: 2;
  //         // -webkit-box-orient: vertical;
  //         transform: translateY(-100%);
  //         transition: all 0.5s;
  //       }
  //       &:hover {
  //         .wrap-text {
  //           transform: translateY(0);
  //         }
  //         .wrap-btn {
  //           opacity: 1;
  //         }
  //       }
  //     }

  //     p {
  //       padding: 0;
  //       margin: 0;
  //       font-size: 0.6rem;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       white-space: nowrap;
  //     }
  //   }
  // }
}
</style>
