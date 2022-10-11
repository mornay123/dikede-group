<template>
  <div class="person-contain">
    <el-form :inline="true" :model="formInline" class="person-search">
      <el-form-item label="人员搜索">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formInline.role" placeholder="请选择" clearable>
          <el-option label="运营员" value="yunyingyuan" />
          <el-option label="维修员" value="weixiuyuan" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <WorkTableList :table-data="tableData" :detail-visible.sync="detailVisible" @getDetailData="getDetailData" />
    <footer v-show="totalPage!=='1'">
      <div> 共{{ totalCount }}条记录 第{{ pageIndex }}/{{ totalPage }}页</div>
      <el-button type="primary" :disabled="pageIndex===1" @click="onPrevPage">上一页</el-button>
      <el-button type="primary" :disabled="pageIndex===totalPage" @click="onNextPage">下一页</el-button>
    </footer>
    <!-- 查看详情弹窗 -->
    <detail-dialog :detail-visible.sync="detailVisible" :current-row="currentRow" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getuserWorkList, getDetail, getPersonMsg } from '@/api/personnel'
import WorkTableList from './components/workTableList'
import DetailDialog from './components/detailDialog.vue'
export default {
  components: {
    WorkTableList,
    DetailDialog
  },
  data() {
    return {
      formInline: {
        user: '',
        role: ''
      },
      pageIndex: '1',
      pageSize: 10,
      totalCount: '',
      totalPage: '',
      tableData: [{
        id: '1',
        userName: '王小虎',
        roleName: '运营员',
        mobile: 1367283789,
        workdone: 1,
        workdoing: 1,
        worknotdo: 1
      }],
      detailVisible: false,
      detailData: [],
      currentRow: []
    }
  },
  created() {
    this.getuserWorkList()
  },
  methods: {
    onSubmit() {
      this.getuserWorkList()
    },
    render(data) {
      this.pageIndex = data.pageIndex
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
      this.tableData = data.currentPageRecords
    },
    async getuserWorkList() {
      if (this.formInline.user && this.formInline.role) {
        const { data } = await getuserWorkList({
          pageIndex: this.pageIndex,
          pageSize: '10',
          userName: this.formInline.user,
          isRepair: this.formInline.role === 'weixiuyuan' })
        this.render(data)
      } else if (this.formInline.user && !this.formInline.role) {
        const { data } = await getuserWorkList({
          pageIndex: this.pageIndex,
          pageSize: '10',
          userName: this.formInline.user })
        this.render(data)
      } else if (!this.formInline.user && this.formInline.role) {
        const { data } = await getuserWorkList({
          pageIndex: this.pageIndex,
          pageSize: '10',
          isRepair: this.formInline.role === 'weixiuyuan' })
        this.render(data)
      } else {
        const { data } = await getuserWorkList({
          pageIndex: this.pageIndex,
          pageSize: '10' })
        this.render(data)
      }
    },
    // 查看详情
    async getDetailData(row) {
      const { data: weekData } = await getDetail(row.userId, dayjs(new Date()).day(1).format('YYYY-MM-DD') + ' 00:00:00', dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59')
      const { data: monthData } = await getDetail(row.userId, dayjs(new Date()).startOf('month').format('YYYY-MM-DD') + ' 00:00:00', dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59')
      const { data: yearData } = await getDetail(row.userId, dayjs(new Date()).startOf('year').format('YYYY-MM-DD') + ' 00:00:00', dayjs(new Date()).format('YYYY-MM-DD') + ' 23:59:59')
      const { data: perData } = await getPersonMsg(row.userId)
      this.currentRow = [perData, weekData, monthData, yearData]
    },
    // 上一页
    async onPrevPage() {
      this.pageIndex--
      this.getuserWorkList()
    },
    // 下一页
    async onNextPage() {
      this.pageIndex++
      this.getuserWorkList()
    }
  }
}
</script>
<style lang="scss">
  .person-contain{
    padding:30px
}
</style>
<style lang="scss" scoped>
.person-search{
    display: flex;
    height: 64px;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
}
.table{
  background-color: #fff;
  padding: 17px;
  .el-button{
    color: #fff;;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    margin-bottom: 20px;
    .svg-icon{
        color: inherit;
    }
  }
}
footer{
  display: flex;
  height: 64px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  div{
    width: 1100px;
  }
}
</style>
