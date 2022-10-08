<template>
  <el-dialog
    custom-class="dialog"
    title="工单配置"
    :visible="isShowConfig"
    width="630px"
    @close="closeConfig"
  >
    <el-form class="form" :model="formdata">
      <!-- <span class="addPro">补货警戒线：</span> -->
      <el-form-item
        label="补货警戒线："
        prop="warningValue"
        :rules="[{ required: true}]"
      >
        <el-input-number v-model="formdata.warningValue" controls-position="right" :min="1" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer btn">
      <el-button class="cancel" @click="closeConfig">取 消</el-button>
      <el-button class="determine" type="primary" @click="handleChange">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getWarningValue, setWarningValue } from '@/api/repairOrder'

export default {
  props: {
    isShowConfig: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formdata: {
        warningValue: ''
      }
    }
  },
  created() {
    this.getWarningValue()
  },
  methods: {
    closeConfig() {
      this.$emit('closeConfig')
    },
    async getWarningValue() {
      try {
        const { data } = await getWarningValue()
        this.formdata.warningValue = data
      } catch (e) {
        console.log(e)
      }
    },
    async handleChange() {
      try {
        await setWarningValue(this.formdata.warningValue)
        this.$message.success('设置成功')
      } catch (e) {
        console.log(e)
      } finally {
        this.closeConfig()
      }
    }
  }

}

</script>

<style lang="scss">
.dialog{
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
  // .addPro{
  //   display: inline-block;
  //   width: 140px;
  //   text-align: right;
  // }
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
}
</style>
