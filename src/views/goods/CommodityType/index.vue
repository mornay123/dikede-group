<template>
  <div class="appMain">
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-top">
          <div class="search">
            <span style="padding-right: 15px">商品类型搜索 : </span>
            <input v-model="search" type="text" placeholder="请输入" autocomplete="off" class="searchInput">
            <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="searchGoods">
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
          <!-- 新增按钮 -->
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
              prop="className"
              label="商品类型名称"
              width="1330"
            />
            <el-table-column
              prop="address"
              label="操作"
            >
              <template slot-scope="{row}">
                <span
                  style="color:blue"
                  @click="handleEdit(row)"
                >修改</span>
                <span
                  size="mini"
                  style="color:red;padding-left:10px"
                  @click="handleDelete(row.classId)"
                >删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 新增按钮弹出层 -->
    <add-goods
      ref="refGoods"
      :dialog-visible.sync="dialogVisible"
      @refleshList="getAllGoods"
    />

    <div class="block">
      <span class="demonstration">共{{ total }}条记录  第 {{ num1 }}/{{ num2 }} 页</span>
      <!-- <el-pagination
        v-if="total>0"
        layout="prev, pager, next,sizes"
        background
        :total="total"
        :current-page.sync="pageIndex"
        :page-size.sync="pageSize"
        @current-change="getAllGoods"
        @size-change="getAllGoods"
      /> -->
      <!-- <el-pagination
        :disabled="false"
        :total="total"
        layout="prev,pager, next"
        @current-change="getAllGoods"
        @size-change="getAllGoods"
      /> -->
      <span class="btn">
        <el-button ref="prevBtn" class="left">上一页</el-button>
        <el-button class="right" @click="pageNext">下一页</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { getAllGoods, delGoods } from '@/api/goods'
import addGoods from './components/addGoods.vue'
export default {
  name: 'GoodsType',
  components: { addGoods },
  data() {
    return {
      dialogVisible: false,
      tableData: [{ className: '' }],
      pageIndex: 1,
      pageSize: 10,
      search: '',
      currentPage1: 5,
      value: true,
      total: 0
    }
  },
  computed: {
    num1() {
      return Math.ceil(this.total / 10)
    },
    num2() {
      return Math.floor(this.total / 10)
    }
  },
  created() {
    this.getAllGoods()
  },
  methods: {
    async getAllGoods() {
      try {
        const { data } = await getAllGoods(this.pageIndex, this.pageSize, this.tableData.className)
        console.log(data.currentPageRecords)

        this.tableData = data.currentPageRecords
        this.total = data.currentPageRecords.length
      } catch (error) {
        console.log(error)
      }
    },
    searchGoods() {
      if (this.search) {
        this.tableData = this.tableData.filter(item => item.className === this.search)
        this.getAllGoods()
      } else {
        this.getAllGoods()
      }
    },
    pageNext() {
      this.pageIndex = this.pageIndex + 1
      this.getAllGoods()
    },

    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`)
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    // },

    handleEdit(row) { // 修改
      console.log('修改', row)
      this.$refs.refGoods.formData = { ...row }
      this.dialogVisible = true
    },
    async handleDelete(classId) { // 删除
      await this.$confirm('确认删除吗', '删除提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
      await delGoods(classId)
      this.getAllGoods()
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
// 下一页按钮
  .block{
  display: flex;
  justify-content: space-between;
}
.btn{
  margin-right: 40px;
}
.demonstration{
  color: #dbdfe5;
}
</style>

