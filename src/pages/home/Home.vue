<template>
	<div class="home">
		<home-header></home-header>
		<switches 
			:currentIndex="currentIndex" 
			:switches="switches" 
			@switch="switchItem"
		></switches>
	</div>
</template>


<script>
	import HomeHeader from './components/Header'
	import Switches from 'common/switches/Switches'
	export default {
		name: 'Home',
		data () {
			return {
				currentIndex: 0,
				switches: [
					{ name: '正在热映' },
					{ name: '即将上映' }
				]
			}
		},
		methods: {
			switchItem (index) {
				this.currentIndex = index
			}
		},
		components: {
			HomeHeader,
			Switches
		}
	}
</script>

<style>
	
</style>
