<template>
  <div class="my_table">
    <el-table
      :data="tableList"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
      />
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      />
      <el-table-column
        v-if="caozuo"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button v-if="isShowDetail" type="text" size="large" @click="detail(scope.row)">查看详情</el-button>
          <el-button v-if="isShowEdit" type="text" size="large" @click="edit(scope.row)">修改</el-button>
          <el-button v-if="isShowDel" type="text" style="color:red" size="large" @click="del">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看详情弹框 -->
    <detail :show-detail="showDetail" :detail-policy-id="detailPolicyId" :policy-name="detailPolicyName" @closeDetail="showDetail=false" />
    <!-- 修改策略弹框 -->
    <add-strategy title="修改策略" :curr-policy-id="currPolicyId" :curr-policy-name="currPolicyName" :curr-discount="currDiscount" :is-show-build="isShowBuild" @closeBuild="isShowBuild=false" />
    <!-- 页码 -->
    <div v-if="isShowPage" class="page">
      <span>共 {{ totalCount }} 条记录 第 {{ pageIndex }} /
        {{ totalPage }} 页</span>
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="prev, next"
        :total="totalCount"
        @prev-click="$emit('prev',pageIndex)"
        @next-click="$emit('next',pageIndex)"
      />
    </div>
  </div>
</template>

<script>
import addStrategy from './addStrategy.vue'
import Detail from './detail.vue'

export default {
  components: { addStrategy, Detail },
  props: {
    tableList: {
      type: Array,
      default: () => { [] }
    },
    tableHeader: {
      type: Array,
      default: () => { [] }
    },
    totalCount: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    },
    pageIndex: {
      type: Number,
      default: 0
    },
    isShowDetail: {
      type: Boolean,
      default: true
    },
    isShowEdit: {
      type: Boolean,
      default: true
    },
    isShowDel: {
      type: Boolean,
      default: true
    },
    caozuo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowBuild: false,
      showDetail: false,
      currPolicyName: '',
      currDiscount: 0,
      currPolicyId: 0,
      detailPolicyId: 0,
      detailPolicyName: ''
    }
  },
  computed: {
    isShowPage() {
      return this.totalCount >= 10
    }
  },
  methods: {
    async detail(data) {
      this.showDetail = true
      this.detailPolicyId = data.policyId
      this.detailPolicyName = data.policyName
    },
    async edit(data) {
      this.isShowBuild = true
      this.currPolicyName = data.policyName
      this.currDiscount = +data.discount
      this.currPolicyId = +data.policyId
    },
    del() {
      this.$message({
        customClass: 'delTips',
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: '<p>提示</p><span>演示系统，不支持此操作</span>'
      })
    }
  }
}
</script>

<style lang="scss">
  .delTips{
    min-width: 0;
    width: 300px;
    left: 85%;
    .el-icon-info{
      color: #FF7C0F;
      font-size:24px;
    }
    p{
      color: #333;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 5px;
    }
  }
.my_table{
  .el-table td, .el-table th.is-leaf {
    border-bottom: none !important;
  }
  .has-gutter th{
      line-height: 1.15;
      padding: 10px 0px 9px;
      background: rgb(243, 246, 251);
      font-weight: 500;
      text-align: left;
      color: rgb(102, 102, 102)
  }
  .el-table::before{
    height: 0;
  }
  .page{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 32px 16px;
  color: #dbdfe5;
  font-size: 16px;
  .btn-next{
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    // color: #C0C4CC;
  }
  .btn-prev{
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    // color: #C0C4CC;
  }
}
}
</style>
