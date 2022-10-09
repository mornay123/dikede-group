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
          <!-- 新增按钮弹出层 -->
          <el-button
            icon="el-icon-circle-plus-outline"
            style="background-color:#ff8a3b;color:#fff"
            @click="handleAdd"
          >
            新增
          </el-button>
          <!-- 导入数据 按钮 -->
          <el-button
            style="background-color:#f3e7e1;color:#000"
            @click="handleImport"
          >
            导入数据
          </el-button>

          <el-table
            v-loading="loading"
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
              prop="skuName"
              label="商品名称"
              width="160"
            />
            <el-table-column
              prop="skuImage"
              label="商品图片"
              width="160"
            >
              <template slot-scope="{row}">
                <img :src="row.skuImage" alt="" style="width:24px;height:24px">
              </template>
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="品牌"
              width="160"
            />
            <el-table-column
              prop="unit"
              label="规格"
              width="160"
            />
            <el-table-column
              prop="price"
              label="商品价格"
              width="160"
            />
            <el-table-column
              prop="skuClass.className"
              label="商品类型"
              width="160"
            />
            <el-table-column
              prop="createTime"
              label="创建日期"
              width="160"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="{row}">
                <span
                  style="color:blue"
                  @click="handleEdit(row)"
                >修改</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 新增/修改 弹窗 -->
    <add-goods
      ref="refManageGoods"
      :dialog-visible.sync="dialogVisible"
      @refleshList="manageAllGoods"
    />
    <!-- 导入数据弹窗 -->
    <import-goods
      ref="refImportGoods"
      :dialog-visible2.sync="dialogVisible2"
      @refleshList="manageAllGoods"
    />

    <div class="block">
      <span class="demonstration">共{{ total }}条记录  第 {{ num1 }}/{{ num2 }} 页</span>
      <span class="btn">
        <el-button ref="prevBtn" class="left">上一页</el-button>
        <el-button class="right" @click="pageNext">下一页</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { manageAllGoods } from '@/api/goods'
import addGoods from './components/addGoods.vue'
import importGoods from './components/importGoods.vue'
export default {
  name: 'GoodsManagement',
  components: { addGoods, importGoods },
  data() {
    return {
      tableData: [
        {
          skuName: '', // 商品名称
          skuImage: '', // 商品图片
          brandName: '', // 品牌
          unit: '', // 规格
          price: '', // 价格
          skuClass: '', // 商品类型
          createTime: '' // 创建日期
        }
      ],
      search: '',
      pageIndex: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogVisible2: false,
      total: 0,
      loading: false,
      classId: ''
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
    this.manageAllGoods()
  },
  methods: {
    async manageAllGoods() { // 获取所有商品
      try {
        this.loading = true
        const { data } = await manageAllGoods(this.pageIndex, this.pageSize, this.tableData.skuName)
        console.log(data.currentPageRecords)
        this.tableData = data.currentPageRecords
        this.total = data.currentPageRecords.length
        this.classId = data.currentPageRecords.classId
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false // 关闭加载中
      }
    },
    searchGoods() { // 搜索框
      if (this.search.trim) {
        this.tableData = this.tableData.filter(item => item.skuName === this.search)
        this.getAllGoods()
      } else {
        this.getAllGoods()
      }
    },
    handleEdit(row) { // 修改按钮
      console.log(row)
      this.$refs.refManageGoods.tableData = { ...row }
      this.dialogVisible = true // 显示弹出层
    },
    pageNext() { // 下一页按钮
      console.log(this.pageIndex)
      this.pageIndex = this.pageIndex + 1
      console.log(this.pageIndex)
      this.getAllGoods()
    },
    handleAdd() { // 新增
      this.dialogVisible = true
    },
    handleImport() { // 导入数据
      this.dialogVisible2 = true
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

