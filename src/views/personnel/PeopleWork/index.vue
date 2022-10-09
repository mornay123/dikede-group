<template>
  <div class="person-contain">
    <div class="dashboard-top">
      <el-row :gutter="20" class="chart">
        <el-col :span="24" class="chart-left">
          <el-row class="workorder-sale" type="flex" style="margin-bottom:20px">
            <!-- 运营人员(当天) 运维人员(当天) -->
            <el-col v-for="(item,index) in rankData" :key="index" :span="12" :class="[item.repair?'workorder':'sale']">
              <div class="header">
                <span class="title">{{ item.repair===false?'运营':'运维' }}人员(当天)</span>
              </div>
              <el-row class="StatisticalContent">
                <el-col :span="6" class="ordernum">
                  <span class="num"> {{ item.cancelTotal }} </span>
                  <span class="text">工单总数(个)</span>
                </el-col>
                <el-col :span="6" class="ordernum">
                  <span class="num"> {{ item.completedTotal }} </span>
                  <span class="text">完成工单(个)</span>
                </el-col>
                <el-col :span="6" class="ordernum">
                  <span class="num"> {{ item.total }} </span>
                  <span class="text">拒绝工单(个)</span>
                </el-col>
                <el-col :span="6" class="ordernum">
                  <span class="num"> {{ item.workerCount }} </span>
                  <span class="text">{{ item.repair===false?'运营':'运维' }}人员数(个)</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="person-status">
        <el-col style="flex:19;margin-left:20px">
          <el-card style="height:353px">
            <div class="header">
              <div class="header-left">
                <span class="title">工单状态</span>
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </div>
              </div>
              <div ref="weekChange" class="week-month-year" @click="changeTime">
                <div class="ischeck bg">周</div>
                <div class="ischeck">月</div>
                <div class="ischeck">年</div>
              </div>
            </div>
            <el-row type="flex" justify="space-between" align="middle">
              <div id="left" />
            </el-row>
            <div class="empty">
              <img src="@/assets/common/empty.png" alt="">
              <div class="tips">暂无数据</div>
            </div>

          </el-card>
        </el-col>
        <el-col style="flex:5;margin:0 20px">
          <el-card style="height:353px">
            <el-row class="header">
              <el-col :span="10">
                <span class="title">人效排名(月度)</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="id" placeholder="全部" @change="regionChange">
                  <el-option
                    v-for="item in regionList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select></el-col>
            </el-row>
            <div ref="roleBox" class="roleBox">
              <span class="rolebtn roleclick" @click="changeroleclass(false)">运营人员</span>
              <span class="rolebtn" @click="changeroleclass(true)">运维人员</span>
            </div>
            <el-row type="flex" justify="space-between" align="middle">
              <div id="left" />
            </el-row>
            <div class="empty">
              <img src="@/assets/common/empty.png" alt="">
              <div class="tips">暂无数据</div>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getRankData, getRegionList, efficiencyRank, efficiencyStatus } from '@/api/personnel'
export default {
  data() {
    return {
      currTime: 'week',
      end: dayjs(new Date()).format('YYYY-MM-DD'),
      isRepair: false,
      regionId: 0,
      rankData: [],
      regionList: [],
      id: '',
      status: false,
      efficiList: []
    }
  },
  computed: {
    start() {
      if (this.currTime === '周') {
        return dayjs(this.end).day(1).format('YYYY-MM-DD')
      } else if (this.currTime === '月') {
        return dayjs(this.end).startOf('month').format('YYYY-MM-DD')
      }
      return dayjs(this.end).startOf('year').format('YYYY-MM-DD')
    },
    value1() {
      const starts = this.start.split('-')
      const ends = this.end.split('-')
      return [new Date(starts[0], starts[1] - 1, +starts[2]), new Date(ends[0], ends[1] - 1, +ends[2])]
    }

  },
  async created() {
    // 拿select的地域的list
    const { data: { currentPageRecords }} = await getRegionList()
    // console.log(currentPageRecords)
    this.regionList = currentPageRecords
    // 拿运维人员和运营人员的统计数据
    const { data } = await getRankData(this.end + ' 00:00:00', this.end + ' 23:59:59')
    this.rankData = data
  },
  methods: {
    // 改变人效排名 运营、运维
    changeroleclass(status) {
      const roleBox = this.$refs.roleBox
      // 事件委托排他思想
      const roles = roleBox.querySelectorAll('.rolebtn')
      roleBox.querySelector('.roleclick').classList.remove('roleclick')
      if (status) {
        roles[1].classList.add('roleclick')
      } else {
        roles[0].classList.add('roleclick')
      }
      this.status = status
    },
    // 人效排名 地域改变发请求:图的数据
    async regionChange() {
      console.log(11)
      const data = await efficiencyRank(this.end.slice(0, this.end.length - 2) + '01', this.end, this.status, this.id)
      console.log(data)
    },
    // 改变周，月，年,渲染图
    async changeTime(e) {
      const weekRef = this.$refs.weekChange
      // 事件委托排他思想
      weekRef.querySelector('.bg').classList.remove('bg')
      e.target.classList.add('bg')
      this.currTime = e.target.innerText
      const { data } = await efficiencyStatus(this.start, this.end)
      this.efficiList = data
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-top {
    margin-bottom: 20px;

    .chart {
      .chart-left {
        .workorder {
          position: relative;
          align-items: center;
          width: 49%;
          height: 166px;
          background-color: #ccc;
          border-radius: 30px;
            margin:25px 15px;
          background-color: #e9f3ff;
          background-repeat: no-repeat no-repeat;
          background-position: 0 0, calc(100% - 12px) 100%;
          background-image: url('~@/assets/common/circle.png'), url('~@/assets/common/task.png');

          .header {
            margin: 20px;

            .title {
              font-size: 16px;
              font-family: PingFangSC-Semibold, "PingFang SC";
              font-weight: 600;
              color: rgb(51, 51, 51);
            }

            .date {
              margin-left: 10px;
              font-size: 12px;
              font-family: PingFangSC-Regular, "PingFang SC";
              font-weight: 400;
              color: rgb(153, 153, 153);
            }
          }

          .StatisticalContent {
            margin-top: 5%;

            .ordernum {
              display: flex;
              flex-direction: column;
              align-items: center;

              .num {
                color: #072074;
                font-size: 45px;
                font-weight: 600;
                text-shadow: rgb(85 132 255 / 50%) 2px 4px 7px;
              }

              .text {
                // margin-left: 55px;
                margin-top: 5px;
                font-size: 10px;
                color: #a8a7e3;
              }
            }
          }
        }

        .sale {
          position: relative;
          align-items: center;
          width: 49%;
          height: 167px;
          background-color: #ccc;
          border-radius: 30px;
          margin:25px 15px;
          background-color: #fbefe8;
          background-image: url('~@/assets/common/pinkpig.png');
          background-repeat: no-repeat;
          background-position: calc(100% - 12px) 100%;

          .header {
            margin: 20px;

            .title {
              font-size: 16px;
              font-family: PingFangSC-Semibold, "PingFang SC";
              font-weight: 600;
              color: rgb(51, 51, 51);
            }

            .date {
              margin-left: 10px;
              font-size: 12px;
              font-family: PingFangSC-Regular, "PingFang SC";
              font-weight: 400;
              color: rgb(153, 153, 153);
            }
          }

          .StatisticalContent {
            margin-top: 5%;

            .ordernum {
              display: flex;
              flex-direction: column;
              align-items: center;

              .num {
                color: #ff5757;
                font-size: 45px;
                font-weight: 600;
                text-shadow: rgb(255 99 85 / 50%) 2px 4px 7px;
              }

              .text {
                // margin-left: 55px;
                margin-top: 5px;
                font-size: 10px;
                color: #de9690;;
              }
            }
          }
        }
      }
    }
.person-status{
  display: flex;
    .header {
        border-radius: 60px;
        display: flex;
        align-items: center;

       .header-left {
         flex: 1;
         display: flex;
         align-items: center;
         justify-content: space-between;

        .title {
          font-size: 16px;
          font-family: PingFangSC-Semibold, "PingFang SC";
          font-weight: 600;
          color: rgb(51, 51, 51);
        }

        .date {
          margin-left: 10px;
          font-size: 12px;
          font-family: PingFangSC-Regular, "PingFang SC";
          font-weight: 400;
          color: rgb(153, 153, 153);
        }
       }

      .week-month-year {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 129px;
    height: 34px;
    background: rgba(233, 243, 255, .37);
    border-radius: 10px;

    .ischeck {
      border-radius: 7px;
      font-weight: 600;
      color: #333;
      width: 37px;
      height: 25px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
      text-align: center;
      line-height: 25px;
    }

    .bg {
      background: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    }
      }

   }
}
.empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 60px;

    .tips {
      margin-top: 25px;
      color: #20232a;
      font-size: 14px;
    }
}
.roleBox{
  height: 34px;
  background: rgba(233,243,255,.37);
  padding:8px;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
.rolebtn{
  width: 78px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
  color: #9ca3b4;
  cursor: pointer;
}
.roleclick{
  background-color: #fff;
  color: black;
  font-weight: 700;
}
}
}
</style>
