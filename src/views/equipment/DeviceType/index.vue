<template>
  <!-- 设备类型管理 -->

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
        <el-button type="text" icon="el-icon-circle-plus-outline" style="background-color:#ff8b3c;color:#fff" @click="showDialog=true">新建</el-button>

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
            prop="name"
            label="型号名称"
            width="176"
          />
          <el-table-column

            label="设备图片"
            width="176"
          >
            <template slot-scope="scope">

              <el-avatar :src="currentPageRecords[scope.$index].image" />
            </template>
          </el-table-column>
          <el-table-column
            prop="vmRow"
            label="货道行"
          />
          <el-table-column
            prop="vmCol"
            label="货道列"
            width="176"
          />
          <el-table-column
            prop="channelMaxCapacity"
            label="设备容量"
            width="200"
          />
          <el-table-column label="操作" width="300">

            <template slot-scope="scope">
              <el-button class="actionBtn" :loading="loading" type="text" size="small" @click="look(scope.$index, scope.row)">修改</el-button>
              <el-button class="actionBtn" type="text" size="small" plain style="color: red;" @click="open1">删除</el-button>
              <!-- 修改 -->

            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
    <!-- 新建 -->
    <!-- <add-device :show-dialog.sync="showDialog" :node="node" :get-table-data="getTableData" /> -->
    <el-dialog title="新增设备" :visible="showDialog" width="630px" @close="handleClose">

      <div class="inpsty">
        <el-col :span="2" />
        <el-col :span="4">
          <span>型号名称：</span>
        </el-col>
        <el-col :span="15">

          <el-input
            v-model="yinglioaName"
            type="text"

            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
            style="width:400px"
          >111</el-input>
        </el-col>
      </div>
      <div class="inpsty">
        <el-col :span="2" />
        <el-col :span="4">
          <span>型号编码：</span>
        </el-col>
        <el-col :span="15">

          <el-input
            v-model="yinglioaBianMa"
            style="width:400px"
            type="text"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
          />
        </el-col>
      </div>
      <div class="inpsty">
        <el-col :span="2" />
        <el-col :span="4">
          <span>货道行数：</span>
        </el-col>
        <el-col :span="15">

          <el-input-number v-model="vmRow" controls-position="right" :min="1" style="width:400px" :max="10" @change="handleChange" />
        </el-col>
      </div>
      <div class="inpsty">
        <el-col :span="2" />
        <el-col :span="4">
          <span>货道列数：</span>
        </el-col>
        <el-col :span="15">

          <el-input-number v-model="vmCol" controls-position="right" :min="1" style="width:400px" :max="10" @change="handleChange" />
        </el-col>
      </div>
      <div class="inpsty">
        <el-col :span="2" />
        <el-col :span="4">
          <span>货道容量：</span>
        </el-col>
        <el-col :span="15">

          <el-input-number v-model="channelMaxCapacity" controls-position="right" :min="1" style="width:400px" :max="10" @change="handleChange" />
        </el-col>
      </div>
      <div class="inpsty">
        <el-col :span="2" />
        <el-col :span="4">
          <span>货道容量：</span>
        </el-col>
        <el-col :span="15">
          <img :src="image" style="width:86px;height:86px">
        </el-col>
      </div>
      <div class="inpsty">
        <el-col :span="2" />
        <el-col :span="4">
          <span />
        </el-col>
        <el-col :span="15" style="color:#d9dce4">

          支持扩展名：jpg、png，文件不得大于100kb

        </el-col>
      </div>
      <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
      <el-row slot="footer" type="flex" justify="center">
        <!-- 列被分为24 -->
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" style="margin-left: 34px;" @click="alterBtn">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>

</template>

<script>
import Search from '../components/search.vue'
// import AddDevice from './components/AddDevice.vue'
// import Alter from './components/Alter.vue'
import { getMachineTypeAPI } from '@/api/equipments'
// import { getEquipmentsAPI, getEdit, getOrderCount } from '@/api/equipments'
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
      modalAll: '',
      num: 1, // 计数
      yinglioaName: '', // 输入文字
      yinglioaBianMa: '', // 输入文字
      vmRow: 1,
      vmCol: 1,
      channelMaxCapacity: 1,
      image: ''
    }
  },

  created() {
    this.MachineType()
  },
  methods: {

    isAlters() {
      this.isAlter = true
    },
    open1() {
      this.$notify({
        title: '提示',
        message: '演示系统，不支持此操作',
        type: 'warning',
        showClose: false,
        duration: 2000
      })
    },
    handleChange(value) {
      console.log(value)
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
    async MachineType() {
      const { data } = await getMachineTypeAPI({
        pageIndex: 1,
        pageSize: 10
      })
      this.currentPageRecords = data.currentPageRecords
    },

    look(value) {
      // console.log(value.row.innerCode)
      this.showDialog = true

      console.log(this.currentPageRecords[value])
      this.yinglioaName = this.currentPageRecords[value].name
      this.yinglioaBianMa = this.currentPageRecords[value].model
      this.channelMaxCapacity = this.currentPageRecords[value].channelMaxCapacity
      this.vmCol = this.currentPageRecords[value].vmCol
      this.vmRow = this.currentPageRecords[value].vmRow
      this.image = this.currentPageRecords[value].image
    },
    async alterBtn() {
      alert('不会写-')
    }
  }
}

</script>

<style lang="scss" scoped>

.equipmentState {
.inpsty{
  display: flex;
  align-items: center;
 padding:10px 20px;
}
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
              width: 40px;
              border: #fff;
              color: #5f84ff;
              padding: 0;
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

