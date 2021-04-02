export default {
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
    if (state.activeQuestionIndex + 1 > getters.numOfQuestions) return false
    if (!getters.activeQuestionSubmitted) {
      commit('UPDATE_PLAYER_PROGRESS', { result: 'skipped' })
    }
    commit('SET_ACTIVE_QUESTION_INDEX', state.activeQuestionIndex + 1)
    commit('SET_ROUND_STARTED', false)
  }
}
