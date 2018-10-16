import Vue from 'vue'
import Router from 'vue-router'


const Home = resolve => require(['pages/home/Home'], resolve);
const Rank = resolve => require(['pages/rank/Rank'], resolve);
const User = resolve => require(['pages/user/User'], resolve);
const RankDetail = resolve => require(['pages/rank-detail/rank-detail'], resolve);

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
        }
    ],
    mode: 'history'
})