<template>
    <div class="detail-wrapper">
        <div class="fixed-title">
            <span class="back" @click="back">
                <i class="iconfont icon-back"></i>
            </span>
            <span class="type" ref="fixed">
                <span class="icon" v-show="!this.changeFix">
                    <i class="iconfont icon-dianying"></i>
                    电影
                </span>
                <span 
                    class="movie-name" 
                    v-if="changeFix" 
                    v-text="movieDetail.title"
                ></span>
            </span>
        </div>
        <scroll 
            class="movie-detail"
            :data="movieDetail"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll"
            ref="scroll"
        >
            <div class="scroll-wrapper">
                <div class="scroll-content" v-if="movieDetail.images">
                    <div class="bg-image" ref="image">
                        <img v-lazy="replaceUrl(movieDetail.images.large)">
                    </div>
                    <movie-info
                        :movieDetail="movieDetail"
                        @selectCelebrity="selectCelebrity"
                    ></movie-info>
                    <div class="switch">
                        <switches  
                            :switches="switches" 
                            :currentIndex="currentIndex"
                            @switch="switchTab"
                        ></switches>
                    </div>
                    <movie-comment
                        v-show="currentIndex === 0"
                        :commentNum="movieDetail.comments_count"
                        :comments="movieDetail.popular_comments"
                        @needAllComments="needAllComments"
                    ></movie-comment>
                    <movie-review
                        v-show="currentIndex === 1"
                        :reviews="movieDetail.popular_reviews.slice(0, 5)"
                        :reviewNum="movieDetail.reviews_count"
                        @needAllReviews="needAllReviews"
                        @selectReview="selectReview"
                    ></movie-review>
                </div>
            </div>
            <loadmore 
                :fullScreen="fullScreen"                  
                v-show="!movieDetail.images"
            ></loadmore>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import MovieInfo from '@/pages/movie-info/movie-info.vue'
    import Scroll from 'common/scroll/Scroll'
    import MovieComment from '@/pages/movie-comments/movie-comment.vue'
    import MovieReview from '@/pages/movie-review/movie-review.vue'
    import Switches from 'common/switches/Switches'
    import Loadmore from 'common/loadmore/Loadmore'
    import { getMovieDetail } from 'api/movie-detail'
    import { mapGetters, mapMutations } from 'vuex'
 
    export default {
        name: 'MovieDetail',
        data () {
            return {
                movieDetail: {},
                fullScreen: true,
                currentIndex: 0,
                probeType: '',
                listenScroll: false,
                scrollY: -1,
                imgHeight: -1,
                changeFix: false, //fix栏目图标的显示隐藏
                switches: [
                    { name: '短评' },
                    { name: '影评' }
                ]
            }
        },
        computed: {
            ...mapGetters(['movie'])
        },
        created () {
            this.probeType = 3; //需要实时派发事件
            this.listenScroll = true; //需要监听事件
            this._getDetail();   
        },
        methods: {
            back () {
                this.$router.back()
            },
            scroll (pos) {  //获取页面滚动位置
                this.scrollY = pos.y;
                if (-this.imgHeight > pos.y && this.imgHeight !== -1) {
                    this.changeFix = true //改变fixed栏文字
                } else {
                    this.changeFix = false;
                }
            },
            switchTab (index) {
                this.currentIndex = index
            }, 
            needAllComments () { //转入全部短评页面
                this.setDiscussion('comment')
                this.$router.push({
                    path: `/movie/${this.movieDetail.id}/comments`
                });
            },
            needAllReviews () {
                this.setDiscussion('review')
                this.$router.push({
                    path: `/movie/${this.movieDetail.id}/reviews`
                });
            },
            selectReview (id) {
                this.setReviewId(id)
                this.$router.push({
                    path: `/movie/${this.movieDetail.id}/review/${id}`
                })
            },
            selectCelebrity (id) {
                this.setCelebrity(id)
                
                this.$router.push({
                    path: `/celebrity/${id}`
                })
            },
            replaceUrl (srcUrl) {
                if (srcUrl !== undefined) {
                   return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, '')); 
                }
            },
            _getDetail () {
                if (!this.movie.id) {
                    this.$router.push('/home')
                    return;
                }
                getMovieDetail(this.movie.id).then((res) => { //获取电影详情
                    if (!this.$route.params.movieId) { //防止用户快速切换
                       return;
                    }
                     this.movieDetail = res; 
                     let me = this;
                     //使用v-lazyload监听事件，每次进入只能触发一次
                     this.$Lazyload.$once('loaded', ({el, src}) => {
                         if (src === res.images.large) {
                             me.imgHeight = me._getImageHeight();
                             setTimeout(() => {
                                 if (!me.$route.params.movieId) { //防止路由快速切换报错
                                    return
                                 }
                                 me.$refs.scroll.refresh(); //scroll组件重新计算高度
                             }, 20);
                         }
                     })
                })
            },
            _getImageHeight () {
                //获取电影海报高度，用于fixed栏高度
                return this.$refs.image.clientHeight;
            },
            ...mapMutations({
                setReviewId: 'SET_REVIEW_ID',
                setDiscussion: 'SET_DISCUSSION_TYPE',
                setCelebrity: 'SET_CELEBRITY_ID'
            })
        },
        components: {
            MovieInfo,
            Scroll,
            Switches,
            Loadmore,
            MovieComment,
            MovieReview
        }
    }
</script>

<style scoped lang="stylus">
    @import "~assets/stylus/variable.styl";
    @import "~assets/stylus/mixin.styl";
    .detail-wrapper 
        position relative
        z-index 10
        .fixed-title
            position fixed
            top 0
            left 0
            height 40px
            width  100%
            z-index 100
            background rgba(85, 85, 85, .6)
            text-align center
            .back
                position absolute
                top 0
                left 6px
                z-index 10
                .icon-back
                    display block
                    padding 10px
                    font-size $font-size-large
                    color $color-background
            .type
                .icon   
                    position absolute
                    left 50%
                    top 0
                    color $color-background
                    display block
                    padding 10px
                    transform translateX(-50%)
                    .icon-dianying
                        display inline-block
                        vertical-align text-bottom
                        font-size  $font-size-large-x
                .movie-name
                    display block
                    padding-top 11px
                    width 100%
                    color $color-backgroung 
        .movie-detail
            position fixed
            top 0
            bottom 0
            left 0
            right 0
            background $color-background-f 
            .bg-image
                text-align center
                padding 50px 0 20px 0
                background $color-backgroung-f
                img     
                    width 50%
            .switch
                padding 0 20px
                background $color-background 
                padding-top 20px             

</style>
