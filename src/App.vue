<template>
  <div id="app">
    <keep-alive exclude="MovieDetail">
      <router-view @hasLoad="hasLoad"></router-view>
    </keep-alive> 
    <tab></tab>
    <loading v-if="!loadingFlag"></loading>
  </div>
</template>

<script>
import Tab from '@/pages/tab/Tab'
import Loading from 'common/loading/Loading'	
export default {
  name: 'App',
  data () {
    return {
      loadingFlag: false
    }
  },
  methods: {
    hasLoad () {
      this.loadingFlag = true
    }
  },
  components: {
    Tab,
    Loading
  }
}
</script>

<style>

</style>
