<template>
  <el-row type="flex" class="search">
    <el-form :inline="true" class="form" :model="formData">
      <el-form-item label="工单编号:">
        <el-input v-model="formData.taskCode" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="工单状态:">
        <el-select v-model="formData.status" placeholder="请选择" :clearable="true">
          <el-option v-for="item in repairOrderStatusList" :key="item.statusId" :label="item.statusName" :value="item.statusId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  props: {
    repairOrderStatusList: {
      type: Array,
      default: () => { [] }
    }
  },
  data() {
    return {
      formData: {
        taskCode: '',
        status: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 100%;
  height: 64px;
  padding-left: 17px;
  margin-bottom: 20px;
  background-color: #fff;
  .form{
    padding-top: 12px;
  }
}
</style>
