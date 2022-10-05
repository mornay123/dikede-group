<template>
  <el-row type="flex" class="search">
    <el-form :inline="true" class="form">
      <el-form-item label="策略搜索:">
        <el-input v-model.trim="strategySearch" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      strategySearch: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.strategySearch)
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
