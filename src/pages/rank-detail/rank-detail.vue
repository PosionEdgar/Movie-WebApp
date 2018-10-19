<template>
    <div class="rank-wrapper">
        <div class="fixed-title">
            <span class="back" @click="back">
                <i class="iconfont icon-back"></i>
            </span>
            <span class="type">
                <span>{{rankType}}</span>
            </span>
        </div>
        <switches v-if="rankType==='豆瓣 Top250'"
              :switches="switches"
              :currentIndex="currentIndex"
              :smallFont="smallFont"
              @switch="switchTab"
    >
    </switches>
    <scroll v-for="(scrollItem,index) in switches"
            v-show="currentIndex === index"
            :data="rankList[index]"
            :pullup="pullup"
            :key="index"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="scroll"
            @scrollToEnd="loadMore"
            class="rank-list-wrapper"
            ref="scroll"
    >
      <div class="rank-content" :class="{'more-padding':rankType==='豆瓣 Top250'}">
        <rank-list :rankItems="rankList[index]"
                   :page="index"
                   :hasMore="hasMore[index]"
                   @select="selectMovie"
        ></rank-list>
      </div>
      <loadmore :fullScreen="fullScreen" v-if="!rankList[index].length"></loadmore>
    </scroll>
    </div>
</template>

<script>
import Switches from 'common/switches/Switches'  
import RankList from './components/rank-list'
import Loadmore from 'common/loadmore/Loadmore' 
import Scroll from 'common/scroll/Scroll' 
import {top250Rank, usBoxRank, weeklyRank, newMoviesRank} from 'api/movie-rank'
import { createRankList } from 'assets/js/movielist'
import { mapMutations } from 'vuex'
const SEARCH_MORE = 10;
export default {
    name: 'RankDetail',
    data () {
        return {
            rankType: '',
            dataFn: null,
            top250Index: 0,
            rankList: {},
            fullScreen: true,
            currentIndex: 0,
            switches: [
                { name: '1-50' },
                { name: '51-100' },
                { name: '101-150' },
                { name: '151-200' },
                { name: '201-250' }
            ],
            smallFont: true, //tab栏小字体            
            pullup:true, //支持滚动加载
            scrollY: [0, 0, 0, 0, 0],
            movieIndex: [0, 50, 100, 150, 200], //每页的起始索引
            hasMore: [false, false, false, false, false] //是否存在更多数据，仅针对top250
        }
    },
    created () {
        this.probeType = 3;//需要实时派发事件
        this.loadingFlag = true; //控制滚动加载速度
        this.listenScroll = true; //需要监听事件
        this._selectType();
        this._getRankList();
    },
    beforeMount() {
        //由于top250榜单分栏的存在，需要添加排行列表的子对象作为各排名区间的数据
        //dom 挂载前添加属性，防止挂载后由于属性未添加报错
        for (let i = 0; i < this.switches.length; i ++) {
            this.$set(this.rankList, i, [])
        }
    },
    methods: {
        back () {
            this.$router.back(); //路由返回上一级
        },
        scroll (pos) {
            this.scrollY[this.currentIndex] = pos.y
        },
        selectMovie (movie) {
            this.setMovie(movie);
            this.$router.push({
                path: `/movie/${movie.id}`
            })
        },
        _selectType () {
            const type = this.$route.params.rankType;
            switch (type) {
                case 'top250':
                    this.dataFn = top250Rank;
                    this.rankType = '豆瓣 Top250';
                    break;
                case 'weekly':
                    this.dataFn = weeklyRank;
                    this.rankType = "本周口碑榜";
                    break;
                case 'new-movie':
                    this.dataFn = newMoviesRank;
                    this.rankType = "新片榜";
                    break;
                case 'us-box':
                    this.dataFn = usBoxRank;
                    this.rankType = "北美票房榜";
                    break;            
            }
        },
        switchTab (index) {
            this.currentIndex = index;
            this.loading = true;
            this.$refs.scroll.forEach((item) => { //重新计算scroll
                item.scrollTo(0, this.scrollY[index]); //滚动到之前位置
                setTimeout(() => {
                    item.refresh()
                }, 20)
            })
            if (this.rankList[index].length === 0) { //首次切换到分页时
                 this.hasMore[index] = true;
                 this.dataFn(this.movieIndex[index], SEARCH_MORE).then((res) => {
                     this.rankList[index] = createRankList(res.subjects)
                 })
            }
        },
        _getRankList () {
            if (this.rankType !== '豆瓣 Top250') { //非top250
                this.dataFn().then((res) => {
                    this.rankList[0] = createRankList(res.subjects)
                });
            } else {
                this.dataFn(this.movieIndex[0], SEARCH_MORE).then((res) => {
                    this.rankList[0] = createRankList(res.subjects);
                    this.hasMore[0] = true;
                })
            }
        },
        loadMore () { //加载更多数据
            const index = this.currentIndex; //获取当前的分页
            if (!this.loadingFlag) { //上一次加载还未完成。忽略此次事件
                return
            }
            this.loadingFlag = true;
            if (!this.hasMore[index]) {
                return
            }
            this.movieIndex[index] += SEARCH_MORE;
            this.dataFn(this.movieIndex[index], SEARCH_MORE).then((res) => {
                this.rankList[index] = this.rankList[index].concat(createRankList(res.subjects));
                this._checkMore(res);
                this.loadingFlag = true; 
            })
        },
        _checkMore (data) {
            let movies = data.subjects;
            let end = 50 * (this.currentIndex + 1);
            if(!movies.length || data.start + data.count >= end) {
                this.hasMore[this.currentIndex] = false;
            }
        },
        ...mapMutations({
            setMovie: 'SET_MOVIE'
        })
    },
    components: {
        Switches,
        RankList,
        Loadmore,
        Scroll
    }
}
</script>

<style lang="stylus" scoped>
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .rank-wrapper
        //防止tab栏目遮挡
        position relative
        z-index 10
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
                left 6
                z-index 50
                .icon-back
                    display block
                    padding 17px
                    font-size $font-size-large
                    color $color-theme-f
            .type
                line-height 50px
                font-size $font-size-medium-x
                padding-left 60px
                color $color-text-f
        .switches
            position fixed
            top 50px
            width 100%
            height 40px
            z-index 200
            background $color-background
        .rank-list-wrapper
            position fixed
            top 0 
            bottom 0
            left 0
            right 0
            background $color-background 
            .rank-content
                padding 50px 15px 40px;
                &.more-padding
                    padding-top 90px  

</style>
