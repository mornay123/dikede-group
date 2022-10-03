<template>
  <div>
    <!-- 头部搜索区域 -->
    <search @search="search" />
    <el-row class="content">
      <!-- 按钮 -->
      <el-row class="btn">
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="build" @click="isShowBuild=true">新建</el-button>
      </el-row>
      <!-- 表格 -->
      <table-page :table-header="tableHeader" :table-list="tableList" :total-count="totalCount" :total-page="totalPage" :page-index="pageIndex" @prev="prev" @next="next" />
    </el-row>
    <!-- 新建的弹框 -->
    <add-strategy title="新增策略" :is-show-build="isShowBuild" @setStrategy="setStrategy" @closeBuild="isShowBuild=false" />
  </div>
</template>

<script>
import search from './components/search.vue'
import TablePage from './components/TablePage.vue'
import AddStrategy from './components/addStrategy.vue'
import { SearchStrategy, setStrategy } from '@/api/strategy'

export default {
  components: { search, TablePage, AddStrategy },
  provide() {
    return {
      searchStrategy: this.searchStrategy
    }
  },
  data() {
    return {
      isShowBuild: false,
      tableList: [],
      totalCount: 0,
      totalPage: 0,
      pageIndex: 0,
      params: {
        pageIndex: 1,
        pageSize: 10,
        policyName: ''
      },
      tableHeader: [
        {
          label: '策略名称',
          prop: 'policyName'
        },
        {
          label: '策略方案',
          prop: 'discount'
        },
        {
          label: '创建日期',
          prop: 'createTime'
        }
      ]
    }
  },
  created() {
    this.searchStrategy()
  },
  methods: {
    async setStrategy(data) {
      try {
        const res = await setStrategy(data)
        if (res.data) {
          this.searchStrategy()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async searchStrategy() {
      try {
        const { data } = await SearchStrategy(this.params)
        this.tableList = [...data.currentPageRecords]
        this.tableList = this.tableList.map(item => {
          item.createTime = item.createTime.replace(/T/, ' ')
          return item
        })
        this.totalCount = parseInt(data.totalCount)
        this.totalPage = parseInt(data.totalPage)
        this.pageIndex = parseInt(data.pageIndex)
      } catch (e) {
        console.log(e)
      }
    },
    prev() {
      this.params.pageIndex--
      this.getRepairOrderSearchList()
    },
    next() {
      this.params.pageIndex++
      this.getRepairOrderSearchList()
    },
    search(data) {
      this.params.policyName = data
      this.searchStrategy()
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .btn{
    margin-bottom: 20px;
    font-size: 14px;
    .build{
     border: none;
     background: linear-gradient(135deg,#ff9743,#ff5e20)
    }
  }
}
</style>>

