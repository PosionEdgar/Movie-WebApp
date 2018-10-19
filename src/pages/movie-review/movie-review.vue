<template>
    <div class="movie-review">
        <div class="type-title" v-if="needTitle">
            影评{{reviewNum}}条
        </div>
        <ul>
            <li 
                class="review-item"
                v-for="(review, index) of reviews"
                :key="index"
                @click="selectReview(review.id)"
            >
                <div class="content">
                    <h1 class="title">{{review.title}}</h1>
                    <div class="user-info">
                        <div class="avatar">
                            <img v-lazy="review.author.avatar" width="25" height="25">
                        </div>
                        <span class="name">{{review.name}}</span>
                        <star :size="24" :score="review.rating.value * 2"></star>
                    </div>
                    <p class="desc">{{review.summary}}</p>
                </div>
            </li>
        </ul>
        <div class="allReview" v-if="!needTitle" @click="needAllReviews">
            <span>全部影评{{reviewNum}}个</span>
        </div>
        <loadmore 
            :hasMore="hasMore" 
            v-show="reviews.length" 
            v-if="needTitle"
        ></loadmore>
    </div>
</template>


<script>
    import Star from 'common/star/Star'
    import Loadmore from 'common/loadmore/Loadmore'
    export default {
        name: 'MovieReview',
        props: {
            reviews: {
                type: Array,
                default: []
            },
            reviewNum: {
                type: Number,
                default: 0
            },
            hasMore: {
                type: Boolean,
                default: true
            },
            needTitle: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            needAllReviews () {
                this.$emit('needAllReviews')
            },
            selectReview (id) {
                this.$emit('selectReview', id)
            }        
        },
        components: {
            Star,
            Loadmore
        }
    }
</script>


<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    .movie-review   
        padding 20px
        background $color-background
        .type-title
            font-size $font-size-medium
            margin-bottom 15px
        .review-item
            margin-bottom 20px
            .content
                font-size $font-size-small
                .title
                    font-size $font-size-medium-x
                    color $color-text-f
                    padding 5px 0
                .user-info
                    padding 5px 0
                    .avatar
                        display inline-block
                        vertical-align middle
                        margin-right 6px
                        img 
                            border-radius 50%
                    .name
                        display inline-block
                        vertical-align middle
                    .star
                        display inline-block
                        vertical-align middle
                .desc 
                    line-height 20px
        .allReview
            font-size $font-size-medium
            color $color-theme-f
            text-align center
            padding-bottom 10px               
</style>
