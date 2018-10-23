<template>
    <transition name="fade">
        <div class="search">
            <search-box
                ref="searchBox" 
                :tagSearch="tagSearch"
                @query="onQueryChange"
                v-show="!tagSearch"
            ></search-box>
            <div 
                class="fixed-title"
                v-show="tagSearch"
            >
                <span class="back" @click="back">
                    <i class="iconfont icon-back"></i> 
                </span>
                <span class="type">关于{{query}}的电影</span>
            </div>
            <div class="shortcut-wrapper" v-show="!query">
                <scroll 
                    :beforeScroll="beforeScroll"
                    @beforeScroll="listenScroll"
                    class="shortcut"
                    ref="shortcut"
                >
                    <div class="">
                        <div class="tag-list">
                            <div class="douban-tag tag">
                                <span 
                                    v-for="(item, index) of doubanTag" 
                                    class="tag-item"
                                    :key="index"
                                    @click="tagQuery(item)"
                                >{{item}}</span>
                            </div>
                            <div class="movie-tag tag">
                                <span v-for="(item, index) of movieTag" 
                                    class="tag-item"
                                    :key="index"
                                    @click="tagQuery(item)"
                                >{{item}}</span>
                            </div>
                            <div class="country-tag tag">
                                <span 
                                    v-for="(item, index) of countryTag" 
                                    class="tag-item"
                                    :key="index"
                                    @click="tagQuery(item)"
                                >{{item}}</span>
                            </div>
                        </div>
                        <div class="search-history">
                            <h1 class="title">
                                <span class="text">搜索历史</span>
                                <span class="iconfont clear">&#xe63d;</span>
                            </h1>
                        </div>
                    </div>
                </scroll>
            </div>
            <div class="search-result">

            </div>
        </div>
    </transition>
    
</template>

<script>
    import SearchBox from 'common/search-box/search-box'
    import Scroll from 'common/scroll/Scroll'
    export default {
        name: 'Search',
        data () {
            return {
                query: '',
                doubanTag: ['经典', '豆瓣高分', '冷门佳片'],
                movieTag: ['剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '治愈', '青春', '文艺'],
                countryTag: ['美国', '泰国'],
                tagSearch: false,
                beforeScroll: true
            }
        },
        watch: {
            //由于shortcut-wrapper会在搜索内容存在的时候隐蔽、dom会重新发生变化、所以这里需要再次刷新scroll组件
            query(newQuery) {
                if (!newQuery) {
                    setTimeout(() => {
                        this.$refs.shortcut.refresh()
                    }, 20)
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.focusInput()
            })
        },
        methods: {
            back() {
               this.tagSearch = false;
               this.query = ''
            },
            listenScroll() {
                this.blurInput()
            },
            onQueryChange (query) { //搜索框查询改变
                console.log(query)
                this.query = query
            },
            tagQuery(query) { //搜索标签内容，按标签搜索
            //隐藏搜索栏、区分关键字搜索和标签搜索
                this.tagSearch = true;
                this.query = query;
                console.log(this.query)
            },
            addQuery() { //将搜索历史搜索框并搜索
                this.$refs.searchBox.setQuery(query);
            },  

            focusInput () {
                this.$refs.searchBox.focus()
            },
            blurInput() {
                this.$refs.searchBox.blur()
            }
        },
        components: {
            SearchBox,
            Scroll
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .search
        position fixed
        z-index 500
        top 0
        left 0
        right 0
        bottom 0
        background $color-background
        &.fade-enter-active,&.fade-leave-active
            transition all .3s
        &.fade-enter,&.fade-leave-to
            opacity 0
        .fixed-title
            border-bottom-1px($color-line)
            position fixed
            top 0
            width 100%
            height 50px
            // z-index 200
            background $color-background
            .back
                position absolute
                top 0
                left 6px
                z-index 50
                .icon-back
                    display block
                    padding 15px
                    font-size $font-size-large
                    color $color-theme-f
            .type
                line-height 50px
                font-size $font-size-medium-x
                padding-left 60px
                color $color-text-f
        .shortcut-wrapper
            position fixed
            top 50px
            bottom 0
            width 100%
            .shortcut
                height 100%
                overflow hidden
                .tag-list
                    padding 0 15px
                    width 90%
                    .tag    
                        border-bottom-1px($color-line)
                        padding 20px 0
                        &:last-child
                            order-bottom-1px($color-theme-f)
                        &.movie-tag
                            .tag-item
                                margin-bottom 25px
                        .tag-item
                            display inline-block
                            margin-right 15px
                            padding 8px 16px
                            font-size $font-size-medium
                            color $color-theme-f
                            border 1px solid $color-theme-f
                            border-radius 10px
                .search-history 
                    position relative
                    margin 20px 20px 0 20px
                    .title
                        display flex
                        align-items top 
                        height 40px
                        font-size $font-size-large
                        color $color-theme-f
                        .text
                            flex 1
                        .clear 
                            extend-click()
                            font-size $font-size-large
                            color $color-theme-f
            .search-result
                position fixed
                width 100%
                top 50px
                bottom 0
                background $color-background
                            

        

</style>
