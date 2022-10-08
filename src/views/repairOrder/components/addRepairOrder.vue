<template>
  <el-dialog
    custom-class="add-order-dialog"
    title="新增工单"
    :visible="isShowBuild"
    width="630px"
    @close="closeBuild"
  >
    <el-form ref="ruleForm" class="demo-ruleForm form" :rules="ruleForm" :model="formdata" label-width="140px">
      <el-form-item label="设备编号：" prop="innerCode">
        <el-input
          v-model.trim="formdata.innerCode"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
          @change="innerCodeChange"
        />
      </el-form-item>
      <el-form-item label="工单类型：" prop="productType">
        <el-select v-model="formdata.productType" placeholder="请选择">
          <el-option label="补货工单" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量：">
        <el-button icon="el-icon-edit-outline" type="text" @click="buHuoList">补货清单</el-button>
      </el-form-item>
      <el-form-item label="运营人员：" prop="userId">
        <el-select v-model="formdata.userId" placeholder="请选择">
          <el-option v-for="item in operatorList" :key="item.userId" :label="item.userName" :value="item.userId" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" prop="desc">
        <el-input
          v-model="formdata.desc"
          maxlength="40"
          show-word-limit
          type="textarea"
          placeholder="请输入备注（不超过40字）"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer btn">
      <el-button class="cancel" @click="closeBuild">取 消</el-button>
      <el-button class="determine" type="primary" @click="confirm">确 定</el-button>
    </span>
    <!-- 补货详情的弹窗 -->
    <bu-huo-detail :inner-code="formdata.innerCode" :is-show-bu-huo="isShowBuHuo" @details="details=$event" @closeBuHuo="isShowBuHuo=false" />
  </el-dialog>
</template>

<script>
import { getOperatorList, repairOrderSearchList, createOrder } from '@/api/repairOrder'
import buHuoDetail from './buHuoDetail.vue'

export default {
  components: { buHuoDetail },
  props: {
    isShowBuild: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowBuHuo: false,
      formdata: {
        createType: 1,
        innerCode: '', // 设备编号
        userId: '',
        productType: '',
        desc: '',
        isRepair: false,
        assignorId: ''
      },
      details: [],
      ruleForm: {
        innerCode: [{ required: true, message: '请输入' }],
        productType: [{ required: true, message: '请输入' }],
        userId: [{ required: true, message: '请输入' }],
        desc: [{ required: true, message: '请输入' }]
      },
      operatorList: []
    }
  },
  methods: {
    async innerCodeChange() {
      try {
        this.operatorList = []
        const { data } = await getOperatorList(this.formdata.innerCode)
        this.operatorList = data
      } catch (e) {
        console.log(e)
      }
    },
    buHuoList() {
      if (this.formdata.innerCode) {
        this.isShowBuHuo = true
      }
    },
    closeBuild() {
      this.$refs.ruleForm.resetFields()
      this.formdata = {
        createType: 1,
        innerCode: '', // 设备编号
        userId: '',
        productType: '',
        desc: '',
        isRepair: false,
        assignorId: ''
      }
      this.details = []
      this.$emit('closeBuild')
    },
    async confirm() {
      try {
        await this.$refs.ruleForm.validate()
        const { data } = await repairOrderSearchList(this.formdata)
        this.formdata.assignorId = data.currentPageRecords[0].assignorId
        this.formdata.details = this.details
        await createOrder(this.formdata)
        this.$message.success('新建成功')
        this.$parent.getRepairOrderSearchList()
      } catch (e) {
        if (e.response && e.response.status === 500) {
          this.$message.error(e.response.data)
        }
      } finally {
        this.closeBuild()
      }
    }
  }

}

</script>

<style lang="scss">
.add-order-dialog{
  border-radius: 10px;
  .form{
    text-align: left;
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
  .el-input-number{
    width: 396px;
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

