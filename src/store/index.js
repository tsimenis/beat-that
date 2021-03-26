import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const instance = axios.create({
  baseURL: 'https://opentdb.com/api.php'
})
Vue.prototype.$axios = instance
Vuex.Store.prototype.$axios = instance

const getDefaultState = () => {
  return {
    step: 1,
    name: null,
    difficulties: [
      'easy',
      'medium',
      'hard'
    ],
    selectedDifficulty: null,
    questions: [],
    loadingQuestions: false,
    activeQuestionIndex: 0,
    showQuestionLoader: false,
    roundStarted: false,
    playerProgress: [],
    roundDurations: {
      easy: 15,
      medium: 10,
      hard: 5
    }
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
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
    SET_LOADING_QUESTIONS (state, value) {
      state.loadingQuestions = value
    },
    SET_ACTIVE_QUESTION_INDEX (state, num) {
      state.activeQuestionIndex = num
    },
    SET_ROUND_STARTED (state, value) {
      state.roundStarted = value
    },
    UPDATE_PLAYER_PROGRESS (state, data) {
      state.playerProgress.push(data)
    },
    UPDATE_QUESTION_RESPONSE_TIME (state, time) {
      Object.assign(state.playerProgress[state.activeQuestionIndex], { time })
    },
    RESET_STATE (state) {
      Object.assign(state, getDefaultState())
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
    },
    activeQuestionSubmitted (state) {
      return state.playerProgress.length - 1 === state.activeQuestionIndex
    },
    gameFinished (state, getters) {
      return getters.numOfQuestions > 0 && state.playerProgress.length === getters.numOfQuestions
    }
  },
  actions: {
    async getQuestions ({ state, commit }, { num = 10 }) {
      try {
        commit('SET_LOADING_QUESTIONS', true)
        const { data: { results: questions } } = await this.$axios.get('', {
          params: {
            amount: num,
            difficulty: state.selectedDifficulty
          }
        })
        commit('SET_QUESTIONS', questions)
        commit('SET_LOADING_QUESTIONS', false)
      } catch (e) {
        commit('SET_LOADING_QUESTIONS', false)
        console.log(e)
      }
    },
    nextQuestion ({ state, getters, commit }) {
      if (state.activeQuestionIndex + 1 >= getters.numOfQuestions) return false
      if (!getters.activeQuestionSubmitted) {
        commit('UPDATE_PLAYER_PROGRESS', { result: 'skipped' })
      }
      commit('SET_ACTIVE_QUESTION_INDEX', state.activeQuestionIndex + 1)
      commit('SET_ROUND_STARTED', false)
    }
  }
})
