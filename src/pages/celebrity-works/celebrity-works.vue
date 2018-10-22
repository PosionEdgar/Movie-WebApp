<template>
    <div class="works-wrapper">
        <div class="fixed-title">
            <span class="back" @click="back">
                <i class="iconfont icon-back"></i>
            </span>
            <span class="type">全部作品</span>
            <span class="to-top" @click="toTop">
                <i class="iconfont">&#xe67c;</i>
            </span>
        </div>
        <scroll 
            class="celebrity-works"
            ref="scroll"
            :pullup="pullup"
            :data="works"
            @scrollToEnd="loadmore"
        >
            <div class="scroll-wrapper">
                <rank-list 
                    :rankItems="works"
                    :needRank="needRank"
                    :hasMore="hasMore"
                    @select="selectMovie"
                ></rank-list>
            </div>
        </scroll>
        <loadmore :fullScreen="fullScreen" v-if="!works.length"></loadmore>
    </div>
</template>

<script>
    import Scroll from 'common/scroll/Scroll'
    import Loadmore from 'common/loadmore/Loadmore'
    import RankList from 'pages/rank-detail/components/rank-list'
    import { mapGetters, mapMutations } from 'vuex'
    import { getCelebrityWorks } from 'api/celebrity'
    import { createRankList } from 'assets/js/movielist'
    const SEARCH_MORE = 20;
    export default {
        name: 'CelebrityWorks',
        data () {
            return {
                works: [],
                searchIndex: 0,
                fullScreen: true,
                needRank: false,
                hasMore: true,
                pullup: true
            }
        },
        computed: {
            ...mapGetters(['currentCelebrityId'])
        },
        created() {
           this.loadingFlag = true; //控制滚动加载速度
           this._getWorks();
        },
        methods: {
            back() {
                this.$router.back();
            },
            toTop () {
                this.$refs.scroll.scrollTo(0, 0, 200);
            },
            selectMovie (movie) {
                this.setMovie(movie);
                this.$router.push({
                    path: `/movie/${movie.id}`
                })
            },
            _getWorks () {
                if (!this.currentCelebrityId) {
                    this.$router.push('/home');
                    return
                }
                getCelebrityWorks(this.currentCelebrityId, this.searchIndex, SEARCH_MORE).then((res) => {
                    let ret = [];
                    res.works.forEach((item) => {
                        ret.push(item.subject)
                    });
                    this.works = createRankList(ret);
                    this._checkMore(res);
                })
            },
            loadmore () {
                if (!this.loadingFlag || !this.hasMore){ //上一次加载还未完成或没有更多数据的时候忽略此次事件
                    return;
                }
                this.loadingFlag = false;
                this.searchIndex += SEARCH_MORE;
                getCelebrityWorks(this.currentCelebrityId, this.searchIndex, SEARCH_MORE).then((res) => {
                    let ret = [];
                    res.works.forEach((item) => {
                        ret.push(item.subject)
                    });
                    this.works = this.works.concat(createRankList(ret));
                    this._checkMore(res);
                    this.loadingFlag = true;
                })
            },
            _checkMore(data) {
                let works = data.works;
                if (!works.length || data.start + data.count >= data.total) {
                    this.hasMore = false
                }
            },
            ...mapMutations({
                setMovie: 'SET_MOVIE'
            })
        },
        components: {
            Scroll,
            Loadmore,
            RankList
        }
    }
</script>

<style scoped lang="stylus">
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .works-wrapper
        height 100%
        position relative
        z-index 800
        background  $color-background
        .fixed-title
            border-bottom-1px($color-line)
            position fixed
            top 0
            width 100%
            height 50px
            z-index 200
            background $color-background
            text-align center
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
            .to-top
                position absolute
                top 0
                right 6px
                z-index 50
                .iconfont
                    display block
                    padding 15px
                    font-size $font-size-large-x
                    color $color-theme-f
        .celebrity-works
            position absolute
            top 0
            bottom 0    
            width 100%
            background $color-background            
            .scroll-wrapper
                padding 50px 0 30px


</style>
