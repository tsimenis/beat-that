import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import getDefaultState from './getDefaulState'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)
const instance = axios.create({
  baseURL: 'https://opentdb.com/api.php'
})
Vue.prototype.$axios = instance
Vuex.Store.prototype.$axios = instance

export default new Vuex.Store({
  state: getDefaultState(),
  mutations,
  getters,
  actions
})
