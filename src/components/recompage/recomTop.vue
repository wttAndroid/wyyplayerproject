<template>
  <div class="recomtop" v-if="playJpgd">
    <div class="recomtop-box">
      <img class="recom-top-left" :src="playJpgd.coverImgUrl" />
      <div class="recom-top-right">
        <a class="right-btn" href>精品歌单</a>
        <div class="right-text">{{playJpgd.description}}</div>
      </div>
    </div>
    <img class="recomtop-bg" :src="playJpgd.coverImgUrl" alt />
    <div class="recomtop-mask"></div>
  </div>
</template>

<script>
export default {
  name: "recomTop",
  props: {
    playJpgd: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="scss" scoped>
.recomtop {
  position: relative;
  overflow: hidden;
  border-radius: 0.3rem;
  .recomtop-box {
    display: flex;
    padding: 1rem;
    align-items: flex-start;
    position: relative;
    z-index: 3;
    .recom-top-left {
      flex: 0 0 7rem;
      height: 7rem;
      margin-right: 1rem;
    }
    .recom-top-right {
      flex: 1;
      .right-btn {
        display: inline-block;
        border: 1px solid #dfac67;
        border-radius: 0.2rem;
        width: 5rem;
        height: 1.2rem;
        line-height: 1.2rem;
        color: #dfac67;
        font-size: 0.7rem;
        text-align: center;
      }
      .right-text {
        margin-top: 0.5rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #888482;
        font-size: 0.65rem;
      }
    }
  }

  .recomtop-bg {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    filter: blur(0.8rem);
  }
  .recomtop-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}
</style>
