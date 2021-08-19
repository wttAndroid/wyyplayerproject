<template>
  <div class="newmvbar-row">
    <span class="bar-name" v-if="names">{{names}}:</span>
    <ul class="bar-cont" v-if="tabrList">
      <li
        v-for="(item,index) in tabrList"
        :key="index"
        class="barcont-item"
        :class="activeIndex==index+1?'active':''"
        @click="swichMvtabrChange(item,index+1)"
      >
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "newmvTabritem",
  props: {
    tabrList: {
      type: Array,
      default: []
    },
    names: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeIndex: 1
    };
  },
  methods: {
    swichMvtabrChange(item, index) {
      this.activeIndex = index;
      this.$emit("swichTabrEvent", { item, name: this.names });
    }
  }
};
</script>

<style lang="scss" scoped>
.newmvbar-row {
  display: flex;
  font-size: 0.65rem;
  margin: 0.8rem 0;
  .bar-name {
    flex: 0 0 2rem;
  }
  .bar-cont {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    color: grey;
    .barcont-item {
      text-align: center;
      margin: 0 0 0.3rem 0;

      span {
        box-sizing: border-box;
        margin: 0 1rem;
        padding: 0.2rem 0.8rem;
        border-radius: 1rem;
        cursor: pointer;
      }
      &.active {
        span {
          background-color: #fcf6f5;
          color: var(--color-font-active);
        }
      }
    }
    .barcont-item + .barcont-item {
      border-left: 1px solid #f2f2f1;
    }
  }
}
</style>
