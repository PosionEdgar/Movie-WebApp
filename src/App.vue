<template>
  <div id="app">
    <router-view/>
    <tab></tab>
  </div>
</template>

<script>
import Tab from '@/pages/tab/Tab'	
export default {
  name: 'App',
  components: {
  	Tab
  }
}
</script>

<style>

</style>
