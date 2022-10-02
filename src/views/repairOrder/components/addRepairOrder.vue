<template>
  <el-dialog
    custom-class="add-order-dialog"
    title="新增工单"
    :visible="isShowBuild"
    width="630px"
    @close="closeBuild"
  >
    <el-form ref="ruleForm" class="demo-ruleForm form" rules="ruleForm" :model="formdata" label-width="140px">
      <el-form-item label="设备编号：" prop="innerCode">
        <el-input
          v-model="formdata.innerCode"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="工单类型：" prop="productType">
        <el-select v-model="formdata.productType" placeholder="请选择">
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量：">
        <span>补货清单</span>
      </el-form-item>
      <el-form-item label="运营人员：" prop="userId">
        <el-select v-model="formdata.userId" placeholder="请选择">
          <el-option label="区域一" value="shanghai" />
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
      <el-button class="determine" type="primary" @click="closeBuild">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    isShowBuild: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formdata: {
        createType: 1,
        innerCode: '', // 设备编号
        userId: '',
        productType: '',
        desc: '',
        details: {}
      },
      ruleForm: {
        innerCode: [],
        productType: [],
        userId: [],
        desc: []

      }
    }
  },
  methods: {
    closeBuild() {
      this.$emit('closeBuild')
    },
    async handleChange() {
      this.closeBuild()
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

