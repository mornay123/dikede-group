<template>
  <!-- 设备状态 -->
  <div class="equipmentState">
    <div class="search">
      <!-- 搜索框 -->
      <Search name="查询" @numbering="onSubmit">
        <template slot="Equipments">
          <el-form-item label="设备编号:">
            <el-input v-model="form.Numbering" placeholder="请输入" />
          </el-form-item>
        </template>
      </Search>
    </div>

    <!-- 主页 -->
    <div class="equipment-main">
      <div class="operate">
        <!-- 新建按钮 -->
        <!-- <el-button type="text" icon="el-icon-circle-plus-outline" style="background-color:#ff8b3c;color:#fff" @click="showDialog=true">新建</el-button>
        <el-button type="text" style="background-color:#fbf4f0;color:#655b56">批量操作</el-button> -->

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
            width="176"
          />
          <el-table-column
            label="设备状态"
            width="200"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status['10001']" class="isState">在线</span>
              <span v-else class="isState" style="background-color:#ffb23c">离线</span>
              <span class="isState">货道</span>
              <span class="isState">传动轴</span>

            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">

            <template slot-scope="scope">
              <el-button class="actionBtn" type="text" size="small" @click="look(scope)">查看详情</el-button>
              <!-- <el-button class="actionBtn" type="text" size="small">策略</el-button>
              <el-button class="actionBtn" type="text" size="small" @click="isAlters">修改</el-button> -->
              <!-- 修改 -->
              <!-- <Alter :is-alter.sync="isAlter" :node="node" :node-detail="scope.row" /> -->
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
    <!-- <add-device :show-dialog.sync="showDialog" :node="node" :get-table-data="getTableData" /> -->
    <el-dialog title="新增设备" :visible="showDialog" width="630px" @close="handleClose">

      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple">销售量：{{ this.modalAll }}个</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">销售额: 个</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">补货次数： 个</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">维修次数: 个</div></el-col>
      </el-row>
      <h4>商品销量（月）</h4>
      <div class="productSales">
        <div v-for="(item,index) in modalList" :key="index" class="nameItem">
          <span v-text="item.skuName " />
          <span class="fl" v-text="': '+ item.count" />
          <!-- {{ length(item) }}： {{ item.count }} -->

        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import Search from '../components/search.vue'
// import AddDevice from './components/AddDevice.vue'
// import Alter from './components/Alter.vue'
import { getEquipments, getEdit, getOrderCount } from '@/api/equipments'
// getOrderAmount

export default {
  components: {
    Search
    // AddDevice,
    // Alter
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
      totalPage: 1, // 总共几页
      loading: false, // 加载框
      showDialog: false, // 新增显示框
      isAlter: false, // 新增显示框
      node: [],
      modalList: [],
      modalAll: ''

    }
  },
  computed: {
    disabledUP() {
      // console.log(!this.page.pageIndex + '' === '1')
      return this.page.pageIndex - 0 === 1 - 0
    },
    disabledDown() {
      // console.log(!this.page.pageIndex + '' === '1')

      return this.page.pageIndex === +this.totalPage
    },
    length(item) {
      // console.log(!this.page.pageIndex + '' === '1')
      // console.log(item.replicr(4))
      // return item.replicr(4)
      return ''
    }
  },

  created() {
    this.getTableData()
  },
  methods: {
    isAlters() {
      this.isAlter = true
    },
    handleClose() {
      this.showDialog = false
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
        const res = await getEquipments({
          pageSize: totalCount // 获取全部的数据
        })
        const { data: { currentPageRecords: nodes }} = res
        // 数组去重找到点位地址
        const obj = {}
        this.node = nodes.reduce((preVal, curVal) => {
          obj[curVal.nodeId] ? '' : obj[curVal.nodeId] = preVal.push(curVal.node)
          return preVal
        }, [])

        // 列表渲染

        const { data } = await getEquipments(this.page)
        // pageIndex, pageSize, totalCount, totalPage
        const { currentPageRecords, pageSize, totalCount, totalPage } = data
        this.currentPageRecords = currentPageRecords

        this.page.pageSize = pageSize
        this.page.totalCount = totalCount
        this.totalPage = totalPage
        // 点位地址
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
        ++this.page.pageIndex

        this.getTableData()
      }
    },
    async look(value) {
      // console.log(value.row.innerCode)
      this.showDialog = true

      const res = await getEdit(value.row.innerCode)
      // const res1 = await getOrderAmount(value.row.innerCode)
      const res2 = await getOrderCount(value.row.innerCode)
      // console.log(res.data, res1.data, res2.data)
      this.modalList = res.data
      this.modalAll = res2.data
      // let num = 0
      // res.data.forEach(element => {
      //   console.log(Number(element.count))
      //   num += Number(element.count)
      // })
      // console.log(num)
    }
  }
}

</script>

<style lang="scss" scoped>

.equipmentState {

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
          .isState{
            width: 52px;

            font-size: 14px;
            padding: 3px 6px;
            margin: 0 6px;
            border-radius: 5px;
            color: #fff;
            background-color: #48d698;
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
          .productSales{
             display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            width: 100%;
            justify-content: flex-start;

            .nameItem{
              display: flex;
              justify-content: space-between;
              width: 145px;
              height: 40px;
              align-items: center;
              padding: 0 5px;
               margin: 0 -1px -1px 0;
            border: 1px solid #ccc;
            // line-height: 100%;
            white-space: nowrap;
            text-overflow:ellipsis;
            .fl{
              width: 30px;

            }
            }
          }
}
</style>

