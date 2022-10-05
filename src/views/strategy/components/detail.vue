<template>
  <el-dialog
    custom-class="add-order-dialog"
    title="策略详情"
    :visible="showDetail"
    width="630px"
    @close="closeDetail"
  >
    <el-form ref="form" label-width="140px">
      <el-form-item label="策略名称：">
        <span>{{ policyName }}</span>
      </el-form-item>
      <el-form-item label="策略方案：">
        <table-page :total-count="totalCount" :total-page="totalPage" :page-index="pageIndex" :table-list="tableList" :table-header="tableHeader" :caozuo="false" @prev="prev" @next="next" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getStrategyByPolicyId } from '@/api/strategy'
// import TablePage from './TablePage.vue'

export default {
  components: {
    TablePage: () => import('./TablePage.vue')
  },
  props: {
    showDetail: {
      type: Boolean,
      default: true
    },
    policyName: {
      type: String,
      default: ''
    },
    detailPolicyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      totalCount: 0,
      totalPage: 0,
      pageIndex: 1,
      tableHeader: [
        { label: '点位名称', prop: 'nodeName' },
        { label: '设备编号', prop: 'innerCode' }
      ],
      tableList: [],
      params: {
        pageIndex: 1,
        pageSize: 10,
        policyName: ''
      }
    }
  },
  computed: {
    policyId() {
      return this.detailPolicyId
    }
  },
  watch: {
    policyId() {
      this.getStrategyByPolicyId()
    }
  },
  methods: {
    closeDetail() {
      this.$emit('closeDetail')
    },
    async getStrategyByPolicyId() {
      const { data } = await getStrategyByPolicyId(this.policyId, this.params)
      this.tableList = data.currentPageRecords
      this.totalCount = parseInt(data.totalCount)
      this.totalPage = parseInt(data.totalPage)
      this.pageIndex = parseInt(data.pageIndex)
    },
    prev() {
      this.params.pageIndex--
      this.getStrategyByPolicyId()
    },
    next() {
      this.params.pageIndex++
      this.getStrategyByPolicyId()
    }
  }

}

</script>

<style lang="scss">
.add-order-dialog{
  border-radius: 10px;

  .el-dialog__header{
    background-color: #fff !important;
    border-radius: 10px;
    .el-dialog__title{
      color: #333;
    }
    .el-icon-close:before {
    color: #909399;
    }
  }
  .el-input-number{
    width: 396px;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-input{
    width: 396px;
  }
  .el-textarea{
    width: 396px;
  }
  .el-textarea__inne{
    height: 82px;
  }
}
</style>

