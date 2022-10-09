<template>
  <el-dialog
    custom-class="buhuoDetail my_table"
    title="补货详情"
    :visible="isShowBuHuo"
    width="630px"
    append-to-body
    @close="closeBuHuo"
  >
    <!-- 查看详情 -->
    <div v-if="showList">
      <el-form class="demo-ruleForm form">
        <el-table :data="seeDetailList" height="330px">
          <el-table-column property="channelCode" label="货道编号" />
          <el-table-column property="skuName" label="商品" />
          <el-table-column property="expectCapacity" label="补货数量" />
        </el-table>
      </el-form>
    </div>
    <!-- 创建 -->
    <div v-else>
      <el-form class="demo-ruleForm form">
        <el-table :data="buHuoDetailList" height="330px">
          <el-table-column property="channelCode" label="货道编号" width="92px" />
          <el-table-column :formatter="formatter1" property="sku.brandName" label="商品名称" width="92px" />
          <el-table-column :formatter="formatter2" property="currentCapacity" label="当前数量" width="92px" />
          <el-table-column :formatter="formatter3" property="maxCapacity" label="还可添加" width="92px" />
          <el-table-column label="补满数量">
            <template slot-scope="scope">
              <el-input-number v-if="scope.row.sku" v-model="scope.row.maxCapacity" size="small" controls-position="right" :min="1" :max="10" @change="inpnum(scope.row)" />
              <span v-else>货道暂无商品</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer btn">
        <el-button class="cancel" @click="closeBuHuo">取 消</el-button>
        <el-button class="determine" type="primary" @click="confirm">确 定</el-button>
      </div>
    </div>
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
    },
    showList: {
      type: Boolean,
      default: false
    },
    seeDetailList: {
      type: Array,
      default: () => { [] }
    }
  },
  data() {
    return {
      buHuoDetailList: [],
      formdata: [],
      obj: {
        channelCode: '',
        expectCapacity: '',
        skuId: '',
        skuImage: '',
        skuName: ''
      }
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
    inpnum(data) {
      for (let i = 0; i < this.formdata.length; i++) {
        if (this.formdata[i].channelCode === data.channelCode) {
          this.formdata[i].expectCapacity = data.maxCapacity
        }
      }
    },
    formatter1(row) {
      if (row.sku) {
        return row.sku.brandName
      } else {
        return '-'
      }
    },
    formatter2(row) {
      if (row.sku) {
        return row.currentCapacity
      } else {
        return '-'
      }
    },
    formatter3(row) {
      if (row.sku) {
        return row.maxCapacity
      } else {
        return '-'
      }
    },
    async getBuHuoDetailList() {
      try {
        const { data } = await getBuHuoDetailList(this.innerCode)
        this.buHuoDetailList = data
        for (let i = 0; i < data.length; i++) {
          if (data[i].sku) {
            this.obj.channelCode = data[i].channelCode
            this.obj.expectCapacity = data[i].maxCapacity
            this.obj.skuId = data[i].skuId
            this.obj.skuImage = data[i].sku.skuImage
            this.obj.skuName = data[i].sku.skuName
            this.formdata.push(this.obj)
            this.obj = {}
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    closeBuHuo() {
      this.$emit('closeBuHuo')
    },
    async confirm() {
      this.$emit('details', this.formdata)
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
    text-align: center;
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

