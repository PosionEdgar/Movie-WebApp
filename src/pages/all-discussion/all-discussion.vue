<template>
    <div class="discussion-wrapper">
        <div class="fixed-title">
            <span class="back" @click="back">
                <i class="iconfont icon-back"></i>
            </span>
            <span class="type">{{title}}</span>
            <span class="to-top" @click="toTop">
                <i class="iconfont icon-circle-up"></i>
            </span>
            
        </div>
        <scroll
            :pullup="pullup"
            :data="discussions"
            @scrollToEnd="Loadmore"
            class="all-discuss"
            ref="scroll"
        >
            <div class="discuss-content">
                <movie-comment
                    v-if="currentDiscussionType === 'comment'"
                    :comments="discussions"
                    :commentNum="discussionNum"
                    :needTitle="needTitle"
                ></movie-comment>
                <movie-review
                    v-else
                    :reviews="discussions"
                    :reviewNum="discussionNum"
                    :hasMore="hasMore"
                    :needTitle="needTitle"
                    @selectReview="selectReview"
                ></movie-review>
            </div>
            <loadmore
                :fullScreen="fullScreen" 
                v-if="!discussions.length && !noResult"
            ></loadmore>
            <div class="no-result" v-if="noResult">呃、这里没有都没有啊:(</div>
        </scroll>

    </div>
</template>

<script>
    import Scroll from 'common/scroll/Scroll'
    import Loadmore from 'common/loadmore/Loadmore'
    import MovieComment from '@/pages/movie-comments/movie-comment'
    import MovieReview from '@/pages/movie-review/movie-review'
    import { getAllReviews, getAllComments } from 'api/movie-detail'
    import { mapGetters, mapMutations } from 'vuex'
    const SEARCH_MORE = 20;
    export default {
        name: 'AllDiscussion',
        data () {
            return {
                discussions: [],
                discussionNum: 0,
                discussionIndex: 0,
                noResult: false,
                pullup: true, //支持滚动加载
                hasMore: true //存在更多数据
            }
        },
        computed: {
            title () {
                return `${this.movie.title}的全部${this.type}`
            },
            type () {
                return this.currentDiscussionType === 'comment' ? '短评' : '影评'

            },
            ...mapGetters([
                'currentDiscussionType',
                'movie'
            ])
        },
        created () {
            this.fullScreen = true;
            this.needTitle = true;
            this.loadingFlag = true;
            this._getAllDiscussion();
        },
        methods: {
            back () {
                 this.$router.back()
            },
            toTop () {
                this.$refs.scroll.scrollTo(0, 0, 500)
            },
            selectReview (id) {
                this.setReviewId(id);
                this.$router.push({
                    path: `/movie/${this.movie.id}/review/${id}`
                })
            },
            _getAllDiscussion () { //加载初始评论、判断应该加载的类型
                if (!this.currentDiscussionType) { //当前页面浏览器刷新跳转回主页
                    this.$router.push('/home'); 
                    return; 
                }
                let isComment = this.currentDiscussionType === 'comment';
                this.discussType = isComment ? 'comments' : 'reviews';
                this.getData = isComment ? getAllComments : getAllReviews;
                this.getData(this.movie.id, this.discussionIndex, SEARCH_MORE)
                .then((res) => {
                    this.discussions = res[this.discussType];
                    this.noResult = this.discussions.length ? this.noResult : true;
                    this.discussionNum = res.total;
                })
            },
            Loadmore () {
                if (!this.loadingFlag || !this.hasMore) { //上一次加载还未完或没有更多数据时候、忽略此次事件
                    return;
                };
                this.loadingFlag = false;
                this.discussionIndex += SEARCH_MORE;
                this.getData(this.movie.id, this.discussionIndex, SEARCH_MORE)
                .then((res) => {
                    this.discussions = this.discussions.concat(res[this.discussType]);
                    this._checkoutMore(res);
                    this.loadingFlag = true;
                })
            },
            _checkoutMore (data) { //检查是否存在更多数据
                const discussions = data.comments ? data.comments : data.reviews
                if (!discussions.length || data.start + data.count > data.total) {
                    this.hasMore = false;
                }
            },
            ...mapMutations({
                setReviewId: 'SET_REVIEW_ID'
            })
        },
        components: {
            Scroll,
            MovieComment,
            MovieReview,
            Loadmore
        }
       
    }
</script>

<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .discussion-wrapper
        height 100%
        .fixed-title
            border-bottom-1px($color-line)
            position fixed
            top 0
            width 100%
            height 50px
            z-index 200
            background $color-background
            .back
                position absolute
                top 0
                left 6px
                z-index 60
                .icon-back
                    display block
                    padding 15px
                    font-size $font-size-large
                    color $color-theme-f
            .type
                line-height 50px
                font-size $font-size-medium-x
                padding-left 50px
            .to-top
                position absolute
                top 0
                right 6px
                z-index 50
                .icon-circle-up
                    display block
                    padding 15px
                    font-size $font-size-large-x
                    color $color-theme-f 
        .all-discuss
            position fixed
            top 0
            bottom 0
            left 0
            right 0
            z-index 50
            background $color-background
            overflow hidden
            .discuss-content
                padding-top 50px
            .no-result
                position absolute
                top 50%
                width 100%
                text-align center 

</style>
