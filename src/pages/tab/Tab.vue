<template>
	<div class="tab">
		<router-link 
			tag="div" 
			to="/home" 
			class="tab-item"
		>
			<span class="iconfont">&#xe605;</span>
			<span class="tab-link">热映</span>
		</router-link>
		<router-link 
			tag="div" 
			to="/rank" 
			class="tab-item"
		>
			<span class="iconfont">&#xe7bc;</span>
			<span class="tab-link">排行</span>
		</router-link>
		<router-link 
			tag="div" 
			to="/user" 
			class="tab-item"
		>
			<span class="iconfont">&#xe718;</span>
			<span class="tab-link">我的</span>
		</router-link>
	</div>
</template>




<script>
	export default {
		name: 'Tab'
	}
</script>

<style lang="stylus" scoped>
	@import '~assets/stylus/variable.styl'
	.tab 
		position fixed
		bottom 0
		width 100%
		display flex
		height 60px
		border-top 1px solid $color-theme-f
		.tab-item
			flex 1
			text-align center
			display flex
			flex-direction column
			align-items center
			justify-content center
			.iconfont
				font-size $font-size-large-x
				color $color-text
				margin-bottom 3px
			.movie-icon
				font-size 20px
			.tab-link
				font-size $font-size-small
				color $color-text
			&.router-link-active
				.iconfont 
					color $color-theme-f
				.tab-link
					color $color-theme-f			
</style>