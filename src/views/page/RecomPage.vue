<template>
  <div class="recom">
    <RecomTop :playJpgd="playJpgd" />

    <RecomTjgd />
  </div>
</template>

<script>
import { getRecomJpgd } from "@/api";
import RecomTop from "@/components/recompage/recomTop";
import RecomTjgd from "@/components/recompage/recomTjgd";
export default {
  name: "RecomPage",
  components: {
    RecomTop,
    RecomTjgd
  },
  data() {
    return {
      activeTab: "全部",
      playJpgd: {}
    };
  },
  watch: {
    activeTab(newValue, orl) {
      this.requetRecomJpgd(newValue);
    }
  },
  created() {
    this.requetRecomJpgd();
  },
  methods: {
    async requetRecomJpgd(value) {
      const { playlists } = await getRecomJpgd(value);
      this.playJpgd = playlists[0] || {};
    }
  }
};
</script>

<style lang="scss" scoped>
.recom {
}
</style>
