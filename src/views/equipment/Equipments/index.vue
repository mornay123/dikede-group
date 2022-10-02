<template>
  <div class="equipments">
    <div class="search">
      <el-form :model="form" label-width="82px" size="medium" :inline="true">

        <!-- 搜索框 -->
        <el-form-item label="设备编号:">
          <el-input v-model="form.Numbering" placeholder="请输入设备编号" />
        </el-form-item>

        <!-- 按钮 -->

        <el-form-item>

          <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      form: {
        Numbering: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form.Numbering)
    }
  }
}
</script>

<style lang="scss" scoped>

.equipments {
display: flex;
align-items: center;
width: 100%;
  height: 64px;
  margin-bottom: 20px;
  padding-left: 17px;
    background-color: #fff;
  .search {
    height: 36px;
    .el-button {
    font-size: 16px;
    background-color: #5f84ff;
    .el-icon-search{

      span {
        margin-left: 5px;
        font-size: 14px !important;
      }
    }
    }
  }
}
</style>
