<template>
  <div class="appMain">
    <el-row>
      <!-- 工单统计 -->
      <el-col :span="12">
        <div class="grid-content1 bg-blue">
          <p class="blue-title">日销售统计</p>
          <div class="bills">
            <span class="bills-flex">
              <div class="bills-total">1</div>
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
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
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

          <div>
            <span>笔数统计 : 1433 个</span>
            <span>收入统计 : 5615.99 元</span>
            <span>分成统计 : 7.16 元</span>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: '',
        date1: '',
        date2: ''
      },
      value: ''
    }
  },
  methods: {

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

</style>

