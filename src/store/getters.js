export default {
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
}
