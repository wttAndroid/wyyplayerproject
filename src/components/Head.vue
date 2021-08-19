<template>
  <div class="head">
    <div class="head-left">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="head-right">
      <el-input size="medium" v-model="inputContent" placeholder="请输入内容" @change="changeEvent">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <!-- <el-autocomplete
        size="medium" 
        type="search"
        v-model="inputContent"
        placeholder="请输入内容"
        @select="changeEvent"
      >-->
      <!-- @input="inputEvent"
        :fetch-suggestions="querySearchAsync"
      @select="handleSelect"-->
      <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
      <!-- </el-autocomplete> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      inputContent: "",
      songs: []
    };
  },
  methods: {
    changeEvent(value) {
      // this.$forceUpdate();
      // console.log(value);
      // const { result } = await getSeacth(value);
      // this.songs = result.songs;
      this.$router.push(`/search?q=${value}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  height: 3rem;
  line-height: 3rem;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;

  justify-content: space-between;

  $list-color: rgba(221, 109, 96, 1), blue, rgba(132, 187, 88, 1);
  .head-left {
    > span {
      display: inline-block;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin: 0 0.15rem;
      @each $i in $list-color {
        $i: index($list-color, $i);
        &:nth-child(#{$i}) {
          background: nth($list-color, $i);
        }
      }
      // @for $i from 1 through 3 {
      //   &:nth-child(#{$i}) {
      //     color: nth($list-color, $i);
      //   }
      // }
    }
  }
}
</style>

