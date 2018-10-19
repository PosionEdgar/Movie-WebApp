import Vue from 'vue'
import Router from 'vue-router'


const Home = resolve => require(['pages/home/Home'], resolve);
const Rank = resolve => require(['pages/rank/Rank'], resolve);
const User = resolve => require(['pages/user/User'], resolve);
const RankDetail = resolve => require(['pages/rank-detail/rank-detail'], resolve);
const MovieDetail = resolve => require(['pages/movie-detail/movie-detail'], resolve)
const AllDiscussion = resolve => require(['pages/all-discussion/all-discussion'], resolve);
const ReviewDetail = resolve => require(['pages/review-detail/review-detail'], resolve);

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: 'home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/rank',
            component: Rank,
            children: [{
                path: ':rankType',
                component: RankDetail
            }]
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/movie/:movieId',
            component: MovieDetail,
            children: [{
                path: ':discussType',
                component: AllDiscussion
            }, {
                path: 'review/:reviewId',
                component: ReviewDetail
            }]
        }
    ],
    mode: 'history'
})