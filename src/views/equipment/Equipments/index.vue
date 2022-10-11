<template>
  <!-- 设备管理 -->
  <div class="equipments">
    <div class="search">
      <!-- 搜索框 -->
      <Search name="搜索" @numbering="onSubmit">
        <template slot="Equipments">
          <el-form-item label="设备编号:">
            <el-input v-model="form.Numbering" placeholder="请输入设备编号" />
          </el-form-item>
        </template>
      </Search>
    </div>

    <!-- 主页 -->
    <div class="equipment-main">
      <div class="operate">
        <!-- 新建按钮 -->
        <el-button type="text" icon="el-icon-circle-plus-outline" style="background-color:#ff8b3c;color:#fff" @click="showDialog=true">新建</el-button>
        <el-button type="text" style="background-color:#fbf4f0;color:#655b56">批量操作</el-button>

      </div>
      <!-- 新增显示框 -->

      <!-- list 列表 -->
      <div class="list">
        <el-table
          v-loading="loading"
          :data="currentPageRecords"
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="序号"
            type="index"
            :index="indexMethod"
            width="80"
          />
          <el-table-column
            prop="innerCode"
            label="设备编号"
            width="176"
          />
          <el-table-column
            prop="type.name"
            label="设备类型"
            width="176"
          />
          <el-table-column
            prop="node.name"
            label="详细地址"
          />
          <el-table-column
            prop="ownerName"
            label="合作商"
          />
          <el-table-column
            label="设备状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.vmStatus + '' === '0'">未投放</span>
              <span v-if="scope.row.vmStatus + '' === '1'">运营</span>
              <span v-if="scope.row.vmStatus + '' === '3'">撤机</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">

            <template slot-scope="scope">
              <el-button :loading="loading" class="actionBtn" type="text" size="small" @click="isAisle(scope.$index, scope.row)">货道</el-button>
              <el-button :loading="loading" class="actionBtn" type="text" size="small" @click="isEdit(scope.$index, scope.row)">策略</el-button>
              <el-button class="actionBtn" type="text" size="small" @click="isAlters">修改]k </el-button>
              <!-- 货道 -->
              <!-- :dialog-visible.sync="dialogVisible" -->
              <!-- :cargolist="CargoList" -->
              <cargo-lanes
                :node-detail="scope.row"
                :is-visible.sync="isVisible"
              />
              <!-- :typeinfo="TypeInfo" -->

              <!-- 策略 -->
              <Activity
                :show-dialog-activity.sync="showDialogActivity"
                :activity-list="activityList"
                :node-detail="scope.row"
                :get-table-data="getTableData"
                :quire-about-discount="quireAboutDiscount"
              />
              <!-- 修改 -->
              <Alter :is-alter.sync="isAlter" :node="node" :node-detail="scope.row" />
              <!-- @click="handleClick(scope.row)" -->
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBtn">
          <span style="colot:#eee">共{{ page.totalCount }}条记录  第 {{ page.pageIndex }}/{{ totalPage }} 页</span>
          <el-button-group>
            <el-button :disabled="disabledUP" style="background-color:#fff;" @click="previous">上一页</el-button>
            <el-button :disabled="disabledDown" @click="next">下一页</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <!-- 新建 -->
    <add-device :show-dialog.sync="showDialog" :node="node" :get-table-data="getTableData" />
    <!-- <Activity :show-dialog-activity.sync="showDialogActivity" :activity-list="activityList" /> -->

  </div>

</template>

<script>
import Search from '../components/search.vue'
import AddDevice from './components/AddDevice.vue'
import Activity from './components/Activity.vue'
import Alter from './components/Alter.vue'
import CargoLanes from './components/CargoLanes.vue'
import { getEquipmentsAPI, getActivityList, inquireAboutDiscounts } from '@/api/equipments'
export default {
  components: {
    Search,
    AddDevice,
    Alter,
    Activity,
    CargoLanes
  },
  data() {
    return {
      form: {
        Numbering: ''
      },
      currentPageRecords: [],
      page: {
        pageIndex: 1, // 第几页
        pageSize: 10, // 请求后台给几行
        status: '', // 售货机状态(0:未投放;1-运营;3-撤机)
        innerCode: '' // 售货机编号
      },
      totalPage: '', // 总共几页
      loading: false, // 加载框
      showDialog: false, // 新增显示框
      isAlter: false, // 新增显示框,
      isVisible: false, // 是否显示货道

      TypeInfo: {},
      node: [],
      showDialogActivity: false,
      activityList: [],
      quireAboutDiscount: null

    }
  },
  computed: {
    disabledUP() {
      // console.log(!this.page.pageIndex + '' === '1')
      return this.page.pageIndex - 0 === 1 - 0
    },
    disabledDown() {
      // console.log(!this.page.pageIndex + '' === '1')
      return this.page.pageIndex === this.totalPage
    }
  },

  created() {
    this.getTableData()
  },
  methods: {
    isAlters() {
      this.isAlter = true
    },
    async onSubmit() {
      this.page.innerCode = this.form.Numbering
      this.getTableData()
    },
    // 序列号
    indexMethod(index) {
      return index + (this.page.pageIndex * 10 - 9)
    },

    // 获取列表
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getEquipmentsAPI(this.page)
        // pageIndex, pageSize, totalCount, totalPage
        const { currentPageRecords, pageIndex, pageSize, totalCount, totalPage } = data
        this.currentPageRecords = currentPageRecords
        console.log(currentPageRecords)
        this.page.pageIndex = pageIndex
        this.page.pageSize = pageSize
        this.page.totalCount = totalCount
        this.totalPage = totalPage
        // 点位地址
        const res = await getEquipmentsAPI({
          pageSize: totalCount // 获取全部的数据
        })
        const { data: { currentPageRecords: nodes }} = res

        // 数组去重找到点位地址
        const obj = {}
        this.node = nodes.reduce((preVal, curVal) => {
          obj[curVal.nodeId] ? '' : obj[curVal.nodeId] = preVal.push(curVal.node)
          return preVal
        }, [])
      } catch (error) {
        console.log(error, 'list')
      } finally {
        this.loading = false
      }
    },
    // 上页
    previous() {
      if (!this.loading) { // 加载时不能触发
        this.page.pageIndex--
        this.getTableData()
      }
    },
    // 下页
    next() {
      if (!this.loading) { // 加载时不能触发
        this.page.pageIndex++
        this.getTableData()
      }
    },
    async isEdit(q, e) {
      // console.log(q, e)
      this.loading = true
      try {
        const { data } = await inquireAboutDiscounts(e.innerCode)
        console.log(data)
        if (data === '') {
          this.quireAboutDiscount = false
        } else {
          this.quireAboutDiscount = data
        }
        console.log(this.quireAboutDiscount)
        const res = await getActivityList()

        this.activityList = res.data
        this.showDialogActivity = true
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 货道点击按钮
    async isAisle(q, e) {
      this.isVisible = true
    }
  }

}

</script>

<style lang="scss" scoped>

.equipments {

  .search {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    height: 64px;
    .el-form {
      height: 36px;
    .el-button {

    font-size: 16px;
    background-color: #5f84ff;
    .el-icon-search{

      span {
        margin-left: 5px;
        font-size: 14px !important;
      }
    }
    }
    }
  }
  .equipment-main {
        padding: 20px 15px 19px 17px;
        background-color: #fff;
        .list {
          .el-table__row {
            height: 23px;
            .actionBtn{
              border: #fff;
              color: #5f84ff;
              background-color: #fff;
            }
          }
        }

.el-button {
 width:  80px;
  height: 36px;
  padding: 5px 10px;

}
  }
    .pageBtn {
      display: flex;
            justify-content: space-between;
            align-items: center;
            height: 96;
            padding: 32px 16px;
            background-color: #fff;
            color: #dbe2ec;
            .el-button {
              display: flex;
              align-items: center;
              justify-content: center;
             width: 70px;
             height: 32px;
             margin: 0 16px;
             border-radius: 2px;
             color: #000;
             background-color: #d5ddf8;
            }
          }
}
</style>
