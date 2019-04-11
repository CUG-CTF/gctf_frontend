<template>
    <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">
      <el-input v-model=text placeholder="请输入内容"></el-input>
<el-popover
    placement="bottom"
    title="标题"
    width="200"
    trigger="click"
    :content=text>
    <el-button slot="reference">click 激活</el-button>
  </el-popover>
      </div>

  </el-col>
</el-row>
</template>

<script>
export default {
  name: 'gctf',
  data () {
    return {
      text: '1234'
    }
  }
}
</script>
