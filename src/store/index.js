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
    questions: [],
    activeQuestionIndex: 0,
    roundStarted: false,
    playerProgress: [],
    roundDurations: {
      easy: 15,
      medium: 10,
      hard: 5
    }
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
    },
    SET_ACTIVE_QUESTION_INDEX (state, num) {
      state.activeQuestionIndex = num
    },
    SET_ROUND_STARTED (state, value) {
      state.roundStarted = value
    },
    UPDATE_PLAYER_PROGRESS (state, data) {
      state.playerProgress.push(data)
    }
  },
  getters: {
    numOfQuestions (state) {
      return state.questions.length
    },
    activeQuestion (state) {
      return state.questions[state.activeQuestionIndex] || {}
    },
    roundDuration (state) {
      if (!state.selectedDifficulty) return 0
      return state.roundDurations[state.selectedDifficulty]
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
