<template>
  <el-dialog
    custom-class="workOrder"
    title="订单详情"
    :visible="isshowDetail"
    width="630px"
    @close="closeDetail"
  >
    <!-- 出货的状态 -->
    <el-row class="status">
      <el-col :span="2">
        <img v-if="currDetailData.taskStatusTypeEntity.statusName==='完成'" src="@/assets/common/success1.png" style="margin-left:15px">
        <img v-else-if="currDetailData.taskStatusTypeEntity.statusName==='待办'" src="@/assets/common/daiban1.png" style="margin-left:15px">
        <img v-else-if="currDetailData.taskStatusTypeEntity.statusName==='取消'" src="@/assets/common/notPay1.png" style="margin-left:15px">
      </el-col>
      <el-col :span="17"><span>{{ currDetailData.taskStatusTypeEntity.statusName }}</span></el-col>
      <el-col :span="5">
        <img v-if="currDetailData.taskStatusTypeEntity.statusName==='完成'" src="@/assets/common/success2.png">
        <img v-else-if="currDetailData.taskStatusTypeEntity.statusName==='待办'" src="@/assets/common/daiban2.png">
        <img v-else-if="currDetailData.taskStatusTypeEntity.statusName==='取消'" src="@/assets/common/notPay2.png">
      </el-col>
    </el-row>
    <!-- 订单的具体数据 -->
    <!-- 运营 -->
    <div v-if="currDetailData.taskType.typeName==='补货工单'">
      <!-- 完成 -->
      <div v-if="currDetailData.taskStatusTypeEntity.statusName==='完成'">
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">设备编号：</el-col>
          <el-col :span="8">{{ currDetailData.innerCode }}</el-col>
          <el-col :span="4">创建日期：</el-col>
          <el-col :span="8">{{ currDetailData.createTime }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">完成日期：</el-col>
          <el-col :span="8">{{ currDetailData.updateTime }}</el-col>
          <el-col :span="4">运营人员：</el-col>
          <el-col :span="8">{{ currDetailData.userName }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">工单类型：</el-col>
          <el-col :span="8">{{ currDetailData.taskType.typeName }}</el-col>
          <el-col :span="4">补货数量：</el-col>
          <el-col :span="8"><el-button class="bhxq" type="text" @click="searchBuHuoDetail">补货详情</el-button></el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">工单方式：</el-col>
          <el-col :span="8">{{ currDetailData.createType }}</el-col>
          <el-col :span="4">备注：</el-col>
          <el-col :span="8">{{ currDetailData.desc }}</el-col>
        </el-row>
      </div>
      <!-- 待办 -->
      <div v-else-if="currDetailData.taskStatusTypeEntity.statusName==='待办'">
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">设备编号：</el-col>
          <el-col :span="8">{{ currDetailData.innerCode }}</el-col>
          <el-col :span="4">创建日期：</el-col>
          <el-col :span="8">{{ currDetailData.createTime }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">运营人员：</el-col>
          <el-col :span="8">{{ currDetailData.userName }}</el-col>
          <el-col :span="4">工单类型：</el-col>
          <el-col :span="8">{{ currDetailData.taskType.typeName }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">补货数量：</el-col>
          <el-col :span="8"><el-button class="bhxq" type="text" @click="searchBuHuoDetail">补货详情</el-button></el-col>
          <el-col :span="4">工单方式：</el-col>
          <el-col :span="8">{{ currDetailData.createType }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">取消原因：</el-col>
          <el-col :span="8">{{ currDetailData.desc }}</el-col>
        </el-row>
        <el-row style="height:40px">
          <el-col style="text-align:center">
            <el-button type="info" @click="isDialog=true">取消工单</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 取消 -->
      <div v-else-if="currDetailData.taskStatusTypeEntity.statusName==='取消'">
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">设备编号：</el-col>
          <el-col :span="8">{{ currDetailData.innerCode }}</el-col>
          <el-col :span="4">创建日期：</el-col>
          <el-col :span="8">{{ currDetailData.createTime }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">完成日期：</el-col>
          <el-col :span="8">{{ currDetailData.updateTime }}</el-col>
          <el-col :span="4">运营人员：</el-col>
          <el-col :span="8">{{ currDetailData.userName }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">工单类型：</el-col>
          <el-col :span="8">{{ currDetailData.taskType.typeName }}</el-col>
          <el-col :span="4">补货数量：</el-col>
          <el-col :span="8"><el-button class="bhxq" type="text" @click="searchBuHuoDetail">补货详情</el-button></el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">工单方式：</el-col>
          <el-col :span="8">{{ currDetailData.createType }}</el-col>
          <el-col :span="4">取消原因：</el-col>
          <el-col :span="8">{{ currDetailData.desc }}</el-col>
        </el-row>
        <el-row style="text-align:center;height:40px">
          <el-button type="info" @click="addOrder">重新创建</el-button>
        </el-row>
      </div>
    </div>
    <!-- 运维 -->
    <div v-else>
      <!-- 完成 -->
      <div v-if="currDetailData.taskStatusTypeEntity.statusName==='完成'">
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="3">设备编号：</el-col>
          <el-col :span="9">{{ currDetailData.innerCode }}</el-col>
          <el-col :span="3">创建日期：</el-col>
          <el-col :span="9">{{ currDetailData.createTime }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">完成日期：</el-col>
          <el-col :span="8">{{ currDetailData.updateTime }}</el-col>
          <el-col :span="4">运维人员：</el-col>
          <el-col :span="8">{{ currDetailData.userName }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">工单类型：</el-col>
          <el-col :span="8">{{ currDetailData.taskType.typeName }}</el-col>
          <el-col :span="4">工单方式：</el-col>
          <el-col :span="8">{{ currDetailData.createType }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">备注：</el-col>
          <el-col :span="8">{{ currDetailData.desc }}</el-col>
          <el-col :span="4">定位：</el-col>
          <el-col :span="8"><span class="iconfont icon-didiandingwei_o" /> {{ currDetailData.addr }}</el-col>
        </el-row>
      </div>
      <!-- 待办 -->
      <div v-else-if="currDetailData.taskStatusTypeEntity.statusName==='待办'">
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">设备编号：</el-col>
          <el-col :span="8">{{ currDetailData.innerCode }}</el-col>
          <el-col :span="4">创建日期：</el-col>
          <el-col :span="8">{{ currDetailData.createTime }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">运维人员：</el-col>
          <el-col :span="8">{{ currDetailData.userName }}</el-col>
          <el-col :span="4">工单类型：</el-col>
          <el-col :span="8">{{ currDetailData.taskType.typeName }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">工单方式：</el-col>
          <el-col :span="8">{{ currDetailData.createType }}</el-col>
          <el-col :span="4">备注：</el-col>
          <el-col :span="8">{{ currDetailData.desc }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">定位：</el-col>
          <el-col :span="8"><span class="iconfont icon-didiandingwei_o" /> {{ currDetailData.addr }}</el-col>
          <el-col :span="4" />
          <el-col :span="8" />
        </el-row>
        <el-row style="height:40px">
          <el-col style="text-align:center">
            <el-button type="info" @click="isDialog=true">取消工单</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 取消 -->
      <div v-else-if="currDetailData.taskStatusTypeEntity.statusName==='取消'">
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">设备编号：</el-col>
          <el-col :span="8">{{ currDetailData.innerCode }}</el-col>
          <el-col :span="4">创建日期：</el-col>
          <el-col :span="8">{{ currDetailData.createTime }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">完成日期：</el-col>
          <el-col :span="8">{{ currDetailData.updateTime }}</el-col>
          <el-col :span="4">运维人员：</el-col>
          <el-col :span="8">{{ currDetailData.userName }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">工单类型：</el-col>
          <el-col :span="8">{{ currDetailData.taskType.typeName }}</el-col>
          <el-col :span="4">工单方式：</el-col>
          <el-col :span="8">{{ currDetailData.createType }}</el-col>
        </el-row>
        <el-row style="margin-left:15px;height:36px">
          <el-col :span="4">取消原因：</el-col>
          <el-col :span="8">{{ currDetailData.desc }}</el-col>
          <el-col :span="4">定位：</el-col>
          <el-col :span="8"><span class="iconfont icon-didiandingwei_o" /> {{ currDetailData.addr }}</el-col>
        </el-row>
        <el-row style="text-align:center;height:40px">
          <el-button type="info" @click="addOrder">重新创建</el-button>
        </el-row>
      </div>
    </div>
    <!-- 取消工单弹出层 -->
    <el-dialog
      width="30%"
      custom-class="deldialog"
      :visible="isDialog"
      append-to-body
      :show-close="false"
    >
      <span><el-button icon="el-icon-warning" type="text"> 取消工单后，将不能恢复，是否确认取消？</el-button></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false">取 消</el-button>
        <el-button type="primary" @click="determin">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 补货详情弹窗 -->
    <bu-huo-detail :see-detail-list="seeDetailList" :is-show-bu-huo="isShowBuHuo" :show-list="showList" @closeBuHuo="isShowBuHuo=false" />
  </el-dialog>
</template>

<script>
import { delOrder } from '@/api/repairOrder'
import buHuoDetail from './buHuoDetail.vue'
import { searchBuHuoDetail } from '@/api/repairOrder'

export default {
  components: { buHuoDetail },
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
      isDialog: false,
      isShowBuHuo: false,
      showList: false,
      seeDetailList: []
    }
  },
  methods: {
    async searchBuHuoDetail() {
      try {
        this.isShowBuHuo = true
        this.showList = true
        const { data } = await searchBuHuoDetail(this.currDetailData.taskId)
        this.seeDetailList = data
      } catch (e) {
        console.log(e)
      }
    },
    closeDetail() {
      this.$emit('closeDetail')
    },
    addOrder() {
      this.$emit('isshowDetail')
      this.$emit('isShowDetail1')
      this.closeDetail()
    },
    async determin() {
      try {
        const params = {
          taskId: this.currDetailData.taskId,
          desc: this.currDetailData.desc
        }
        await delOrder(this.currDetailData.taskId, params)
        this.$message.success('取消工单')
      } catch (e) {
        if (e.response && e.response.status === 500) {
          this.$message.error(e.response.data)
        } else {
          console.log(e)
        }
      } finally {
        this.isDialog = false
        this.closeDetail()
      }
    }
  }

}

</script>

<style lang="scss">
.workOrder{
  border-radius: 10px;
  .el-col{
  border:1px solid transparent
}
  .el-button--info{
    background-color:#fbf4f0;
    color: #333;
    border: none;
  }
.iconfont{
  color: rgb(77, 77, 233);
}
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
.deldialog{
  text-align: center;
  .el-dialog__header{
      background-color: #fff !important;
      height: 0px !important;
    }
  .el-dialog__footer{
    text-align: center;
  }
  .el-button--text{
    color: #333;
  }
  .el-icon-warning:before{
    color: red;
  }
  }
  .bhxq{
    padding: 0px;
  }
</style>
