<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
      />
      <el-table-column
        prop="userName"
        label="人员名称"
      />
      <el-table-column
        prop="roleName"
        label="角色"
      />
      <el-table-column
        prop="mobile"
        label="联系电话"
      />
      <el-table-column
        prop="workCount"
        label="完成工单(本月)"
      />
      <el-table-column
        prop="progressTotal"
        label="进行中工单"
      />
      <el-table-column
        prop="cancelCount"
        label="拒绝工单(本月)"
      />
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="{row}">
          <span style="color: #5f84ff;" @click="getDetail(row)">查看详情</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    detailVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDetail(row) {
      this.$emit('update:detailVisible', true)
      // start() {
      //   if (this.currTime === '周') {
      //     return dayjs(this.end).day(1).format('YYYY-MM-DD')
      //   } else if (this.currTime === '月') {
      //     return dayjs(this.end).startOf('month').format('YYYY-MM-DD')
      //   }
      //   return dayjs(this.end).startOf('year').format('YYYY-MM-DD')
      // }
      this.$emit('getDetailData', row)
    }
  }
}
</script>
<style lang="scss" scoped>
    .table{
  background-color: #fff;
  padding: 17px;
  .el-button{
    color: #fff;;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    margin-bottom: 20px;
    .svg-icon{
        color: inherit;
    }
  }
}
</style>
