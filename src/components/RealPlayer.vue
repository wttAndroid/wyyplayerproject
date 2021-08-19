<template>
  <div class="player">
    <audio id="music" :src="currentSong.url" autoplay controls loop preload />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RealPlayer",
  computed: {
    ...mapState({
      playstate: state => state.musicModule.playstate,
      currentSong: state => state.musicModule.currentSong
    })
  }
};
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  audio {
    width: 100vw;
  }
}
</style>
