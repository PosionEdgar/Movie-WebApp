<template>
	<ul class="switches">
		<li 
			class="switch-item"
			v-for="(item, index) of switches"
			:key="index"
			@click="switchItem(index)"
			:class="{'active': currentIndex === index, 'small-font': smallFont === true}"

		>
			<span>{{item.name}}</span>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			currentIndex: {
				type: Number,
				default: 0
			},
			switches: {
				type: Array,
				default: []
			},
			smallFont: {
				type: Boolean,
				default: false
			}
		},
		name: 'Switches',
		methods: {
			switchItem (index) {
				this.$emit('switch', index)
			}
		}
		
	}
</script>

<style lang="stylus" scoped>
	@import "~assets/stylus/variable.styl"
	.switches
		position relative
		z-index 200
		background $color-background
		display flex
		align-items center
		width 100%
		.switch-item
			flex 1
			text-align center
			padding 15px
			font-size $font-size-medium-x
			color $color-text
			border-bottom 1px solid transparent
			&.small-font
				padding 14px 5px
				font-size $font-size-small
			&.active
				color $color-theme-f
				border-bottom-color $color-theme-f 		
				
</style>