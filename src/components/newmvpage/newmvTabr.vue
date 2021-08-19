<template>
  <div class="newmvtbar" v-if="currConfig">
    <!-- <newmvTabritem @swichTabrEvent="swichTabrEvent" :tabrList="area" names="地区"></newmvTabritem>
    <newmvTabritem @swichTabrEvent="swichTabrEvent" :tabrList="type" names="类型"></newmvTabritem>
    <newmvTabritem @swichTabrEvent="swichTabrEvent" :tabrList="order" names="排序"></newmvTabritem>-->
    <newmvTabritem
      v-for="(item,index) in currConfig"
      :key="index"
      @swichTabrEvent="swichTabrEvent"
      :tabrList="item.list"
      :names="item.name"
    ></newmvTabritem>
  </div>
</template>

<script>
import newmvTabritem from "@/components/newmvpage/newmvTabritem";
export default {
  name: "newmvTabr",
  props: {
    currConfig: {
      type: Array,
      default: []
    }
  },
  components: {
    newmvTabritem
  },
  methods: {
    swichTabrEvent(obj) {
      // console.log(Object.keys(this.asdasd));
      let i = 0;
      switch (obj.name) {
        case "地区":
          i = 0;
          break;
        case "类型":
          i = 1;
          break;
        case "排序":
          i = 2;
          break;
      }
      this.$parent.$data.currConfig[i].value = obj.item;
    }
  }
};
</script>

<style lang="scss" scoped>
.newmvtbar {
}
</style>
