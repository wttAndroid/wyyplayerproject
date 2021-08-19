<template>
  <div class="newlist">
    <div class="newlist-tab">
      <span
        class="tab-item"
        v-for="(item,index) in tagsList"
        :key="index"
        :class="index+1===tabActive?'active':''"
        @click="swichTabChange(index+1,item)"
      >{{item.name}}</span>
    </div>

    <div class="newlist-row">
      <NewRow :tableData="newList" />
    </div>
  </div>
</template>

<script>
import { getNewsongList } from "@/api";
import NewRow from "@/components/newlistpage/newRow";
export default {
  name: "NewlistPage",
  data() {
    return {
      tagsList: [
        {
          name: "全部",
          number: 0
        },
        {
          name: "华语",
          number: 7
        },
        {
          name: "欧美",
          number: 96
        },
        {
          name: "日本",
          number: 8
        },
        {
          name: "韩国",
          number: 16
        }
      ],
      tabActive: 1,
      newList: []
    };
  },
  components: {
    NewRow
  },
  created() {
    this.getNewList();
  },
  methods: {
    swichTabChange(index, item) {
      this.tabActive = index;
      this.getNewList(item.number);
    },
    async getNewList(type = 0) {
      const { data } = await getNewsongList(type);
      this.newList = data.slice(0, 50);
    }
  }
};
</script>

<style lang="scss" scoped>
.newlist {
  .newlist-tab {
    display: flex;
    justify-content: flex-end;
    color: var(--color-font);
    font-size: 0.7rem;
    margin-bottom: 1.5rem;
    .tab-item {
      margin-right: 0.8rem;
      cursor: pointer;
      &.active {
        color: var(--color-font-active);
      }
    }
  }
  .newlist-row {
  }
}
</style>
