<template>
  <div class="zxyy" v-if="newList">
    <h3>最新音乐</h3>
    <div class="zxyy-row">
      <a
        class="zxyy-row-item"
        v-for="item in newList"
        :key="item.id"
        @click="swichmusiChange(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.picUrl" alt />
          <span class="wrap-btn el-icon-caret-right"></span>
        </div>
        <div class="text-wrap">
          <h6>{{item.name}}</h6>
          <span>{{item.song.artists[0].name}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { getPersonalizedzxyy, getSong } from "@/api";
import { mapActions } from "vuex";
export default {
  name: "findZxyy",
  data() {
    return {
      newList: []
    };
  },
  async created() {
    const { result } = await getPersonalizedzxyy();
    this.newList = result;
  },
  methods: {
    ...mapActions(["setcurrentSongA"]),
    async swichmusiChange(id) {
      let song = await getSong(id);
      song = song && song.data[0];
      this.$store.dispatch("setcurrentSongA", song);
    }
  }
};
</script>

<style lang="scss" scoped>
.zxyy {
  .zxyy-row {
    display: flex;
    flex-wrap: wrap;
    .zxyy-row-item {
      flex: 0 0 50%;
      display: flex;
      transition: all 0.8s;
      overflow: hidden;
      margin-bottom: 1rem;
      &:hover {
        background-color: #f1f0f0;
        .img-wrap {
          .wrap-btn {
            opacity: 1;
          }
        }
      }
      .img-wrap {
        flex: 0 0 4rem;
        position: relative;
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
        .wrap-btn {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: 40% auto;

          background-color: rgba($color: #ffffff, $alpha: 0.8);
          border-radius: 50%;
          width: 1.3rem;
          height: 1.3rem;
          line-height: 1.3rem;
          font-size: 1rem;
          text-align: center;
          color: var(--color-font-active);
          opacity: 0;
          transition: all 0.8s;
        }
      }
      .text-wrap {
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        h6 {
          padding: 0;
          margin: 0;
          font-size: 0.7rem;
          font-weight: normal;
        }
        span {
          font-size: 0.6rem;
          color: var(--color-font);
        }
      }
    }
  }
}
</style>
