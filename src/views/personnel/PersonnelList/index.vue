<template>
  <div class="person-contain">
    <el-form :inline="true" :model="formInline" class="person-search">
      <el-form-item label="人员搜索">
        <el-input v-model.trim="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table">
      <el-button type="primary" icon="el-icon-plus" @click="addPerson"> 新建</el-button>
      <!-- 列表 -->
      <TableList
        v-loading="loading"
        :penson-list="pensonList"
        :page-index="pageIndex"
        :page-size="pageSize"
        @onDialogEdit="onDialogEdit"
        @delPerson="delPerson"
      />
    </div>

    <footer v-show="totalPage!=='1'">
      <div> 共{{ totalCount }}条记录 第{{ pageIndex }}/{{ totalPage }}页</div>
      <el-button type="primary" :disabled="pageIndex===1" @click="onPrevPage">上一页</el-button>
      <el-button type="primary" :disabled="pageIndex===totalPage" @click="onNextPage">下一页</el-button>
    </footer>
    <!-- 修改的弹出框 -->
    <edit-person ref="editPerson" :dialog-form-visible.sync="dialogFormVisible" :role-list="roleList" :region-list="regionList" @refreshList="refreshList" />
  </div>
</template>

<script>
import { getuserSearch, getRoleList, getRegionList, delPerson } from '@/api/personnel'
import EditPerson from './components/editPerson'
import TableList from './components/tableList'
export default {
  name: 'PersonnelList',
  components: {
    EditPerson,
    TableList
  },
  data() {
    return {
      formInline: {
        user: ''
      },
      pageIndex: '1',
      pageSize: '10',
      totalCount: '0',
      totalPage: '0',
      pensonList: [{
        id: '1',
        userName: '王小虎',
        regionName: '上海市普陀区金沙江路 1518 弄',
        roleName: '运营员',
        mobile: 1367283789
      }],
      currentPageRecords: [],
      dialogFormVisible: false,
      roleList: [],
      regionList: [],
      loading: false

    }
  },
  created() {
    this.getuserSearch()
  },
  methods: {
    // 列表渲染
    render(data) {
      this.pensonList = data.currentPageRecords
      this.pageIndex = data.pageIndex
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
    },
    // 查询
    async onSubmit() {
      const { data } = await getuserSearch(1, 10, this.formInline.user)
      this.render(data)
    },
    // 列表渲染
    async getuserSearch() {
      try {
        this.loading = true
        const { data } = await getuserSearch(this.pageIndex, 10)
        this.render(data)
        if (this.pageIndex > this.totalPage) {
          this.pageIndex-- // 删除完一页，跳到上一页
          this.getuserSearch()
        }
      } finally {
        this.loading = false
      }
    },
    // 上一页
    async onPrevPage() {
      this.pageIndex--
      if (this.formInline.user) {
        const { data } = await getuserSearch(this.pageIndex, 10, this.formInline.user)
        this.render(data)
      } else {
        this.getuserSearch()
      }
    },
    // 下一页
    async onNextPage() {
      this.pageIndex++
      if (this.formInline.user) {
        const { data } = await getuserSearch(this.pageIndex, 10, this.formInline.user)
        this.render(data)
      } else {
        this.getuserSearch()
      }
    },
    async getOptions() {
      // 获取角色列表
      const { data } = await getRoleList()
      this.roleList = data
      // 获取地域列表
      const { data: { currentPageRecords }} = await getRegionList()
      this.regionList = currentPageRecords
      // console.log(this.regionList)
    },
    // 新建人员
    addPerson() {
      this.dialogFormVisible = true
      this.getOptions()
    },
    // 新建刷新
    async refreshList() {
      const { data } = await getuserSearch(this.pageIndex, 10)
      this.render(data)
      this.pageIndex = this.totalPage
      this.getuserSearch()
    },
    // 修改人员
    async onDialogEdit(row) {
      // console.log(row)
      this.$refs.editPerson.form = { ...row }
      this.dialogFormVisible = true
      this.getOptions()
    },
    // 删除人员
    async delPerson(id) {
      await delPerson(id) // 调用删除接口
      this.getuserSearch() // 重新加载数据
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
  .edit{
    color: #5f84ff;
  }
  .dele{
    color: #ff5a5a;
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
