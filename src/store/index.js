import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const instance = axios.create({
  baseURL: 'https://opentdb.com/api.php'
})
Vue.prototype.$axios = instance
Vuex.Store.prototype.$axios = instance

export default new Vuex.Store({
  state: {
    step: 1,
    name: null,
    difficulties: [
      'easy',
      'medium',
      'hard'
    ],
    selectedDifficulty: null,
    questions: []
  },
  mutations: {
    SET_STEP (state, num) {
      state.step = num
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_DIFFICULTY (state, data) {
      state.selectedDifficulty = data
    },
    SET_QUESTIONS (state, data) {
      state.questions = data
    }
  },
  actions: {
    async getQuestions ({ state, commit }, { num = 10 }) {
      try {
        const { data: { results: questions } } = await this.$axios.get('', {
          params: {
            amount: num,
            difficulty: state.selectedDifficulty
          }
        })
        commit('SET_QUESTIONS', questions)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
