<template>
  <el-dialog
    class="aisle"
    title="货道设置"
    :visible="isVisible"
    width="930px"
    @close="handleClose"
    @open="getcargoList"
  >
    <el-row class="ProductInfo">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-col :span="5">  <span>货道行数：6</span></el-col>
          <el-col :span="5">  <span>货道列数：10</span></el-col>
          <el-col :span="8"> <span>货道容量（个）：10</span></el-col>

        </div>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">
        <el-button type="primary" class="sortBtn">智能排货</el-button>
      </div></el-col>
    </el-row>

    <!-- 轮播框 -->
    <template>

      <ul class="boxList" style=" height: 380px;;overflow:auto">
        <li v-for="(item,index) in 6" :key="index">
          <div class="aisleInfo">
            <div class="demo-image">
              <div class="block">

                <el-image
                  style="width: 100px; height: 100px"
                  src="http://lkd2-java.itheima.net/image/product1.png"
                  fit="cover"
                />
                <!-- <div>{{ item.sku.brandName || 1 }}</div> -->
                <div>1</div>
              </div>
            </div>
            <el-button type="text">添加</el-button>
            <el-button type="text" disabled>删除 </el-button>
          </div>
        </li>
      </ul>

    </template>

    <!-- 确定 取消按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { getCargoLanesAPI, getTypeAPI } from '@/api/equipments'
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    // cargolist: {
    //   type: Array,
    //   required: true
    // }
    // typeinfo: {
    //   type: Object,
    //   required: true
    // }
    nodeDetail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      CargoList: []
    }
  },

  methods: {
    handleClose() {
      this.$emit('update:isVisible', false)
    },
    async getcargoList() {
      try {
        console.log(this.nodeDetail, 'sd')
        // const { data } = await getCargoLanesAPI(e.innerCode)
        // const { data: res } = await getTypeAPI(e.type.typeId)
        // this.CargoList = data
        // this.TypeInfo = res.data
        // console.log(data, res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style  lang="scss" scoped>

 .ProductInfo{
  display: flex;
    justify-content: center;
      align-items: center;
    height: 56px;
    padding-left: 20px;
    background-color: #f3f6fb;

    .sortBtn{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 36px;

    }
 }
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;

    margin: 0;
  }
  .el-dialog__body{

    padding: 20px 20px 30px;
  }

  .boxList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
height: 100%;
    .aisleInfo{
      position: relative;
      width: 150px;
      height: 180px;
      background: #fff;

      border-radius: 4px;
      text-align: center;
      .demo-image{
            height: 135px;
      padding-top: 16px;
      background-color: #f6f7fb;

      border-radius: 4px;

      }
  }
  }

</style>
