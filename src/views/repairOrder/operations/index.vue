<template>
  <div>
    <!-- 头部搜索区域 -->
    <search :repair-order-status-list="repairOrderStatusList" @search="search" />
    <el-row class="content">
      <!-- 按钮 -->
      <el-row class="btn">
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="build" @click="isShowBuild=true">新建</el-button>
      </el-row>
      <!-- 表格 -->
      <Table v-loading="loading" :table-list="tableList" :table-header="tableHeader" :total-count="totalCount" :total-page="totalPage" :page-index="pageIndex" @isshowDetail="isShowBuild=true" @prev="prev" @next="next" />
    </el-row>
    <!-- 新建的弹框 -->
    <add-order :is-show-build="isShowBuild" @closeBuild="isShowBuild=false" />
  </div>
</template>

<script>
import search from '../components/search.vue'
import Table from '../components/table.vue'
import { getRepairOrderStatusList, repairOrderSearchList } from '@/api/repairOrder'
import addOrder from './components/addOrder.vue'
export default {
  components: { search, Table, addOrder },
  data() {
    return {
      isShowBuild: false,
      repairOrderStatusList: [],
      tableList: [],
      totalCount: 0,
      totalPage: 0,
      pageIndex: 0,
      loading: false,
      params: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: true,
        taskCode: '',
        status: ''
      },
      tableHeader: [
        {
          label: '工单编号',
          prop: 'taskCode'
        },
        {
          label: '设备编号',
          prop: 'innerCode'
        },
        {
          label: '工单类型',
          prop: 'taskType.typeName'
        },
        {
          label: '工单方式',
          prop: 'createType'
        },
        {
          label: '工单状态',
          prop: 'taskStatusTypeEntity.statusName'
        },
        {
          label: '运维人员',
          prop: 'userName'
        },
        {
          label: '创建日期',
          prop: 'createTime'
        }
      ]
    }
  },
  created() {
    this.getRepairOrderStatusList()
    this.getRepairOrderSearchList()
  },
  methods: {
    async getRepairOrderStatusList() {
      try {
        const { data } = await getRepairOrderStatusList()
        this.repairOrderStatusList = [...data]
      } catch (e) {
        console.log(e)
      }
    },
    async getRepairOrderSearchList() {
      try {
        this.loading = true
        const { data } = await repairOrderSearchList(this.params)
        this.tableList = [...data.currentPageRecords]
        this.tableList = this.tableList.map(item => {
          item.createTime = item.createTime.replace(/T/, ' ').replace(/-/, '.').replace(/-/, '.')
          item.updateTime = item.updateTime.replace(/T/, ' ').replace(/-/, '.').replace(/-/, '.')
          if (item.createType) {
            item.createType = '手动'
          } else {
            item.createType = '自动'
          }
          return item
        })
        this.totalCount = parseInt(data.totalCount)
        this.totalPage = parseInt(data.totalPage)
        this.pageIndex = parseInt(data.pageIndex)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
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
      this.params.taskCode = data.taskCode
      this.params.status = data.status
      this.getRepairOrderSearchList()
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
    .setting{
      border: none;
      background-color: #fbf4f0
    }
  }
}
</style>>

