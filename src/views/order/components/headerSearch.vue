<template>
  <el-row type="flex" class="search">
    <el-form :inline="true" class="form" :model="form">
      <el-form-item label="订单编号:">
        <el-input v-model="form.orderNo" placeholder="请输入订单编号" />
      </el-form-item>
      <el-form-item label="选择日期:">
        <el-date-picker
          v-model="form.data"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
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
      form: {
        orderNo: '',
        data: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.form)
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
