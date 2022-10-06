<template>
  <div class="equipments">
    <div class="search">
      <el-form :model="form" label-width="82px" size="medium" :inline="true">

        <!-- 搜索框 -->

        <!-- 按钮 -->

      </el-form>
    </div>
    <!-- 主页 -->

  </div>

</template>

<script>
export default {
}
</script>

<style  lang="scss" scoped>
.equipments {

  .search {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    height: 64px;

  }
  .equipment-main {
        padding: 20px 15px 19px 17px;
        background-color: #fff;

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
