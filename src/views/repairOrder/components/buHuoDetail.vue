<template>
  <el-dialog
    custom-class="buhuoDetail my_table"
    title="补货详情"
    :visible="isShowBuHuo"
    width="630px"
    append-to-body
    @close="closeBuHuo"
  >
    <el-form class="demo-ruleForm form">
      <el-table :data="buHuoDetailList" height="330px">
        <el-table-column property="channelCode" label="货道编号" width="92px" />
        <el-table-column property="sku.brandName" label="商品名称" width="92px" />
        <el-table-column property="currentCapacity" label="当前数量" width="92px" />
        <el-table-column property="maxCapacity" label="还可添加" width="92px" />
        <el-table-column property="maxCapacity" label="补满数量">
          <!-- <span>货道暂无商品</span> -->
          <template slot-scope="scoped">
            <el-input-number v-model="scoped.row" size="small" controls-position="right" :min="1" :max="10" />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer btn">
      <el-button class="cancel" @click="closeBuHuo">取 消</el-button>
      <el-button class="determine" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getBuHuoDetailList } from '@/api/repairOrder'

export default {
  props: {
    isShowBuHuo: {
      type: Boolean,
      default: false
    },
    innerCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      buHuoDetailList: []
    }
  },
  watch: {
    innerCode() {
      if (this.innerCode) {
        this.getBuHuoDetailList()
      }
    }
  },
  methods: {
    async getBuHuoDetailList() {
      const { data } = await getBuHuoDetailList(this.innerCode)
      this.buHuoDetailList = data
    },
    closeBuHuo() {
      this.$emit('closeBuHuo')
    },
    async confirm() {
      this.closeBuHuo()
    }
  }
}
</script>

<style lang="scss">
.buhuoDetail{
  border-radius: 10px;
  .el-table thead{
    background-color: rgb(243, 246, 251);;
  }
  .el-input-number{
    width: 200px;
  }
  .el-input{
    width: 200px;
  }
  .form{
    text-align: left;
    height: 330px;
  }
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
  .el-dialog__footer{
    text-align: center;
  }
  .cancel{
     border: none;
      background-color: #fbf4f0
  }
  .determine{
     border: none;
     background: linear-gradient(135deg,#ff9743,#ff5e20)
  }
  .el-textarea{
    width: 396px;
  }
  .el-textarea__inne{
    height: 82px;
  }
}
</style>

