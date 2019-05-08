<template>
  <el-button type="text" @click="open">提交Flag</el-button>
</template>

<script>
export default {
  methods: {
    open () {
      this.$prompt('输入Flag', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
      })
    }
  }
}
</script>
