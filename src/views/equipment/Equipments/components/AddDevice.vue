<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增设备" :visible="showDialog" width="630px" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="140px">
      <el-form-item label="设备编号：">
        <span>系统自动生成</span>
      </el-form-item>

      <el-form-item label="*选择型号：">
        <el-select v-model="values" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />

        </el-select>
      </el-form-item>

      <el-form-item label="*选择点位：">

        <el-select v-model="nodeid" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in node"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />

        </el-select>
      </el-form-item>

    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" style="margin-left: 34px;" @click="addEquipmentBtn">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addEquipmentAPI } from '@/api/equipments'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    node: {
      type: Array,
      required: true
    },
    getTableData: {
      type: Function,
      required: true
    }
  },
  data() {
    return {

      options: [{
        value: '1',
        label: '饮料机'
      }, {
        value: '2',
        label: '综合机'
      },
      {
        value: '3',
        label: '零食机'
      },
      {
        value: '6',
        label: '果蔬机'
      },
      {
        value: '17',
        label: '电子产品'
      },
      {
        value: '18',
        label: '果汁机'
      },
      {
        value: '20',
        label: '灯具'
      },
      {
        value: '21',
        label: '茶叶机'
      }
      ],
      values: '',
      nodeid: ''
    }
  },
  created() {
    // this.getNodeCollect()
  },
  methods: {

    handleClose() {
      this.$emit('update:showDialog', false)
    },
    async addEquipmentBtn() {
      try {
        const createUserId = this.$store.state.user.userInfo.userId

        const { data } = await addEquipmentAPI({
          vmType: this.values,
          nodeId: this.nodeid,
          createUserId
        })
        if (data) {
          this.$emit('update:showDialog', false)
          this.getTableData()
        }
      } catch (error) {
        (new Error())
      }
    }
  }
}
</script>

<style>

</style>
