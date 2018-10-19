<template>
  <div class="rank-list">
    <ul>
      <li 
        v-for="(item, index) of rankItems"
        :key="index"
        class="rank-item"
        :class="{'compact': !needRank}"
        @click.stop="selectItem(item, $event)"
      >
        <div class="rank-rating">
          <div class="line"></div>
          <span class="text">{{ page * 50 + (index + 1)}}</span>
        </div>
        <div class="rank-info" :class="{'compact': !needRank}">
          <div class="info-img">
            <img v-lazy="replaceUrl(item.image)" class="" height="100" width="70">
          </div>
          <div class="info-desc">
            <p class="title">{{item.title}}</p>
            <star :size="24" :score="item.rating" :showScore="showScore"></star>
            <div class="director">导演:{{item.director}} </div>
            <div class="casts">主演:{{item.casts}}</div>
          </div>
        </div>
      </li>
    </ul>
    <loadmore :hasMore="hasMore" v-if="rankItems.length && needLoading"></loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loadmore from 'common/loadmore/Loadmore'
  import Star from 'common/star/Star'
  export default {
    name: 'RankList',
    props: {
      rankItems: {
        type: Array,
        default: []
      },
      page: {
        type: Number,
        default: 0
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      needLoading: {
        type: Boolean,
        default: true
      },
      needRank: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        showScore: true
      }
    },
    methods: {
      replaceUrl (srcUrl) {
       if (srcUrl !== undefined) { // 图片防盗链处理
          return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
       }
      },
      selectItem (movie) {
        if (!event._constructed) { //忽略浏览器派发的点击事件，只留scroll组件派发的
          return
        }
        this.$emit('select', movie)
      }
    },
    components: {
      Loadmore,
      Star
    }
  }

</script>


<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .rank-item
        padding-top 30px
        &.compact
            padding-top 0
        .rank-rating
            position relative
            margin 30px auto
            text-align center
            height 10px
            width 50%
            .line   
                border-bottom-1px(#ccc)
            .text   
                padding 0 10px
                display inline-block
                background $color-background
                position absolute
                left 50%
                top 0px
                transform translateY(-50%)
                font-size $font-size-large 
                color $color-theme-f
        .rank-info
            display flex
            align-items top 
            box-sizing border-box 
            height 130px
            padding 15px
            border 1px solid $color-line
            &.compact
                border 0 
                border-bottom-1px($color-line)  
            .info-img
                flex 70px 0 0
                margin-right 10px
                img 
                    width 100%
            .info-desc
                flex 1
                box-sizing border-box
                height 100px
                padding-bottom 20px
                display flex
                flex-direction column
                justify-content space-around
                overflow hidden
                .title 
                    font-size $font-size-medium-x
                    color $color-text-f
                .director
                    font-size $font-size-small
                .casts
                    font-size $font-size-small 
                    no-wrap()  
            &:last-child
              margin-bottom 30px 
</style>

