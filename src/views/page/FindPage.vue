<template>
  <div>
    <el-carousel :interval="4000" type="card" height="11rem" autoplay loop>
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <FindTjgd />
    <!-- 最新音乐 -->
    <FindZxyy />
    <!-- 推荐的mv -->
    <FindMv />
  </div>
</template>

<script>
import { getBanner } from "@/api";
import FindTjgd from "@/components/findpage/findTjgd";
import FindZxyy from "@/components/findpage/findZxyy";
import FindMv from "@/components/findpage/findMv";
export default {
  name: "FindPage",
  data() {
    return {
      banners: []
    };
  },
  components: {
    FindTjgd,
    FindZxyy,
    FindMv
  },
  async created() {
    const { banners } = await getBanner();
    this.banners = banners;
  }
};
</script>

<style lang="scss">
.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.3rem;
  }
}
</style>
