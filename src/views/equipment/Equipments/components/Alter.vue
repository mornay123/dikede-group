<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="修改设备" :visible="isAlter" width="630px" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="140px">
      <el-form-item label="机器编号: ">
        <span>{{ nodeDetail.innerCode }}</span>
      </el-form-item>
      <el-form-item label="供货时间：: ">
        <span>{{ nodeDetail.lastSupplyTime }}</span>
      </el-form-item>
      <el-form-item label="设备类型： ">
        <span>{{ nodeDetail.type.name }}</span>
      </el-form-item>
      <el-form-item label="设备容量: ">
        <span>{{ nodeDetail.region.nodeCount }}</span>
      </el-form-item>

      <el-form-item label="*设备点位: ">

        <el-select v-model="nodeid" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in node"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />

        </el-select>
      </el-form-item>

      <el-form-item label="合作商: ">
        <span>{{ nodeDetail.ownerName }}</span>
      </el-form-item>
      <el-form-item label="所属区域: ">
        <span>{{ nodeDetail.region.name }}</span>
      </el-form-item>
      <el-form-item label="设备地址: ">
        <span>{{ nodeDetail.node.addr }}</span>
      </el-form-item>

    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" style="margin-left: 34px;" @click="alterBtn">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getmodifyThePointPositionAPI } from '@/api/equipments' // 修改点位
export default {
  props: {
    isAlter: {
      type: Boolean,
      default: false
    },
    node: {
      type: Array,
      required: true
    },
    nodeDetail: {
      type: Object,
      required: true
    }

  },
  data() {
    return {

      nodeid: ''
    }
  },

  methods: {

    handleClose() {
      console.log(1)
      this.$emit('update:isAlter', false)
    },
    async alterBtn() {
      console.log(
        this.nodeDetail.id,
        this.nodeid
      )
      const { data } = await getmodifyThePointPositionAPI({
        id: this.nodeDetail.id,
        nodeId: this.nodeid
      })
      console.log(data)
    }
  }}
</script>

<style>

</style>
