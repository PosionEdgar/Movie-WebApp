<template>
    <div class="search-box">
        <span class="iconfont search-icon">&#xe6cf;</span>
        <input  type="text" 
                class="box" 
                :placeholder="placeholder" 
                v-model="query" 
                ref="query"
        >
        <span class="cancel" @click="back">取消</span>
    </div>
</template>

<script>
    export default {
        name: 'SearchBox',
        props: {
            placeholder: {
                type: String,
                default: '搜索电影/影人'
            },
            tagSearch: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                query: ''
            }
        },
        methods: {
            back() {
                this.$router.back();
            },
            setQuery(query){
                this.query = query;
            },
            clear() {
                this.query = ''
            },
            blur() {
                this.$refs.query.blur()
            },
            focus() {
                this.$refs.query.focus()
            }
        },
        watch: {
            query(newQuery) {
                if (!this.tagSearch) { //节流
                    if (this.timer) {
                        clearTimeout(this.timer)
                    }
                    this.timer = setTimeout(() => {
                        this.$emit('query', newQuery)
                    }, 200)
                } else { //搜索标签不需要节流
                    this.$emit('query', newQuery)
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    .search-box
        box-sizing border-box
        width 100%
        display flex
        align-items center
        padding 10px 0 10px 20px
        height 50px
        background $color-theme-f
        .search-icon
            position absolute
            top 18px
            left 28px
            font-size $font-size-medium-x
            color $colot-text
        .box
            flex 75% 0 0
            padding-left 30px
            height 30px
            line-height 30px
            border-radius 5px
            background $color-background
            color $color-text-f
            font-size $font-size-medium
            &::placeholder
                color $color-text
        .cancel
            flex 1
            text-align center
            font-size 16px
            color $color-background




</style>
