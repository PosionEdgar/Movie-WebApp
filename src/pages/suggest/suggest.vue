<template>
    <div class="suggest-wrapper">
        <div class="to-top" v-show="result.length" @click="toTop">
            <span>返回顶部</span>
        </div>
        <scroll 
            :data="result"
            :beforeScroll="beforeScroll"
            :pullup="pullup"
            @beforeScroll="listenScroll"
            @scrollToEnd="searchMore"
            class="suggest"
            ref="suggest"
        >   
            <ul class="suggest-list">
                <li 
                    v-for="(item, index) of result"
                    :key="index"
                    class="suggest-item"
                    v-if="item.subtype !== 'tv'"
                    @click="selectItem(item)"
                >
                    <div class="item-pic">
                        <img v-lazy="replaceUrl(item.image)" width="50" height="70">
                    </div>
                    <div class="item-info">
                        <div class="title">{{item.title}}</div>
                        <div class="info">
                            <span class="rating">{{getRating(item.rating)}}</span>
                            <span class="pubdate">{{getPubdate(item.pubdates)}}</span>
                        </div>
                    </div>
                </li>
                <loadmore :hasMore="hasMore" v-if="result.length"></loadmore>
            </ul>
            <div class="noResult" v-if="noResult">抱歉、暂无搜索结果 :(</div>
            <loadmore v-if="!result.length && !noResult" :fullScreen="fullScreen"></loadmore>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'common/scroll/Scroll'
    import Loadmore from 'common/loadmore/Loadmore'
    import { movieSearch, tagSearch } from 'api/movie-search'
    import { createSearchList } from 'assets/js/movielist'
    import { mapMutations } from 'vuex'
    const SEARCH_MORE = 20;
    export default {
        props: {
            query: {
                type: String,
                default: ''
            },
            tagSearch: {
                type: Boolean,
                default: false
            }
        },
        name: 'Suggest',
        created() {
            this._selectType();
        },
        data() {
            return {
                result: [],
                searchIndex: 0,
                dataFn: null,
                pullup:true,
                fullScreen: true,
                loadingFlag: true,
                hasMore: true,
                beforeScroll: true,
                noResult: false
            }
        },
        methods: {
            toTop() {
                this.$refs.suggest.scrollTo(0, 0, 200);
            },
            replaceUrl (srcUrl) {
                if (srcUrl !== undefined) { // 图片防盗链处理
                    return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
                }
            },
            listenScroll() { //移动端搜索时，键盘防遮挡
                this.$emit('listenScroll')
            },
            selectItem(item) {
                //点击搜索结果跳转
                this.$router.push({
                    path: `/movie/${item.id}`
                });
                this.setMovei(item);
                this.$emit('select'); //派发事件用于更改搜索历史
            },
            search() {
                //首先要重置一些状态
                this.result = [];
                this.loadingFlag = true;
                this.hasMore = true;
                this.searchIndex = 0; //数据起始搜索0
                this.$refs.suggest.scrollTo(0, 0); //滚回到顶部
                this.dataFn(this.query, this.searchIndex, SEARCH_MORE).then((res) => {
                    const queryRet = res.title.split('"');
                    if (this.query !== queryRet[1]) {
                        console.log('old request + 1', queryRet[1]);
                        return
                    }
                    if (!res.subjects.length) {
                        //判断是否存在数据
                        this.noResult = true;
                    } else {
                        this.noResult = false;
                    }
                    this.result = createSearchList(res.subjects);
                    this._checkMore(res);

                })

            },
            _selectType() {
                this.dataFn = this.tagSearch ? tagSearch : movieSearch                
            },
            getRating(rate) {
                if(rate === 0) {
                    return '暂无评分'
                }
                return rate + '分'
            },
            getPubdate(date) {
                let pubdate = '';
                for (let i = 0; i < date.length; i ++) {
                    if(date[i].indexOf('电影节') === -1) {
                        pubdate = date[i]; 
                    }
                    if(date[i].indexOf('中国大陆') > -1) {
                        pubdate = date[i]
                        break;
                    }
                }
                if(!pubdate) {
                    return ''
                }
                return '/' + pubdate
            },
            searchMore() {
                if (!this.loadingFlag) { //上一次加载还没完成时候、忽略此事件
                    return 
                };
                this.loadingFlag = false;
                if(!this.hasMore) {
                    return;
                }
                this.searchIndex += SEARCH_MORE;
                this.dataFn(this.query, this.searchIndex, SEARCH_MORE).then((res) => {
                    this.result = this.result.concat(createSearchList(res.subjects));
                    this._checkMore(res);
                    this.loadingFlag = true;
                })
            },
            _checkMore(data) {
                let movies = data.subjects;
                if (!movies.length && data.start + data.end >= data.total) {
                    this.hasMore = false
                } 
            },
            ...mapMutations({
                setMovei: 'SET_MOVIE'
            })
        },
        watch: {
            query() {
                this._selectType();
                if(this.query) { //搜索框有数据
                    this.result = [];
                    this.search();
                }
            }
        },
        components: {
            Scroll,
            Loadmore
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .suggest-wrapper
        height 100%
        .to-top 
            box-sizing border-box
            height 22px
            position fixed
            right 0
            top 80%
            z-index 800
            padding 5px
            background $color-theme-f
            color $color-background
            text-align center
            font-size $font-size-small
        .suggest
            height 100%
            overflow hidden
            .suggest-list
                padding 15px
                .suggest-item
                    margin-top 15px
                    height 70px
                    display flex
                    &:first-child
                        margin-top 0    
                    .item-pic
                        flex 50px 0 0
                        width 50px
                        margin-right 10px
                    .item-info
                        flex 1
                        padding-bottom 30px
                        .title
                            font-size $font-size-medium
                            color $color-text-f
                            margin-bottom 10px
                        .info
                            font-size 0
                            span 
                                font-size $font-size-small
            .noResult
                position absolute
                top 50%
                width 100%
                text-align center

</style>
