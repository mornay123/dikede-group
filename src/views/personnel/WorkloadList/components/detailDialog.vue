<template>
  <el-dialog title="人员详情" :visible.sync="detailVisible">
    <div style="background-color:#f3f6fb;padding:20px;font-size:14px;margin-bottom:20px">
      <el-row style="height:30px;">
        <el-col :span="8">人员名称：{{ currentRow[0].userName }}</el-col>
        <el-col :span="8">角色：{{ currentRow[0].roleName }}</el-col>
        <el-col :span="8">联系电话：{{ currentRow[0].mobile }}</el-col>
      </el-row>
      <el-row>
        <el-col>负责区域：{{ currentRow[0].regionName }}</el-col>
      </el-row>
    </div>
    <el-table
      :data="currentRow.slice(1)"
      style="width: 100%"
      :border="true"
      header-cell-class-name="head-row"
      cell-class-name="other-row"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      />
      <el-table-column
        prop="total"
        label="总工单数"
      />
      <el-table-column
        prop="cancelCount"
        label="拒绝工单"
      />
      <el-table-column
        prop="workCount"
        label="完成工单"
      />
      <el-table-column
        prop="progressTotal"
        label="进行工单"
      />
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  props: {
    detailVisible: {
      type: Boolean,
      default: true
    },
    currentRow: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    indexMethod(index) {
      if (index === 0) return '本周'
      if (index === 1) return '本月'
      if (index === 2) return '本年'
    }
  }
}
</script>
<style lang="scss">
    .el-table  .head-row{
        text-align: center;
        background:#f3f6fb;
    }
     .el-table  .other-row{
        text-align: center;
        width: 20%;
    }
    .el-dialog__header {
        background: #fff;
        .el-dialog__title {
        color: black;
        }
        .el-icon-close:before {
            color: #999;
        }
}
</style>
