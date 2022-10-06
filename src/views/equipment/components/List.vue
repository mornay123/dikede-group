<template>
  <el-table
    v-loading="loading"
    :data="currentPageRecords"
    style="width: 100%"
  >
    <el-table-column
      type="selection"
      width="55"
    />
    <el-table-column
      label="序号"
      type="index"
      :index="indexMethod"
      width="80"
    />
    <el-table-column
      prop="innerCode"
      label="设备编号"
      width="176"
    />
    <el-table-column
      prop="type.name"
      label="设备类型"
      width="176"
    />
    <el-table-column
      prop="node.name"
      label="详细地址"
    />
    <el-table-column
      prop="ownerName"
      label="合作商"
    />
    <el-table-column
      label="设备状态"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.vmStatus + '' === '0'">未投放</span>
        <span v-if="scope.row.vmStatus + '' === '1'">运营</span>
        <span v-if="scope.row.vmStatus + '' === '3'">撤机</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template>
        <el-button
          size="mini"
        >货道</el-button>
        <el-button
          size="mini"
        >策略</el-button>
        <el-button
          size="mini"
        >修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

}
</script>

<style>
template {
    height: 23px;
}
</style>
