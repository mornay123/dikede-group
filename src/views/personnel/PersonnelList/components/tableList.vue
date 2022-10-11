<template>
  <el-table
    :data="pensonList"
    style="width: 100%"
  >
    <el-table-column
      type="index"
      :index="indexAdd"
      label="序号"
    />
    <el-table-column
      prop="userName"
      label="人员名称"
    />
    <el-table-column
      prop="regionName"
      label="归属区域"
    />
    <el-table-column
      prop="role.roleName"
      label="角色"
    />
    <el-table-column
      prop="mobile"
      label="联系电话"
    />
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <span size="mini" class="edit" @click="onDialogEdit(scope.row)">修改</span>&nbsp;&nbsp;
        <span size="mini" class="dele" @click="ondelete(scope.row.id)">删除</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    pensonList: {
      type: Array,
      default: () => ([])
    },
    pageIndex: {
      type: [String, Number],
      default: '1'
    },
    pageSize: {
      type: String,
      default: '10'
    }
  },
  methods: {
    // 页码变化
    indexAdd(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },
    onDialogEdit(row) {
      this.$emit('onDialogEdit', row)
    },
    async ondelete(id) {
      try {
        await this.$confirm('确认删除该组件吗？', '提示', {
          confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'
        })
        this.$emit('delPerson', id)

        this.$message.success('删除角色成功')
      } catch (e) {
        console.log(e)
      }
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

  .edit{
    color: #5f84ff;
  }
  .dele{
    color: #ff5a5a;
  }
}
</style>
