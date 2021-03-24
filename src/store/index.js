import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 1,
    name: null,
    difficulties: [
      'easy',
      'medium',
      'hard'
    ],
    selectedDifficulty: null
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
    }
  },
  actions: {
  }
})
