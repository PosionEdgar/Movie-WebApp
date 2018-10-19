import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

//开发环境下开启严格模式
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});