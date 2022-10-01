<template>
  <div class="appMain">
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-top">
          <div class="search">
            <span style="padding-right: 15px">商品类型搜索 : </span>
            <input type="text" placeholder="请输入" autocomplete="off" class="searchInput">
            <el-button type="primary" icon="el-icon-search" class="searchBtn">
              <span style="padding-left:4px">查询</span>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 商品类型主体 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content1 bg-top">
          <!-- 新增按钮弹出层 -->
          <el-button
            icon="el-icon-circle-plus-outline"
            style="background-color:#ff8a3b;color:#fff"
            @click="handleAdd"
          >
            新增
          </el-button>

          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              prop="date"
              label="序号"
              width="120"
            />
            <el-table-column
              prop="name"
              label="商品名称"
              width="160"
            />
            <el-table-column
              prop="name"
              label="商品图片"
              width="160"
            />
            <el-table-column
              prop="name"
              label="品牌"
              width="160"
            />
            <el-table-column
              prop="name"
              label="规格"
              width="160"
            />
            <el-table-column
              prop="name"
              label="商品价格"
              width="160"
            />
            <el-table-column
              prop="name"
              label="商品类型"
              width="160"
            />
            <el-table-column
              prop="name"
              label="创建日期"
              width="160"
            />
            <el-table-column
              prop="address"
              label="操作"
            >
              <template slot-scope="scope">
                <span
                  style="color:blue"
                  @click="handleEdit(scope.$index, scope.row)"
                >修改</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <add-goods :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getAllGoods } from '@/api/goods'
import addGoods from './components/addGoods.vue'
export default {
  name: 'GoodsManagement',
  components: { addGoods },
  data() {
    return {
      tableData: [{
        date: 1,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: 1,
        name: '王小小',
        address: '上海市普陀区'
      }],
      dialogVisible: false
    }
  },
  methods: {
    async getAllGoods() {
      const data = await getAllGoods(this.tableData.name)
      console.log(data)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleAdd() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.appMain{
  width: 100%;
  height: 525px;
  background-color: #f3f6fb;
  margin-top: 80px;
  padding: 20px;
}
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-top {
    background: #fff;
  }
  // 搜索框
  .grid-content {
    border-radius: 4px;
    min-height: 64px;
    display: flex;
    align-items: center;
    .search{
      width: 550px;
      padding-left: 20px;
      .searchInput{
        height: 36px;
        margin-right: 10px;
        border: 1px solid #d8dde3;
        padding-left: 10px;
        color: #606266;
      }
      .searchBtn{
        background-color: #5f84ff;
      }
    }
  }
  // 商品主体
  .grid-content1 {
    border-radius: 4px;
    min-height: 400px;
    padding: 17px;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

