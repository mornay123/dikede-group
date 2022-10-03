<template>
  <div>
    <!-- 头部搜索框 -->
    <header-search @search="search" />
    <!-- 表格和页码部分 -->
    <el-row class="content">
      <Table :table-header="tableHeader" :table-list="tableList" :total-count="totalCount" :total-page="totalPage" :page-index="pageIndex" @prev="prev" @next="next" />
    </el-row>
  </div>
</template>

<script>
import headerSearch from './components/headerSearch.vue'
import Table from './components/table.vue'
import { searchOrder } from '@/api/order'
export default {
  components: { headerSearch, Table },
  data() {
    return {
      tableList: [],
      totalCount: 0,
      totalPage: 0,
      pageIndex: 0,
      params: {
        pageIndex: 1,
        pageSize: 10,
        orderNo: '',
        startDate: '',
        endDate: ''
      },
      tableHeader: [
        {
          label: '订单编号',
          prop: 'orderNo'
        },
        {
          label: '商品名称',
          prop: 'skuName'
        },
        {
          label: '订单金额(元)',
          prop: 'amount'
        },
        {
          label: '设备编号',
          prop: 'innerCode'
        },
        {
          label: '订单状态',
          prop: 'status'
        },
        {
          label: '订单日期',
          prop: 'createTime'
        }
      ]
    }
  },
  created() {
    this.searchOrder()
  },
  methods: {
    async searchOrder() {
      try {
        const { data } = await searchOrder(this.params)
        this.tableList = [...data.currentPageRecords]
        this.tableList = this.tableList.map(item => {
          item.amount = (item.amount * 0.01).toFixed(2)
          item.createTime = item.createTime.replace(/T/, ' ')
          item.updateTime = item.updateTime.replace(/T/, ' ')
          item.addr = item.addr.split('-')
          item.addr = item.addr.slice(3).toString()
          if (item.status === 0) {
            item.status = '未支付'
          } else if (item.status === 1) {
            item.status = '支付完成'
          } else if (item.status === 2) {
            item.status = '出货成功'
          } else {
            item.status = '出货失败'
          }
          if (item.payType === '1') {
            item.payType = '支付宝支付'
          } else {
            item.payType = '微信支付'
          }
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
      this.searchOrder()
    },
    next() {
      this.params.pageIndex++
      this.searchOrder()
    },
    search(data) {
      this.params.orderNo = data.orderNo
      if (data.data) {
        this.params.startDate = data.data[0]
        this.params.endDate = data.data[1]
      } else {
        this.params.startDate = ''
        this.params.endDate = ''
      }
      this.searchOrder()
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
</style>
