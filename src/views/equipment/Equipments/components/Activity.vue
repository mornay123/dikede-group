<template>
  <!-- 新增部门的弹层 -->
  <el-dialog v-if="!quireAboutDiscount " title="批量策略管理" :visible="showDialogActivity" width="630px" @close="handleClose">
    <el-row>
      选择策略：
      <el-select v-model="value" style="width:80%" placeholder="请选择">
        <el-option
          v-for="item in activityList"
          :key="item.policyId"
          :label="item.policyName"
          :value="item.policyId"
        />
      </el-select>
    </el-row>

    <el-row slot="footer" type="flex" justify="center">

      <el-col :span="6">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" style="margin-left: 34px;" @click="addEquipmentBtn">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
  <el-dialog v-else title="批量" :visible="showDialogActivity" width="630px" @close="handleClose">

    <div class="box">
      <span>机器编号:{{ nodeDetail.innerCode }}</span>
      <span>策略名称：{{ quireAboutDiscount.policyName }}</span>
    </div>
    <div class="box">
      <span>策略方案：{{ quireAboutDiscount.discount }}%</span>

    </div>

    <el-row slot="footer" type="flex" justify="center">

      <el-col :span="3">

        <el-button type="primary" size="small" @click="removeEquipmentBtn">取消策略</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { reviseActivity, removeEquipmentAPI } from '@/api/equipments'
export default {
  props: {
    showDialogActivity: {
      type: Boolean,
      default: false
    },
    activityList: {
      type: Array,
      required: true
    },
    nodeDetail: {
      type: Object,
      required: true
    },
    getTableData: {
      type: Function,
      required: true
    },
    quireAboutDiscount: {
      type: [Boolean, Object],
      default: false
    }
  },
  data() {
    return {

      value: ''

    }
  },
  created() {
    this.quireAbout
  },
  methods: {

    handleClose() {
      this.$emit('update:showDialogActivity', false)
    },
    async addEquipmentBtn() {
      console.log(1, this.nodeDetail)
      //   const createUserId = this.$store.state.user.userInfo.userId
      console.log(this.$store.state.user.userInfo.userId, this.value)
      try {
        const { data } = await reviseActivity({
          innerCodeList: [this.nodeDetail.innerCode],
          policyId: this.value
        //   createUserId
        })
        // console.log(data)
        if (data) {
          this.$emit('update:showDialogActivity', false)
          this.getTableData()
        }
      } catch (error) {
        // (new Error())
        console.log(error)
      }
    },
    async removeEquipmentBtn() {
      await removeEquipmentAPI(this.nodeDetail.innerCode, this.quireAboutDiscount.policyId)
      this.handleClose()
    }

  }
}
</script>

<style >
.box{
    width: 100%;
 /* background-color: red; */
    padding: 10px 60px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
</style>
