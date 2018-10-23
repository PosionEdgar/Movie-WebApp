<template>
	<div class="go-search" @click="goSearch">
		<div class="logo">
			<img src="@/assets/images/douban-logo.png" width="35" height="35" />
		</div>
		<div class="search-content">
			<span class="iconfont search-icon">&#xe6cf;</span>
			<span>电影/影人/标签</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HomeHeader',
		methods: {
			goSearch() {
				this.$router.push('/search')
			}
		}
	}
</script>


<style lang="stylus" scoped>
	@import "~assets/stylus/variable.styl"
	.go-search 
		height 50px
		box-sizing border-box
		padding 10px 10px 5px 60px
		text-align center
		.logo
			position absolute
			left 10px
		.search-content
			background $color-background-d
			font-size $font-size-medium-x
			border-radius 5px
			line-height 35px
			.search-icon
				font-size $font-size-large
			span
				display inline-block
				vertical-align middle	
</style>