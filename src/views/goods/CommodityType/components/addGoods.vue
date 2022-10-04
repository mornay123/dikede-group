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
          :rules="[{required: true, message:'角色名称必填',trigger: 'blur'}]"
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
import { addGoods, editGoods } from '@/api/goods'
export default {
  name: 'AddGoods1',
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
      },
      pageIndex: 1,
      pageSize: 10
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields() // 重置表单
      this.formData = { className: '' }
    },
    async submit() {
      await this.$refs.roleDialogForm.validate()
      this.formData.classId ? await editGoods(this.formData) : await addGoods(this.formData)
      this.$message.success(this.formData.classId ? '修改成功' : '新增成功')

      // this.$emit('update:className', this.formData.className)
      this.$message.success('新增成功')
      this.$emit('refleshList') // 新增完之后重新刷新,即再调用获取角色的接口,让父亲改
      this.handleClose()
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
