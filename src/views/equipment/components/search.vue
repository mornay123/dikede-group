<template>
  <el-form :model="form" label-width="82px" size="medium" :inline="true">

    <!-- <el-form-item label="设备编号:">
      <el-input v-model="form.Numbering" placeholder="请输入设备编号" />
    </el-form-item> -->
    <slot name="Equipments" />
    <!-- 按钮 -->
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">{{ name }}</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      form: {
        Numbering: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$emit('numbering') // 调用下刷新列表
    }
  }
}
</script>

<style  lang="scss" scoped>
    // .el-form {
    //   height: 36px;
    // .el-button {

    // font-size: 16px;
    // background-color: #5f84ff;
    // .el-icon-search{

    //   span {
    //     margin-left: 5px;
    //     font-size: 14px !important;
    //   }
    // }
    // }
    // }
</style>
