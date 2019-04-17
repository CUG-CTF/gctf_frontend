<template>
  <div class="home">
    <HelloWorld msg="Backend based on GO"/>
    <img alt="Go logo" src="../assets/go.jpg">
    <HelloWorld msg="Frontend based on Vue"/>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
