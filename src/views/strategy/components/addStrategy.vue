<template>
  <el-dialog
    custom-class="add-order-dialog"
    :title="title"
    :visible="isShowBuild"
    width="630px"
    @close="closeBuild"
  >
    <el-form ref="form" :model="form" label-width="140px" :rules="formData">
      <el-form-item label="策略名称：" prop="policyName">
        <el-input v-model.trim="form.policyName" placeholder="请输入" max="15" />
      </el-form-item>
      <el-form-item label="策略方案：" prop="discount">
        <el-input-number v-model.number="form.discount" placeholder="请输入" controls-position="right" :min="1" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer btn">
      <el-button class="cancel" @click="closeBuild">取 消</el-button>
      <el-button class="determine" type="primary" @click="handleChange">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editStrategy } from '@/api/strategy'

export default {
  inject: ['searchStrategy'],
  props: {
    isShowBuild: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    currPolicyName: {
      type: String,
      default: ''
    },
    currDiscount: {
      type: Number,
      default: 0
    },
    currPolicyId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        policyName: '',
        discount: 0
      },
      formData: {
        policyName: [
          { required: true, message: '请输入' }
        ],
        discount: [
          { required: true, message: '请输入' }
        ]
      }
    }
  },
  watch: {
    currPolicyName(news) {
      this.form.policyName = news
    },
    currDiscount(news) {
      this.form.discount = news
    }
  },
  methods: {
    closeBuild() {
      this.$emit('closeBuild')
      this.formData.policyName = ''
      this.form.discount = ''
    },
    async handleChange() {
      if (this.currPolicyId) {
        await editStrategy(this.currPolicyId, this.form)
        this.$message.success('修改成功')
        this.searchStrategy()
      } else {
        await this.$refs.form.validate()
        this.$emit('setStrategy', this.form)
      }
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

