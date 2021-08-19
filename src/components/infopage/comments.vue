<template>
  <div class="comments" v-if="dataList.length">
    <div>
      <h3>
        <slot></slot>
      </h3>
    </div>
    <div class="comment-ul">
      <div class="comment-item" v-for="(item,index) in dataList" :key="index">
        <img class="item-img" :src="item.user.avatarUrl" alt />
        <div class="item-text">
          <div class="text-info">
            <a class="info-name">{{item.user.nickname}}:</a>
            <span class="info-text">{{item.content}}</span>
          </div>
          <div class="text-info huifu" v-if="item.beReplied[0]">
            <a class="info-name">{{item.beReplied[0].user.nickname}}:</a>
            <span class="info-text">{{item.beReplied[0].content}}</span>
          </div>

          <p class="text-date">{{$utils.formatDate(item.time)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments",
  props: {
    dataList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.comments {
  .comment-ul {
    .comment-item {
      display: flex;
      padding: 0.5rem 0;
      .item-img {
        flex: 0 0 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.5rem;
        vertical-align: middle;
      }
      .item-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: 0.65rem;
        justify-content: space-between;
        border-bottom: 1px solid #f2f2f1;
        padding-bottom: 0.5rem;
        .text-info {
          margin-bottom: 0.6rem;
          .info-name {
            color: hsl(211, 37%, 50%);
            margin-right: 0.3rem;
          }
          .info-text {
          }
          &.huifu {
            background-color: #e6e5e6;
            padding: 0.4rem 0.3rem;
            border-radius: 0.3rem;
          }
        }
        .text-date {
          color: #ccc;
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
