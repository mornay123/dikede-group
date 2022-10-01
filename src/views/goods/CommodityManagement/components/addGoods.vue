<template>
  <div>
    <el-dialog
      title="新增商品类型"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >

      <el-form
        ref="roleDialogForm"
        label-width="110px"
        :model="formData"
      >
        <el-form-item
          prop="className"
          label="商品类型名称"
          :rules="[{required: true, message:'角色名称必填'}]"
        >
          <el-input
            v-model="formData.className"
            maxlength="10"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="handleClose">取 消</el-button>
        <el-button class="confirm" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddGoods2',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        className: '' // 商品类型名称
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    submit() {
      console.log('submit')
    }
  }
}
</script>

<style lang="scss">
.el-dialog__header{
  background-color: #fff;
  color: #000;
  .el-dialog__title{
    color: #000;
    font-weight: 700;
  }
}

.el-dialog__header .el-icon-close:before {
  color: #000;
}

.dialog-footer{
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cancel{
  margin: 0px 50px 0px;
  background-color: #fbf4f0;
}
.confirm{
  margin: 0px 50px 0px;
  background-color: #ff6e2a;
  color: #fff;
}
</style>
