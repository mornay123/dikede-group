<template>
  <el-dialog
    custom-class="add-order-dialog"
    title="订单详情"
    :visible="isshowDetail"
    width="630px"
    @close="closeDetail"
  >
    <!-- 出货的状态 -->
    <el-row class="status">
      <el-col :span="2">
        <img v-if="currDetailData.status==='支付完成'||currDetailData.status==='出货成功'" src="@/assets/common/success1.png" style="margin-left:15px">
        <img v-else src="@/assets/common/notPay1.png" style="margin-left:15px">
      </el-col>
      <el-col :span="17"><span>{{ currDetailData.status }}</span></el-col>
      <el-col :span="5">
        <img v-if="currDetailData.status==='支付完成'||currDetailData.status==='出货成功'" src="@/assets/common/success2.png">
        <img v-else src="@/assets/common/notPay2.png">
      </el-col>
    </el-row>
    <!-- 订单的具体数据 -->
    <el-row style="margin-left:15px;height:36px">
      <el-col :span="3">订单编号：</el-col>
      <el-col :span="9">{{ currDetailData.orderNo }}</el-col>
      <el-col :span="3">商品名称：</el-col>
      <el-col :span="9">{{ currDetailData.skuName }}</el-col>
    </el-row>
    <el-row style="margin-left:15px;height:36px">
      <el-col :span="3">订单金额：</el-col>
      <el-col :span="9">{{ currDetailData.amount }}</el-col>
      <el-col :span="3">设备编号：</el-col>
      <el-col :span="9">{{ currDetailData.innerCode }}</el-col>
    </el-row>
    <el-row style="margin-left:15px;height:36px">
      <el-col :span="3">创建时间：</el-col>
      <el-col :span="9">{{ currDetailData.createTime }}</el-col>
      <el-col :span="3">完成时间：</el-col>
      <el-col :span="9">{{ currDetailData.updateTime }}</el-col>
    </el-row>
    <el-row style="margin-left:15px;height:36px">
      <el-col :span="3">支付方式：</el-col>
      <el-col :span="9">{{ currDetailData.payType }}</el-col>
      <el-col :span="3">设备地址：</el-col>
      <el-col :span="9">{{ currDetailData.addr }}</el-col>
    </el-row>
  </el-dialog>
</template>

<script>

export default {
  props: {
    isshowDetail: {
      type: Boolean,
      default: true
    },
    currDetailData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  methods: {
    closeDetail() {
      this.$emit('closeDetail')
    }
  }

}

</script>

<style lang="scss">
.add-order-dialog{
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
  .el-dialog__body{
    padding: 20px;
  }
  .status{
    display: flex;
    width: 590px;
    align-items: center;
    height: 54px;
    margin-bottom: 30px;
    background-color: hsla(0,0%,92.5%,.39);
  }
}
</style>
