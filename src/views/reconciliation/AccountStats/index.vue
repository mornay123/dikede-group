<template>
  <div class="appMain">
    <el-row>
      <!-- 工单统计 -->
      <el-col :span="12">
        <div class="grid-content1 bg-blue">
          <p class="blue-title">日销售统计</p>
          <div class="bills">
            <span class="bills-flex">
              <div class="bills-total">0</div>
              <div class="bills-count">当日销售量 (个)</div>
            </span>
            <span class="bills-flex">
              <div class="bills-total">0</div>
              <div class="bills-count">当日销售额 (元)</div>
            </span>
            <span class="bills-flex">
              <div class="bills-total">0</div>
              <div class="bills-count">当日分成 (元)</div>
            </span>
          </div>
        </div>
      </el-col>

      <!-- 销售统计 -->
      <el-col :span="12">
        <div class="grid-content1 bg-blue bg-orange">
          <p class="blue-title">月销售统计</p>
          <div class="bills">
            <span class="bills-flex">
              <div class="bills-total2">1433</div>
              <div class="bills-count2">当日销售量 (个)</div>
            </span>
            <span class="bills-flex">
              <div class="bills-total2">5615.99</div>
              <div class="bills-count2">当日销售额 (元)</div>
            </span>
            <span class="bills-flex">
              <div class="bills-total2">7.16</div>
              <div class="bills-count2">当日分成 (元)</div>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content search">
          <el-form ref="form" :model="form" label-width="80px" style="display:flex;padding-top:20px;font-size: 18px">
            <el-form-item label="合作商 :">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="金燕龙合作商" value="shanghai" />
                <el-option label="天华物业" value="tianhua" />
                <el-option label="金燕龙物业" value="jin" />
                <el-option label="合作商开发-勿删" value="kaifa" />
                <el-option label="北京合作商" value="beijing" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <span> 日期 :
                <el-date-picker
                  v-model="value"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                />
              </span>
            </el-form-item>
          </el-form>
          <!-- 统计 -->
          <div class="middleCount">
            <span>笔数统计 : <span class="count">1433</span> <span class="unit">个</span></span>
            <span>收入统计 : <span class="count">5615.99</span> <span class="unit">元</span></span>
            <span>分成统计 : <span class="count">7.16</span> <span class="unit">元</span></span>
          </div>

          <!-- 表格 -->
          <el-table
            class="tableTable"
            :data="tableData"
            style="width: 100%"
            :highlight-current-row="true"
          >
            <el-table-column
              prop="date"
              label="订单日期"
              width="180"
            />
            <el-table-column
              prop="ownerName"
              label="合作商"
              width="180"
            />
            <el-table-column
              prop="ratio"
              label="分成比例"
            />
            <el-table-column
              prop="orderTotalMoney"
              label="收入(元)"
            />
            <el-table-column
              prop="orderCount"
              label="笔数"
            />
            <el-table-column
              prop="totalBill"
              label="分成金额(元)"
            />
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { partnerCollect } from '@/api/reconciliation'
export default {
  data() {
    return {
      form: {
        region: '',
        date1: '',
        date2: ''
      },
      value: '2022-10-01',
      tableData: [{
        date: '2022-10-01',
        ownerName: '金燕龙合作商',
        ratio: '15%',
        orderTotalMoney: '+1872.95',
        orderCount: '444',
        totalBill: '+2.39'
      },
      {
        date: '2022-10-02',
        ownerName: '金燕龙合作商',
        ratio: '15%',
        orderTotalMoney: '+2028.39',
        orderCount: '449',
        totalBill: '+2.68'
      },
      {
        date: '2022-10-03',
        ownerName: '金燕龙合作商',
        ratio: '15%',
        orderTotalMoney: '+1714.65',
        orderCount: '536',
        totalBill: '+2.09'
      },
      {
        date: '2022-10-04',
        ownerName: '金燕龙合作商',
        ratio: '15%',
        orderTotalMoney: '+1872.95',
        orderCount: '444',
        totalBill: '+2.39'
      },
      {
        date: '2022-10-05',
        ownerName: '金燕龙合作商',
        ratio: '15%',
        orderTotalMoney: '+5852.9',
        orderCount: '445',
        totalBill: '+8.54'
      }],
      pageIndex: 1,
      pageSize: 10,
      start: dayjs(new Date().setDate(1)).format('YYYY-MM-DD'),
      end: dayjs(new Date()).format('YYYY-MM-DD')
      // start: '2022-10-01',
      // end: '2022-10-05'
    }
  },
  created() {
    this.partnerCollect()
  },
  methods: {
    async partnerCollect() {
      const data = await partnerCollect(this.start + ' 00:00:00', this.end + ' 23:59:59', this.pageIndex, this.pageSize)
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
.appMain{
  width: 100%;
  height: 600px;
  background-color: #f3f6fb;
  margin-top: 80px;
  padding: 20px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 400px;
  }
    .grid-content1{
    border-radius: 20px;
    min-height: 175px;
   }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  // 工单统计
   .bg-blue{
    background:url('~@/assets/common/circle.png') no-repeat;
    background-color: #e9f3ff;
    padding: 15px;
    margin-right: 15px;
    .blue-title{
      font-weight:700;
    .small{
      font-size: 14px;
      color: #9999a6;
     }
    }
    .bills{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 25px;
      .bills-flex{
        .bills-total{
          font-weight: 700;
          font-size: 40px;
          color:#072074;
        }
        .bills-count{
          font-size: 12px;
          color: #91aee6;
          justify-content: space-evenly;
        }

      }
    }
  }
  // 销售统计
  .bg-orange{
    background-color:#fbefe8;
    background-image: url('~@/assets/common/pinkpig.png');
    background-repeat: no-repeat;
    margin-left: 15px;
    .bills-total2{
      font-weight: 700;
      font-size: 40px;
      color: #ff5757;
    }
    .bills-count2{
      font-size: 12px;
      color: #de96a7;
    }
  }

// 表格
.search{
  background-color: #fff;
}

// 统计
.middleCount{
  padding: 15px;
  .count{
    color:#ff5757;
    font-weight: 700;
    font-size: 20px;
    padding-left: 5px;
  }
  .unit{
    font-size: 14px;
    padding-right: 45px;
  }
}

// 表格
.tableTable{
  // font-weight: normal;
  // background-color: #f3f6fb;
  padding-left: 15px;
  // tr{
  //   background-color: #f3f6fb;
  // }
  thead{
    background-color: #f3f6fb;
  }
}

</style>

