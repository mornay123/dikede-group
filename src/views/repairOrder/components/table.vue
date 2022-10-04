<template>
  <div class="my_table">
    <el-table
      :data="tableList"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
      />
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        width="132"
      />
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <div v-if="isShowPage" class="page">
      <span>共 {{ totalCount }} 条记录 第 {{ pageIndex }} /
        {{ totalPage }} 页</span>
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="prev, next"
        :total="totalCount"
        @prev-click="$emit('prev',pageIndex)"
        @next-click="$emit('next',pageIndex)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,
      default: () => { [] }
    },
    tableHeader: {
      type: Array,
      default: () => { [] }
    },
    totalCount: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    },
    pageIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isShowPage() {
      return this.tableList.length >= 10
    }
  }
}
</script>

<style lang="scss">
.my_table{
  .el-table td, .el-table th.is-leaf {
    border-bottom: none !important;
  }
  .has-gutter th{
      line-height: 1.15;
      padding: 10px 0px 9px;
      background: rgb(243, 246, 251);
      font-weight: 500;
      text-align: left;
      color: rgb(102, 102, 102)
  }
  .el-table::before{
    height: 0;
  }
  .page{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 32px 16px;
  color: #dbdfe5;
  font-size: 16px;
  .btn-next{
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    // color: #C0C4CC;
  }
  .btn-prev{
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    // color: #C0C4CC;
  }
}
}
</style>
