<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="onClose">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="人员名称" :label-width="formLabelWidth" prop="userName">
        <el-input v-model="form.userName" style="width:80%" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
        <el-select v-model="form.roleId" style="width:80%">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="form.mobile" style="width:80%" autocomplete="off" />
      </el-form-item>
      <el-form-item label="负责区域" :label-width="formLabelWidth" prop="regionName">
        <el-select v-model="form.regionName" style="width:80%" placeholder="请选择活动区域">
          <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="头像" :label-width="formLabelWidth" prop="image">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image" :src="form.image" class="avatar" style="width:100px;height:100px">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <p>支持扩展名：jpg、png，文件不得大于100kb</p>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-checkbox v-model="form.status">是否启用</el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button v-model="loading" type="primary" @click="dialogSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updatePerson, addPerson } from '@/api/personnel'
export default {
  name: 'EditPerson',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    roleList: {
      type: Array,
      default: () => ([])
    },
    regionList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      form: {
        userName: '',
        roleId: '',
        mobile: '',
        regionId: '',
        regionName: '',
        image: '',
        status: false
      },
      loading: false,
      formLabelWidth: '120px',
      rules: {
        userName: [{ required: true, message: '人员名称不能为空', trigger: 'blur' }],
        roleId: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '联系电话不能为空' },
          { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机号码格式不正确', trigger: 'blur' }],
        regionName: [{ required: true, message: '负责区域不能为空', trigger: 'blur' }],
        image: [{ required: true, message: '图片不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      return this.form.id ? '编辑人员' : '新增人员'
    }
  },
  created() {

  },
  methods: {
    onClose() {
      this.$emit('update:dialogFormVisible', false) // 关闭弹窗
      this.$refs.form.resetFields() // 重置表单
      this.form =
        {
          userName: '',
          roleId: '',
          mobile: '',
          regionId: '',
          regionName: '',
          image: '',
          status: false
        }
    },
    async dialogSubmit() {
      try {
        this.$refs.form.validate()
        // 接口
        this.loading = true // 加载控制，避免重复点击加载
        if (this.form.id) {
          await updatePerson(this.form)
        } else {
          this.regionList.forEach(item => {
            if (item.name === this.form.regionName) this.form.regionId = item.id
          })
          await addPerson(this.form) // 添加数据到后台
        }
        this.$emit('refreshList') // 渲染新列表
        this.$message.success(this.form.id ? '人员修改成功' : '人员新增成功') // 提示信息
        this.onClose() // 关闭弹窗,重置表单
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleAvatarSuccess(res, file) {
      this.image = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.form.image = URL.createObjectURL(file)
      return false
      // return isJPG && isLt2M
    }

  }
}
</script>
<style lang="scss" scoped>
    .el-input__inner{
        width: 300px;
    }
    .avatar-uploader .el-upload {
      background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dotted #818693;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
