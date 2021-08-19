export default {
  // namespaced: true,
  state: {
    //当前播放的歌曲
    currentSong: {},
    //播放状态
    playstate: false
  },
  getters: {

  },
  mutations: {
    setcurrentSongM(state, song) {
      state.currentSong = song
      console.log('----当前歌曲------' + JSON.stringify(state.currentSong))
    },
    setplaystateM(state, playstate) {
      state.playstate = playstate
      console.log('-----当前状态-----' + JSON.stringify(state.playstate))
    }
  },
  actions: {
    //切换当前歌曲
    setcurrentSongA({
      state,
      commit
    }, song) {
      commit('setcurrentSongM', song)
      commit('setplaystateM', true)
    }
  }
}
