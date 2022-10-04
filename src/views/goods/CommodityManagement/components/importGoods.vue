<template>
  <div>
    <el-dialog
      v-loading="loading"
      title="数据导入"
      :visible.sync="dialogVisible2"
      width="35%"
      :before-close="handleClose"
    >
      <div class="importDialog">
        <span>
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <div class="titleDialog">
              <span class="titleLeft">标题 :  </span>
              <el-button slot="trigger" type="primary" icon="el-icon-upload">选取文件</el-button>
            </div>
            <div slot="tip" class="el-upload__tip">支持扩展名：xls、xlsx，文件不得大于1M</div>
          </el-upload>
        </span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" class="confirm" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { importGoods } from '@/api/goods'
export default {
  props: {
    dialogVisible2: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [{ name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      fileName: '',
      loading: false
    }
  },
  // created() {
  //   this.handlePreview()
  // },
  methods: {
    async submit() {
      try {
        this.loading = true
        const data = await importGoods(this.fileName)
        console.log(data)
        this.dialogVisible2 = false
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false // 关闭加载中
      }
    },
    handleClose() {
      this.$emit('update:dialogVisible2', false)
    },
    handleRemove(file, fileList) {
      console.log('111', file, fileList)
    },
    async handlePreview(file) {
      // const data = await importGoods(file)
      // console.log(data)
      console.log('222', file)
    }
  }
}
</script>

<style lang="scss">
.importDialog{
  display: flex;
  justify-content: center;
  align-items: center;
.el-upload__tip{
  margin-top: 20px;
  font-size: 16px;
  }
  .el-upload{
    width: 221px;
    height: 36px;
  }
  .el-button--primary{
    width: 221px;
    height: 45px;
    background-color: #5f84ff;
    font-size: 18px;
  }
}
.titleDialog{
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .titleLeft{
    font-size: 18px;
    margin-right: 15px;
  }
}

.dialog-footer{
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cancel{
  margin: 0px 50px 0px;
  background-color: #fbf4f0;
  &:hover{
    background-color: #f3e7e1;
  }
}
.confirm{
  margin: 0px 50px 0px;
  background-color: #ff6e2a;
  color: #fff;
  &:hover{
    background-color: #e44812;
  }
}
</style>
