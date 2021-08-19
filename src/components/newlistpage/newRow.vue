<template>
  <div class="newlistrow" v-if="tableData">
    <!-- <el-table
      :data="tableData"
      style="width: 100%"
      row-class-name="tab-item"
      size="small"
      :stripe="true"
      :lazy="true"
      @row-click="lickChange"
    >-->
    <!-- <el-table-column type="index" class="el-taasdble" min-width="50"></el-table-column>
      <el-table-column align="scope" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.album.picUrl" width="75" height="75" style=" border-radius: .3rem;" />
          <span class="el-btn el-icon-caret-right"></span>
        </template>
        <!--
         <template v-slot:item="scope">
          <img :src="scope.album.picUrl" width="100" height="100" />
    </template>-->
    <!-- </el-table-column>
      <el-table-column label="标题" width="300">
        <template slot-scope="btocj">
          <span>
            {{btocj.row.name}}
            <a
              class="el-icon-video-camera-solid"
              style="color: #dd6d60;padding-left:.1rem;font-size:.7rem;"
            ></a>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="artists[0].name" label="歌手" width="200"></el-table-column>
      <el-table-column prop="album.name" label="专辑" width="350"></el-table-column>
      <el-table-column prop="duration" label="时长" min-width="50" align="right">
        <template slot-scope="durobj">{{myformatDate(durobj.row.duration)}}</template>
    </el-table-column>-->
    <table>
      <thead>
        <tr>
          <th width="20"></th>
          <th width="50"></th>
          <th width="100">音乐标题</th>
          <th width="80">歌手</th>
          <th width="100">专辑</th>
          <th align="right" width="20">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tableData" :key="index" @click="lickChange(item.id)">
          <td width="20">{{index+1}}</td>
          <td width="50">
            <div class="tab-item">
              <img :src="item.album.picUrl" width="75" height="75" style=" border-radius: .3rem;" />
              <span class="el-btn el-icon-caret-right"></span>
            </div>
          </td>
          <td width="100">
            <span>
              {{item.name}}
              <a
                v-if="item.mvid"
                @click.stop="clickMvEvent(item.mvid)"
                class="el-icon-video-camera-solid"
                style="color: #dd6d60;padding-left:.1rem;font-size:.7rem;"
              ></a>
            </span>
          </td>
          <td width="80">{{item.artists[0].name}}</td>
          <td width="100">{{item.album.name}}</td>
          <td align="right" width="20">{{myformatDate(item.duration)}}</td>
        </tr>
      </tbody>
    </table>
    <!-- </el-table> -->
  </div>
</template>

<script>
import { getSong } from "@/api";
import { mapActions } from "vuex";
export default {
  name: "newRow",
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  methods: {
    ...mapActions["setcurrentSongA"],
    async lickChange(id) {
      // console.log(row, column, event);
      let { data } = await getSong(id);
      let song = data && data[0];
      this.$store.dispatch("setcurrentSongA", song);
    },
    myformatDate: function(num) {
      let s = num / 1000;
      let m = Math.floor(s / 60);
      s = Math.floor(s % 60);
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    },
    clickMvEvent(id) {
      this.$router.push(`/tjmvinfo?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  font-size: 0.7rem;
  text-align: left;
  th {
    color: #909399;
    font-weight: normal;
  }
  th,
  td {
    padding: 0.3rem 0;
    overflow: hidden;
  }
  tr:nth-child(2n) {
    background-color: #fafafa;
  }
  tr:nth-child(2n-1) {
    background-color: #fff;
  }
  tr:hover {
    background-color: #f5f7fa;
  }
}
.tab-item {
  display: inline-block;
  position: relative;
  text-align: left;
  .el-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-font-active);
    font-size: 1rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-align: center;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
  }
}
// .el-table th {
//   th {
//     font-size: 0.7rem;
//     font-weight: normal;
//   }
// }

// .el-table {
// .tab-item:nth-child(2n) {
//   background-color: #fafafa;
// }
// }
</style>
