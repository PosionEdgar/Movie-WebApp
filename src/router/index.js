import Vue from 'vue'
import Router from 'vue-router'


const Home = resolve => require(['pages/home/Home'], resolve);
const Rank = resolve => require(['pages/rank/Rank'], resolve);
const User = resolve => require(['pages/user/User'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/',
  		redirect: 'Home'
  	},
  	{
  		path: '/home',
  		component: Home
  	},
  	{
  		path: '/rank',
  		component: Rank
  	},
  	{
  		path: '/user',
  		component: User
  	}
  ],
  mode: 'history'
})
