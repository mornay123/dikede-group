<template>
  <div>
    <el-dialog
      title="新增商品类型"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >

      <el-form
        ref="roleDialogForm"
        label-width="110px"
        :model="formData"
      >
        <!-- 商品名称 -->
        <el-form-item
          prop="skuName"
          label="商品类型名称"
          :rules="[{required: true, message:'商品名称必填',trigger: 'blur'}]"
        >
          <el-input
            v-model="formData.skuName"
            maxlength="15"
            show-word-limit
            placeholder="请输入"
          />
        </el-form-item>
        <!-- 品牌 -->
        <el-form-item
          prop="brandName"
          maxlength="10"
          label="品牌"
          :rules="[{required: true, message:'品牌名称必填',trigger: 'blur'}]"
        >
          <el-input
            v-model="formData.brandName"
            maxlength="10"
            show-word-limit
            placeholder="请输入"
          />
        </el-form-item>

        <!-- 商品价格 -->
        <el-form-item
          prop="price"
          label="商品价格(元)"
          :rules="[{required: true, message:'商品价格名称必填',trigger: 'blur'}]"
        >
          <!-- <el-input
            v-model="formData.price"
            placeholder="请输入"
            class="inputNumber"
          /> -->

          <el-input-number
            v-model="formData.price"
            controls-position="right"
            :step="0.5"
            placeholder="请输入"
            class="inputNumber"
            @change="handleChange"
          />

        </el-form-item>

        <!-- 商品类型 -->
        <el-form-item
          label="商品类型名称"
          prop="skuClass"
          :rules="[{required: true, message:'商品价格名称必填',trigger: 'blur'}]"
        >
          <el-select v-model="value" class="inputType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 规格 -->
        <el-form-item
          prop="unit"
          label="商品类型名称"
          :rules="[{required: true, message:'商品类型名称必填',trigger: 'blur'}]"
        >
          <el-input
            v-model="formData.unit"
            maxlength="10"
            show-word-limit
            placeholder="请输入"
          />
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item
          prop="skuImage"
          label="商品图片"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="handleClose">取 消</el-button>
        <el-button v-loading="loading" class="confirm" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addManageGoods, editManageGoods } from '@/api/goods'
export default {
  name: 'AddGoods2',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        skuName: '', // 商品名称
        skuImage: '', // 商品图片
        brandName: '', // 品牌
        unit: '', // 规格
        price: null, // 价格
        skuClass: '', // 商品类型
        createTime: '' // 创建日期
      },
      imageUrl: '',
      formData2: {
        skuName: '', // 商品名称
        skuImage: '', // 商品图片
        brandName: '', // 品牌
        unit: '', // 规格
        price: null, // 价格
        classId: ''
      },
      skuId: '',
      options: [{
        value: '选项1',
        label: '饮料'
      }, {
        value: '选项2',
        label: '零食'
      }, {
        value: '选项3',
        label: '食品'
      }, {
        value: '选项4',
        label: '玩具'
      }, {
        value: '选项5',
        label: '电子产品'
      },
      {
        value: '选项6',
        label: '首饰'
      }],
      value: '',
      loading: false
    }
  },
  methods: {
    // 关闭的×号
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields() // 重置表单
      this.formData = {
        skuName: '',
        skuImage: '',
        brandName: '',
        unit: '',
        price: null,
        skuClass: '',
        createTime: ''
      }
    },
    // 确定
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formData.skuId ? await editManageGoods(this.formData2, this.skuId) : await addManageGoods(this.formData2)
        this.$message.success(this.formData.skuId ? '修改成功' : '新增成功')
        this.$message.success('新增成功')
        this.$emit('refleshList') // 新增完之后重新刷新,即再调用获取角色的接口,让父亲改
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleChange() {
      if (this.formData.price < 0) {
        this.formData.price = 0
      }
    },
    // 文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss">
.el-dialog__header{
  background-color: #fff;
  color: #000;
  .el-dialog__title{
    color: #000;
    font-weight: 700;
  }
}

.el-dialog__header .el-icon-close:before {
  color: #000;
}
.inputNumber{
  width: 535px;
}

.inputType{
  width: 534px;
}

.el-upload__tip{
  margin-top: -13px;
  font-size: 14px;
  color: #bac0cd;
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
}
.confirm{
  margin: 0px 50px 0px;
  background-color: #ff6e2a;
  color: #fff;
}

// 上传图片文件样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
