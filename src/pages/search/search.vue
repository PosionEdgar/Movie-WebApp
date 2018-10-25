<template>
    <transition name="fade">
        <div class="search">
            <search-box
                @query="onQueryChange"
                v-show="!tagSearch"
                ref="searchBox"
            ></search-box>
            <div class="fixed-title" v-show="tagSearch">
                <span class="back" @click="back">
                <i class="iconfont icon-back"></i>
                </span>
                <span class="type">
                <span>关于{{query}}的电影</span>
                </span>
            </div>
            <div class="shortcut-wrapper">
                <scroll class="shortcut"
                        ref="shortcut"
                        :beforeScroll="beforeScroll"
                        @beforeScroll="listenScroll"
                >
                    <div class="">
                        <div class="tag-list">
                            <div class="douban-tag tag">
                                <span 
                                    v-for="(item, index) in doubanTag"  
                                    class="tag-item"
                                    :key="index"
                                    @click="tagQuery(item)"
                                >{{item}}</span>
                            </div>
                            <div class="movie-tag tag">
                                <span 
                                    v-for="(item, index) in movieTag"  
                                    class="tag-item"
                                    :key="index"
                                    @click="tagQuery(item)"
                                >{{item}}</span>
                            </div>
                            <div class="country-tag tag">
                                <span 
                                    v-for="(item, index) in countryTag"  
                                    class="tag-item"
                                    :key="index"
                                    @click="tagQuery(item)"
                                >{{item}}</span>
                            </div>
                        </div>
                        <div class="search-history">
                            <h1 class="title">
                                <span class="text">搜索历史</span>
                                <span class="clear iconfont" @click="showConfirm">
                                    &#xe63d;
                                </span>
                            </h1>
                            <history-list
                                :searches="searchHistory"
                                @delete="deleteOne"
                                @select="addQuery"
                            ></history-list>
                        </div>
                    </div>
                </scroll>
            </div>
            <div 
                class="search-result" 
                ref="searchResult" 
                v-show="query"
                :class="{'tag-search': tagSearch}"
            >
                <suggest 
                    :query="query" 
                    :tagSearch="tagSearch" 
                    @select="saveSearch"
                    @listenScroll="blurInput"
                    ref="suggest"
                ></suggest>
            </div>
            <confirm 
                ref="confirm"
                text="是否清空所有搜索历史"
                confirmBtnText="清空"
                @confirm="clearSearchHistory"
            ></confirm>
        </div>
    </transition>
</template>

<script>
    import SearchBox from 'common/search-box/search-box'
    import Scroll from 'common/scroll/Scroll'
    import Suggest from 'pages/suggest/suggest'
    import HistoryList from 'common/history-list/history-list'
    import Confirm from 'common/confirm/Confirm'
    import { mapActions, mapGetters } from 'vuex'  
    export default {
        name: 'Search',
        data() {
            return {
                query: '',
                doubanTag: ['经典', '豆瓣高分', '冷门佳片'],
                movieTag: ['剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '治愈', '青春', '文艺'],
                countryTag: ['日本', '韩国'],
                tagSearch: true,
                beforeScroll: true
            }
        },
        computed:{
            ...mapGetters(
                ['searchHistory'])
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
            onQueryChange(query) { //搜索框查询改变
                this.query = query
            },
            tagQuery(query) { //搜索标签内容、按标签搜索
                //隐藏搜索框、区分关键字搜索和标签搜索
                this.tagSearch = true
                this.query = query;
            },
            listenScroll() {
                this.blurInput()
            },
            blurInput() {
                this.$refs.searchBox.blur()
            },
            focusInput() {
                this.$refs.searchBox.focus();
            },
            saveSearch() {
                if(!this.tagSearch) {
                    this.saveSearchHistory(this.query)
                }
            },
            deleteOne(item) {
                this.deleteSearchHistory(item)
            },
            addQuery(query){
                this.$refs.searchBox.setQuery(query)
            },
            showConfirm() {
                this.$refs.confirm.show();
            },
            ...mapActions(
                [
                    'saveSearchHistory',
                    'deleteSearchHistory',
                    'clearSearchHistory'
                ]
            )
        },
        components: {
            SearchBox,
            Scroll,
            HistoryList,
            Suggest,
            Confirm
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .search
        position: fixed
        z-index: 500
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: $color-background
        &.fade-enter-active,&.fade-leave-active
            transition: all 0.3s
        &.fade-enter,&.fade-leave-to
            opacity: 0
        .fixed-title
            border-bottom-1px($color-line)
            position: fixed
            top: 0
            width: 100%
            height: 50px
            z-index: 200
            background-color: $color-background
            .back
                position: absolute
                top: 0px
                left: 6px
                z-index: 50
                .icon-back
                    display: block
                    padding: 15px
                    font-size: $font-size-large
                    color: $color-theme-f
            .type
                line-height: 50px
                font-size: $font-size-medium-x
                padding-left: 60px
                color: $color-text-f
        .shortcut-wrapper
            position: fixed
            top: 50px
            bottom: 0
            width: 100%
            .shortcut
                height: 100%
                overflow: hidden
                .tag-list
                    padding: 0 15px
                    width: 90%
                    .tag
                        border-bottom-1px($color-line)
                        padding: 20px 0
                        &:last-child
                            border-bottom-1px($color-theme-f)
                        &.movie-tag
                            .tag-item
                                margin-bottom: 15px
                        .tag-item
                            display: inline-block
                            margin-right: 15px
                            padding: 8px 16px
                            font-size: $font-size-medium
                            color: $color-theme-f
                            border: 1px solid $color-theme-f
                            border-radius: 10px
        .search-history
            position: relative
            margin: 20px 20px 0 20px
            .title
                display: flex
                align-items: top
                height: 40px
                font-size: $font-size-large
                color: $color-theme-f    
                .text
                    flex: 1
                    .clear
                        extend-click()
                        font-size: $font-size-large
                        color: $color-theme-f                
        .search-result
            position: fixed
            width: 100%
            top: 50px
            bottom: 0
            background: $color-background
</style>
